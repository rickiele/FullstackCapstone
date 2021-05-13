using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Sunnie.Models;
using Sunnie.Utils;

namespace Sunnie.Repositories
{
    public class PrecautionRepository : BaseRepository, IPrecautionRepository
    {
        public PrecautionRepository(IConfiguration configuration) : base(configuration) { }

        public List<Precaution> GetAllPrecautions()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT Id, UVLevelId, Precautions
                           FROM Precaution";

                    Precaution precaution = null;
                    var reader = cmd.ExecuteReader();

                    var precautions = new List<Precaution>();
                    while (reader.Read())
                    {
                        precaution = new Precaution()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UVLevelId = reader.GetInt32(reader.GetOrdinal("UVLevelId")),
                            Precautions = reader.GetString(reader.GetOrdinal("Precautions")),
                        };

                        precautions.Add(precaution);
                    }
                    reader.Close();
                    return precautions;
                }
            }
        }

    }
}
