using KiddyShop.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KiddyShop.Messaging.Models
{
    [Table("MessagingTypes")]
    public class MessagingType : IEntity<int>
    {
        public MessagingType()
        {
            this.MessagingTemplates = new HashSet<MessagingTemplate>();
        }

        [Key]
        public int Id { get; set; }

        [StringLength(32, ErrorMessage = "Message Type Name cannot be longer than 32 characters.")]
        public string MessagingTypeTitle { get; set; }

        [StringLength(32, ErrorMessage = "Highlight Color cannot be longer than 32 characters.")]
        public string HighlightColor { get; set; }
        public bool IsEnable { get; set; }

        public virtual ICollection<MessagingTemplate> MessagingTemplates { get; set; }
    }
}
