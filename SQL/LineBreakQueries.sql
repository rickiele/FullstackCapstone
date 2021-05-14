DELETE FROM UserProfile WHERE Id = 63;
DELETE FROM Product WHERE UserProfileId = 63;
DELETE FROM Precaution WHERE Id = 8;

set identity_insert Precaution on
INSERT INTO Precaution (Id, UVLevelId, Precautions)
VALUES (4, 3, 'Protection needed. Seek shade during late morning through mid-afternoon. 
When outside, generously apply broad-spectrum SPF-15 or higher sunscreen on exposed skin, 
and wear protective clothing, a wide-brimmed hat, and sunglasses.');
set identity_insert Precaution off

UPDATE Precaution
SET Precautions = 'ABC' + CHAR(13) + CHAR(10) + 'DEF'
WHERE Id = 1;

DECLARE @x varchar(100);
SELECT @x = 'ABC' + CHAR(13) + CHAR(10) + 'DEF';
PRINT @x;

Declare @A varchar(500);
Set @A = N'Please work \nI am starting \nto die';
Set @A = Replace(@A,'\n', CHAR(13)+CHAR(10));
UPDATE Precaution
SET Precautions = @A
WHERE Id = 1;
Print @A;
