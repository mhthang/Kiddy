using System.ComponentModel.DataAnnotations;

namespace KiddyShop.WebSecurity.Models
{
    public class ChangeProfile
    {
        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Your email looks incorrect. Please check and try again.")]
        [MaxLength(256)]
        public string Email { get; set; }
    }
}
