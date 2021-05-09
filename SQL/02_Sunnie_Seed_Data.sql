USE [Sunnie];
GO

set identity_insert [UserProfile] on
insert into UserProfile (Id, FirebaseId, Email, FirstName, LastName, CreateDateTime, Age, ImageLocation, SkinTypeId) 
values (1, 'zt6rwpgkzxgLcnQ7A4eQngTYC7C2', 'ronnieboy@gmail.com', 'Hotrod', 'Ronnie', '2021-05-01', 52,'https://i.ytimg.com/vi/ogPov_151FQ/maxresdefault.jpg', 6);
insert into UserProfile (Id, FirebaseId, Email, FirstName, LastName, CreateDateTime, Age, ImageLocation, SkinTypeId) 
values (2, 'XSWDsGL19oVPJc33cpmDwo1tBd53', 'todd@gmail.com', 'Todd', 'Toad', '2021-05-02', 4,'https://miro.medium.com/max/1200/1*rBYjncF8yqkDjTtzJmjYiA.jpeg', 1);
set identity_insert [UserProfile] off

-- All skin types
set identity_insert [SkinType] on
insert into SkinType (Id, TypeDescription, Minimum, Maximum) values (1, 'Skin Type 1', 0, 6);
insert into SkinType (Id, TypeDescription, Minimum, Maximum) values (2, 'Skin Type 2', 7, 13);
insert into SkinType (Id, TypeDescription, Minimum, Maximum) values (3, 'Skin Type 3', 14, 20);
insert into SkinType (Id, TypeDescription, Minimum, Maximum) values (4, 'Skin Type 4', 21, 27);
insert into SkinType (Id, TypeDescription, Minimum, Maximum) values (5, 'Skin Type 5', 28, 34);
insert into SkinType (Id, TypeDescription, Minimum, Maximum) values (6, 'Skin Type 6', 35, 40);
set identity_insert [SkinType] off


-- Answers and the score of each response
set identity_insert [Freckles] on
insert into Freckles (Id, Answer, Score) values (1, 'Many', 0);
insert into Freckles (Id, Answer, Score) values (2, 'Several', 1);
insert into Freckles (Id, Answer, Score) values (3, 'A few', 2);
insert into Freckles (Id, Answer, Score) values (4, 'Very few', 3);
set identity_insert [Freckles] off


set identity_insert [HairColor] on
insert into HairColor (Id, Answer, Score) values (1, 'Red or light blonde', 0);
insert into HairColor (Id, Answer, Score) values (2, 'Blonde', 1);
insert into HairColor (Id, Answer, Score) values (3, 'Dark blonde or light brown', 2);
insert into HairColor (Id, Answer, Score) values (4, 'Dark brown', 3);
insert into HairColor (Id, Answer, Score) values (5, 'Black', 4);
set identity_insert [HairColor] off


set identity_insert [EyeColor] on
insert into EyeColor (Id, Answer, Score) values (1, 'Light blue, light gray, or light green', 0);
insert into EyeColor (Id, Answer, Score) values (2, 'Hazel or light brown', 2);
insert into EyeColor (Id, Answer, Score) values (3, 'Dark brown', 3);
insert into EyeColor (Id, Answer, Score) values (4, 'Brownish black', 4);
set identity_insert [EyeColor] off

set identity_insert [SkinColor] on
insert into SkinColor (Id, Answer, Score) values (1, 'Ivory white', 0);
insert into SkinColor (Id, Answer, Score) values (2, 'Fair or pale', 1);
insert into SkinColor (Id, Answer, Score) values (3, 'Fair to beige, with golden undertone', 2);
insert into SkinColor (Id, Answer, Score) values (4, 'Olive or light brown', 3);
insert into SkinColor (Id, Answer, Score) values (5, 'Dark brown or black', 4);
set identity_insert [SkinColor] off

set identity_insert [SkinTan] on
insert into SkinTan (Id, Answer, Score) values (1, 'Never, I always burn', 0);
insert into SkinTan (Id, Answer, Score) values (2, 'Rarely', 1);
insert into SkinTan (Id, Answer, Score) values (3, 'Sometimes', 2);
insert into SkinTan (Id, Answer, Score) values (4, 'Often', 3);
insert into SkinTan (Id, Answer, Score) values (5, 'Always', 4);
set identity_insert [SkinTan] off

set identity_insert [SunBurn] on
insert into SunBurn (Id, Answer, Score) values (1, 'Always burns, blisters and peels', 0);
insert into SunBurn (Id, Answer, Score) values (2, 'Often burns, blisters and peels', 1);
insert into SunBurn (Id, Answer, Score) values (3, 'Burns somewhat', 2);
insert into SunBurn (Id, Answer, Score) values (4, 'Burns rarely, if at all', 3);
insert into SunBurn (Id, Answer, Score) values (5, 'Never burns', 4);
set identity_insert [SunBurn] off

