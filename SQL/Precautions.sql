ALTER TABLE Precaution
DROP COLUMN SkinTypeId;


ALTER TABLE Precaution 
DROP CONSTRAINT SkinType; 

INSERT INTO Precaution (UVLevelId, Precautions)
VALUES (1, 'Wear sunglasses on bright days.' + CHAR(10) + 'If you burn easily, cover up and use broad spectrum SPF 30+ sunscreen.' + CHAR(10) + 'Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure');

UPDATE Precaution
SET 
Precautions =  'Wear sunglasses on bright days.' + CHAR(10) + 'If you burn easily, cover up and use broad spectrum SPF 30+ sunscreen.'  + CHAR(10) + 'Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure',
UVLevelId = 1
WHERE Id = 

UPDATE Precaution
SET 
Precautions =  'Wear sunglasses on bright days.' + CHAR(10) + 'If you burn easily, cover up and use broad spectrum SPF 30+ sunscreen.'  + CHAR(10) + 'Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure',
UVLevelId = 0
WHERE Id = 1

DELETE FROM Precaution
Where Id = 1
