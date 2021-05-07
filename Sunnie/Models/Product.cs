using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sunnie.Models
{
    public class Product
    {
        public int Id { get; set; }

        public DateTime CreateDateTime { get; set; }
        public string Name { get; set; }
        public string? ImageLocation { get; set; }
        public int ProductTypeId { get; set; }
        public ProductType ProductType { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public int? Spf { get; set; }
        public string? Comment { get; set; }
    }
}
