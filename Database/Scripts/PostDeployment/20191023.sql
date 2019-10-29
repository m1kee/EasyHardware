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
INSERT INTO [dbo].[Category] ([Name], [Code], [ParentCategoryId], [Description], [Order], [Active]) 
	VALUES 
		('Componentes de PC', 'pc-components', NULL, 'Aquí encontrarás todo lo que necesitas para armar, reparar o mejorar tu PC.', 1, 1),
		('Computadores y Tablets', 'pc-and-tablets', NULL, 'Los mejores PC gamer, Notebooks para trabajar y tablets las encuentras aquí.', 2, 1),
		('Juegos y Consolas', 'games-and-consoles', NULL, 'Todo lo que un gamer necesita lo encuentras aquí.', 3, 1),
		('Televisión', 'tv', NULL, 'TV, Smart TV y Monitores.', 4, 1),
		('Telefonía', 'phones', NULL, 'Los mejores smartphones los encontrarás en esta sección.', 5, 1),
		('Accesorios y Periféricos', 'accesories', NULL, 'Mouse, teclados, headset y mucho más.', 6, 1),
		('Software', 'software', NULL, 'Sistemas operativos, antivirus y muchos software más los encuentras en esta sección.', 7, 1),
		('Redes', 'network', NULL, 'Routers, cables, access points y mucho más.', 8, 1),
		('Audio', 'audio', NULL, 'Lo mejor en audio lo tienes en esta sección.', 9, 1);

-- Sub Categories
-- Componentes de PC
DECLARE @pcComponentsCategoryId INT;
SELECT @pcComponentsCategoryId = [Id] FROM [dbo].[Category] WHERE [Name] = 'Componentes de PC';
INSERT INTO [dbo].[Category] ([Name], [Code], [ParentCategoryId], [Description], [Order], [Active]) 
	VALUES 
		('Procesadores', 'processors', @pcComponentsCategoryId, NULL, 1, 1),
		('Placas Madre', 'motherboards', @pcComponentsCategoryId, NULL, 2, 1),
		('Memorias', 'memories', @pcComponentsCategoryId, NULL, 3, 1),
		('Tarjetas Gráficas', 'graphic-cards', @pcComponentsCategoryId, NULL, 4, 1),
		('Almacenamiento', 'storage', @pcComponentsCategoryId, NULL, 5, 1),
		('Gabinetes', 'cabinets', @pcComponentsCategoryId, NULL, 6, 1),
		('Fuentes de Poder', 'power-supply', @pcComponentsCategoryId, NULL, 7, 1),
		('Refrigeración', 'cooling', @pcComponentsCategoryId, NULL, 8, 1),
		('Ópticos', 'optical', @pcComponentsCategoryId, NULL, 9, 1),
		('Tarjetas de Expansión', 'expansion-cards', @pcComponentsCategoryId, NULL, 10, 1);

-- Computadores y Tablets
DECLARE @notebooksAndTabletsCategoryId INT;
SELECT @notebooksAndTabletsCategoryId = [Id] FROM [dbo].[Category] WHERE [Name] = 'Computadores y Tablets';
INSERT INTO [dbo].[Category] ([Name], [Code], [ParentCategoryId], [Description], [Order], [Active]) 
	VALUES 
		('Notebooks', 'notebooks', @notebooksAndTabletsCategoryId, NULL, 1, 1),
		('Portables', 'portables', @notebooksAndTabletsCategoryId, NULL, 2, 1),
		('Escritorio', 'desktop', @notebooksAndTabletsCategoryId, NULL, 3, 1),
		('Servidores', 'servers', @notebooksAndTabletsCategoryId, NULL, 4, 1);
