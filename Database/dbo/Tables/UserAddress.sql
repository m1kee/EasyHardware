CREATE TABLE [dbo].[UserAddress]
(
	[Id] INT NOT NULL CONSTRAINT [PK_UserAddress] PRIMARY KEY IDENTITY(1,1),
	[UserId] INT NOT NULL CONSTRAINT [FK_UserAddress_User] FOREIGN KEY REFERENCES [dbo].[User](Id),
	[AddressId] INT NOT NULL CONSTRAINT [FK_UserAddress_Address] FOREIGN KEY REFERENCES [dbo].[Address](Id),
	[IsDefault] BIT CONSTRAINT [FK_Default] DEFAULT (0),
	[Active] BIT CONSTRAINT [FK_Active] DEFAULT (1)
)
