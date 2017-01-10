using System.ComponentModel.DataAnnotations;

namespace KiddyShop.WebSecurity.Models
{
    public class ConfirmEmail
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string Code { get; set; }
    }
}
