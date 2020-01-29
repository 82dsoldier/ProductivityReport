SET ANSI_NULLS ON

GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[OperatorProductivity]
AS
BEGIN
SET ARITHABORT OFF
SET ANSI_WARNINGS OFF
SELECT OperatorID, Name,
--Proactive Sent,
	(SELECT COUNT(*) 
	FROM Conversations C 
	INNER JOIN Messages M ON C.ConversationID = M.ConversationID 
	WHERE C.OperatorID = O.OperatorID
	AND M.MessageUserID = O.OperatorID
	AND M.MessageFrom = 'Operator'
	) As ProactiveSent,

--Proactive Answered,
	(SELECT COUNT(*) FROM Conversations C 
		WHERE C.OperatorID = O.OperatorID 
		AND Exists (SELECT 1 FROM Messages M 
					WHERE M.ConversationID = C.ConversationID
					AND M.MessageUserID = O.OperatorID
					AND M.MessageFrom = 'Operator'
					AND Exists (SELECT 1 FROM Messages VM WHERE  VM.MessageID > M.MessageID AND VM.ConversationID = M.ConversationID AND VM.MessageFrom = 'Visitor')
					)) As ProactiveAnswered,

--Proactive Response Rate,
	CASE WHEN (SELECT COUNT(*) FROM Conversations C 
		WHERE C.OperatorID = O.OperatorID 
		AND Exists (SELECT 1 FROM Messages M 
					WHERE M.ConversationID = C.ConversationID
					AND M.MessageUserID = O.OperatorID
					AND M.MessageFrom = 'Operator'
					)) > 0 THEN

	(SELECT COUNT(*) FROM Conversations C 
		WHERE C.OperatorID = O.OperatorID 
		AND Exists (SELECT 1 FROM Messages M 
					WHERE M.ConversationID = C.ConversationID
					AND M.MessageUserID = O.OperatorID
					AND M.MessageFrom = 'Operator'
					AND Exists (SELECT 1 FROM Messages VM WHERE VM.MessageID > M.MessageID AND VM.ConversationID = M.ConversationID AND VM.MessageFrom = 'Visitor')
					)) / 

	(SELECT COUNT(*) FROM Conversations C 
		WHERE C.OperatorID = O.OperatorID 
		AND Exists (SELECT 1 FROM Messages M 
					WHERE M.ConversationID = C.ConversationID
					AND M.MessageUserID = O.OperatorID
					AND M.MessageFrom = 'Operator'
					)) ELSE 0 END
	 * 100 As ProactiveResponseRate,

--Reactive Received
	(SELECT COUNT(*) FROM Conversations C 
		WHERE C.OperatorID = O.OperatorID 
		AND Exists (SELECT 1 FROM Messages M 
					WHERE M.ConversationID = C.ConversationID
					AND M.MessageUserID = C.VisitorID
					AND M.MessageFrom = 'Operator'
					AND M.MessageID = (SELECT Min(IM.MessageID) FROM Messages IM WHERE IM.ConversationID = M.ConversationID)
					)) As ReactiveReceived,

--Reactive Answered
	(SELECT COUNT(*) FROM Conversations C 
		WHERE C.OperatorID = O.OperatorID 
		AND Exists (SELECT 1 FROM Messages M 
					WHERE M.ConversationID = C.ConversationID
					AND M.MessageUserID = C.VisitorID
					AND M.MessageFrom = 'Visitor'
					AND M.MessageID = (SELECT Min(IM.MessageID) FROM Messages IM WHERE IM.ConversationID = M.ConversationID)
					AND Exists (SELECT 1 FROM Messages VM WHERE VM.MessageID > M.MessageID AND VM.ConversationID = M.ConversationID AND VM.MessageFrom = 'Operator')
					)) As ReactiveAnswered,

--Reactive Response Rate
	(SELECT COUNT(*) FROM Conversations C 
		WHERE C.OperatorID = O.OperatorID 
		AND Exists (SELECT 1 FROM Messages M 
					WHERE C.ConversationID = C.ConversationID
					AND M.MessageUserID = C.VisitorID
					AND M.MessageFrom = 'Visitor'
					AND M.MessageID = (SELECT Min(IM.MessageID) FROM Messages IM WHERE IM.ConversationID = M.ConversationID)
					AND Exists (SELECT 1 FROM Messages VM WHERE VM.MessageID > M.MessageID AND VM.ConversationID = M.ConversationID AND VM.MessageFrom = 'Operator')
					)) /
	(SELECT COUNT(*) FROM Conversations C 
		WHERE C.OperatorID = O.OperatorID 
		AND Exists (SELECT 1 FROM Messages M 
					WHERE M.ConversationID = C.ConversationID
					AND M.MessageUserID = C.VisitorID
					AND M.MessageFrom = 'Visitor'
					AND M.MessageID = (SELECT Min(IM.MessageID) FROM Messages IM WHERE IM.ConversationID = M.ConversationID)
					)) * 100 As ReactiveResponseRate,

--Total Chat Length
	(SELECT SUM(DATEDIFF(minute, EndDate, StartDate)) FROM Conversations C 
		WHERE C.OperatorID = O.OperatorID ) As TotalChatLength,
--Average Chat Length
	(SELECT AVG(DATEDIFF(minute, StartDate, EndDate)) FROM Conversations C 
		WHERE C.OperatorID = O.OperatorID ) As AverageChatLength

FROM Operators O

END
GO
