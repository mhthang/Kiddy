using System;

namespace KiddyShop.Messaging.Models
{
    public class MessagingMessageModel
    {
        public MessagingMessageModel()
        {
            Checked = false;
        }

        public Guid Id { get; set; }
        public string MessagingTemplateContentId { get; set; }
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

        public string TemplateName { get; set; }
        public string HighlightColor { get; set; }
        public bool Checked { get; set; }
    }
}
