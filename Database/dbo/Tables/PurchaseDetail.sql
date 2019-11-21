CREATE TABLE [dbo].[PurchaseDetail]
(
	[Id] INT NOT NULL CONSTRAINT [PK_PurchaseDetail] PRIMARY KEY IDENTITY(1,1),
	[PurchaseId] INT NOT NULL CONSTRAINT [FK_PurchaseDetail_Purchase] FOREIGN KEY REFERENCES [dbo].[Purchase](Id),
	[ProductId] INT NOT NULL CONSTRAINT [FK_PurchaseDetail_Product] FOREIGN KEY REFERENCES [dbo].[Product](Id),
	[ProductValue] DECIMAL(19,4) NOT NULL,
	[Quantity] INT NOT NULL
)
