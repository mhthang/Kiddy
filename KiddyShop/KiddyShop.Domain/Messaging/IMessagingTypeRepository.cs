using KiddyShop.Domain;
using KiddyShop.Messaging.Models;
using System;
using System.Collections.Generic;

namespace KiddyShop.Messaging
{
    public interface IMessagingTypeRepository : IRepository<MessagingType, int>
    {
    }
}
