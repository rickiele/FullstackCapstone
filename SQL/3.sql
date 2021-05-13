USE [Sunnie];
GO
set identity_insert [Favorite] on
INSERT INTO Favorite (Id, ProductId, UserProfileId)
VALUES 
(1, 3, 1),
(2, 4, 1),
(3, 8, 2),
(4, 14, 2),
(5, 15, 15),
(6, 16, 2),
(7, 18, 16);
set identity_insert [Favorite] off

USE [Sunnie];
GO
ALTER TABLE Precaution
DROP COLUMN SkinTypeId;