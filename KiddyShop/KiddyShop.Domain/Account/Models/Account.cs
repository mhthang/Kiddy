using KiddyShop.Domain;
using System.ComponentModel.DataAnnotations.Schema;

namespace KiddyShop.Account.Models
{
    [Table("Accounts")]
    public class Account : IEntity<System.Guid>
    {
        public Account()
        {
            //Managers = new HashSet<Manager>();
            //CRMs = new HashSet<CRM>();
        }

        public System.Guid Id { get; set; }

        public System.Guid ProfileId { get; set; }

        [ForeignKey("ProfileId")]
        public virtual Profile Profile { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }
    }
}