using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sunnie.Models
{
    public class SkinType
    {
        public int Id { get; set; }
        public string TypeDescription { get; set; }
        public int Minimum { get; set; }
        public int Maximum { get; set; }
    }
}
