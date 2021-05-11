using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sunnie.Models
{
    public class Favorite
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