set identity_insert [SunSensitivity] on
insert into SunSensitivity (Id, Answer, Score) values (1, 'Very sensitive', 0);
insert into SunSensitivity (Id, Answer, Score) values (2, 'Sensitive', 1);
insert into SunSensitivity (Id, Answer, Score) values (3, 'Normal', 2);
insert into SunSensitivity (Id, Answer, Score) values (4, 'Resistant', 3);
insert into SunSensitivity (Id, Answer, Score) values (4, 'Very resistant/Never had a problem', 4);
set identity_insert [SunSensitivity] off

set identity_insert [DeepTan] on
insert into DeepTan (Id, Answer, Score) values (1, 'Not at all or very little', 0);
insert into DeepTan (Id, Answer, Score) values (2, 'Lightly', 1);
insert into DeepTan (Id, Answer, Score) values (3, 'Moderately', 2);
insert into DeepTan (Id, Answer, Score) values (4, 'Deeply', 3);
insert into DeepTan (Id, Answer, Score) values (5, 'My skin is naturally dark', 4);
set identity_insert [DeepTan] off

-- Types of Products
set identity_insert [ProductType] on
insert into ProductType (Id, ProductType) values (1, 'Hat');
insert into ProductType (Id, ProductType) values (2, 'Sunglasses');
insert into ProductType (Id, ProductType) values (3, 'Clothing');
insert into ProductType (Id, ProductType) values (4, 'Lip Balm');
insert into ProductType (Id, ProductType) values (5, 'Makeup');
insert into ProductType (Id, ProductType) values (6, 'Sunscreen Lotion');
insert into ProductType (Id, ProductType) values (7, 'Sunscreen Cream');
insert into ProductType (Id, ProductType) values (8, 'Sunscreen Gel');
insert into ProductType (Id, ProductType) values (9, 'Sunscreen Oil');
insert into ProductType (Id, ProductType) values (10, 'Sunscreen Spray');
insert into ProductType (Id, ProductType) values (11, 'Sunscreen Powder');
set identity_insert [ProductType] off

USE [Sunnie];
GO
-- Products
set identity_insert [Product] on
insert into Product (Id, UserProfileId, CreateDateTime, [Name], ImageLocation, ProductTypeId, Spf, Comment) 
values (1, 2, '2021-05-02', 'SuperGoop! PLAY Everyday Lotion', 'https://media.dermstore.com/catalog/501690/300x300/61778.jpg', 6, 50, 'The holy grail favorite for all toads');

insert into Product (Id, UserProfileId, CreateDateTime, [Name], ImageLocation, ProductTypeId, Spf, Comment) 
values (2, 2, '2021-05-02', 'Straw Hat', 'https://www.refinery29.com/images/9897548.png?crop=3000%2C1576%2Cx0%2Cy1031', 1, 0,'Keeps the sun out');
set identity_insert [Product] off


--Favorite
set identity_insert [Favorite] on
insert into Favorite (Id, ProductId, UserProfileId)
values (1,1,2);
set identity_insert [Favorite] off

-- Product User
set identity_insert [ProductUser] on
insert into ProductUser (Id, UserProfileId, ProductId, IsLiked)
values (1, 2, 1, 0);
set identity_insert [ProductUser] off

-- UV Level
USE [Sunnie];
GO
set identity_insert [UVLevel] on
insert into UVLevel (Id, [Name], Color, UVLevel) values (1, 'Low', 'Green', 0);
insert into UVLevel (Id, [Name], Color, UVLevel) values (2, 'Low', 'Green', 1);
insert into UVLevel (Id, [Name], Color, UVLevel) values (3, 'Low', 'Green', 2);
insert into UVLevel (Id, [Name], Color, UVLevel) values (4, 'Low', 'Green', 3);
insert into UVLevel (Id, [Name], Color, UVLevel) values (5, 'Moderate', 'Yellow', 4);
insert into UVLevel (Id, [Name], Color, UVLevel) values (6, 'Moderate', 'Yellow', 5);
insert into UVLevel (Id, [Name], Color, UVLevel) values (7, 'Moderate', 'Yellow', 6);
insert into UVLevel (Id, [Name], Color, UVLevel) values (8, 'High', 'Orange', 7);
insert into UVLevel (Id, [Name], Color, UVLevel) values (9, 'High', 'Orange', 8);
insert into UVLevel (Id, [Name], Color, UVLevel) values (10, 'Very High', 'Red', 9);
insert into UVLevel (Id, [Name], Color, UVLevel) values (11, 'Very High', 'Red', 10);
insert into UVLevel (Id, [Name], Color, UVLevel) values (12, 'Extreme', 'Purple', 11);
insert into UVLevel (Id, [Name], Color, UVLevel) values (13, 'Extreme', 'Purple', 12);
set identity_insert [UVLevel] off

-- Precautions
USE [Sunnie];
GO
set identity_insert [Precaution] on
insert into Precaution (Id, SkinTypeId, UVLevelId, Precaution)
values
(1, 1, 1, 'OINK'),
(2, 1, 13, 'OSDNFISDF');
set identity_insert [Precaution] off




