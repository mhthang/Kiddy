using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Security.Services
{
    public class EmailService : IIdentityMessageService
    {
        public async Task SendAsync(IdentityMessage message)
        {
            await configSendGridasync(message);
        }

        private async Task configSendGridasync(IdentityMessage message)
        {
            if (message == null)
                throw new ArgumentNullException("message");

            /*var myMessage = new SendGridMessage();

            myMessage.AddTo(message.Destination);
            myMessage.From = new System.Net.Mail.MailAddress(Common.BaseConstants.CONFIGURATION_EMAIL_SERVICE_EMAIL_ADDRESS, 
                                                             Common.BaseConstants.CONFIGURATION_EMAIL_SERVICE_DISPLAY_NAME);
            myMessage.Subject = message.Subject;
            myMessage.Text = message.Body;
            myMessage.Html = message.Body;

            var credentials = new NetworkCredential(Common.BaseConstants.CONFIGURATION_EMAIL_SERVICE_ACCOUNT,
                                                    Common.BaseConstants.CONFIGURATION_EMAIL_SERVICE_PASSWORD);

            var transportWeb = new Web(credentials);

            if (transportWeb != null)
            {
                await transportWeb.DeliverAsync(myMessage);
            }
            else
            {
                await Task.FromResult(0);
            }*/
        }
    }
}
