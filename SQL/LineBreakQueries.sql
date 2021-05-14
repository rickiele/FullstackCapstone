DELETE FROM UserProfile WHERE Id = 63;
DELETE FROM Product WHERE UserProfileId = 63;
DELETE FROM Precaution WHERE Id = 8;

set identity_insert Precaution on
INSERT INTO Precaution (Id, UVLevelId, Precautions)
VALUES (13, 12, 'Doggy');
set identity_insert Precaution off

DECLARE @x varchar(100);
SELECT @x = 'ABC' + CHAR(13) + CHAR(10) + 'DEF';
PRINT @x;

Declare @A varchar(500);
Set @A = N'Extra protection needed.\nBe careful outside, especially during late morning through mid-afternoon. \nIf your shadow is shorter than you, seek shade and wear protective clothing, a wide-brimmed hat, and sunglasses, and generously apply a minimum of  SPF-15, broad-spectrum sunscreen on exposed skin.';
Set @A = Replace(@A,'\n', CHAR(13)+CHAR(10));
UPDATE Precaution
SET Precautions = @A
WHERE Id = 9;
Print @A;

Declare @A varchar(500);
Set @A = N'Protection needed. Seek shade during late morning through mid-afternoon. \nWhen outside, generously apply broad-spectrum SPF-15 or higher sunscreen on exposed skin, and wear protective clothing, a wide-brimmed hat, and sunglasses.';
Set @A = Replace(@A,'\n', CHAR(13)+CHAR(10));
UPDATE Precaution
SET Precautions = @A
WHERE UVLevelId = 7;
Print @A;

