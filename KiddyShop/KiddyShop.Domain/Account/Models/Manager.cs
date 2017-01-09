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
    [Table("Managers")]
    public class Manager : IEntity<System.Guid>
    {
        public Manager()
        {
            CRMs = new HashSet<CRM>();
        }

        [Key]
        public System.Guid Id { get; set; }

        public virtual IEnumerable<CRM> CRMs { get; set; }

        public bool IsDeleted { get; set; }
    }
}
