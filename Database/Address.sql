﻿CREATE TABLE [dbo].[Address]
(
	[Id] INT NOT NULL CONSTRAINT [PK_AddressId] PRIMARY KEY IDENTITY(1,1),
	[UserId] INT NOT NULL CONSTRAINT [FK_AddressUser] FOREIGN KEY REFERENCES [User](ID),
	[Street] NVARCHAR(250) NOT NULL,
	[StreetNumber] NVARCHAR(25) NOT NULL,
	[Floor] NUMERIC(3) NULL,
	[Office] NUMERIC(5) NULL,
	[City] NVARCHAR(250) NOT NULL,
	[PostalCode] NVARCHAR(25) NOT NULL
)
