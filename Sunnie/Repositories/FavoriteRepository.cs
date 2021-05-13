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
                    SELECT  f.Id AS FavoriteId, f.ProductId, f.UserProfileId,
                            p.Id, p.Name AS ProductName, p.ImageLocation AS ProductImage, 
                            p.Spf, p.Comment, p.UserProfileId, p.ProductTypeId,
                            up.Id,
                            pt.Id, pt.Type

                      FROM  Favorite f

                 LEFT JOIN  Product p       ON p.Id = f.ProductId
                 LEFT JOIN  UserProfile up  ON up.Id = f.UserProfileId
                 LEFT JOIN  ProductType pt  ON pt.Id = p.ProductTypeId
                     WHERE  f.UserProfileId = @UserProfileId";

                    DbUtils.AddParameter(cmd, "@UserProfileId", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    var favorites = new List<Favorite>();
                    while (reader.Read())
                    {
                        favorites.Add(new Favorite()
                        {
                            Id = DbUtils.GetInt(reader, "FavoriteId"),
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
                                ProductTypeId = DbUtils.GetInt(reader, "ProductTypeId"),
                                ProductType = new ProductType()
                                {
                                    Id = DbUtils.GetInt(reader, "ProductTypeId"),
                                    Type = DbUtils.GetString(reader, "Type")
                                }
                            },
                        });
                    }
                    reader.Close();
                    return favorites;
                }
            }
        }

        public Favorite GetFavoriteById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, ProductId, UserProfileId
                            FROM Favorite
                            WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        Favorite favorite = new Favorite()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            ProductId = reader.GetInt32(reader.GetOrdinal("ProductId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId"))
                        };
                        reader.Close();
                        return favorite;
                    }
                    reader.Close();
                    return null;
                }
            }
        }

        public Favorite Add(Favorite favorite)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Favorite(ProductId, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@productId, @userProfileId)";

                    cmd.Parameters.AddWithValue("@productId", favorite.ProductId);
                    cmd.Parameters.AddWithValue("@userProfileId", favorite.UserProfileId);

                    int id = (int)cmd.ExecuteScalar();

                    favorite.Id = id;
                    return favorite;
                }
            }
        }

        public void Delete(int favoriteId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Favorite
                        WHERE Id = @favoriteId";

                    cmd.Parameters.AddWithValue("@favoriteId", favoriteId);

                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}
