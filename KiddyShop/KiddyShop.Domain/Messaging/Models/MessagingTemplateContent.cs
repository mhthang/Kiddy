using KiddyShop.Domain;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KiddyShop.Messaging.Models
{
    [Table("MessagingTemplateContents")]
    public class MessagingTemplateContent : IEntity<Guid>
    {
        public MessagingTemplateContent()
        {

        }

        [Key]
        public Guid Id { get; set; }

        public Guid MessagingTemplateId { get; set; }
        public string Lang { get; set; }
        public string MessagingSubject { get; set; }
        public string MessagingFromName { get; set; }
        public string MessagingFromEmailAddress { get; set; }
        public string MessagingTo { get; set; }
        public string MessagingCc { get; set; }
        public string MessagingBcc { get; set; }
        public string MessagingContent { get; set; }
        public string Tags { get; set; }
        public bool IsPublish { get; set; }
        public Nullable<DateTime> FromDate { get; set; }
        public Nullable<DateTime> EndDate { get; set; }
        public DateTime CreatedDate { get; set; }

        [ForeignKey("MessagingTemplateId")]
        public virtual MessagingTemplate MessagingTemplate { get; set; }

    }
}
