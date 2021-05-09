using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Sunnie.Models;
using Sunnie.Utils;

namespace Sunnie.Repositories
{
    public class ProductRepository : BaseRepository, IProductRepository
    {
        public ProductRepository(IConfiguration configuration) : base(configuration) { }

        public List<Product> GetAllProducts()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = ProductQuery;

                    SqlDataReader reader = cmd.ExecuteReader();

                    var products = new List<Product>();
                    while (reader.Read())
                    {
                        products.Add(NewProduct(reader));
                    }

                    reader.Close();
                    return products;
                }
            }
        }

        //Need to get products by the userId
        public List<Product> GetProductByUser(int userProfileId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = ProductQuery + " WHERE p.userProfileId = @userProfileId";

                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    SqlDataReader reader = cmd.ExecuteReader();

                    var products = new List<Product>();

                    while (reader.Read())
                    {
                        products.Add(NewProduct(reader));
                    }

                    reader.Close();

                    return products;
                }
            }
        }

        public void Add(Product product)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Product (UserProfileId, CreateDateTime, Name, ImageLocation, ProductTypeId, Spf, Comment)
                        OUTPUT INSERTED.ID
                        VALUES (@UserProfileId, @CreateDateTime, @Name, @ImageLocation, @ProductTypeId, @Spf, @Comment)";

                    DbUtils.AddParameter(cmd, "@UserProfileId", product.UserProfileId);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", product.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@Name", product.Name);
                    DbUtils.AddParameter(cmd, "@ImageLocation", product.ImageLocation);
                    DbUtils.AddParameter(cmd, "@ProductTypeId", product.ProductTypeId);
                    DbUtils.AddParameter(cmd, "@Spf", product.Spf);
                    DbUtils.AddParameter(cmd, "@Comment", product.Comment);

                    product.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int productId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Product WHERE Id = @id;
                                        ";

                    DbUtils.AddParameter(cmd, "@id", productId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Product product)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE  Product
                           SET  Name = @Name,
                                ImageLocation = @ImageLocation,
                                ProductTypeId = @ProductTypeId,  
                                Spf = @Spf,
                                Comment = @Comment
                         WHERE  id = @id";

                    DbUtils.AddParameter(cmd, "@Name", product.Name);
                    DbUtils.AddParameter(cmd, "@ImageLocation", product.ImageLocation);
                    DbUtils.AddParameter(cmd, "@ProductTypeId", product.ProductTypeId);
                    DbUtils.AddParameter(cmd, "@Spf", product.Spf);
                    DbUtils.AddParameter(cmd, "@Comment", product.Comment);
                    DbUtils.AddParameter(cmd, "@id", product.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }



        private string ProductQuery
        {
            get
            {
                return @"
                        SELECT  p.Id, p.CreateDateTime, p.Name AS ProductName, p.ImageLocation AS ProductImage, 
                                p.Spf, p.Comment, p.UserProfileId, p.ProductTypeId,
                                up.Id, up.FirstName, up.LastName, 
                                pt.Id AS ProductTypeId, pt.Type
                        FROM Product p
                        LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                        LEFT JOIN ProductType pt ON pt.Id = p.ProductTypeId";
            }
        }

        private Product NewProduct(SqlDataReader reader)
        {
            return new Product()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                Name = DbUtils.GetString(reader, "ProductName"),
                ImageLocation = DbUtils.GetNullableString(reader, "ProductImage"),
                Spf = DbUtils.GetNullableInt(reader, "Spf"),
                Comment = DbUtils.GetNullableString(reader, "Comment"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                },
                ProductTypeId = DbUtils.GetInt(reader, "ProductTypeId"),
                ProductType = new ProductType()
                {
                    Id = DbUtils.GetInt(reader, "ProductTypeId"),
                    Type = DbUtils.GetString(reader, "Type")
                }

            };
        }


    }
}
