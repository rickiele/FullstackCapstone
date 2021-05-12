using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace Sunnie.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseId { get; set; }

        public DateTime CreateDateTime { get; set; }

        public int Age { get; set; }

        [Required]
        [MaxLength(255)]
        public string Email { get; set; }

        [MaxLength(255)]
        public string ImageLocation { get; set; }

        public int? SkinTypeId {get; set;}
        public SkinType SkinType { get; set; }
    }
}
