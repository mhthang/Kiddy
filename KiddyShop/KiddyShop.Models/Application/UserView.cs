using Microsoft.IdentityModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Application.Models
{
    public class UserView
    {
        [Key]
        public string Id { get; set; }

        [Required]
        [EmailAddress(ErrorMessages = "Your email looks incorrect. Please check and try again.")]
        [MinLength(8)]
        //[Index("UserNameIndex", IsUnique = true)]
        public string UserName { get; set; }

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }


        [MaxLength(100)]
        public string LastName { get; set; }
    }
}
