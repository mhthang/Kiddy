using KiddyShop.Messaging.Models;
using log4net;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Email
{
    public class GmailProvider : ISendMailProvider
    {
        public ILog Logger { get; set; }

        public async Task SendAsync(MessagingMessageModel mailMessage)
        {
            if (mailMessage == null)
                throw new ArgumentNullException("mailMessage");

            MailMessage msg = new MailMessage(
                mailMessage.MessagingFromEmailAddress,
                mailMessage.MessagingTo,
                mailMessage.MessagingSubject,
                mailMessage.MessagingContent);

            string providerServerUrl = System.Configuration.ConfigurationManager.AppSettings["gmail:Host"];
            int providerServerPort = int.Parse(System.Configuration.ConfigurationManager.AppSettings["gmail:Port"]);
            string displayName = System.Configuration.ConfigurationManager.AppSettings["gmail:DisplayName"];
            string username = System.Configuration.ConfigurationManager.AppSettings["gmail:CredentialUserName"];
            string passworkHash = System.Configuration.ConfigurationManager.AppSettings["gmail:CredentialPasswordHash"];
            string securityStamp = System.Configuration.ConfigurationManager.AppSettings["gmail:SecurityStamp"];
            string password = Commons.Crypto.DecryptStringAES(passworkHash, securityStamp);
            bool enableSsl = bool.Parse(System.Configuration.ConfigurationManager.AppSettings["gmail:EnableSsl"]);

            Logger.Info(String.Format("{0} ({1}:{2}) is using {3} to send email.", this.ToString(), providerServerUrl, providerServerPort, username));

            if (msg.From == null)
            {
                msg.From = new MailAddress(username, displayName);
            }

            using (var smtpClient = new SmtpClient(providerServerUrl))
            {
                smtpClient.Credentials = new System.Net.NetworkCredential(username, password);
                smtpClient.EnableSsl = enableSsl;
                smtpClient.Port = providerServerPort;
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;

                //smtpClient.SendCompleted += SmtpClientSendCompleted;
                //var userState = msg; 
                //Task t = new Task(() => smtpClient.SendAsync(msg, userState));

                smtpClient.Send(msg);

                MailAddress mail = msg.To.FirstOrDefault();
                if (mail != null)
                    Logger.Info(String.Format("Email Send: {0}", mail.Address));

                //await t;
            }
        }

        private void SmtpClientSendCompleted(object sender, AsyncCompletedEventArgs e)
        {
            var smtpClient = (SmtpClient)sender;
            MailMessage callbackMailMessage = e.UserState as MailMessage;
            var recipientEmail = (string)callbackMailMessage.To[0].Address;
            smtpClient.SendCompleted -= SmtpClientSendCompleted;

            if (e.Error != null)
            {
                Logger.Error(string.Format("Message sending for \"{0}\" failed. {1}", recipientEmail, e.Error.Message));
            }
            else
            {
                Logger.Error(string.Format("Message sending for \"{0}\" successful.", recipientEmail));
            }

            // Cleaning up resources
            smtpClient.Dispose();
            callbackMailMessage.Dispose();
        }

        public override string ToString()
        {
            return "Gmail";
        }
    }
}
