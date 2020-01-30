CREATE VIEW ProductivityReport AS
With RowNumberCTE (RowNumber, ConversationID, MessageID, OperatorID, MessageFrom) AS
(
	SELECT ROW_NUMBER() OVER (PARTITION BY Messages.ConversationID ORDER BY MessageID) RowNumber, Messages.ConversationID, MessageID, 
	Conversations.OperatorID, MessageFrom
	FROM Messages
	JOIN Conversations ON Messages.ConversationID=Conversations.ConversationID
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
	GROUP BY OperatorID
)
SELECT o.OperatorID, o.Name, ps.ProactiveSent, pa.ProactiveAnswered, rr.ReactiveReceived, ra.ReactiveAnswered, tc.TotalChatLength, tc.TotalChats, c.StartDate
FROM Operators o
LEFT JOIN ProactiveSentCTE ps on o.OperatorID=ps.OperatorID
LEFT JOIN ProactiveAnsweredCTE pa ON o.OperatorID=pa.OperatorID
LEFT JOIN ReactiveReceivedCTE rr ON o.OperatorID=rr.OperatorID
LEFT JOIN ReactiveAnsweredCTE ra ON o.OperatorID=ra.OperatorID
LEFT JOIN TotalChatLengthCTE tc ON o.OperatorID=tc.OperatorID
LEFT JOIN Conversations c ON o.OperatorID=c.OperatorID