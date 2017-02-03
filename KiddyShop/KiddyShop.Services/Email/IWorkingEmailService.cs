using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Email
{
    public interface IWorkingEmailService : IEmailService
    {
        Task SendTestEmail(Guid emailTemplateId, Dictionary<string, string> values);
        Task SendEmailConfig(string email, string callBackUrl);
        Task SendForgotPasswordEmail(string emailAddress, string callbackUrl);
    }
}
