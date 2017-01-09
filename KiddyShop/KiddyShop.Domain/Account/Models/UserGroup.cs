using KiddyShop.Domain;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KiddyShop.Account.Models
{
    [Table("UserGroups")]
    public class UserGroup : IEntity<Guid>
    {
        public UserGroup()
        {
        }

        [Key]
        public Guid Id { get; set; }

        public System.Guid RoleGroupId { get; set; }

        [ForeignKey("RoleGroupId")]
        public virtual RoleGroup RoleGroup { get; set; }

        public String UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}