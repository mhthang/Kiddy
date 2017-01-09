using KiddyShop.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Account.Models
{
    [Table("CRMs")]
    public class CRM : IEntity<System.Guid>
    {
        public CRM()
        {
        }

        [Key]
        public System.Guid Id { get; set; }

        public System.Guid ManagerId { get; set; }
        [ForeignKey("ManagerId")]
        public virtual Manager Manager { get; set; }

        public bool IsDeleted { get; set; }
    }
}
