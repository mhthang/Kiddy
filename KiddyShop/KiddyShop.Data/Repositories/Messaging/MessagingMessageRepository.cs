using KiddyShop.Data.EntityFramework;
using KiddyShop.Data.Repositories;
using KiddyShop.Messaging.Models;
using System.Collections.Generic;
using System.Linq;

namespace KiddyShop.Messaging.Repositories
{
    public class MessagingMessageRepository : Repository<MessagingMessage, System.Guid>, IMessagingMessageRepository
    {
        public MessagingMessageRepository(IKSDataContext context) : base(context)
        {
        }

        public int CountMessages()
        {
            int count = 0;
            count = this.GetAll().Count(x => x.Id != null);
            return count;
        }

        public List<MessagingMessage> GetMessageTitles()
        {
            var query = (from m in this.DataContext.Set<MessagingMessage>()
                         join tc in this.DataContext.Set<MessagingTemplateContent>() on m.MessagingTemplateContentId equals tc.Id
                         join t in this.DataContext.Set<MessagingTemplate>() on tc.MessagingTemplateId equals t.Id
                         orderby m.CreatedDate descending
                         select m).Take(20).ToList();

            return query;
        }
    }
}