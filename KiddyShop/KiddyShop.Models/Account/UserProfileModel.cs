using KiddyShop.Account.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace KiddyShop.Models.Account
{
    public class UserProfileModel
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [MaxLength(100)]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        public string Phone { get; set; }

        public Guid ProfileId { get; set; }

        public USER_TYPE UserType { get; set; }
        public PROFILE_TYPE ProfileType { get; set; }

        public string AvatarPhoto { get; set; }
        public string AvatarPhotoUrl { get; set; }

        public string FullName
        {
            get { return $"{FirstName} {LastName}"; }
        }
    }
}