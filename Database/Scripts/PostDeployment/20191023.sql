-- This script generates the static data of the store system

-- Profiles
INSERT INTO [dbo].[Profile] ([Name], [Description], [Active]) 
	VALUES ('Administrator', 'Admin of EasyHardware', 1);
INSERT INTO [dbo].[Profile] ([Name], [Description], [Active]) 
	VALUES ('Client', 'User of EasyHardware', 1);

-- Super User
DECLARE @adminId INT, 
		@client INT;
SELECT @adminId = [Id] FROM [dbo].[Profile] WHERE [Name] = 'Administrator';
SELECT @client = [Id] FROM [dbo].[Profile] WHERE [Name] = 'Client';
INSERT INTO [dbo].[User] ([Name], [LastName], [UserName], [Password], [Email], [Phone], [ProfileId]) 
	VALUES ('Michael Joseph', 'Núñez Bobadilla', 'M1kee', '3512d6fe0c8c23857ca0b8a7fc9a7bbf6ce0dc6ce6d4b0caaa100c92cf1dcf35', 'michael.nunezb@outlook.com', '+56944738082', @adminId),
		   ('Juan', 'Pérez', 'Ju4n', '3512d6fe0c8c23857ca0b8a7fc9a7bbf6ce0dc6ce6d4b0caaa100c92cf1dcf35', 'juan.perez@outlook.com', '+56944738083', @client);

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


-- Purchase States 
INSERT INTO [dbo].[PurchaseState] ([State], [Active]) 
	VALUES 
		('Pendiente', 1),
		('Pagado', 1)

-- Generate Dummy Products
INSERT INTO [dbo].[Product] ([Name], [Price], [Description], [PartNumber], [Active])
    VALUES 
        ('Producto 1', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-uno', 1),
        ('Producto 2', 19990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-dos', 1),
        ('Producto 3', 15990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-tres', 1),
        ('Producto 4', 159990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-cuatro', 1),
        ('Producto 5', 249990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-cinco', 1),
        ('Producto 6', 1250000, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-seis', 1),
        ('Producto 7', 459990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-siete', 1),
        ('Producto 8', 9990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-ocho', 1),
        ('Producto 9', 990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-nueve', 1),
        ('Producto 10', 35990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-diez', 1),
        ('Producto 11', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-uno-uno', 1),
        ('Producto 12', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-uno-dos', 1),
        ('Producto 13', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-uno-tres', 1),
        ('Producto 14', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-uno-cuatro', 1),
        ('Producto 15', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-uno-cinco', 1),
        ('Producto 16', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-uno-seis', 1),
        ('Producto 17', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-uno-siete', 1),
        ('Producto 18', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-uno-ocho', 1),
        ('Producto 19', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-uno-nueve', 1),
        ('Producto 20', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-dos-cero', 1),
        ('Producto 21', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-dos-uno', 1),
        ('Producto 22', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-dos-dos', 1),
        ('Producto 23', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-dos-tres', 1),
        ('Producto 24', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-dos-cuatro', 1),
        ('Producto 25', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-dos-cinco', 1),
        ('Producto 26', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-dos-seis', 1),
        ('Producto 27', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-dos-siete', 1),
        ('Producto 28', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-dos-ocho', 1),
        ('Producto 29', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-dos-nueve', 1),
        ('Producto 30', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-tres-cero', 1),
        ('Producto 31', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-tres-uno', 1),
        ('Producto 32', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-tres-dos', 1),
        ('Producto 33', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-tres-tres', 1),
        ('Producto 34', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-tres-cuatro', 1),
        ('Producto 35', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-tres-cinco', 1),
        ('Producto 36', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-tres-seis', 1),
        ('Producto 37', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-tres-siete', 1),
        ('Producto 38', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-tres-ocho', 1),
        ('Producto 39', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-tres-nueve', 1),
        ('Producto 40', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-cuatro-cero', 1),
        ('Producto 41', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-cuatro-uno', 1),
        ('Producto 42', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-cuatro-dos', 1),
        ('Producto 43', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-cuatro-tres', 1),
        ('Producto 44', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-cuatro-cuatro', 1),
        ('Producto 45', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-cuatro-cinco', 1),
        ('Producto 46', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-cuatro-seis', 1),
        ('Producto 47', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-cuatro-siete', 1),
        ('Producto 48', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-cuatro-ocho', 1),
        ('Producto 49', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-cuatro-nueve', 1),
        ('Producto 50', 99990, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quos quo sit cumque, aspernatur, laudantium modi eaque nobis deserunt et nam quas eius dolorem, nemo sequi. Vitae excepturi omnis nihil.', 'producto-cinco-cero', 1)

INSERT INTO [dbo].[ProductCategory] ([ProductId], [CategoryId])
    VALUES 
        (1, 1),
        (1, 2),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 1),
        (6, 2),
        (7, 2),
        (8, 2),
        (9, 1),
        (10, 3),
        (11, 4),
        (12, 5),
        (13, 5),
        (14, 4),
        (15, 4),
        (16, 3),
        (17, 2),
        (18, 6),
        (19, 6),
        (20, 6),
        (21, 6),
        (22, 1),
        (23, 1),
        (24, 1),
        (25, 1),
        (26, 1),
        (27, 2),
        (28, 2),
        (29, 2),
        (30, 3),
        (31, 3),
        (32, 4),
        (33, 4),
        (34, 5),
        (35, 5),
        (36, 5),
        (37, 1),
        (38, 1),
        (39, 1),
        (40, 2),
        (41, 2),
        (42, 2),
        (43, 3),
        (44, 3),
        (45, 4),
        (46, 10),
        (47, 11),
        (48, 11),
        (49, 11),
        (50, 11)

INSERT INTO [dbo].[Store] ([Name], [Description], [Location], [Active], [Code])
    VALUES
        ('Internet', 'Tienda online', 'N/A', 1, 'internet')

DECLARE @netStore INT;
SELECT @netStore = [Id] FROM [dbo].[Store] WHERE [Name] = 'Internet';
INSERT INTO [dbo].[Stock] ([ProductId], [StoreId], [Quantity])
        VALUES
            (1,	1,	10),
            (2,	1,	10),
            (3,	1,	10),
            (4,	1,	0),
            (5,	1,	5),
            (6,	1,	3),
            (7,	1,	3),
            (8,	1,	3),
            (9,	1,	0),
            (10,	1,	100),
            (11,	1,	100),
            (12,	1,	100),
            (13,	1,	100),
            (14,	1,	100),
            (15,	1,	100),
            (16,	1,	100),
            (17,	1,	100),
            (18,	1,	100),
            (19,	1,	100),
            (20,	1,	100),
            (21,	1,	100),
            (22,	1,	100),
            (23,	1,	100),
            (24,	1,	100),
            (25,	1,	100),
            (26,	1,	100),
            (27,	1,	100),
            (28,	1,	100),
            (29,	1,	100),
            (30,	1,	100),
            (31,	1,	100),
            (32,	1,	100),
            (33,	1,	100),
            (34,	1,	100),
            (35,	1,	100),
            (36,	1,	100),
            (37,	1,	100),
            (38,	1,	100),
            (39,	1,	100),
            (40,	1,	100),
            (41,	1,	100),
            (42,	1,	100),
            (43,	1,	100),
            (44,	1,	100),
            (45,	1,	100),
            (46,	1,	100),
            (47,	1,	100),
            (48,	1,	100),
            (49,	1,	100),
            (50,	1,	100)