using KiddyShop.Data.EntityFramework;
using KiddyShop.Data.Repositories;
using KiddyShop.Messaging.Models;

namespace KiddyShop.Messaging.Repositories
{
    public class MessagingTypeRepository : Repository<MessagingType, int>, IMessagingTypeRepository
    {
        public MessagingTypeRepository(IKSDataContext context) : base(context)
        {
        }
    }
}