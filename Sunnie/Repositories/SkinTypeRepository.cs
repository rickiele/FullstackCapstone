using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Sunnie.Models;
using Sunnie.Utils;

namespace Sunnie.Repositories
{
    public class SkinTypeRepository : BaseRepository, ISkinTypeRepository
    {
        public SkinTypeRepository(IConfiguration configuration) : base(configuration) { }

        public List<SkinType> GetAllSkinTypes()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT Id, TypeDescription, Minimum, Maximum
                           FROM SkinType";

                    SkinType skintype = null;
                    var reader = cmd.ExecuteReader();

                    var skintypes = new List<SkinType>();
                    while (reader.Read())
                    {
                        skintype = new SkinType()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            TypeDescription = reader.GetString(reader.GetOrdinal("TypeDescription")),
                            Minimum = reader.GetInt32(reader.GetOrdinal("Minimum")),
                            Maximum = reader.GetInt32(reader.GetOrdinal("Maximum"))
                        };

                        skintypes.Add(skintype);
                    }
                    reader.Close();
                    return skintypes;
                }
            }
        }

        public SkinType GetSkinTypeById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, TypeDescription, Minimum, Maximum
                        FROM SkinType
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    SkinType skinType = null;

                    SqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        skinType = new SkinType()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            TypeDescription = reader.GetString(reader.GetOrdinal("TypeDescription")),
                            Minimum = reader.GetInt32(reader.GetOrdinal("Minimum")),
                            Maximum = reader.GetInt32(reader.GetOrdinal("Maximum"))
                        };
                    }
                    reader.Close();

                    return skinType;
                }
            }
        }


    }
}
