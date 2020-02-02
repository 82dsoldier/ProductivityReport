USE [chat]
GO

/****** Object: SqlProcedure [dbo].[ProductivityReport] Script Date: 2/1/2020 3:33:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[ProductivityReport]
	@StartDate DATE = NULL,
	@EndDate DATE = NULL,
	@Website NVARCHAR(MAX) = NULL,
	@Device NVARCHAR(MAX) = NULL
AS
BEGIN
	IF @StartDate IS NULL
	BEGIN
		SET @StartDate = CONVERT(DATETIME, '1753-01-01T00:00:01', 126)
	END

	IF @EndDate IS NULL
	BEGIN
		SET @EndDate = CONVERT(DATETIME, '9999-12-31T00:00:00', 126)
	END;

	WITH MessageCTE(ConversationID, NextConversationID, PreviousConversationID, MessageID, MessageFrom, MessageUserID, NextUserID, PreviousUserID, RowNumber) AS
	(
		SELECT Messages.ConversationID,  
		LEAD(Messages.ConversationID) OVER (PARTITION BY Messages.ConversationID ORDER BY MessageID) AS NextConversationID,
		LAG(Messages.ConversationID) OVER (PARTITION BY Messages.ConversationID ORDER BY MessageID) AS PreviousConversationID,
		MessageID, MessageFrom, MessageUserID,
		LEAD(MessageUserID) OVER (PARTITION BY Messages.ConversationID ORDER BY MessageID) AS NextUserID,
		LAG(MessageUserID) OVER (PARTITION BY Messages.ConversationID ORDER BY MessageID) AS PreviousUserID,
		ROW_NUMBER() OVER(Partition BY Messages.ConversationID ORDER BY MessageID) AS RowNumber
		FROM Messages
		LEFT JOIN Conversations ON Messages.ConversationID=Conversations.ConversationID
		LEFT JOIN Visitors ON Conversations.VisitorID=Visitors.VisitorID
		WHERE MessageDate BETWEEN @StartDate AND @EndDate
		AND 
			CASE WHEN @Website IS NULL THEN 1
			ELSE
				CASE WHEN Website=@Website THEN 1
				ELSE 0
				END
			END = 1
		AND
			CASE WHEN @Device IS NULL THEN 1
			ELSE
				CASE WHEN Visitors.Device=@Device THEN 1
				ELSE 0
				END
			END = 1
	),
	ProactiveSentCTE (ProactiveSent, OperatorID) AS
	(
		SELECT COUNT(MessageID), MessageUserID
		FROM MessageCTE
		WHERE MessageFrom='Operator' AND PreviousConversationID IS NULL	
		GROUP BY MessageUserID
	),
	ProactiveAnsweredCTE (ProactiveAnswered, OperatorID) AS
	(
		SELECT COUNT(MessageID), PreviousUserID
		FROM MessageCTE
		WHERE MessageFrom='Visitor' AND PreviousConversationID=ConversationID AND RowNumber=2
		GROUP BY PreviousUserID
	),
	ReactiveReceivedCTE (ReactiveReceived, OperatorID) AS
	(
		SELECT COUNT(MessageID), NextUserID
		FROM MessageCTE
		WHERE MessageFrom='Visitor' AND PreviousConversationID IS NULL
		GROUP BY NextUserID
	),
	ReactiveAnsweredCTE (ReactiveAnswered, OperatorID) AS
	(
		SELECT COUNT(MessageID), MessageUserID
		FROM MessageCTE
		WHERE MessageFrom='Operator' AND PreviousConversationID=ConversationID AND RowNumber=2
		GROUP BY MessageUserID
	),
	TotalsCTE (TotalChatLength, TotalChats, OperatorID) AS
	(
		SELECT SUM(
			CASE WHEN StartDate >= @StartDate AND EndDate <= @EndDate THEN DATEDIFF(s, StartDate, EndDate)
			ELSE 0
			END), 
        SUM(
			CASE WHEN StartDate >= @StartDate AND EndDate <= @EndDate THEN 1
			ELSE 0
			END), OperatorID
		FROM Conversations
        WHERE (CASE WHEN @Device IS NULL THEN 1
                WHEN ConversationID IN 
                    (SELECT ConversationID FROM Messages
                    JOIN Visitors ON Messages.MessageUserID=Visitors.VisitorID
                    WHERE Messages.MessageFrom='Visitor' AND Visitors.Device=@Device)
                    THEN 1
                ELSE 0
                END) = 1
		GROUP BY OperatorID
	)
	SELECT o.OperatorID, Name, ProactiveSent, ProactiveAnswered, ReactiveAnswered, ReactiveReceived, TotalChatLength, TotalChats
	FROM Operators o
	LEFT JOIN ProactiveSentCTE ps ON o.OperatorID=ps.OperatorID
	LEFT JOIN ProactiveAnsweredCTE pa ON o.OperatorID=pa.OperatorID
	LEFT JOIN ReactiveReceivedCTE rr ON o.OperatorID=rr.OperatorID
	LEFT JOIN ReactiveAnsweredCTE ra ON o.OperatorID=ra.OperatorID
	LEFT JOIN TotalsCTE tc ON o.OperatorID=tc.OperatorID
    GROUP BY o.OperatorID, Name, ProactiveSent, ProactiveAnswered, ReactiveAnswered, ReactiveReceived, TotalChatLength, TotalChats
END
