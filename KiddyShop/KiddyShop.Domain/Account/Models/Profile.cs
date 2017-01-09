using KiddyShop.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KiddyShop.Account.Models
{
    [Table("Profiles")]
    public class Profile : IEntity<System.Guid>
    {
        [Key]
        public System.Guid Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Gender { get; set; }

        public string Email { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public System.DateTime? StartDate { get; set; }
        public System.DateTime? DOB { get; set; }

        public string Lang { get; set; }
        public string CountryCode { get; set; }
        public string TimezoneCode { get; set; }

        [StringLength(255, ErrorMessage = "Avatar Color cannot be longer than 255 characters.")]
        public string AvatarPhotoUrl { get; set; }

        [StringLength(32, ErrorMessage = "HighlightColor cannot be longer than 32 characters.")]
        public string HighlightColor { get; set; }

        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public Models.User User { get; set; }

        public USER_TYPE UserType { get; set; }
        public PROFILE_TYPE ProfileType { get; set; }

        public bool IsDeleted { get; set; }
    }
}