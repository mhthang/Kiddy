using KiddyShop.Data.EntityFramework;
using KiddyShop.Data.Repositories;
using KiddyShop.Messaging.Models;

namespace KiddyShop.Messaging.Repositories
{
    public class MessagingDataMappingRepository : Repository<MessagingDataMapping, System.Guid>, IMessagingDataMappingRepository
    {
        public MessagingDataMappingRepository(IKSDataContext context) : base(context)
        {
        }
    }
}