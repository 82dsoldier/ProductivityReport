DECLARE @StartDate DATE = NULL
DECLARE	@EndDate DATE = NULL
DECLARE @Website NVARCHAR(MAX) = NULL
DECLARE @Device NVARCHAR(MAX) = NULL
IF @StartDate IS NULL
BEGIN
	SET @StartDate = CONVERT(DATETIME, '1753-01-01T00:00:01', 126)
END

IF @EndDate IS NULL
BEGIN
	SET @EndDate = CONVERT(DATETIME, '9999-12-31T00:00:00', 126)
END;

--SET @Website='ToysRUs';
--SET @Device='Desktop';

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
ProactiveStartedCTE (ProactiveStarted, OperatorID) AS
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
)
SELECT ProactiveStarted, ProactiveAnswered, ReactiveReceived, ReactiveReceived
FROM Operators o
JOIN ProactiveStartedCTE ps ON o.OperatorID=ps.OperatorID
JOIN ProactiveAnsweredCTE pa ON o.OperatorID=pa.OperatorID
JOIN ReactiveReceivedCTE rr ON o.OperatorID=rr.OperatorID
JOIN ReactiveAnsweredCTE ra ON o.OperatorID=ra.OperatorID
