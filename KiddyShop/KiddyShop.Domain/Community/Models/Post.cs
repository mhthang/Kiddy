using KiddyShop.Domain;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KiddyShop.Community.Models
{
    [Table("Posts")]
    public class Post : IEntity<System.Guid>
    {
        public Post()
        {
            Tags = new HashSet<Tag>();
        }

        [Key]
        public System.Guid Id { get; set; }

        [Required]
        [StringLength(180, ErrorMessage = "Title cannot be longer than 180 characters.")]
        public string Title { get; set; }

        [Required]
        [StringLength(500, ErrorMessage = "Description cannot be longer than 500 characters.")]
        public string Description { set; get; }

        [Required]
        public string Content { get; set; }

        [Required]
        [MaxLength(256)]
        public string Alias { set; get; }

        [MaxLength(500)]
        public string Image { set; get; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }

        public bool? IsShowHome { set; get; }

        public bool? IsHot { set; get; }

        public int? ViewCount { set; get; }

        public System.Guid PostCategoryId { get; set; }

        [ForeignKey("PostCategoryId")]
        public virtual PostCategory PostCategory { get; set; }

        public virtual ICollection<Tag> Tags { set; get; }
    }
}