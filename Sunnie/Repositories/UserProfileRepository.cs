using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Sunnie.Models;
using Sunnie.Utils;

namespace Sunnie.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAllUserProfiles()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.Id, u.FirebaseId, u.FirstName, u.LastName, u.Age, u.Email, u.CreateDateTime,
                              u.ImageLocation, u.SkinTypeId,
                              st.Id, st.TypeDescription, st.Minimum, st.Maximum
                              
                          FROM UserProfile u
                              LEFT JOIN SkinType st ON st.Id = u.SkinTypeId";

                    UserProfile userProfile = null;
                    var reader = cmd.ExecuteReader();

                    var userProfiles = new List<UserProfile>();
                    while (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FirebaseId = reader.GetString(reader.GetOrdinal("FirebaseId")),
                            FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                            LastName = reader.GetString(reader.GetOrdinal("LastName")),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            Age = reader.GetInt32(reader.GetOrdinal("Age")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            ImageLocation = DbUtils.GetNullableString(reader, "ImageLocation"),
                            SkinTypeId = reader.GetInt32(reader.GetOrdinal("SkinTypeId")),
                            SkinType = new SkinType()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal ("SkinTypeId")),
                                TypeDescription = reader.GetString(reader.GetOrdinal ("TypeDescription")),
                                Minimum = reader.GetInt32(reader.GetOrdinal ("Minimum")),
                                Maximum = reader.GetInt32(reader.GetOrdinal ("Maximum"))
                            },
                        };

                        userProfiles.Add(userProfile);
                    }
                    reader.Close();
                    return userProfiles;
                }
            }
        }


        public UserProfile GetByFirebaseUserId(string firebaseId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.Id, u.FirebaseId, u.FirstName, u.LastName, u.Age, u.Email, u.CreateDateTime,
                              u.ImageLocation, u.SkinTypeId,
                              st.Id, st.TypeDescription, st.Minimum, st.Maximum
                              
                       FROM UserProfile u
                              LEFT JOIN SkinType st ON st.Id = u.SkinTypeId

                       WHERE FirebaseId = @FirebaseId";

                    DbUtils.AddParameter(cmd, "@FirebaseId", firebaseId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FirebaseId = reader.GetString(reader.GetOrdinal("FirebaseId")),
                            FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                            LastName = reader.GetString(reader.GetOrdinal("LastName")),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            Age = reader.GetInt32(reader.GetOrdinal("Age")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            ImageLocation = DbUtils.GetNullableString(reader, "ImageLocation"),
                            SkinTypeId = reader.GetInt32(reader.GetOrdinal("SkinTypeId")),
                            SkinType = new SkinType()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("SkinTypeId")),
                                TypeDescription = reader.GetString(reader.GetOrdinal("TypeDescription")),
                                Minimum = reader.GetInt32(reader.GetOrdinal("Minimum")),
                                Maximum = reader.GetInt32(reader.GetOrdinal("Maximum"))
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }


        public UserProfile GetUserProfileById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT u.Id, u.FirebaseId, u.FirstName, u.LastName, u.Age, u.Email, u.CreateDateTime,
                              u.ImageLocation, u.SkinTypeId,
                              st.Id, st.TypeDescription, st.Minimum, st.Maximum
                              
                          FROM UserProfile u
                              LEFT JOIN SkinType st ON st.Id = u.SkinTypeId
                               
                         WHERE u.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FirebaseId = reader.GetString(reader.GetOrdinal("FirebaseId")),
                            FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            LastName = reader.GetString(reader.GetOrdinal("LastName")),
                            Age = reader.GetInt32(reader.GetOrdinal("Age")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            ImageLocation = DbUtils.GetNullableString(reader, "ImageLocation"),
                            SkinTypeId = DbUtils.GetNullableInt(reader, "SkinTypeId"),
                            SkinType = new SkinType()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("SkinTypeId")),
                                TypeDescription = reader.GetString(reader.GetOrdinal("TypeDescription")),
                                Minimum = reader.GetInt32(reader.GetOrdinal("Minimum")),
                                Maximum = reader.GetInt32(reader.GetOrdinal("Maximum"))
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseId, FirstName, LastName, Age, 
                                                                 CreateDateTime, Email, ImageLocation)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseId, @FirstName, @LastName, @Age, 
                                                @CreateDateTime, @Email, @ImageLocation)";
                    DbUtils.AddParameter(cmd, "@FirebaseId", userProfile.FirebaseId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@Age", userProfile.Age);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(UserProfile userProfile)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile
                           SET FirstName = @FirstName,
                               LastName = @LastName,
                               Age = @Age,
                               Email = @Email,
                               ImageLocation = @ImageLocation,  
                               SkinTypeId = @SkinTypeId
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Age", userProfile.Age);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "ImageLocation", userProfile.ImageLocation);
                    DbUtils.AddParameter(cmd, "@Id", userProfile.Id);
                    DbUtils.AddParameter(cmd, "@SkinTypeId", userProfile.SkinTypeId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
