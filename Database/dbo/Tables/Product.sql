﻿CREATE TABLE [dbo].[Product]
(
	[Id] INT NOT NULL CONSTRAINT [PK_Product] PRIMARY KEY IDENTITY(1,1),
	[Name] NVARCHAR(250) NOT NULL,
	[Description] NVARCHAR(MAX) NOT NULL,
	[PartNumber] NVARCHAR(100) NOT NULL, 
    [Active] BIT NOT NULL CONSTRAINT [DF_ProductActive] DEFAULT (1)
)
