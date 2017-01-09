using KiddyShop.Domain;
using KiddyShop.Messaging.Models;
using System;
using System.Collections.Generic;

namespace KiddyShop.Messaging
{
    public interface IMessagingMessageRepository : IRepository<MessagingMessage, Guid>
    {
        List<MessagingMessage> GetMessageTitles();
        int CountMessages();
    }
}
