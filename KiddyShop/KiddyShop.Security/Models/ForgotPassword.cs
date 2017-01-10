using System.ComponentModel.DataAnnotations;

namespace KiddyShop.WebSecurity.Models
{
    public class ForgotPassword
    {
        [Required]
        [EmailAddress(ErrorMessage = "Your email looks incorrect. Please check and try again.")]
        public string Email { get; set; }
    }
}
