using KiddyShop.Domain;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KiddyShop.Messaging.Models
{
    [Table("MessagingTemplates")]
    public class MessagingTemplate : IEntity<Guid>
    {
        public MessagingTemplate()
        {

        }

        [Key]
        public Guid Id { get; set; }

        public int MessagingTypeId { get; set; }

        [StringLength(255, ErrorMessage = "Template Name cannot be longer than 255 characters.")]
        public string MessagingTemplateName { get; set; }

        [StringLength(32, ErrorMessage = "HighlightColor cannot be longer than 32 characters.")]
        public string HighlightColor { get; set; }
        public bool IsPublish { get; set; }
        public DateTime CreatedDate { get; set; }

        [ForeignKey("MessagingTypeId")]
        public virtual MessagingType MessagingType { get; set; }

    }
}