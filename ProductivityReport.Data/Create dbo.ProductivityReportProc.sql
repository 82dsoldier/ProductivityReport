USE [chat]
GO

/****** Object: SqlProcedure [dbo].[ProductivityReportProc] Script Date: 1/31/2020 11:37:09 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ProductivityReportProc] 
	-- Add the parameters for the stored procedure here
	@StartDate DATE = NULL,
	@EndDate DATE = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	IF @StartDate IS NULL
	BEGIN
		SET @StartDate = CONVERT(DATETIME, '1753-01-01T00:00:01', 126)
	END

	IF @EndDate IS NULL
	BEGIN
		SET @EndDate = CONVERT(DATETIME, '9999-12-31T00:00:00', 126)
	END;
    -- Insert statements for procedure here
With RowNumberCTE (RowNumber, ConversationID, MessageID, OperatorID, MessageFrom) AS
(
	SELECT ROW_NUMBER() OVER (PARTITION BY Messages.ConversationID ORDER BY MessageID) RowNumber, Messages.ConversationID, MessageID, 
	Conversations.OperatorID, MessageFrom
	FROM Messages
	JOIN Conversations ON Messages.ConversationID=Conversations.ConversationID
	WHERE StartDate >= @StartDate AND EndDate <= @EndDate
	GROUP BY Messages.ConversationID, MessageID, Conversations.OperatorID, MessageFrom, MessageText
),
ProactiveSentCTE (ProactiveSent, OperatorID) AS
(
	SELECT Count(*), OperatorID
	FROM RowNumberCTE
	WHERE MessageFrom='Operator' AND RowNumber=1
	GROUP BY OperatorID
),
ProactiveAnsweredCTE (ProactiveAnswered, OperatorID) AS
(
	SELECT COUNT(*), OperatorID
	FROM RowNumberCTE
	WHERE MessageFrom='Visitor' AND RowNumber=2
	GROUP BY OperatorID
),
ReactiveReceivedCTE (ReactiveReceived, OperatorID) AS
(
	SELECT COUNT(*), OperatorID
	FROM RowNumberCTE
	WHERE MessageFrom='Visitor' AND RowNumber=1
	GROUP BY OperatorID
),
ReactiveAnsweredCTE (ReactiveAnswered, OperatorID) AS
(
	SELECT COUNT(*), OperatorID
	FROM RowNumberCTE
	WHERE MessageFrom='Operator' AND RowNumber=2
	GROUP BY OperatorID
),
TotalChatLengthCTE (TotalChatLength, TotalChats, OperatorID) AS
(
	SELECT SUM(DATEDIFF(s, StartDate, EndDate)), COUNT(ConversationID), OperatorID
	FROM Conversations
	WHERE StartDate >= @StartDate AND EndDate <= @EndDate
	GROUP BY OperatorID
)
SELECT o.OperatorID, o.Name, ps.ProactiveSent, pa.ProactiveAnswered, rr.ReactiveReceived, ra.ReactiveAnswered, tc.TotalChatLength, tc.TotalChats
FROM Operators o
LEFT JOIN ProactiveSentCTE ps on o.OperatorID=ps.OperatorID
LEFT JOIN ProactiveAnsweredCTE pa ON o.OperatorID=pa.OperatorID
LEFT JOIN ReactiveReceivedCTE rr ON o.OperatorID=rr.OperatorID
LEFT JOIN ReactiveAnsweredCTE ra ON o.OperatorID=ra.OperatorID
LEFT JOIN TotalChatLengthCTE tc ON o.OperatorID=tc.OperatorID
END
