using KiddyShop.Domain;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KiddyShop.Messaging.Models
{
    [Table("MessagingMessages")]
    public class MessagingMessage : IEntity<Guid>
    {
        public MessagingMessage()
        {

        }

        [Key]
        public Guid Id { get; set; }

        public Guid MessagingTemplateContentId { get; set; }
        public string EmailDeliveryProvider { get; set; }
        public string MessagingSubject { get; set; }
        public string MessagingFromName { get; set; }
        public string MessagingFromEmailAddress { get; set; }
        public string MessagingTo { get; set; }
        public string MessagingCc { get; set; }
        public string MessagingBcc { get; set; }
        public string MessagingContent { get; set; }
        public string Tags { get; set; }
        public bool IsSent { get; set; }
        public bool IsMarkedAsRead { get; set; }
        public Nullable<DateTime> SentDate { get; set; }
        public DateTime CreatedDate { get; set; }

        [ForeignKey("MessagingTemplateContentId")]
        public virtual MessagingTemplateContent MessagingTemplateContent { get; set; }
    }
}