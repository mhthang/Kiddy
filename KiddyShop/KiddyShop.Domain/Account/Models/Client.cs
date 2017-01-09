using KiddyShop.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KiddyShop.Account.Models
{
    [Table("Clients")]
    public class Client : IEntity<System.Guid>
    {
        public Client()
        {
            //Clients = new HashSet<ClientAdmin>();
        }

        [Key]
        public System.Guid Id { get; set; }

        public System.Guid AccountId { get; set; }

        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; }

        public bool IsActive { get; set; }

        //public virtual IEnumerable<ClientAdmin> ClientAdmins { get; set; }

        public bool IsDeleted { get; set; }
    }
}