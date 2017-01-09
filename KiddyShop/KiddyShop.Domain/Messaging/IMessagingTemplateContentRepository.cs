using KiddyShop.Domain;
using KiddyShop.Messaging.Models;
using System;
using System.Collections.Generic;

namespace KiddyShop.Messaging
{
    public interface IMessagingTemplateContentRepository : IRepository<MessagingTemplateContent, Guid>
    {
        List<MessagingTemplateContent> GetTemplateContentTitles(Guid templateId);
        int CountTemplateContent(Guid templateId);
    }
}
