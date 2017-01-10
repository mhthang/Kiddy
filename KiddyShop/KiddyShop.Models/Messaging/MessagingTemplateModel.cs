using System;

namespace KiddyShop.Messaging.Models
{
    public class MessagingTemplateModel
    {
        public string Id { get; set; }
        public int MessagingTypeId { get; set; }
        public string MessagingTemplateName { get; set; }
        public string HighlightColor { get; set; }
        public bool IsPublish { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
