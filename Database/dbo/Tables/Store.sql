﻿CREATE TABLE [dbo].[Store]
(
	[Id] INT NOT NULL CONSTRAINT [PK_Store] PRIMARY KEY IDENTITY(1,1),
	[Name] NVARCHAR(250) NOT NULL,
	[Description] NVARCHAR(500) NULL,
	[Location] NVARCHAR(500) NOT NULL,
	[Active] BIT NOT NULL CONSTRAINT [DF_StoreActive] DEFAULT (1),
	[Code] NVARCHAR(100) NOT NULL CONSTRAINT [UK_StoreCode] UNIQUE, -- SOLO LETRAS Y GUIÓNES MEDIOS PORQUE SE USA EN LA URL
)
