using KiddyShop.Domain;
using KiddyShop.Messaging.Models;
using System;
using System.Collections.Generic;

namespace KiddyShop.Messaging
{
    public interface IMessagingTemplateRepository : IRepository<MessagingTemplate, Guid>
    {
        List<MessagingTemplate> GetMessageTemplates(int type);
    }
}
