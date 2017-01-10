using System;
using System.Collections.Generic;

namespace KiddyShop.Messaging.Models
{
    public class GetTemplateContentList
    {
        public Guid TemplateId { get; set; }
        public String TemplateName { get; set; }
        public int Total { get; set; }
        public List<TemplateContentModel> TemplateContentList { get; set; }
    }
}
