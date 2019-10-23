CREATE TABLE [dbo].[ProductCategory]
(
	[Id] INT NOT NULL CONSTRAINT [PK_ProductCategory] PRIMARY KEY IDENTITY(1,1),
	[ProductId] INT NOT NULL CONSTRAINT [FK_ProductCategory_Product] FOREIGN KEY REFERENCES [dbo].[Product](Id),
	[CategoryId] INT NOT NULL CONSTRAINT [FK_ProductCategory_Category] FOREIGN KEY REFERENCES [dbo].[Category](Id)
)
