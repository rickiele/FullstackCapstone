USE [Sunnie];
GO

set identity_insert [UserProfile] on
insert into UserProfile (Id, FirebaseId, Email, FirstName, LastName, CreateDateTime, Age, ImageLocation, SkinTypeId) 
values (1, 'SMUZrCL0jNbS9dJFw92xfxvdDB13', 'RonnieBoy@gmail.com', 'Hotrod', 'Ronnie', '2021-05-01', '52','', '');

set identity_insert [UserProfile] off

-- All skin types
set identity_insert [SkinType] on
insert into SkinType (Id, TypeDescription, Minimum, Maximum) values (1, 'Skin Type 1', 0, 6);
insert into SkinType (Id, TypeDescription, Minimum, Maximum) values (2, 'Skin Type 2', 7, 13);
insert into SkinType (Id, TypeDescription, Minimum, Maximum) values (3, 'Skin Type 3', 14, 20);
insert into SkinType (Id, TypeDescription, Minimum, Maximum) values (3, 'Skin Type 4', 21, 27);
insert into SkinType (Id, TypeDescription, Minimum, Maximum) values (3, 'Skin Type 5', 28, 34);
insert into SkinType (Id, TypeDescription, Minimum, Maximum) values (3, 'Skin Type 6', 35, 40);
set identity_insert [SkinType] on

-- Answers and the score of each response
set identity_insert [Freckles] on
insert into Freckles (Id, Freckles, Score) values (1, 'Many', 0);
insert into Freckles (Id, Freckles, Score) values (2, 'Several', 1);
insert into Freckles (Id, Freckles, Score) values (3, 'A few', 2);
insert into Freckles (Id, Freckles, Score) values (4, 'Very few', 3);
set identity_insert [Freckles] off

set identity_insert [HairColor] on
insert into HairColor (Id, HairColor, Score) values (1, 'Red or light blonde', 0);
insert into HairColor (Id, HairColor, Score) values (2, 'Blonde', 1);
insert into HairColor (Id, HairColor, Score) values (3, 'Dark blonde or light brown', 2);
insert into HairColor (Id, HairColor, Score) values (4, 'Dark brown', 3);
insert into HairColor (Id, HairColor, Score) values (5, 'Black', 4);
set identity_insert [HairColor] off

set identity_insert [EyeColor] on
insert into EyeColor (Id, EyeColor, Score) values (1, 'Light blue, light gray, or light green', 0);
insert into EyeColor (Id, EyeColor, Score) values (2, 'Hazel or light brown', 2);
insert into EyeColor (Id, EyeColor, Score) values (3, 'Dark brown', 3);
insert into EyeColor (Id, EyeColor, Score) values (4, 'Brownish black', 4);
set identity_insert [EyeColor] off

set identity_insert [SkinColor] on
insert into SkinColor (Id, SkinColor, Score) values (1, 'Ivory white', 0);
insert into SkinColor (Id, SkinColor, Score) values (2, 'Fair or pale', 1);
insert into SkinColor (Id, SkinColor, Score) values (3, 'Fair to beige, with golden undertone', 2);
insert into SkinColor (Id, SkinColor, Score) values (4, 'Olive or light brown', 3);
insert into SkinColor (Id, SkinColor, Score) values (5, 'Dark brown or black', 4);
set identity_insert [SkinColor] off

set identity_insert [SkinTan] on
insert into SkinTan (Id, SkinTan, Score) values (1, 'Never, I always burn', 0);
insert into SkinTan (Id, SkinTan, Score) values (2, 'Rarely', 1);
insert into SkinTan (Id, SkinTan, Score) values (3, 'Sometimes', 2);
insert into SkinTan (Id, SkinTan, Score) values (4, 'Often', 3);
insert into SkinTan (Id, SkinTan, Score) values (5, 'Always', 4);
set identity_insert [SkinTan] off

set identity_insert [SunBurn] on
insert into SunBurn (Id, SunBurn, Score) values (1, 'Always burns, blisters and peels', 0);
insert into SunBurn (Id, SunBurn, Score) values (2, 'Often burns, blisters and peels', 1);
insert into SunBurn (Id, SunBurn, Score) values (3, 'Burns somewhat', 2);
insert into SunBurn (Id, SunBurn, Score) values (4, 'Burns rarely, if at all', 3);
insert into SunBurn (Id, SunBurn, Score) values (5, 'Never burns', 4);
set identity_insert [SunBurn] off

set identity_insert [SunSensitivity] on
insert into SunSensitivity (Id, SunSensitivity, Score) values (1, 'Very sensitive', 0);
insert into SunSensitivity (Id, SunSensitivity, Score) values (2, 'Sensitive', 1);
insert into SunSensitivity (Id, SunSensitivity, Score) values (3, 'Normal', 2);
insert into SunSensitivity (Id, SunSensitivity, Score) values (4, 'Resistant', 3);
insert into SunSensitivity (Id, SunSensitivity, Score) values (4, 'Very resistant/Never had a problem', 4);
set identity_insert [SunSensitivity] off

set identity_insert [DeepTan] on
insert into DeepTan (Id, DeepTan, Score) values (1, 'Not at all or very little', 0);
insert into DeepTan (Id, DeepTan, Score) values (2, 'Lightly', 1);
insert into DeepTan (Id, DeepTan, Score) values (3, 'Moderately', 2);
insert into DeepTan (Id, DeepTan, Score) values (4, 'Deeply', 3);
insert into DeepTan (Id, DeepTan, Score) values (5, 'My skin is naturally dark', 4);
set identity_insert [DeepTan] off







