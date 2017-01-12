using KiddyShop.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Application.Models
{
    [Table("MenuGroups")]
    public class MenuGroup : IEntity<System.Guid>
    {
        public MenuGroup()
        {
            Menus = new HashSet<Menu>();
        }
        [Key]
        public System.Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        public virtual ICollection<Menu> Menus { get; set; }
    }
}
