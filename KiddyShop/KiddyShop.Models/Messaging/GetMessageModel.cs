using System;
using System.Collections.Generic;

namespace KiddyShop.Messaging.Models
{
    public class GetMessageModel
    {
        public int Total { get; set; }
        public List<MessagingMessageModel> Messages { get; set; }
    }
}
