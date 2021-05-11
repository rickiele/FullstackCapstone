using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Sunnie.Models;
using Sunnie.Utils;

namespace Sunnie.Repositories
{
    public class FavoriteRepository : BaseRepository, IFavoriteRepository
    {
        public FavoriteRepository(IConfiguration configuration) : base(configuration) { }

        public List<Favorite> GetAllFavoritesForUser(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT  f.Id, f.ProductId, f.UserProfileId,
                            p.Id, p.CreateDateTime, p.Name AS ProductName, p.ImageLocation AS ProductImage, 
                            p.Spf, p.Comment, p.UserProfileId, p.ProductTypeId,
                            u.Id, u.FirstName, u.LastName, u.Age, u.Email, u.CreateDateTime,
                            u.ImageLocation, u.SkinTypeId

                      FROM  Favorite f

                 LEFT JOIN  Product p ON p.Id = f.ProductId
                 LEFT JOIN  UserProfile up ON up.Id = f.UserProfileId
                     WHERE  f.ProductId = @UserProfileId";

                    DbUtils.AddParameter(cmd, "@UserProfileId", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    var favorites = new List<Favorite>();
                    while (reader.Read())
                    {
                        favorites.Add(new Favorite()
                        {
                            Id = DbUtils.GetInt(reader, "PostTagId"),
                            UserProfileId = id,
                            UserProfile = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            },
                            ProductId = DbUtils.GetInt(reader, "ProductId"),
                            Product = new Product()
                            {
                                Id = DbUtils.GetInt(reader, "ProductId"),
                                Name = DbUtils.GetString(reader, "ProductName"),
                                ImageLocation = DbUtils.GetNullableString(reader, "ProductImage"),
                                Spf = DbUtils.GetNullableInt(reader, "Spf"),
                                Comment = DbUtils.GetNullableString(reader, "Comment"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            },
                        });
                    }
                    reader.Close();
                    return favorites;
                }
            }
        }

    }
}
