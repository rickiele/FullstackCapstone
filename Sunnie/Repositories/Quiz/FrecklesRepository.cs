using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Sunnie.Models.Quiz;
using Microsoft.Extensions.Configuration;

namespace Sunnie.Repositories.Quiz
{
    public class FrecklesRepository : BaseRepository, IFrecklesRepository
    {
        public FrecklesRepository(IConfiguration configuration) : base(configuration) { }

        public List<Freckles> GetAllFreckles()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, Answer, Score
                       FROM Freckles";

                    Freckles freckle = null;
                    var reader = cmd.ExecuteReader();

                    var freckles = new List<Freckles>();
                    while (reader.Read())
                    {
                        freckle = new Freckles()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Answer = reader.GetString(reader.GetOrdinal("Answer")),
                            Score = reader.GetInt32(reader.GetOrdinal("Score"))
                        };

                        freckles.Add(freckle);
                    }
                    reader.Close();
                    return freckles;
                }
            }
        }
    }
}
