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
                    cmd.CommandText = @"
                        SELECT  p.Id, p.CreateDateTime, p.Name AS ProductName, p.ImageLocation AS ProductImage, 
                                p.Spf, p.Comment, p.UserProfileId, p.ProductTypeId,
                                up.Id, up.FirstName, up.LastName, 
                                pt.Id AS ProductTypeId, pt.Type
                        FROM Product p
                        LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                        LEFT JOIN ProductType pt ON pt.Id = p.ProductTypeId
                    ";

                    SqlDataReader reader = cmd.ExecuteReader();

                    var products = new List<Product>();
                    while (reader.Read())
                    {
                        products.Add(new Product()
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
                        }); ;
                    }

                    reader.Close();
                    return products;
                }
            }
        }


    }
}
