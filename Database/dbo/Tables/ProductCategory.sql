CREATE TABLE [dbo].[ProductCategory]
(
	[ProductId] INT NOT NULL CONSTRAINT [FK_ProductCategory_Product] FOREIGN KEY REFERENCES [dbo].[Product](Id),
	[CategoryId] INT NOT NULL CONSTRAINT [FK_ProductCategory_Category] FOREIGN KEY REFERENCES [dbo].[Category](Id),
	CONSTRAINT [UK_ProductCategoryId] PRIMARY KEY ([ProductId], [CategoryId])
)
