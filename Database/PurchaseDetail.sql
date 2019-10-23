CREATE TABLE [dbo].[PurchaseDetail]
(
	[Id] INT NOT NULL CONSTRAINT [PK_PurchaseDetailId] PRIMARY KEY IDENTITY(1,1),
	[PurchaseId] INT NOT NULL CONSTRAINT [FK_PurchaseId] FOREIGN KEY REFERENCES [Purchase](ID),
	[ProductId] INT NOT NULL CONSTRAINT [FK_PurchaseProduct] FOREIGN KEY REFERENCES [Product](ID),
	[ProductValue] INT NOT NULL,
	[Quantity] INT NOT NULL
)
