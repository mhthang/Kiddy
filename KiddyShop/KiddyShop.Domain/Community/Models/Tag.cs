using KiddyShop.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Community.Models
{
    public class Tag : IEntity<System.Guid>
    {
        public Tag()
        {
            Posts = new HashSet<Post>();
        }
        [Key]
        public System.Guid Id { get; set; }

        [MaxLength(50)]
        [Required]
        public string Name { set; get; }

        [MaxLength(50)]
        [Required]
        public string Type { set; get; }

        public virtual ICollection<Post> Posts { get; set; }
    }
}
