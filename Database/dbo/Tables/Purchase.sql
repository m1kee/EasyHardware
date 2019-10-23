CREATE TABLE [dbo].[Purchase]
(
	[Id] INT NOT NULL CONSTRAINT [PK_Purchase] PRIMARY KEY IDENTITY(1,1),
	[Total] INT NOT NULL,
	[Client] INT NOT NULL CONSTRAINT [FK_Purchase_User] FOREIGN KEY REFERENCES [dbo].[User](Id),
	[Date] DATETIME NOT NULL,
	[StateId] INT NOT NULL CONSTRAINT [FK_Purchase_PurchaseState] FOREIGN KEY REFERENCES [dbo].[PurchaseState](Id)
)
