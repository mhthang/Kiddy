using KiddyShop.Domain;
using KiddyShop.Messaging.Models;
using System;

namespace KiddyShop.Messaging
{
    public interface IMessagingDataMappingRepository : IRepository<MessagingDataMapping, Guid>
    {
    }
}
