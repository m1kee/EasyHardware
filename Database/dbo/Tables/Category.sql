﻿CREATE TABLE [dbo].[Category]
(
	[Id] INT NOT NULL CONSTRAINT [PK_Category] PRIMARY KEY IDENTITY(1,1),
	[ParentCategoryId] INT NULL CONSTRAINT [FK_ParentCategory] FOREIGN KEY REFERENCES [dbo].[Category](Id),
	[Name] NVARCHAR(250) NOT NULL CONSTRAINT [UK_CategoryName] UNIQUE,
	[Code] NVARCHAR(100) NOT NULL CONSTRAINT [UK_CategoryCode] UNIQUE, -- SOLO LETRAS Y GUIÓNES MEDIOS PORQUE SE USA EN LA URL
	[Description] NVARCHAR(500) NULL,
	[Order] TINYINT NOT NULL,
	[Active] BIT NOT NULL CONSTRAINT [DF_CategoryActive] DEFAULT (1)
)
