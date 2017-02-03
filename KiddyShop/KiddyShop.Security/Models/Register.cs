using KiddyShop.Commons;
using System.ComponentModel.DataAnnotations;

namespace KiddyShop.WebSecurity.Models
{
    public class Register
    {
        [Required]
        [Display(Name = "User name")]
        [MaxLength(100)]
        public string UserName { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Your email looks incorrect. Please check and try again.")]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [MaxLength(100)]
        [Display(Name = "First Name")]
        public string FirstName
        {
            get
            {
                return Ultility.GetUserNameFromEmail(this.Email);
            }
        }

        [Display(Name = "Last Name")]
        [MaxLength(100)]
        public string LastName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Your password must be at least {0} characters.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "Your password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public string CaptchaResponse { get; set; }
    }
}