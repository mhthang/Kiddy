using KiddyShop.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KiddyShop.Application.Models
{
    [Table("SystemConfigs")]
    public class SystemConfig : IEntity<System.Guid>
    {
        public SystemConfig()
        {
        }

        [Key]
        public System.Guid Id { set; get; }

        [Required]
        [Column(TypeName = "varchar")]
        [MaxLength(50)]
        public string Code { set; get; }

        [MaxLength(50)]
        public string ValueString { set; get; }

        public int? ValueInt { set; get; }
    }
}