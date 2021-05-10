USE [Sunnie];
GO
-- Products
set identity_insert [Product] on
insert into Product (Id, UserProfileId, CreateDateTime, [Name], ImageLocation, ProductTypeId, Spf, Comment) 
values (1, 2, '2021-05-02', 'SuperGoop! PLAY Everyday Lotion', 'https://media.dermstore.com/catalog/501690/300x300/61778.jpg', 6, 50, 'The holy grail favorite for all toads');

insert into Product (Id, UserProfileId, CreateDateTime, [Name], ImageLocation, ProductTypeId, Spf, Comment) 
values (2, 2, '2021-05-02', 'Straw Hat', 'https://www.refinery29.com/images/9897548.png?crop=3000%2C1576%2Cx0%2Cy1031', 1, 0,'Keeps the sun out');
set identity_insert [Product] off
