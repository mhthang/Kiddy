using KiddyShop.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Messaging.Services
{
    public interface IMessagingDatabindingHelperService : IBaseService
    {
        String bind(String source, Dictionary<string, string> values);
    }
}
