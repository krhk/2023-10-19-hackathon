USE [HackathonKHKdb]
GO
/****** Object:  User [HackathonAppUser]    Script Date: 19.10.2023 18:08:35 ******/
CREATE USER [HackathonAppUser] FOR LOGIN [HackathonAppLogin] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_datareader] ADD MEMBER [HackathonAppUser]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [HackathonAppUser]
GO
/****** Object:  Table [dbo].[Address]    Script Date: 19.10.2023 18:08:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Address](
	[AddressID] [int] IDENTITY(1,1) NOT NULL,
	[City] [nvarchar](50) NOT NULL,
	[Street] [nvarchar](50) NOT NULL,
	[Zip] [nchar](10) NOT NULL,
	[Latitude] [float] NOT NULL,
	[Longitude] [float] NOT NULL,
 CONSTRAINT [PK_Address] PRIMARY KEY CLUSTERED 
(
	[AddressID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 19.10.2023 18:08:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comment](
	[CommentID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[Text] [nvarchar](500) NOT NULL,
	[DateCommented] [datetime] NOT NULL,
	[PlaceID] [int] NOT NULL,
 CONSTRAINT [PK_Comment] PRIMARY KEY CLUSTERED 
(
	[CommentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Place]    Script Date: 19.10.2023 18:08:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Place](
	[PlaceID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[Web] [nvarchar](500) NOT NULL,
	[AddressID] [int] NOT NULL,
	[Description] [nvarchar](500) NULL,
	[ImageUrl] [nvarchar](500) NULL,
 CONSTRAINT [PK_Place] PRIMARY KEY CLUSTERED 
(
	[PlaceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 19.10.2023 18:08:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Username] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](50) NOT NULL,
	[ProfilePicture] [text] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserOnPlace]    Script Date: 19.10.2023 18:08:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserOnPlace](
	[UserID] [int] NOT NULL,
	[PlaceID] [int] NOT NULL,
	[LikeDislike] [bit] NOT NULL,
	[Checked] [bit] NOT NULL,
	[Visited] [bit] NOT NULL
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Address] ON 

INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (297, N'Cervený Kostelec', N'Manželu Burdychových 367', N'549 41    ', 16.0954, 50.4726)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (298, N'Hradec Králové', N'Karla IV. 774', N'500 02    ', 15.8228, 50.2142)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (299, N'Jicín', N'17. listopadu 47', N'506 01    ', 15.3515, 50.4346)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (300, N'Horice', N'Husova 1560', N'508 01    ', 15.6319, 50.3637)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (301, N'Hradec Králové', N'Brnenská 1825', N'500 02    ', 15.8476, 50.197)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (302, N'Janské Lázne', N'Horní promenáda 268', N'542 25    ', 15.7804, 50.6279)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (303, N'Rtyne v Podkrkonoší', N'Kostelecká 165', N'542 33    ', 16.072, 50.504)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (304, N'Jaromer', N'Námestí Dukelských hrdinu 240', N'551 01    ', 15.9184, 50.3527)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (305, N'Náchod', N'Smirických 272', N'547 33    ', 16.1607, 50.4198)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (306, N'Nový Bydžov', N'A. Jiráska 562', N'504 01    ', 15.4924, 50.239)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (307, N'Dobruška', N'Boženy Nemcové 720 70', N'518 01    ', 16.1596, 50.2904)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (308, N'Nové Mesto nad Metují', N'Boženy Nemcové 720', N'549 01    ', 16.1492, 50.352)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (309, N'Castolovice', N'Masarykova 479', N'517 50    ', 16.1859, 50.1292)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (310, N'Velichovky', N'Lázne 65', N'552 11    ', 15.8445, 50.3548)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (311, N'Hermánkovice', N'Janovicky ', N'549 84    ', 16.3459, 50.6383)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (312, N'Chlumec nad Cidlinou', N'Riegrova 236', N'503 51    ', 15.4574, 50.159)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (313, N'Libnatov', N' 25', N'542 36    ', 15.9929, 50.4823)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (314, N'Lužany', N'Lužany 145', N'507 06    ', 15.4681, 50.4299)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (315, N'Úpice', N'Chelcického 216', N'542 32    ', 16.0156, 50.5116)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (316, N'Nový Hrádek', N'Roubaluv kopec 350', N'549 22    ', 16.2435, 50.3568)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (317, N'Kostelec nad Orlicí', N'Palackého námestí 36', N'517 41    ', 16.2108, 50.1233)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (318, N'Rychnov nad Knežnou', N'Panská 1492', N'516 01    ', 16.2762, 50.164)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (319, N'Sobotka', N'Námestí Míru 3', N'507 43    ', 15.1768, 50.4672)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (320, N'Solnice', N'Družstevní 555', N'517 01    ', 16.2347, 50.2028)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (321, N'Dvur Králové nad Labem', N'Námestí Václava Hanky 828', N'544 01    ', 15.8125, 50.4307)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (322, N'Trutnov', N'Nábreží Václava Havla 20', N'541 01    ', 15.9169, 50.5623)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (323, N'Náchod', N'Hurdálkova 147', N'547 33    ', 16.1656, 50.4167)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (324, N'Jánské Lázne', N'Námestí Svobody 273', N'542 25    ', 15.7804, 50.6303)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (325, N'Ceské Mezirící', N'Osvobození 313', N'517 71    ', 16.0428, 50.2862)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (326, N'Žernov', N' 112', N'552 03    ', 16.0589, 50.4305)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (327, N'Police nad Metují', N'Jiráskova 151', N'549 54    ', 16.2374, 50.5372)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (328, N'Broumov', N'Mírové námestí 105', N'550 01    ', 16.332, 50.5849)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (329, N'Vrchlabí', N'Vancurova 378', N'543 01    ', 15.6106, 50.631)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (330, N'Malé Svatonovice', N'Námestí Karla Capka 1', N'542 34    ', 16.0501, 50.534)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (331, N'Jicín', N'17. listopadu 47', N'506 01    ', 15.3522, 50.4353)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (332, N'Jaromer', N'Trinnerova  125', N'551 01    ', 15.9084, 50.3486)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (333, N'Bohánka', N'Bohánka 27', N'508 01    ', 15.7172, 50.3586)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (334, N'Dobruška', N'Archlebovy sady ', N'518 01    ', 16.1624, 50.2875)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (335, N'Dvur Králové nad Labem', N'Schulzovy sady ', N'544 01    ', 15.8199, 50.4337)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (336, N'Ledce', N'Ledce ', N'517 71    ', 16.0458, 50.2239)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (337, N'Police nad Metují', N'Malá Ledhuj ', N'549 54    ', 16.233, 50.5406)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (338, N'Kostelec nad Orlicí', N'Palackého námestí 36', N'517 41    ', 16.2105, 50.1234)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (339, N'Ceská Skalice', N'Autokemp Rozkoš ', N'552 03    ', 16.0669, 50.3979)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (340, N'Hradec Králové', N'Orlické nábreží 1271', N'500 03    ', 15.8357, 50.2055)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (341, N'Vrchlabí', N'Dobrovského ', N'543 03    ', 15.6073, 50.6254)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (342, N'Trutnov', N'Královédvorská ', N'541 01    ', 15.907, 50.5532)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (343, N'Trutnov', N'Námestí Republiky 999', N'541 01    ', 15.9103, 50.5634)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (344, N'Vysokov', N' ', N'547 01    ', 16.1161, 50.4035)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (345, N'Náchod', N'Hurdálkova 371', N'547 33    ', 16.1656, 50.4161)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (346, N'Deštné v Orlických horách', N' 133', N'517 91    ', 16.3397, 50.3101)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (347, N'Borohrádek', N'Husova 240', N'517 24    ', 16.0892, 50.0951)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (348, N'Nová Paka', N'Lomnická 60', N'509 01    ', 15.5138, 50.4963)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (349, N'Skrivany', N'V Sádku 314', N'503 52    ', 15.4967, 50.2714)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (350, N'Janské Lázne', N'Cernohorská  265', N'54225     ', 15.7706, 50.6315)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (351, N'Pec pod Snežkou', N' 338', N'54221     ', 15.7215, 50.6843)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (352, N'Rícky v Orlických horách', N' 239', N'51762     ', 16.4606, 50.2257)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (353, N'Pec pod Snežkou', N' 345', N'54221     ', 15.7328, 50.7052)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (354, N'Vrchlabí', N'Za rekou  371', N'54302     ', 15.5947, 50.6585)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (355, N'Vrchlabí', N' 498', N'54302     ', 15.6031, 50.6367)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (356, N'Vrchlabí', N' 508', N'54302     ', 15.6036, 50.6368)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (357, N'Mladé Buky', N'Kalná Voda 7', N'54223     ', 15.8449, 50.6005)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (358, N'Cerný dul', N' ', N'54344     ', 15.7056, 50.6375)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (359, N'Cerný dul', N' ', N'54344     ', 15.7073, 50.6369)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (360, N'Vrchlabí', N' ', N'54302     ', 15.6028, 50.6525)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (361, N'Janské Lázne', N' ', N'54225     ', 15.7791, 50.6335)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (362, N'Špindleruv Mlýn', N' ', N'54351     ', 15.6009, 50.7236)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (363, N'Špindleruv Mlýn', N' ', N'54351     ', 15.6064, 50.7339)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (364, N'Špindleruv Mlýn', N' ', N'54351     ', 15.5808, 50.7147)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (365, N'Špindleruv Mlýn', N' ', N'54351     ', 15.6123, 50.7203)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (366, N'Špindleruv Mlýn', N' ', N'54351     ', 15.6146, 50.7199)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (367, N'Pec pod Snežkou', N' ', N'54221     ', 15.7684, 50.6903)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (368, N'Deštné v Orlických horách', N' ', N'51791     ', 16.3652, 50.2993)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (369, N'Pec pod Snežkou', N' ', N'54221     ', 15.7397, 50.736)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (370, N'Trebihošt', N' 163', N'54475     ', 15.6946, 50.4549)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (371, N'Jicín', N'Pod Cerovkou 672', N'50601     ', 15.3603, 50.4448)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (372, N'Janské Lázne', N'Cernohorská  293', N'54225     ', 15.752, 50.6489)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (373, N'Radvanice', N' ', N'54212     ', 16.0521, 50.5526)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (374, N'Jicín', N' ', N'50601     ', 15.2961, 50.467)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (375, N'Jicín', N'Podhradí  55', N'50601     ', 15.3152, 50.4167)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (376, N'Jicín', N'Pod Koštofránkem ', N'50601     ', 15.3534, 50.4366)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (377, N'Jicín', N' ', N'50601     ', 15.374, 50.4534)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (378, N'Hostinné', N'Námestí  69', N'54371     ', 15.7228, 50.5411)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (379, N'Pec pod Snežkou', N'Hnedý vrch ', N'54221     ', 15.7071, 50.6883)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (380, N'Vidochov', N' ', N'50901     ', 15.5586, 50.5192)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (381, N'Brada-Rybnícek', N' ', N'50601     ', 15.329, 50.4673)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (382, N'Skuhrov nad Belou', N' ', N'51703     ', 16.2887, 50.2273)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (383, N'Nové Mesto nad Metují', N' ', N'54901     ', 16.1596, 50.3409)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (384, N'Náchod', N'Dobrošov  71', N'54701     ', 16.1911, 50.4008)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (385, N'Dobruška', N'nám. F. L. Veka ', N'51801     ', 16.16, 50.292)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (386, N'Dvur Králové nad Labem', N'nám. Republiky 100', N'54401     ', 15.8133, 50.4339)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (387, N'Horice', N'Cesta Legií 1370', N'50801     ', 15.6388, 50.3776)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (388, N'Horice', N' ', N'50801     ', 15.6248, 50.38)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (389, N'Hradec Králové', N'Franušova  168', N'50003     ', 15.8308, 50.209)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (390, N'Sobotka', N' 363', N'50743     ', 15.1698, 50.4703)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (391, N'Všestary', N'Chlum 66', N'50312     ', 15.74, 50.2786)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (392, N'', N' ', N'          ', 16.2814, 50.6613)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (393, N'Libníkovice', N' ', N'50346     ', 15.9938, 50.2488)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (394, N'Náchod', N'Zámek  1282', N'54701     ', 16.1616, 50.4188)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (395, N'Nové Mesto nad Metují', N'Husovo námestí 1201', N'54901     ', 16.1497, 50.3438)
GO
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (396, N'Špindleruv Mlýn', N' ', N'54351     ', 15.5691, 50.7443)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (397, N'Trutnov', N' 90', N'54922     ', 15.9061, 50.5559)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (398, N'Nechanice', N' ', N'50315     ', 15.6638, 50.2315)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (399, N'Všestary', N' ', N'50312     ', 15.7431, 50.2438)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (400, N'Rícky v Orlických horách', N' ', N'51761     ', 16.5127, 50.2162)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (401, N'Vrbice', N' 14', N'51741     ', 16.2469, 50.0923)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (402, N'Rokytnice v Orlických horách', N' ', N'51761     ', 16.4735, 50.1659)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (403, N'Prepychy', N' ', N'51732     ', 16.1273, 50.2242)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (404, N'Vysoká nad Labem', N' ', N'50331     ', 15.8336, 50.1542)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (405, N'Teplice nad Metují', N'Skály ', N'54957     ', 16.1241, 50.5746)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (406, N'Trutnov', N' ', N'54101     ', 15.9112, 50.6294)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (407, N'Horní Radechová', N' ', N'54941     ', 16.1668, 50.4613)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (408, N'Žernov', N' 120', N'55203     ', 16.0521, 50.4301)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (409, N'Radvanice', N' ', N'54212     ', 16.0122, 50.5753)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (410, N'Ceská Skalice', N' ', N'55203     ', 16.0443, 50.4328)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (411, N'Sendraž', N' ', N'54901     ', 16.2039, 50.3725)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (412, N'Janské Lázne', N'Krkonošská 350', N'54225     ', 15.7577, 50.6311)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (413, N'Deštné v Orlických horách', N' ', N'51791     ', 16.3978, 50.3014)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (414, N'Olešnice v Orlických horách', N' ', N'51783     ', 16.3174, 50.3785)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (415, N'Vysoká Srbská', N' ', N'54931     ', 16.2299, 50.4866)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (416, N'Nový Hrádek', N' 90', N'54922     ', 16.2545, 50.3629)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (417, N'Kosice', N' ', N'50351     ', 15.5309, 50.1901)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (418, N'Detenice', N' 1', N'50724     ', 15.1729, 50.368)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (419, N'Jicín', N'Valdštejnovo nám. 1', N'50601     ', 15.352, 50.4363)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (420, N'Jicíneves', N' 1', N'50731     ', 15.3424, 50.3731)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (421, N'Kopidlno', N'nám. Hilmarovo 1', N'50732     ', 15.2723, 50.3306)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (422, N'Lázne Belohrad', N'T. G. Masaryka 1', N'50781     ', 15.5812, 50.429)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (423, N'Castolovice', N'Masarykova 1', N'51750     ', 16.187, 50.1307)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (424, N'Chlumec nad Cidlinou', N'Pražská  1', N'50351     ', 15.4513, 50.159)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (425, N'Ceská Skalice', N'Ratiborice  1', N'55203     ', 16.0525, 50.4149)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (426, N'Doudleby nad Orlicí', N'Rudé armády 1', N'51742     ', 16.2639, 50.1084)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (427, N'Kvasiny', N' 1', N'51702     ', 16.2506, 50.2069)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (428, N'Opocno', N'Trckovo nám. 1', N'51773     ', 16.1153, 50.265)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (429, N'Potštejn', N'Jarníkova  1', N'51743     ', 16.3086, 50.0824)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (430, N'Bílé Policany', N' 1', N'54452     ', 15.7289, 50.3913)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (431, N'Borohrádek', N'Rudé armády 1', N'51724     ', 16.0958, 50.0981)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (432, N'Rokytnice v Orlických horách', N'nám. T. G. Masaryka 1', N'51761     ', 16.4642, 50.1656)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (433, N'Barchov', N' 1', N'50401     ', 15.569, 50.2021)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (434, N'Sloupno', N' 1', N'50353     ', 15.4983, 50.2573)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (435, N'Nové Mesto nad Metují', N'Husovo nám. 1201', N'54901     ', 16.1497, 50.3439)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (436, N'Kostelec nad Orlicí', N'Komenského  266', N'51741     ', 16.1997, 50.1226)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (437, N'Rudník', N' 6', N'54372     ', 15.7264, 50.5683)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (438, N'Hrádek', N'Zámek  66', N'50315     ', 15.6671, 50.2235)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (439, N'Adršpach', N'Dolní Adršpach 75', N'54952     ', 16.1108, 50.619)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (440, N'Kuks', N' 81', N'54443     ', 15.8895, 50.3977)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (441, N'Konecchlumí', N' ', N'50705     ', 15.479, 50.4119)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (442, N'Mladejov', N' ', N'50745     ', 15.2339, 50.4842)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (443, N'Libán', N' ', N'50723     ', 15.2137, 50.3864)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (444, N'Vrchlabí', N' ', N'54301     ', 15.609, 50.627)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (445, N'Smirice', N' ', N'50303     ', 15.8724, 50.2989)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (446, N'Náchod', N' ', N'54701     ', 16.1617, 50.4188)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (447, N'Rychnov nad Knežnou', N'Kolowratská  ', N'51601     ', 16.2755, 50.1666)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (448, N'Podbrezí', N' ', N'51803     ', 16.2126, 50.2625)
INSERT [dbo].[Address] ([AddressID], [City], [Street], [Zip], [Latitude], [Longitude]) VALUES (449, N'Cerekvice nad Bystricí', N' ', N'50777     ', 15.724, 50.3344)
SET IDENTITY_INSERT [dbo].[Address] OFF
GO
SET IDENTITY_INSERT [dbo].[Place] ON 

INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (61, N'3D kino Luník', N'http://www.kinolunik.cz/', 297, N'kino se stálým provozem', N'http://2018.eurofilmfest.cz/wp-content/uploads/2018/03/kino-lunik-cerveny-kostelec.jpeg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (62, N'Bio Central', N'https://www.biocentral.cz/', 298, N'kino se stálým provozem', N'https://biocentral.cz/images/default-blogpost-bio-central.jpg?v=1640093589')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (63, N'Biograf Ceský Ráj', N'https://kzmj.cz/', 299, N'kino se stálým provozem', N'https://upload.wikimedia.org/wikipedia/commons/1/14/Ji%C4%8D%C3%ADn_2022-04_33.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (64, N'Biograf Na Špici', N'http://www.biografnaspici.cz/', 300, N'kino se stálým provozem', N'https://www.theatre-architecture.eu/res/archive/148/016541.jpg?seek=1357912115')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (65, N'CineStar Hradec Králové', N'https://www.cinestar.cz/cz/hradec', 301, N'multikino se stálým provozem', N'https://firmy.cinestar.cz/images/kina_ftd/HK_03_edited.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (66, N'Detská lécebna Vesna', N'https://www.janskelazne.com/', 302, N'kino s nepravidelným provozem', N'https://www.janskelazne.com/wp-content/uploads/2016/07/DSC_0061-1024x679.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (67, N'Digitální Kino', N'https://www.rtyne.cz/', 303, N'kino s nepravidelným provozem', N'https://logopond.com/logos/396a8d0243adc53455f18898ba0a99fa.png')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (68, N'Divadlo Jaromer Kinoklub', N'http://www.divadlojaromer.cz/', 304, N'kino s nepravidelným provozem', N'https://www.jaromer-josefov.cz/evt_image.php?img=4434')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (69, N'Galerie výtvarného umení v Náchode', N'https://www.gvun.cz/', 305, N'kino s nepravidelným provozem', N'https://www.hkregion.cz/galerie/obrazky/imager.php?img=863447&x=3184&y=2120&hash=95b3c3e39aa20eb1894ab61bdd104205&ratio=1')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (70, N'Jiráskovo divadlo', N'https://www.novybydzov.cz/divadlo.asp', 306, N'kino se stálým provozem', N'https://upload.wikimedia.org/wikipedia/commons/a/a1/Divadlo_Jir%C3%A1skovo_%28Nov%C3%BD_Byd%C5%BEov%29.JPG')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (71, N'Kino 70', N'http://www.kino.mestodobruska.cz/', 307, N'kino se stálým provozem', N'https://upload.wikimedia.org/wikipedia/commons/a/ab/Kino_70_Jilemnice.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (72, N'Kino 70', N'https://www.kino70.cz/', 308, N'kino se stálým provozem', N'https://upload.wikimedia.org/wikipedia/commons/a/ab/Kino_70_Jilemnice.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (73, N'Kino Castolovice', N'http://ou-castolovice.cz/letni-kino', 309, N'kino s letním provozem', N'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=604279209730486')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (74, N'KINO Dum pod Kaštany', N'https://www.velichovky.cz/cs/kinosal', 310, N'kino s nepravidelným provozem', N'https://www.jaromer-josefov.cz/evt_image.php?img=4431')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (75, N'Kino Janovicky', N'www.bcb-janovicky.cz', 311, N'kino s nepravidelným provozem', N'https://m.media-amazon.com/images/I/61Hr1AT6XuL._UF1000,1000_QL80_.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (76, N'Kino Klicperuv dum', N'https://ic.chlumecnc.cz/klicperuv-dum/ms-2990/p1=2990', 312, N'kino se stálým provozem', N'https://www.hkregion.cz/galerie/obrazky/imager.php?img=417367&x=3836&y=2560&hash=a5eaadaee37b1ef45b737839358d3ee6&ratio=1')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (77, N'Kino Libnatov', N'www.libnatov.cz', 313, N'kino s letním nepravidelným provozem', N'https://i.ytimg.com/vi/4KK7Nofohn8/maxresdefault.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (78, N'Kino Lužany', N'https://www.luzany.cz/kino', 314, N'kino s letním provozem', N'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=565446648716734')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (79, N'Kino Mír', N'https://www.mksu.cz/', 315, N'kino se stálým provozem', N'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=465935468881915')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (80, N'Kino Nový Hrádek', N'https://www.novy-hradek.cz/index.php?str=kino', 316, N'kino se stálým provozem', N'https://d48-a.sdn.cz/d_48/c_img_G_I/R4PBBwH.jpeg?fl=res,600,,1,ffffff')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (81, N'Kino Rabštejn', N'https://www.skrabstejn.cz/', 317, N'kino se stálým provozem', N'https://d48-a.sdn.cz/d_48/c_img_gR_i/r9hEA.jpeg?fl=res,600,400,3,ffffff')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (82, N'Kino Rychnov nad Knežnou', N'http://www.kinorychnov.cz/', 318, N'kino se stálým provozem', N'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1124595004320236')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (83, N'Kino Sobotka', N'https://cs-cz.facebook.com/kinosobotka/', 319, N'kino s nepravidelným provozem', N'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=5318953928183783')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (84, N'Kino Solnice', N'www.kulturasolnice.cz', 320, N'kino s nepravidelným provozem', N'https://c8.alamy.com/comp/2P67301/historic-building-named-solnice-on-piaristicke-namesti-at-twilight-ceske-budejovice-south-bohemian-region-czech-republic-czechia-europe-2P67301.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (85, N'Kino Svet', N'https://www.kino-svet.cz/', 321, N'kino se stálým provozem', N'https://upload.wikimedia.org/wikipedia/commons/9/96/Kino_Sv%C4%9Bt.JPG')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (86, N'Kino Vesmír', N'http://uffo.cz/', 322, N'kino se stálým provozem', N'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=506158649408327')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (87, N'Kino Vesmír Náchod', N'https://www.kinonachod.cz/', 323, N'kino se stálým provozem', N'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=506158649408327')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (88, N'Kino Vlast', N'kulturafm.cz', 324, N'kino se stálým provozem', N'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=3218980564863507')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (89, N'Kino Vzájemnost', N'https://www.ceskemezirici.cz/web/index.php?option=com_content&view=category&layout=blog&id=16&Itemid=15', 325, N'kino s nepravidelným provozem', N'https://www.zarukakvalit.cz/data/pics/29928_841a0.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (90, N'Kino Žernov', N'www.zernov.cz', 326, N'kino s letním provozem', N'https://s3-media0.fl.yelpcdn.com/bphoto/pS2duhBUZ8LtYeOOz5PAKw/1000s.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (91, N'Kolárovo divadlo', N'https://www.pellyhodomy.cz/', 327, N'kino se stálým provozem', N'https://upload.wikimedia.org/wikipedia/commons/5/5d/Police_nad_Metuj%C3%AD_%287%29.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (92, N'Konferencní sál IC', N'https://broumov-mesto.cz/ap/p1=3484', 328, N'kino s nepravidelným provozem', N'https://nase.broumovsko.cz/foto/katalog/full/konferencni-sal-ic-broumovska.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (93, N'Kulturní dum Strelnice', N'https://www.kinovrchlabi.cz/', 329, N'kino se stálým provozem', N'https://d48-a.sdn.cz/d_48/c_img_gR_e/aku7y.jpeg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (94, N'Kulturní klub Malé Svatonovice', N'https://www.malesvatonovice.cz/', 330, N'kino s nepravidelným provozem', N'https://d48-a.sdn.cz/d_48/c_img_gS_t/WEzXZZ.jpeg?fl=res,600,400,3,ffffff')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (95, N'Letní Biograf Ceský Ráj', N'https://kzmj.cz/', 331, N'kino s letním provozem', N'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=899067030672349')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (96, N'Letní FILMY POD PEVNOSTÍ', N'https://besea.cz/cz/', 332, N'kino s letním provozem', N'https://www.jaromer-josefov.cz/evt_image.php?img=2738&width=704&height=996')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (97, N'Letní kino Bohánka-Skála', N'https://www.facebook.com/LKBohanka/', 333, N'kino s letním provozem', N'https://www.bohanka.cz/www/files/texts/img-20220725-wa0004-1.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (98, N'Letní kino Dobruška', N'https://www.mestodobruska.cz/mesto/kultura-a-sport/kulturni-a-sportovni-akce/letni-kino-dobruska-2382_1363cs2048.html', 334, N'kino s letním provozem', N'https://www.kulturadobruska.cz/evt_image.php?img=13437')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (99, N'Letní kino Dvur Králové nad Labem', N'https://www.kino-svet.cz/', 335, N'kino s letním provozem', N'https://www.kralovedvorsko.cz/image.php?106833&0')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (100, N'Letní kino Ledce', N'http://www.knnledce.cz/index.php?id=letni-kino', 336, N'kino s letním provozem', N'http://knnledce.cz/data/uploads/letni_kino_ledce_65x32_2023_srpen_kor2.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (101, N'Letní kino Police nad Metují', N'https://www.pellyhodomy.cz/', 337, N'kino s letním provozem', N'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=715684063897762')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (102, N'Letní kino Rabštejn', N'www.skrabstejn.cz', 338, N'kino s letním provozem', N'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1735991053356643')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (103, N'Letní kino Rozkoš', N'https://www.kinorozkos.atcrozkos.cz/', 339, N'kino s letním provozem', N'https://www.ceskaskalice.cz/data/multipage/editor/editor-91-379-cs_2_big.jpg?gcm_date=1606242411')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (104, N'Letní kino Širák', N'https://www.letnikinosirak.cz/', 340, N'kino s letním provozem', N'https://www.letnikinosirak.cz/images/stories/animace/animace2.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (105, N'Letní kino Tripsi Vrchlabí', N'https://letni-kino-vrchlabi.cz/', 341, N'kino s letním provozem', N'https://ccb810b9f0.clvaw-cdnwnd.com/292a57138cf999fdc11db96f01ebba76/200000008-54a8354a86/foto%20%2826%29.jpg?ph=ccb810b9f0')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (106, N'Letní kino v Amfiteátru na Bojišti', N'https://www.bojistetrutnov.cz/', 342, N'kino s letním provozem', N'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=729169322506733')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (107, N'Letní kino v Caffé UFFO', N'http://uffo.cz/', 343, N'kino s letním provozem', N'https://www.ictrutnov.cz/sites/default/files/styles/hero_lg_min/public/heroimages/2022/letni-kino-cafe-uffo-foto-milos-salek_13.jpg?h=c2c854f7&itok=2RHfkXHc')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (108, N'Letní kino Vysokov', N'https://www.vysokov.cz/volny-cas/akce-v-okoli/letni-kino-36_30cs1799.html', 344, N'kino s letním provozem', N'https://www.svazekobci1866.cz/evt_image.php?img=510')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (109, N'Letní PFERDA', N'https://www.pferda.cz/aktuality/letni-filmove-ctvrtky-v-nachode.html', 345, N'kino s letním provozem', N'https://cdn.ehorses.media/image/blur/big/e01769c7-b29b-4894-a410-2e969b43052d.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (110, N'Malé deštenské kino', N'www.villanova.cz', 346, N'kino s nepravidelným provozem', N'https://www.destna.cz/evt_image.php?img=1030')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (111, N'Mestské kino Borohrádek', N'https://www.mestoborohradek.cz/kino', 347, N'kino s nepravidelným provozem', N'https://foto.turistika.cz/foto/w/13416/41444/full_5b1d03_f_normalFile1-p1010006.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (112, N'Novopacké retro kino', N'https://www.penzion-novopackesklepy.cz/hudebni-sklepy/program-kina/', 348, N'kino se stálým provozem', N'https://www.penzion-novopackesklepy.cz/data/uploads/016_kinonp.JPG')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (113, N'Smidarské letní kino', N'https://www.facebook.com/events/5149463851849295/', 349, N'kino s letním provozem', N'https://www.czecot.cz/results/zobrobr.php?w=ac&id=286931&orig=1')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (114, N'Kabinová lanovka Janské Lázne - Cernohorský express (celorocní)', N'http://www.skiresort.cz', 350, N'Osmimístná kabinová lanová dráha vedoucí na vrchol Cerné hory.', N'https://www.ubytovanivelkaupa.cz/file-trips/cesrna-hora---lanovka-42253.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (115, N'Kabinová lanovka Janské Lázne - Hofmanky express (zimní)', N'http://www.skiresort.cz', 350, N'Vyhrívaná lanovka HOFMANKY EXPRESS ?s tzv. bublinou proti neprízni pocasí se rozjela 4. 12. 2015 u sjezdovky Hofmanky v areálu Cerná hora (Janské Lázne).', N'http://www.hkregion.cz/galerie/766550_800_533.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (116, N'Sedacková lanovka Pec pod Snežkou – Hnedý vrch (celorocní)', N'http://www.skiresort.cz', 351, N'Ctyrsedacková lanová dráha s celorocním provozem.', N'https://www.hkregion.cz/galerie/obrazky/imager.php?img=763854&x=4000&y=2672&hash=ea783d06f17bcdf5469ff90c20965401&ratio=1')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (117, N'Sedacková lanovka Rícky v Orlických horách (celorocní)', N'http://www.skiricky.cz', 352, N'Ctyrsedacková lanovka z Rícek na vrch Zakletý (992 m n. m).', N'https://www.hkregion.cz/galerie/764485_800_534.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (118, N'Kabinová lanovka Pec pod Snežkou - Ružová hora - Snežka (celorocní)', N'http://www.snezkalanovka.cz', 353, N'Tradicní dvousedacková lanovka vyvážela celorocne turisty od roku 1949 až do zárí roku 2012, kdy byl její provoz ukoncen. Za tuto dobu lanovku navštívilo na 20 milionu turistu a na vrchol Snežky vyvezla více než 7,2 miliónu cestujících. Od 21. 12. 2013 je po celkové rekonstrukci v provozu nová kabinová lanovka.', N'https://www.hkregion.cz/galerie/489210.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (119, N'Sedacková lanovka Herlíkovice - Žalý', N'http://www.herlikovice.cz', 354, N'Ctyrsedacková lanovka s letním i zimním provozem pod rozhlednu Žalý.', N'https://cdn.kudyznudy.cz/files/73/7312c35b-ae3a-4562-ba1b-aec7f8b9f46c.webp?v=20230824084314')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (120, N'Sedacková lanovka Vrchlabí – Knežický Espres (zimní)', N'http://www.skivrchlabi-knezice.cz', 355, N'Ctyrsedacková lanová dráha se zimním provozem.', N'http://m-old.cesky-raj.info/galerie/1186037_280_280_4.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (121, N'Sedacková lanovka Vrchlabí - Kebrlák', N'http://www.skiareal-vrchlabi.cz', 356, N'Lanová dráha Kejnos se zimním i letním provozem.', N'https://www.hkregion.cz/galerie/1186040.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (122, N'Sedacková lanovka Mladé Buky - Pekelský vrch (zimní)', N'http://www.areal-mladebuky.cz/cs/sjezdovky-a-vleky', 357, N'Trojsedacková lanová dráha se zimním provozem.', N'http://www.chci-lyzovat.cz/galerie/1042022_280_280_4.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (123, N'Sedacková lanovka Cerný Dul - Špicák, Bönischovy boudy (zimní) - Saxner', N'http://www.skiresort.cz', 358, N'Trojsedacková lanová dráha se zimním provozem. Známá je pod názvem Saxner.', N'https://vcdn.bergfex.at/images/resized/eb/fccb89b4c8a768eb_5e92157ea18318bd@2x.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (124, N'Sedacková lanovka Cerný Dul - Family Express (zimní)', N'http://www.skiresort.cz/skiarealy/cerny-dul', 359, N'Ctyrsedacková lanová dráha se zimním provozem.', N'http://www.hkregion.cz/galerie/1042054_800_534.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (125, N'Sedacková lanovka Herlíkovice - Bubákov (zimní)', N'http://www.bubakov.cz', 360, N'Ctyrsedacková lanová dráha se zimním provozem.', N'https://www.mestohejnice.cz/galerie/920748_300_225.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (126, N'Sedacková lanovka Janské Lázne, Cerná hora – Protež (zimní)', N'http://www.skiresort.cz', 361, N'Ctyrsedacková lanovka se zimním provozem.', N'https://www.regionalniprodukt.cz/galerie/obrazky/image.php?img=777497&x=5473&y=3649')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (127, N'Sedacková lanovka Špindleruv Mlýn – Hromovka (zimní)', N'http://www.skiareal.cz', 362, N'Ctyrsedacková lanová dráha se zimním provozem.', N'https://www.hkregion.cz/galerie/473290.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (128, N'Sedacková lanovka Špindleruv Mlýn – Medvedín (celorocní)', N'http://www.skiareal.cz', 363, N'Ctyrsedacková lanovka vede ze Špindlerova Mlýna na vrchol Medvedín do nadmorské výšky 1235 m.n.m. Medvedín je výchozím bodem mnoha turistických túr a výletu a nabízí dechberoucí výhledy na Krkonoše. Na vrcholu hned vedle horní stanice lanovky jsou dve nádherná detská hrište s originální hracími prvky v podobe obrích písmen tvorících slovo „Medvedín“. Z vrcholu dolu do údolí vedou dve populární naucné stezky - Medvedí stezka a stezka s názvem Špindlmanova mise.', N'https://www.regionalniprodukt.cz/galerie/675002_400_300.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (129, N'Sedacková lanovka Špindleruv Mlýn, Labská – Krausovy boudy (zimní)', N'http://www.skiareal.cz', 364, N'Trísedacková lanová dráha se zimním provozem.', N'https://www.mestohejnice.cz/galerie/1578594_300_169.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (130, N'Sedacková lanovka Svatý Petr – Plán (celorocní)', N'http://www.skiareal.cz', 365, N'Moderní šestisedacková lanovka s bublinou proti neprízni pocasí je od roku 2015 vystavena z puvodní ctyrsedackové z roku 1992. Je v provozu v zimní i letní sezóne. Nabízí prekrásný výhled do údolí Špindlerova Mlýna a pri dobré viditelnosti i do celého kraje. Na vrcholu mají návštevníci možnost obcerstvit se na terase panoramatické restaurace Na Pláni.', N'https://www.mestohejnice.cz/galerie/obrazky/image.php?img=1241523&x=1920&y=1326')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (131, N'Sedacková lanovka Svatý Petr – Plán východ (zimní)', N'http://www.skiareal.cz', 366, N'Ctyrsedacková lanovka se zimním provozem.', N'https://www.mestohejnice.cz/galerie/obrazky/image.php?img=93520&x=356&y=267')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (132, N'Sedacková lanovka Velká Úpa – Portášovy boudy (celorocní)', N'http://www.skiresort.cz', 367, N'Trojsedacková lanová dráha s letním i zimním provozem.', N'https://www.hkregion.cz/galerie/obrazky/imager.php?img=659185&x=5472&y=3648&hash=81bb49b64ff74ea9483d4b08ab2fd431&ratio=1')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (133, N'Sedacková lanovka Deštné v Orlických horách (celorocní)', N'http://www.skicentrumdestne.cz', 368, N'Dvousedacková lanovka z Deštného na Studený vrch.', N'https://www.hkregion.cz/galerie/obrazky/imager.php?img=667609&x=3264&y=2448&hash=4d876132731dc8bd1bcc01265bb9c113&ratio=1')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (134, N'Hora Snežka', N'http://www.horasnezka.cz', 369, N'Nejvyšší hora v Ceské republice, která má tvar trojbokého jehlanu, leží 1603 metru nad morem. Je významnou dominantou východních Krkonoš.', N'https://upload.wikimedia.org/wikipedia/commons/7/73/Janske_Lazne_Cerna_hora_Snezka.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (135, N'Raisova chata s rozhlednou', N'http://www.rozhledny.webzdarma.cz/zvicina.htm', 370, N'Chata se nachází na vrchu Zvicina nedaleko Lázní Belohrad. Byla postavena v roce 1904 na míste bývalého hostince.', N'https://i.ytimg.com/vi/txRJBNcsk5Q/sddefault.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (136, N'Rozhledna Milohlídka - Cerovka', N'http://www.kzmj.cz', 371, N'Zdrsnená výšina Cerovka se nachází na severním okraji Jicína. Na jejím vrcholu byla v roce 1843 vybudována nejstarší vyhlídková vež v Ceském ráji Milohlídka.', N'https://upload.wikimedia.org/wikipedia/commons/3/37/AussichtsturmJicin.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (137, N'Rozhledna Panorama - Cerná hora', N'http://leto.skiresort.cz/letni-aktivity/turistika/rozhledny/', 372, N'Puvodní podpera staré kabinové lanové dráhy z r.1928 slouží od r.1998 jako rozhledna. 21 m vysoká vyhlídková plošina ve výšce 1289 m n.m. nabízí kruhový výhled nejen do kraje, ale i na znacnou cást Krkonoš. Zdarma použitelné dalekohledy.', N'https://upload.wikimedia.org/wikipedia/commons/0/00/Rozhledna_Cerna_Hora2.JPG')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (138, N'Rozhledna Žaltman', N'http://www.icupice.cz', 373, N'Rozhledna Žaltman je jedním z nejznámejších míst Jestrebích hor. Ve výšce 739 m n. m. je postavena železná konstrukce s tocitými schody. Rozhledna byla otevrena v roce 2020 a nahradila puvodní rozhlednu z roku 1967.', N'https://upload.wikimedia.org/wikipedia/commons/d/d2/Rozhledna_%C5%BDaltman.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (139, N'Vyhlídky v Prachovských skalách', N'http://www.prachovskeskaly.com', 374, N'Nekolikakilometrová oblast Prachovských skal nabízí množství vyhlídek.', N'https://eliskahudcova.com/wp-content/uploads/2020/07/DSC_3125-scaled.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (140, N'Zrícenina hradu Veliš', N'http://www.cesky-raj.info/', 375, N'Na Velichove vrchu byl kolem roku 1300 postaven gotický hrad Veliš. Svého casu se jednalo o nejpevnejší hrad v Cechách. Dnes na vrcholku kopce najdeme pouze jeho zríceninu, z níž je krásný výhled na okolní krajinu. ', N'https://foto.turistika.cz/foto/r/450/269940/135471/dji-0663-3-.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (141, N'Valdická brána, Jicín', N'', 376, N'Valdická brána je renesancní stavba, která byla stavena v letech 1568-78 jako soucást mestského opevnení. Poslední patro je pozdne barokní z roku 1768, vrcholek veže s ochozem a stanovou strechou pochází z roku 1840. Je typickou dominantou siluety mesta.', N'https://upload.wikimedia.org/wikipedia/commons/3/30/Ji%C4%8D%C3%ADn%2C_Valdick%C3%A1_br%C3%A1na_-_v%C4%9B%C5%BE_%28Vald%C5%A1tejnovo_n%C3%A1m%C4%9Bst%C3%AD%29.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (142, N'Vrch Zebín', N'', 377, N'Vrch Zebín leží zhruba 2 km severovýchodne od Jicína. Díky svému typickému vzhledu je jednou z dominant celé jicínské kotliny.', N'https://www.jicin.org/sites/default/files/gallery/2021-04/jicin-zebin-05.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (143, N'Renesancní radnice v Hostinném', N'http://hostinne.info/renesancni-radnice-s-obry/d-7084', 378, N'Dominantu ctvercového námestí v Hostinném tvorí na západní strane renesancní radnice s barokne ukoncenou veží a hodinami.', N'https://www.hkregion.cz/galerie/obrazky/imager.php?img=763268&x=2448&y=3264&hash=345a14bc6a8e49e76357da6c4b9135be&ratio=1')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (144, N'Rozhledna na Hnedém vrchu', N'http://www.pecpodsnezkou-velkaupa.cz/cz/leto/rozhledny', 379, N'Rozhledna na Hnedém vrchu je nejvyšší rozhledna v Krkonoších, merí témer 31 metru. Z rozhledny je nádherne viditelné panorama hlavního krkonošského hrebene.', N'https://upload.wikimedia.org/wikipedia/commons/2/24/Hn%C4%9Bd%C3%BD_vrch%2C_rozhledna.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (145, N'Rozhledna Kozinec u Nové Paky', N'http://www.rozhledny.webzdarma.cz/kozinec.htm', 380, N'Rozhledna na kopci Kozinec u Vidochova nedaleko Nové Paky nabízí nádherné výhledy z výšky 33 metru na Krkonoše a Ceský ráj.', N'https://www.heywhatsthat.com/results/QW8P77GQ/cloakmN51E016.png')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (146, N'Vrch Brada', N'http://www.cesky-raj.info/', 381, N'Odpocinkové a vyhlídkové místo nad vsí Brada.', N'https://www.mestohejnice.cz/galerie/obrazky/image.php?img=362908&x=800&y=600')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (147, N'Rozhledna Skuhrov nad Belou', N'http://www.skuhrov.cz', 382, N'Menší drevená rozhledna nad obcí Skuhrov nad Belou.', N'https://903091e03c.clvaw-cdnwnd.com/9d552fc6587ad79bd7e5c58a07a60f07/200025903-77c4f79b8d/rozhledna%20Skuhrov%20nad%20B%C4%9Blou%203.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (148, N'Zrícenina hradu Výrov', N'http://www.novemestonm.cz', 383, N'Hrad byl poprvé písemne pripomínán v roce 1484, kdy jej získal spolu s krcínským panstvím Jan Cerncický z Kácova. Zakladatel ani stavitel není znám.', N'https://upload.wikimedia.org/wikipedia/commons/a/a5/Hrad_V%C3%BDrov%2C_z%C5%99%C3%ADc..jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (149, N'Rozhledna Jiráskova chata, Dobrošov', N'http://www.jiraskovachata.cz', 384, N'Jiráskova chata KCT s nejkrásnejší rozhlednou Královéhradeckého kraje.', N'https://c8.alamy.com/comp/2H2AW65/rozhledna-dobroov-jirskova-chata-msto-nchod-ceska-republika-jirsek-cottage-and-watchtower-dobrosov-near-nachod-town-czech-republic-2H2AW65.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (150, N'Radnicní vež Dobruška', N'http://muzeum.mestodobruska.cz', 385, N'Soucástí budovy renesancní radnice ze 16.století je 45 m vysoká vež, z jejíhož ochozu je výhled nejen na mesto a jeho nejbližší okolí, ale také na panorama Orlických hor, za príznivé viditelnosti i Krkonoše.', N'https://www.hkregion.cz/galerie/obrazky/imager.php?img=414265&x=2805&y=4458&hash=f839af00fa7d1c90a75032f88555bb1c&ratio=1')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (151, N'Vyhlídková vež kostela sv. Jana Krtitele, Dvur Králové n. L.', N'http://svjankrtitel.estranky.cz/clanky/prohlidka.html', 386, N'Gotický kostel byl vystaven na míste puvodního románského kostelíka. Ten byl dvakrát prestaven a rozšíren. Dnešní podobu získal kostel až v 90. letech 19. století. Kostelní vež byla pristavena po rímsu roku 1644 a roku 1894 byla zvýšena na nynejších 64 me', N'https://www.kralovedvorsko.cz/image.php?40813&0')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (152, N'Masarykova vež samostatnosti', N'http://infocentrum.horice.org/o-meste/pamatky/masarykova-vez-samostatnosti', 387, N'Jednou z neprehlédnutelných kulturne - historických památek mesta Horice je Masarykova vež samostatnosti. Je umístena prímo nad mestem na hrebeni Horického chlumu ve výšce 408 m n. m. a vytvárí tak Horicím hezkou a zdaleka viditelnou dominantu.', N'https://cdn.kudyznudy.cz/files/19/19cc6e2c-62e3-46ab-8a47-a224c69883e2.jpg?v=20230920093317')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (153, N'Rozhledna Horický Chlum', N'http://www.infocentrum.horice.org/o-meste/pamatky/rozhledna-horicky-chlum', 388, N'V roce 1998 byla postavena na hrebenu Horického chlumu železná telekomunikacní vež s vyhlídkovou plošinou pro verejnost.', N'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Rozhledna_Ho%C5%99ick%C3%BD_chlum_%2801%29.jpg/1200px-Rozhledna_Ho%C5%99ick%C3%BD_chlum_%2801%29.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (154, N'Bílá vež v Hradci Králové', N'http://www.bilavez.cz', 389, N'Bílá vež je renesancní dominantou mesta Hradec Králové s výškou témer 72 metru. Od 23. kvetna 2015 je znovu otevrena po rozsáhlé rekonstrukci.', N'https://upload.wikimedia.org/wikipedia/commons/f/f0/Hradec_Kr%C3%A1lov%C3%A9%2C_Katedr%C3%A1la_svat%C3%A9ho_Ducha_Dm205706-424_en_de_B%C3%ADl%C3%A1_v%C4%9B%C5%BE_IMG_6831_2018-08-06_09.40.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (155, N'Zámecký ochoz Humprecht', N'http://www.humprecht.cz', 390, N'Po obnove zámku v r.1680 byl na krakorcích vybudován vyhlídkový ochoz, ze kterého je možné spatrit hrady Trosky, Kost a Bezdez, kopce Kozákov a Mužský, masiv Ještedu a Vrátenskou horu na Kokorínsku. Dále Ml.Boleslav, Dolní Bousov a Sobotku.', N'https://m.hkregion.cz/galerie/415283_560_800.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (156, N'Rozhledna na bojišti 1866, Chlum', N'http://www.chlum1866.cz', 391, N'Rozhledna na Chlumu s vyhlídkovou plošinou ve výšce 35 metru.', N'https://www.hradecko.eu/f/photos/4703l.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (157, N'Ruprechtický Špicák', N'http://www.broumovsko.cz', 392, N'Na vrcholu Ruprechtického Špicáku (880 m n. m.), nejvyššího bodu Javorích hor je vybudována celorocne volne prístupná rozhledna s kruhovým výhledem na ceské i polské území – Broumovsko, Krkonoše, Góry Sowie, Góry Stolowe i Orlické hory.', N'https://upload.wikimedia.org/wikipedia/commons/d/d9/Ruprechticky_spicak.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (158, N'Rozhledna Libníkovice', N'http://www.libnikovice.cz/index.php?option=com_content', 393, N'15 metru vysoká rozhledna na okraji obce Libníkovice.', N'https://foto.turistika.cz/foto/r/450/13416/20093/full_2ab97f_f_normalFile1-280320092466.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (159, N'Zámecká vež Náchod', N'http://www.zamek-nachod.cz', 394, N'Velká, 50 m vysoká zámecká vež, byla se svou šírkou 11 m a prumernou tlouštkou zdi 3,5 m nejduležitejším obranným prvkem stredovekého hradu.', N'https://www.zamek-nachod.cz/pamatky/nachod/fotogalerie/prohlidkove-okruhy-stare/5_vez-sklepy-terasa/pohled-z-ochozu-veze-na-nachod.jpg')
GO
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (160, N'Zámecká vež Máselnice, Nové Mesto nad Metují', N'http://www.zameknm.cz', 395, N'Zámecká vež Máselnice získala svuj název  práve proto, že se podobá máselnici, nádobe, sloužící k výrobe másla stloukáním.', N'http://www.zameknm.cz/userfiles/_vezmaselnice/017.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (161, N'Šmídova vyhlídka', N'http://www.kudyznudy.cz/aktivity/smidova-vyhlidka-nad-strmou-strani-v-krkonosich', 396, N'Nachází se nad Strmou strání, pri ceste z Medvedína na Zlaté návrší.', N'https://d34-a.sdn.cz/d_34/d_15120385/img/33/1600x1116_HlQoYt.jpg?fl=cro,0,86,1600,900%7Cres,400,225,3')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (162, N'Památník Generála Gablenze', N'http://www.krkonose.eu/pamatnik-generala-gablenze', 397, N'17 m vysoká rozhledna, postavena v roce 1868, leží v nadmorské výšce 509 m.', N'https://upload.wikimedia.org/wikipedia/commons/2/26/Trutnov%2C_%C5%A0iben%C3%ADk%2C_pam%C3%A1tn%C3%ADk_gener%C3%A1la_Gablenze.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (163, N'Vyhlídka na Jehlickém kopci', N'', 398, N'Vyhlídkové místo na Jehlickém kopci, kde kdysi stávala turistická chata.', N'https://www.hradecko.eu/f/photos/1813l.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (164, N'Žižkuv stul', N'', 399, N'Návrší s výhledem do okolí, ctyrmi lípami a pomníkem', N'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Tvrzi%C5%A1t%C4%9B_%C5%BDi%C5%BEk%C5%AFv_st%C5%AFl_u_obce_B%C3%ADl%C3%BD_K%C5%AF%C5%88_01.jpg/1200px-Tvrzi%C5%A1t%C4%9B_%C5%BDi%C5%BEk%C5%AFv_st%C5%AFl_u_obce_B%C3%ADl%C3%BD_K%C5%AF%C5%88_01.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (165, N'Rozhledna na Anenském vrchu', N'http://www.orlickehory.net/mista/anensky.htm', 400, N'17 metru vysoká drevená rozhledna na Anenském vrchu v Orlických horách postavená ze dreva z porostu v oblasti Rychnova nad Knežnou.', N'http://www.outdoortipy.cz/wp-content/uploads/2018/05/rozhledna-na-Anensk%C3%A9m-vrchu.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (166, N'Rozhledna Vrbice', N'http://www.vrbice.info/rozhledna-2/', 401, N'Drevená rozhledna s ocelovým schodištem byla slavnostne otevrena 15.4. 2006.', N'https://www.infoglobe.cz/res/archive/1241/141739.jpg?seek=1606397088')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (167, N'Vyhlídka na Farském kopci', N'http://www.info.rokytnice.cz', 402, N'Vyhlídka na budove bývalé vodárny.', N'https://903091e03c.clvaw-cdnwnd.com/9d552fc6587ad79bd7e5c58a07a60f07/200030422-73150740fc/Vyhl%C3%ADdka%20na%20Farsk%C3%A9m%20kopci%204.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (168, N'Rozhledna Osicina u Vojenic', N'http://www.osicina.cz', 403, N'Nad zalesneným údolím Drízna je na vrcholu kopce Osicina (416 m n.m.) telekomunikacní vež s vyhlídkovou plošinou ve výšce 33 m.', N'https://rozhledny.webzdarma.cz/osicina40.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (169, N'Rozhledna Milír u Vysoké nad Labem', N'http://www.vysoka-nad-labem.cz/rozhledna-milir', 404, N'Ve Vysoké nad Labem po 65 letech opet stojí rozhledna. Nabízí výhled na nejvyšší budovy Hradce Králové, Kolibu, Kunetickou Horu a Chlum. Za jasného pocasí lze spatrit Krkonoše, Orlické a Železné hory. Rozhledna stojí v nejvyšším bode kopce Milír, nadmorsk', N'https://upload.wikimedia.org/wikipedia/commons/4/44/Rozhledna_Mil%C3%AD%C5%99.JPG')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (170, N'Rozhledna Cáp', N'http://broumovsko.cz/cs/rozhledna-na-capu', 405, N'Rozhledna Cáp byla postavena na stejnojmenném vrcholu Adršpašsko-teplických skal (786 m n.m.) ležícím asi 3 km jihozápadne od obce Teplice nad Metují.', N'https://upload.wikimedia.org/wikipedia/commons/1/13/Rozhledna_na_%C4%8C%C3%A1pu.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (171, N'Rozhledna Eliška', N'http://www.stachelberg.cz/rozhledna', 406, N'Rozhledna Eliška byla vybudována v roce 2014 a nachází se v nadmorské výšce 632 metru v areálu delostrelecké tvrze Stachelberg.', N'https://upload.wikimedia.org/wikipedia/commons/1/18/Rozhledna_Eli%C5%A1ka_02.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (172, N'Rozhledna Na Signálu', N'http://rozhledny2.webzdarma.cz/signal.htm', 407, N'Rozhledna se nachází na vrchu Signál poblíž obce Horní Radechová, místní cásti Slavíkov v nadmorské výšce 500 m n. m.', N'https://upload.wikimedia.org/wikipedia/commons/2/25/Rozhled_na_Sign%C3%A1lu.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (173, N'Rozhledna Žernov', N'', 408, N'Rozhledna stojí v katastru obce Žernov, ve výšce 375 m nad morem.', N'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Rozhledna_%28%C5%BDernov%29.jpg/576px-Rozhledna_%28%C5%BDernov%29.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (174, N'Rozhledna na Markoušovickém hrebeni', N'', 409, N'Rozhledna stojí na nejvyšším míste Markoušovického hrebenu v Jestrebích horách ve výšce 708 m n. m. cca 2 km severne od obce Markoušovice.', N'https://upload.wikimedia.org/wikipedia/commons/5/5f/Slav%C4%9Bt%C3%ADnsk%C3%A1_rozhledna.JPG')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (175, N'Rýzmburský altán', N'', 410, N'Altán nechal v roce 1798 postavit na míste rýzmburského hradu majitel náchodského panství, vévoda Petr Kuronský, otec Kateriny Vilemíny Zahanské.', N'https://upload.wikimedia.org/wikipedia/commons/a/a4/R%C3%BDzmbursk%C3%BD_alt%C3%A1n_04.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (176, N'Rozhledna Sendraž', N'http://www.sendraz.cz', 411, N'Na kopci Varta již v minulosti stávala drevená rozhledna. Byla vybudována na prelomu 19. a 20. století, ale v 50. letech 20. století však musela být vzhledem k havarijnímu stavu zborena. Rozhledna byla opet postavena v roce 2007 telekomunikacní firmou, zp', N'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Rozhledna_Sendra%C5%BE.jpg/1200px-Rozhledna_Sendra%C5%BE.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (177, N'Stezka korunami stromu Krkonoše', N'http://www.stezkakrkonose.cz', 412, N'Stezka korunami stromu v Janských Lázních nabízí návštevníkum procházku v celkové délce 1 511 metru, která je zavede ke korunám stromu, ale i k jejich korenum. Na stezce vystoupáte až do výšky 45 metru a vychutnáte si výhledy na tri svetové strany – jih, ', N'https://upload.wikimedia.org/wikipedia/commons/f/f5/Janske_Lazne_SKS_5.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (178, N'Rozhledna na Velké Deštné', N'http://www.stezkakrkonose.cz', 413, N'Vyhlídková vež stojí na nejvyšším vrcholu Orlických hor ve výšce 1115 m n. m. Rozhledna byla slavnostne otevrena 26. 10. 2019.', N'https://upload.wikimedia.org/wikipedia/commons/e/e8/Rozhledna_na_Velk%C3%A9_De%C5%A1tn%C3%A9.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (179, N'Rozhledna na Feistove kopci', N'http://www.olesnice.net', 414, N'Rozhledna na Feistove kopci nad Olešnicí v Orlických horách byla otevrena v roce 2020 v rámci projektu \"cesko-polské Hrebenovky\".', N'https://www.hkregion.cz/galerie/obrazky/imager.php?img=1522889&x=3911&y=5867&hash=5bba0fa5756c27d4d6b939a66171c36c&ratio=1')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (180, N'Rozhledna Vysoká Srbská', N'http://www.vysokasrbska.cz', 415, N'Rozhledna se nachází na vrchu nad obcí Vysoká Srbská nedaleko Hronova a byla postavena v roce 2020.', N'https://cdn.kudyznudy.cz/files/89/89b01793-4d19-4c3a-bbaf-9f3c34ecdf60.jpg?v=20230919233104')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (181, N'Rozhledna na vrchu Šibeník u Nového Hrádku', N'http://www.vysokasrbska.cz', 416, N'Rozhledna vznikla v roce 2020 prestavbou tubusu bývalé vetrné elektrárny. Z vyhlídkové plošiny ve výšce 32 metru nad zemí budou mají návštevníci krásný rozhled na hrebeny Orlických hor, Krkonoš i na Polabskou nížinu.', N'https://hradecka.drbna.cz/files/drbna/images/page/2020/02/24/size3-15825321676971-207-stranky-fotky-353.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (182, N'Rozhledna Kosice', N'http://www.turistika.cz/vylety/rozhledna-kosice/detail', 417, N'Tato drevená rozhledna se nachází na konci pomerne rozsáhlého soukromého, ale verejnosti prístupného parku s dvema rybníky.', N'https://cdn.kudyznudy.cz/files/b4/b4bb29c7-5fc5-4d8f-89ae-ed7c117b8c67.jpg?v=20230921230730')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (183, N'Zámek Detenice', N'http://www.detenice.cz', 418, N'Zámek Detenice se nachází asi 70 km severovýchodne od Prahy, na okraji Ceského ráje.', N'https://upload.wikimedia.org/wikipedia/commons/3/37/Detenice_zamek.JPG')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (184, N'Valdštejnský zámek, Jicín', N'http://www.muzeumhry.cz', 419, N'Zámek v Jicíne byl vystaven po roce 1608, o 12 let pozdeji po výbuchu vyhorel a byl težce poškozen. Za Albrechta z Valdštejna byl roku 1633 znovu vystaven v barokním stylu.', N'https://upload.wikimedia.org/wikipedia/commons/e/e2/Wallenstein%27s_Palace_in_Ji%C4%8D%C3%ADn_-_panoramio.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (185, N'Zámek Jicíneves', N'http://www.schlik.eu', 420, N'Zámek v Jicínevsi dal postavit František Josef Schlik, nedaleko puvodní tvrze. Jednalo se o barokní trípatrový zámek ctvercového pudorysu.', N'https://www.jicineves.cz/image.php?nid=15630&oid=5378834&width=700')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (186, N'Zámek Kopidlno', N'http://www.zahradnicka-skola-kopidlno.cz/', 421, N'Zámek se zámeckým parkem a rybníkem.', N'https://upload.wikimedia.org/wikipedia/commons/4/4a/Z%C3%A1mek_Kopidlno.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (187, N'Zámek Lázne Belohrad', N'http://www.lazne-belohrad.cz/mesto/atraktivni-mista/zamek/', 422, N'Puvodní drevená tvrz Koštofrank byla prestavena na kamennou tvrz. Pozdeji nechal Vilém z Valdštejna celou tvrz od základu prestavet v barokní zámek. ', N'https://upload.wikimedia.org/wikipedia/commons/b/bb/L%C3%A1zn%C4%9B_B%C4%9Blohrad_-_z%C3%A1mek.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (188, N'Zámek Castolovice', N'http://www.zamek-castolovice.cz', 423, N'Soukromý renesancní zámek Castolovice je ve vlastnictví Diany Phipps Sternbergové, která také dohlíží na jeho provoz.

Zámek leží ve východních Cechách na soutoku rek Belé a Knežny vedle silnice c.11 mezi Hradcem Králové a Rychnovem nad Knežnou.', N'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=551181017037964')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (189, N'Zámek Karlova Koruna, Chlumec nad Cidlinou', N'http://www.karlovakoruna-zamek.cz', 424, N'Zámek Karlova Koruna byl vybudován na návrší a dominuje chlumecké krajine.', N'https://upload.wikimedia.org/wikipedia/commons/2/21/Chlumec_-_Karlova_koruna.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (190, N'Zámek Ratiborice', N'http://www.zamek-ratiborice.cz', 425, N'Národní kulturní památka, známá díky dílu „Babicka“ jako sídlo vévodkyne Zahánské.', N'https://upload.wikimedia.org/wikipedia/commons/9/98/Ratibo%C5%99ice_castle_main_building_back.JPG')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (191, N'Zámek Doudleby nad Orlicí', N'http://www.zamek-doudleby.cz', 426, N'Malé venkovské šlechtické sídlo bylo prestaveno v letech 1585 - 1590 na míste stredoveké tvrze Mikulášem z Bubna a Litic na renesancní zámek ctvercového pudorysu s bohatou sgrafitovou výzdobou.', N'https://upload.wikimedia.org/wikipedia/commons/f/f8/Doudleby_nad_Orlic%C3%AD%2C_z%C3%A1mek.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (192, N'Zámek Kvasiny', N'http://www.zamek-kvasiny.cz', 427, N'Trojkrídlý klasicistní zámek byl postaven koncem 17. století na míste bývalé tvrze na ostrohu nad rekou Belou.', N'https://upload.wikimedia.org/wikipedia/commons/5/55/Kvasiny_z%C3%A1mek.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (193, N'Zámek Opocno', N'http://www.zamek-opocno.cz', 428, N'Areál opocenského zámku je jedinecným souborem památek dokládajících zpusob života, vkus i myšlení cásti ceské spolecnosti v prubehu peti století. V zámku obklopeném prírodne krajinárským parkem jsou dochovány historické interiéry s bohatými sbírkami obra', N'https://www.zamek-opocno.cz/pamatky/opocno/fotogalerie/2023-o-zamku/zamek1.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (194, N'Zámek Potštejn', N'http://www.zamekpotstejn.cz', 429, N'Barokní zámek byl postaven v letech 1749 – 1755 podle vlastního návrhu hrabete Chamaré, jako náhrada za starý zpustlý hrad.', N'https://upload.wikimedia.org/wikipedia/commons/2/2c/Z%C3%A1mek_Pot%C5%A1tejn.JPG')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (195, N'Zámek Bílé Policany', N'http://www.hotelzamekbilepolicany.cz', 430, N'Zámek se nachází v malebné vesnici Bílé Policany, 3 km od Miletína  a 9 km od Dvora Králové.', N'https://cdn.kudyznudy.cz/files/7f/7f3376d2-2ef9-48a2-aebb-10faa9582cba.jpg?v=20210616160419')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (196, N'Zámek Borohrádek', N'http://www.mestoborohradek.cz', 431, N'Empírový zámek, který vznikl v letech 1816 - 1820 prestavbou panského renesancního domu.', N'https://cdn.kudyznudy.cz/files/28/288568d5-1296-4876-8783-d7a5dc21d926.jpg?v=20200830095817')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (197, N'Zámek Rokytnice v Orlických horách', N'http://www.zamek-rokytnice.cz', 432, N'Rane barokní zámek na východní strane námestí, s nádvorím a pilírovými arkádami vybudovaný v 2. pol. 16. st. puvodne jako pozdne renesancní, na míste nekdejší vodní tvrze.', N'https://upload.wikimedia.org/wikipedia/commons/4/4f/Z%C3%A1mek_Rokytnice_v_Orlick%C3%BDch_hor%C3%A1ch.JPG')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (198, N'Zámek Barchov', N'http://www.zamekbarchov.cz', 433, N'Zámek Barchov je barokní zámek postavený v roce 1733 královéhradeckým hejtmanem baronem Kryštofem Norbertem Voracickým z Pabenic (1690 - 1756). Nachází se v obci Barchov na ceste mezi Hradcem Králové a Novým Bydžovem.', N'https://upload.wikimedia.org/wikipedia/commons/d/d5/Pohled_na_z%C3%A1mek_Barchov_s_opravenou_fas%C3%A1dou_02.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (199, N'Zámek Sloupno', N'http://www.sloupno.eu', 434, N'Barokní zámek Sloupno se nachází ve stejnojmenné obci nedaleko Nového Bydžova.', N'https://upload.wikimedia.org/wikipedia/commons/3/3b/Sloupno01.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (200, N'Zámek Nové Mesto nad Metují', N'http://www.zameknm.cz', 435, N'Národní kulturní památka. Zámek, založený r. 1501, je soucástí mestské památkové rezervace.', N'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/de/9e/de/20180503-131835-largejpg.jpg?w=1200&h=-1&s=1')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (201, N'Nový zámek Kostelec nad Orlicí', N'http://www.zamekkostelecno.cz', 436, N'Empírový zámek postavený v letech 1829-1833 patrící rodine Kinských, byl v  roce 2011 poprvé ve své historii zprístupnen verejnosti.', N'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100063493275835')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (202, N'Zámek Humprecht', N'http://www.humprecht.cz', 390, N'Zámek Humprecht tvorí zajímavou dominantu krajiny v okolí Sobotky.', N'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/76/95/a0/zamek-humprecht-2018.jpg?w=1200&h=-1&s=1')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (203, N'Zámek Silbersteinu', N'http://www.zamekrudnik.cz', 437, N'Zámek nechal postavit v 30. letech 19. st. Josef Karel Theer ze Silbersteinu. V roce 1858 byl prestaven v novogotickém slohu. Jedná se o dvoupatrovou dvoukrídlou budovu s polygonální veží.', N'http://krkonoseeu.sitour.cz/deskline_image.php?imgid=c5936263-4f2b-4806-9ca0-eba87141845e&maxw=800&maxh=600')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (204, N'Zámek Hrádek u Nechanic', N'http://www.zamek-hradekunechanic.cz', 438, N'Zámek Hrádek u Nechanic je jednou z nejvýznamnejších staveb období romantismu na území Ceské republiky.', N'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Z%C3%A1mek_Hr%C3%A1dek_u_Nechanic_dron_JV.jpg/1200px-Z%C3%A1mek_Hr%C3%A1dek_u_Nechanic_dron_JV.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (205, N'Zámek Adršpach', N'http://www.zamekadrspach.cz', 439, N'Barokní zámek Adršpach nabízí služby Regionálního informacního centra a predevším pak horolezecké muzeum.', N'https://upload.wikimedia.org/wikipedia/commons/4/49/Adrspach_z%C3%A1mek.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (206, N'Hospitál Kuks', N'http://www.hospital-kuks.cz', 440, N'Národní kulturní památka. Unikátní barokní komplex bývalých lázní, hospitálu s kostelem Nejsvetejší Trojice a puvodní lékárnou, byl založený koncem 17. století Františkem Antonínem Šporkem.', N'https://www.hospital-kuks.cz/pamatky/hospital-kuks/fotogalerie/Pruceli/image-thumb__47339__newsThumbnailImage/kuks-svitani-1.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (207, N'Zámek Kamenice', N'http://www.konecchlumi-obec.cz/zamek-kamenice', 441, N'Zámek Kamenice leží na severním okraji vsi na návrší nad Konecchlumím, 9 km jihovýchodne od Jicína.', N'https://upload.wikimedia.org/wikipedia/commons/4/49/Kamenice_zamek_od_sv.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (208, N'Zámek Mladejov', N'http://www.zamekmladejov.cz', 442, N'Puvodní tvrz pochází z roku 1358, nynejší stavba je barokní z 18. století. Pseudobarokní fasáda od N. Nováka a pochází z roku 1913. ', N'https://upload.wikimedia.org/wikipedia/commons/1/1d/Zamek_Mladejov_03-2018-dron.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (209, N'Hrad a zámek Staré Hrady u Jicína', N'http://www.starehrady.cz', 443, N'Zážitkový výlet pro deti i dospelé do pohádek carodeje Archibalda I.', N'https://upload.wikimedia.org/wikipedia/commons/b/b8/Z%C3%A1mek_Star%C3%A9_Hrady_2.JPG')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (210, N'Zámek Vrchlabí', N'http://www.mestovrchlabi.cz', 444, N'Prirozeným centrem Vrchlabí je malebný renesancní zámek obklopený parkem. Byl vybudován na míste puvodní gotické tvrze dulním podnikatelem Kryštofem Gendorfem v polovine 16. století.', N'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Vrchlab%C3%AD_z%C3%A1mek_2.jpg/1200px-Vrchlab%C3%AD_z%C3%A1mek_2.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (211, N'Zámek Smirice', N'http://www.mestosmirice.cz/zamek/d-1073', 445, N'Zámek byl postaven na míste tvrze uprostred mesta ve 2. polovine 17. století.', N'https://upload.wikimedia.org/wikipedia/commons/f/f3/Smi%C5%99ice_01.JPG')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (212, N'Zámek Náchod', N'http://www.zamek-nachod.cz', 446, N'Národní kulturní památka. Rozlehlý zámek stojící na skalnatém kopci nad mestem.', N'https://upload.wikimedia.org/wikipedia/commons/3/38/Castle_of_N%C3%A1chod_telephoto_02.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (213, N'Zámek Rychnov nad Knežnou', N'http://www.zamekrychnov.cz', 447, N'Zámek rodu Kolowratu. Rane barokní zámek s kostelem Nejsvetejší Trojice, zvonicí, jízdárnou a zámeckým parkem patrí k nejkrásnejším v Cechách.', N'https://upload.wikimedia.org/wikipedia/commons/0/0b/Rychnov_nad_Kn%C4%9B%C5%BEnou%2C_z%C3%A1mek.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (214, N'Zámek Skalka', N'http://www.podbrezi.cz', 448, N'Puvodne opevnené renesancní sídlo Mladotu ze Solopysk z konce 16. století, postavené na míste gotické tvrze, které bylo prestaveno v letech 1736 - 1739 na barokní zámek.', N'https://upload.wikimedia.org/wikipedia/commons/a/a0/Z%C3%A1mek_Skalka_v_Podb%C5%99ez%C3%AD.jpg')
INSERT [dbo].[Place] ([PlaceID], [Name], [Web], [AddressID], [Description], [ImageUrl]) VALUES (215, N'Zámek Cerekvice nad Bystricí', N'http://www.cerekvice.cz/pamatky', 449, N'Zámek stojí na míste puvodní gotické tvrze, v 16. století byla tvrz rozšírena a v polovine 18. století prestavena na barokní zámek.', N'https://upload.wikimedia.org/wikipedia/commons/7/76/Z%C3%A1mek_Cerekvice_nad_Byst%C5%99ic%C3%AD%2C.JPG')
SET IDENTITY_INSERT [dbo].[Place] OFF
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_Place] FOREIGN KEY([PlaceID])
REFERENCES [dbo].[Place] ([PlaceID])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_Place]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_User]
GO
ALTER TABLE [dbo].[Place]  WITH CHECK ADD  CONSTRAINT [FK_Place_Address] FOREIGN KEY([AddressID])
REFERENCES [dbo].[Address] ([AddressID])
GO
ALTER TABLE [dbo].[Place] CHECK CONSTRAINT [FK_Place_Address]
GO
ALTER TABLE [dbo].[UserOnPlace]  WITH CHECK ADD  CONSTRAINT [FK_UserOnPlace_Place] FOREIGN KEY([PlaceID])
REFERENCES [dbo].[Place] ([PlaceID])
GO
ALTER TABLE [dbo].[UserOnPlace] CHECK CONSTRAINT [FK_UserOnPlace_Place]
GO
ALTER TABLE [dbo].[UserOnPlace]  WITH CHECK ADD  CONSTRAINT [FK_UserOnPlace_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO
ALTER TABLE [dbo].[UserOnPlace] CHECK CONSTRAINT [FK_UserOnPlace_User]
GO
