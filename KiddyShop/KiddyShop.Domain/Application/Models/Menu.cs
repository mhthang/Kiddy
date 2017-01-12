using KiddyShop.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KiddyShop.Application.Models
{
    [Table("Menus")]
    public class Menu : IEntity<System.Guid>
    {
        public Menu()
        {
        }
        [Key]
        public System.Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string URL { get; set; }

        public int? DisplayOrder { get; set; }

        [Required]
        public int GroupID { get; set; }

        [ForeignKey("GroupID")]
        public virtual MenuGroup MenuGroup { get; set; }

        public string Target { get; set; }

        [Required]
        public bool Status { get; set; }
    }
}