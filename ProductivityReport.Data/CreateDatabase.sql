USE [master]
GO
/****** Object:  Database [chat]    Script Date: 2/2/2020 6:31:33 PM ******/
CREATE DATABASE [chat]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'chat', FILENAME = N'C:\Users\drew\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\chat.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'chat_log', FILENAME = N'C:\Users\drew\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\chat.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [chat] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [chat].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [chat] SET ANSI_NULL_DEFAULT ON 
GO
ALTER DATABASE [chat] SET ANSI_NULLS ON 
GO
ALTER DATABASE [chat] SET ANSI_PADDING ON 
GO
ALTER DATABASE [chat] SET ANSI_WARNINGS ON 
GO
ALTER DATABASE [chat] SET ARITHABORT ON 
GO
ALTER DATABASE [chat] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [chat] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [chat] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [chat] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [chat] SET CURSOR_DEFAULT  LOCAL 
GO
ALTER DATABASE [chat] SET CONCAT_NULL_YIELDS_NULL ON 
GO
ALTER DATABASE [chat] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [chat] SET QUOTED_IDENTIFIER ON 
GO
ALTER DATABASE [chat] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [chat] SET  DISABLE_BROKER 
GO
ALTER DATABASE [chat] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [chat] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [chat] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [chat] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [chat] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [chat] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [chat] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [chat] SET RECOVERY FULL 
GO
ALTER DATABASE [chat] SET  MULTI_USER 
GO
ALTER DATABASE [chat] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [chat] SET DB_CHAINING OFF 
GO
ALTER DATABASE [chat] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [chat] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [chat] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [chat] SET QUERY_STORE = OFF
GO
USE [chat]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [chat]
GO
/****** Object:  User [chat]    Script Date: 2/2/2020 6:31:33 PM ******/
CREATE USER [chat] FOR LOGIN [chat] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 2/2/2020 6:31:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Conversations]    Script Date: 2/2/2020 6:31:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Conversations](
	[ConversationID] [int] IDENTITY(1,1) NOT NULL,
	[VisitorID] [int] NOT NULL,
	[OperatorID] [int] NOT NULL,
	[StartDate] [datetime2](7) NULL,
	[EndDate] [datetime2](7) NULL,
	[Website] [nvarchar](100) NULL,
	[PageName] [nvarchar](100) NULL,
	[PageURL] [nvarchar](100) NULL,
 CONSTRAINT [PK_Conversations] PRIMARY KEY CLUSTERED 
(
	[ConversationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Messages]    Script Date: 2/2/2020 6:31:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Messages](
	[MessageID] [int] IDENTITY(1,1) NOT NULL,
	[ConversationID] [int] NOT NULL,
	[MessageText] [nvarchar](max) NULL,
	[MessageFrom] [nvarchar](10) NULL,
	[MessageUserID] [int] NOT NULL,
	[MessageDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Messages] PRIMARY KEY CLUSTERED 
(
	[MessageID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Operators]    Script Date: 2/2/2020 6:31:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Operators](
	[OperatorID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](1000) NULL,
	[Email] [nvarchar](1000) NULL,
	[Phone] [nvarchar](1000) NULL,
 CONSTRAINT [PK_Operators] PRIMARY KEY CLUSTERED 
(
	[OperatorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Visitors]    Script Date: 2/2/2020 6:31:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Visitors](
	[VisitorID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](1000) NULL,
	[Email] [nvarchar](1000) NULL,
	[Phone] [nvarchar](500) NULL,
	[Browser] [nvarchar](900) NULL,
	[Device] [nvarchar](980) NULL,
	[IPAddress] [nvarchar](890) NULL,
 CONSTRAINT [PK_Visitors] PRIMARY KEY CLUSTERED 
(
	[VisitorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_Conversations_OperatorID]    Script Date: 2/2/2020 6:31:34 PM ******/
CREATE NONCLUSTERED INDEX [IX_Conversations_OperatorID] ON [dbo].[Conversations]
(
	[OperatorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Conversations_VisitorID]    Script Date: 2/2/2020 6:31:34 PM ******/
CREATE NONCLUSTERED INDEX [IX_Conversations_VisitorID] ON [dbo].[Conversations]
(
	[VisitorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Messages_ConversationID]    Script Date: 2/2/2020 6:31:34 PM ******/
CREATE NONCLUSTERED INDEX [IX_Messages_ConversationID] ON [dbo].[Messages]
(
	[ConversationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Conversations]  WITH CHECK ADD  CONSTRAINT [FK_Conversations_Operators_OperatorID] FOREIGN KEY([OperatorID])
REFERENCES [dbo].[Operators] ([OperatorID])
GO
ALTER TABLE [dbo].[Conversations] CHECK CONSTRAINT [FK_Conversations_Operators_OperatorID]
GO
ALTER TABLE [dbo].[Conversations]  WITH CHECK ADD  CONSTRAINT [FK_Conversations_Visitors_VisitorID] FOREIGN KEY([VisitorID])
REFERENCES [dbo].[Visitors] ([VisitorID])
GO
ALTER TABLE [dbo].[Conversations] CHECK CONSTRAINT [FK_Conversations_Visitors_VisitorID]
GO
ALTER TABLE [dbo].[Messages]  WITH CHECK ADD  CONSTRAINT [FK_Messages_Conversations_ConversationID] FOREIGN KEY([ConversationID])
REFERENCES [dbo].[Conversations] ([ConversationID])
GO
ALTER TABLE [dbo].[Messages] CHECK CONSTRAINT [FK_Messages_Conversations_ConversationID]
GO
/****** Object:  StoredProcedure [dbo].[OperatorProductivity]    Script Date: 2/2/2020 6:31:34 PM ******/
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
/****** Object:  StoredProcedure [dbo].[ProductivityReport]    Script Date: 2/2/2020 6:31:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[ProductivityReport]
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
GO
USE [master]
GO
ALTER DATABASE [chat] SET  READ_WRITE 
GO
