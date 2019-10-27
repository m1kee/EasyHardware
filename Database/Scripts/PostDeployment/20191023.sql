-- This script generates the static data of the store system

-- Profiles
INSERT INTO [dbo].[Profile] ([Name], [Description], [Active]) 
	VALUES ('Administrator', 'Admin of EasyHardware', 1);
INSERT INTO [dbo].[Profile] ([Name], [Description], [Active]) 
	VALUES ('Client', 'User of EasyHardware', 1);

-- Super User
DECLARE @adminId INT;
SELECT @adminId = [Id] FROM [dbo].[Profile] WHERE [Name] = 'Administrator';
INSERT INTO [dbo].[User] ([Name], [LastName], [UserName], [Password], [Email], [Phone], [ProfileId]) 
	VALUES ('Michael Joseph', 'Núñez Bobadilla', 'M1kee', '1445217533e7d4d0cffd9109c4edb60d62a02c0f0de9537be44f5e00d348eb4f', 'michael.nunezb@outlook.com', '+56944738082', @adminId);

-- Categories
INSERT INTO [dbo].[Category] ([Name], [ParentCategoryId], [Description], [Order], [Active]) 
	VALUES 
		('Componentes de PC', NULL, 'Aquí encontrarás todo lo que necesitas para armar, reparar o mejorar tu PC.', 1, 1),
		('Computadores y Tablets', NULL, 'Los mejores PC gamer, Notebooks para trabajar y tablets las encuentras aquí.', 2, 1),
		('Juegos y Consolas', NULL, 'Todo lo que un gamer necesita lo encuentras aquí.', 3, 1),
		('Televisión', NULL, 'TV, Smart TV y Monitores.', 4, 1),
		('Telefonía', NULL, 'Los mejores smartphones los encontrarás en esta sección.', 5, 1),
		('Accesorios y Periféricos', NULL, 'Mouse, teclados, headset y mucho más.', 6, 1),
		('Software', NULL, 'Sistemas operativos, antivirus y muchos software más los encuentras en esta sección.', 7, 1),
		('Redes', NULL, 'Routers, cables, access points y mucho más.', 8, 1),
		('Audio', NULL, 'Lo mejor en audio lo tienes en esta sección.', 9, 1);

-- Sub Categories
-- Componentes de PC
DECLARE @pcComponentsCategoryId INT;
SELECT @pcComponentsCategoryId = [Id] FROM [dbo].[Category] WHERE [Name] = 'Componentes de PC';
INSERT INTO [dbo].[Category] ([Name], [ParentCategoryId], [Description], [Order], [Active]) 
	VALUES 
		('Procesadores', @pcComponentsCategoryId, NULL, 1, 1),
		('Placas Madre', @pcComponentsCategoryId, NULL, 2, 1),
		('Memorias', @pcComponentsCategoryId, NULL, 3, 1),
		('Tarjetas Gráficas', @pcComponentsCategoryId, NULL, 4, 1),
		('Almacenamiento', @pcComponentsCategoryId, NULL, 5, 1),
		('Gabinetes', @pcComponentsCategoryId, NULL, 6, 1),
		('Fuentes de Poder', @pcComponentsCategoryId, NULL, 7, 1),
		('Refrigeración', @pcComponentsCategoryId, NULL, 8, 1),
		('Ópticos', @pcComponentsCategoryId, NULL, 9, 1),
		('Tarjetas de Expansión', @pcComponentsCategoryId, NULL, 10, 1);

-- Computadores y Tablets
DECLARE @notebooksAndTabletsCategoryId INT;
SELECT @notebooksAndTabletsCategoryId = [Id] FROM [dbo].[Category] WHERE [Name] = 'Computadores y Tablets';
INSERT INTO [dbo].[Category] ([Name], [ParentCategoryId], [Description], [Order], [Active]) 
	VALUES 
		('Notebooks', @notebooksAndTabletsCategoryId, NULL, 1, 1),
		('Portables', @notebooksAndTabletsCategoryId, NULL, 2, 1),
		('Escritorio', @notebooksAndTabletsCategoryId, NULL, 3, 1),
		('Servidores', @notebooksAndTabletsCategoryId, NULL, 4, 1);
