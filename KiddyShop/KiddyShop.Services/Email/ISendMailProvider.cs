using KiddyShop.Messaging.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Email
{
    public interface ISendMailProvider
    {
        Task SendAsync(MessagingMessageModel mailMessage);
    }
}
