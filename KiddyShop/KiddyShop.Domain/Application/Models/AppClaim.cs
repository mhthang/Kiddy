using KiddyShop.Account.Models;
using KiddyShop.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KiddyShop.Application.Models
{
    [Table("AppClaims")]
    public class AppClaim : IEntity<Guid>
    {
        public AppClaim()
        {
            this.AppFunctions = new HashSet<AppFunction>();
            RoleGroups = new HashSet<RoleGroup>();
        }

        [Key]
        public Guid Id { get; set; }

        [StringLength(500, ErrorMessage = "Type cannot be longer than 500 characters.")]
        public string ClaimType { get; set; }

        [StringLength(500, ErrorMessage = "Name cannot be longer than 500 characters.")]
        public string ClaimValue { get; set; }

        public virtual ICollection<AppFunction> AppFunctions { get; set; }

        public virtual ICollection<RoleGroup> RoleGroups { get; set; }

        public bool IsDeleted { get; set; }
    }
}