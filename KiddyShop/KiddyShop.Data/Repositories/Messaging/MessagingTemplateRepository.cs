using KiddyShop.Data.EntityFramework;
using KiddyShop.Data.Repositories;
using KiddyShop.Messaging.Models;
using System.Collections.Generic;
using System.Linq;

namespace KiddyShop.Messaging.Repositories
{
    internal class MessagingTemplateRepository : Repository<MessagingTemplate, System.Guid>, IMessagingTemplateRepository
    {
        public MessagingTemplateRepository(IKSDataContext context) : base(context)
        {
        }

        public List<MessagingTemplate> GetMessageTemplates(int type)
        {
            List<MessagingTemplate> templates = this.GetAll().Where(x => x.IsPublish == true && x.MessagingTypeId == type).ToList();

            return templates;
        }
    }
}