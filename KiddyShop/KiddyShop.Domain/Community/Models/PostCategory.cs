using KiddyShop.Domain;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KiddyShop.Community.Models
{
    [Table("PostCategories")]
    public class PostCategory : IEntity<System.Guid>
    {
        public PostCategory()
        {
            Posts = new HashSet<Post>();
        }

        [Key]
        public System.Guid Id { get; set; }

        [Required]
        [StringLength(256, ErrorMessage = "Name cannot be longer than 256 characters.")]
        public string Name { set; get; }

        [Required]
        [StringLength(256, ErrorMessage = "Alias cannot be longer than 256 characters.")]
        public string Alias { set; get; }

        [Required]
        [StringLength(500, ErrorMessage = "Description cannot be longer than 500 characters.")]
        public string Description { set; get; }

        public int? ParentID { set; get; }

        public int? DisplayOrder { set; get; }

        [StringLength(500, ErrorMessage = "Image cannot be longer than 500 characters.")]
        public string Image { set; get; }

        public bool? IsShowHome { set; get; }

        public virtual ICollection<Post> Posts { set; get; }
    }
}