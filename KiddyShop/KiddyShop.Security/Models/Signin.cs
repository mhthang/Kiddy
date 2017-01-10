using System.ComponentModel.DataAnnotations;

namespace KiddyShop.WebSecurity.Models
{
    public class Signin
    {
        [Required]
        [Display(Name = "User Name")]
        [MaxLength(100)]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        [MaxLength(100)]
        public string Password { get; set; }

        [Display(Name = "RememberMe")]
        public bool RememberMe { get; set; }
    }
}