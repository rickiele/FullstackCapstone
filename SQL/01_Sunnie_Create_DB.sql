USE [master]

IF db_id('Sunnie') IS NULl
  CREATE DATABASE [Sunnie]
GO

USE [Sunnie]
GO

DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [SkinType];
DROP TABLE IF EXISTS [SkinColor];
DROP TABLE IF EXISTS [EyeColor];
DROP TABLE IF EXISTS [HairColor];
DROP TABLE IF EXISTS [SunReaction];
DROP TABLE IF EXISTS [Product];
DROP TABLE IF EXISTS [Type];
DROP TABLE IF EXISTS [ProductUser];
DROP TABLE IF EXISTS [Favorite];
DROP TABLE IF EXISTS [Follower];
DROP TABLE IF EXISTS [Precaution];
DROP TABLE IF EXISTS [UVLevel];
GO

CREATE TABLE [SkinColor] (
  [Id] integer PRIMARY KEY IDENTITY,
  [SkinColor] nvarchar(50) NOT NULL
)

CREATE TABLE [EyeColor] (
  [Id] integer PRIMARY KEY IDENTITY,
  [EyeColor] nvarchar(50) NOT NULL
)

CREATE TABLE [HairColor] (
  [Id] integer PRIMARY KEY IDENTITY,
  [HairColor] nvarchar(50) NOT NULL
)

CREATE TABLE [SunReaction] (
  [Id] integer PRIMARY KEY IDENTITY,
  [SunReaction] nvarchar(255) NOT NULL
)

CREATE TABLE [UVLevel] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(50) NOT NULL,
  [Color] nvarchar(50) NOT NULL,
  [UVLevel] integer NOT NULL
)

CREATE TABLE [SkinType] (
  [Id] integer PRIMARY KEY IDENTITY,
  [SkinColorId] integer NOT NULL,
  [EyeColorId] integer NOT NULL,
  [HairColorId] integer NOT NULL,
  [SunReactionId] integer NOT NULL,

  CONSTRAINT [FK_SkinType_SkinColor] FOREIGN KEY ([SkinColorId]) REFERENCES [SkinColor] ([Id]),
  CONSTRAINT [FK_SkinType_EyeColor] FOREIGN KEY ([EyeColorId]) REFERENCES [EyeColor] ([Id]),
  CONSTRAINT [FK_SkinType_HairColor] FOREIGN KEY ([HairColorId]) REFERENCES [HairColor] ([Id]),
  CONSTRAINT [FK_SkinType_SunReaction] FOREIGN KEY ([SunReaction]) REFERENCES [SunReaction] ([Id])
)

CREATE TABLE [Precaution] (
  [Id] integer PRIMARY KEY IDENTITY,
  [SkinTypeId] integer NOT NULL,
  [UVLevelId] integer NOT NULL,
  [Description] nvarchar(255)

  CONSTRAINT [FK_SkinType_Precaution] FOREIGN KEY ([SkinTypeId]) REFERENCES [SkinType] ([Id]),
  CONSTRAINT [FK_UVLevel_Precaution] FOREIGN KEY ([UVLevelId]) REFERENCES [UVLevel] ([Id])
)

CREATE TABLE [Type] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Type] nvarchar(50) NOT NULL
)


CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FirebaseId] NVARCHAR(28) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Age] nvarchar(3),
  [Email] nvarchar(255) NOT NULL,
  [Image] nvarchar(255),
  [SkinTypeId] integer NOT NULL,

  CONSTRAINT [FK_UserProfile_SkinType] FOREIGN KEY ([SkinTypeId]) REFERENCES [SkinType] ([Id]),
  CONSTRAINT UQ_FirebaseId UNIQUE(FirebaseId)
)

CREATE TABLE [Product] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Image] nvarchar(255),
  [TypeId] integer NOT NULL,
  [Spf] nvarchar(5),
  [Comment] nvarchar(555),

  CONSTRAINT [FK_Product_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_Product_Type] FOREIGN KEY ([TypeId]) REFERENCES [Type] ([Id])
)

CREATE TABLE [Favorite] (
  [Id] integer PRIMARY KEY IDENTITY,
  [ProductId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,

  CONSTRAINT [FK_Favorite_Product] FOREIGN KEY ([ProductId]) REFERENCES [Product] ([Id]),
  CONSTRAINT [FK_Favorite_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)


CREATE TABLE [ProductUser] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer NOT NULL,
  [ProductId] integer NOT NULL,
  [IsLiked] boolean NOT NULL,

  CONSTRAINT [FK_ProductUser_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_ProductUser_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Product] ([Id])
)

CREATE TABLE [Follower] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer NOT NULL,
  [OtherUserId] integer NOT NULL,

  CONSTRAINT [FK_Follower_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_Follower_UserProfile] FOREIGN KEY ([OtherUserId]) REFERENCES [UserProfile] ([Id])
)