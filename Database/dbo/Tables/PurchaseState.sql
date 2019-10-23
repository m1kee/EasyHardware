﻿CREATE TABLE [dbo].[PurchaseState]
(
	[Id] INT NOT NULL CONSTRAINT [PK_PurchaseState] PRIMARY KEY IDENTITY(1,1),
	[State] NVARCHAR(50) NOT NULL,
	[Active] BIT NOT NULL CONSTRAINT [DF_PurchaseState_Active] DEFAULT(1)
)