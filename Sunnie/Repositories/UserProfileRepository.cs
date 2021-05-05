using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Sunnie.Models;
using Sunnie.Utils;


// TODO: Don't forget about CreateDateTime
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
                       SELECT u.Id, u.FirebaseId, u.FirstName, u.LastName, u.Age, u.Email,
                              u.ImageLocation, u.SkinTypeId
                              
                       FROM UserProfile u
                              LEFT JOIN SkinType st ON u.UserProfileId = st.id";

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
                       SELECT u.Id, u.FirebaseId, u.FirstName, u.LastName, u.Age, u.Email,
                              u.ImageLocation, u.SkinTypeId
                              
                       FROM UserProfile u
                              LEFT JOIN SkinType st ON u.UserProfileId = st.id
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
                          SELECT u.Id, u.FirebaseId, u.FirstName, u.LastName, u.Age, u.Email,
                              u.ImageLocation, u.SkinTypeId
                              
                          FROM UserProfile u
                              LEFT JOIN SkinType st ON u.UserProfileId = st.id
                               
                         WHERE up.Id = @Id";

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
                            LastName = reader.GetString(reader.GetOrdinal("LastName")),
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


        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseId, FirstName, LastName, Age, 
                                                                 Email, ImageLocation, SkinTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseId, @FirstName, @LastName, @Age, 
                                                @Email, @ImageLocation, @SkinTypeId)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Age", userProfile.Age);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
                    DbUtils.AddParameter(cmd, "@SkinTypeId", userProfile.SkinTypeId);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
