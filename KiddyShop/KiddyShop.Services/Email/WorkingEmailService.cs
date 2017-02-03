using KiddyShop.Domain;
using KiddyShop.Messaging.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Email
{
    public class WorkingEmailService : EmailServiceBase, IWorkingEmailService
    {
        public WorkingEmailService(ISendMailProvider provider, IMessagingMessageService msgService, IUnitOfWork unitOfWork) : base(provider, msgService, unitOfWork)
        {
        }

        public async Task SendEmailConfig(string email, string callBackUrl)
        {
            var emailTemplateId = Guid.Parse(System.Configuration.ConfigurationManager.AppSettings["registerEmailTemplate:Id"]);

            Dictionary<string, string> values = new Dictionary<string, string>();
            values.Add("{{emailAddress}}", email);
            values.Add("{{callbackUrl}}", callBackUrl);

            Logger.Debug($"Sending Config Email Template *{emailTemplateId}*");

            if (emailTemplateId == null || emailTemplateId == Guid.Empty)
                throw new ArgumentNullException("emailTemplateId");

            Logger.Debug($"Sending Config Email Template *{emailTemplateId}*");

            await this.SendAsync(emailTemplateId, values);
        }

        public async Task SendTestEmail(Guid emailTemplateId, Dictionary<string, string> values)
        {
            Logger.Debug($"Sending Email Template *{emailTemplateId}*");

            if (emailTemplateId == null || emailTemplateId == Guid.Empty)
                throw new ArgumentNullException("emailTemplateId");

            Logger.Debug($"Sending Email Template *{emailTemplateId}*");

            await this.SendAsync(emailTemplateId, values);
        }

        public async Task SendForgotPasswordEmail(string emailAddress, string callbackUrl)
        {
            Guid templateId = Guid.Parse(System.Configuration.ConfigurationManager.AppSettings["forgotPasswordEmailTemplate:Id"]);

            Dictionary<string, string> values = new Dictionary<string, string>();
            values.Add("{{emailAddress}}", emailAddress);
            values.Add("{{callbackUrl}}", callbackUrl);

            if (templateId == null || templateId == Guid.Empty)
                throw new ArgumentNullException("emailTemplateId");

            Logger.Debug($"Sending Forgot Password Email *{templateId}*");
            await this.SendAsync(templateId, values);
        }

    }
}
