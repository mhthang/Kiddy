using KiddyShop.Domain;
using KiddyShop.Messaging.Models;
using KiddyShop.Messaging.Services;
using KiddyShop.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Email
{
    public class EmailServiceBase : BaseService
    {
        public ISendMailProvider Sender { get; set; }

        public IMessagingMessageService MessagingMessageService { get; set; }

        public EmailServiceBase(ISendMailProvider provider, IMessagingMessageService msgService, IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            this.Sender = provider;
            this.MessagingMessageService = msgService;
        }

        public MessagingMessageModel GetEmailMessage(Guid templateId, Dictionary<string, string> values)
        {
            MessagingMessageModel message = this.MessagingMessageService.GetMailMessage(templateId, values);
            return message;
        }

        private void UpdateMessagingMessage(MessagingMessageModel message)
        {
            MessagingMessage msg = new MessagingMessage()
            {
                Id = message.Id,
                EmailDeliveryProvider = Sender.ToString(),
                IsSent = true,
                SentDate = DateTime.UtcNow
            };

            this.UnitOfWork.MessagingMessageRepository.Update(msg, x => x.IsSent, x => x.SentDate, x => x.EmailDeliveryProvider);
            this.UnitOfWork.SaveChanges();
        }

        public async Task SendAsync(Guid templateId, Dictionary<string, string> values)
        {
            MessagingMessageModel message = this.GetEmailMessage(templateId, values);

            Logger.Debug(String.Format("Sending Email *{0}* to *{1}*", message.MessagingSubject, message.MessagingTo));

            await this.SendAsync(message);

            Logger.Debug(String.Format("Email *{0}* sent to *{1}*", message.MessagingSubject, message.MessagingTo));
        }

        public async Task SendAsync(MessagingMessageModel mailMessage)
        {
            Logger.Debug(String.Format("{0} is sending email *{1}* to *{2}*", Sender.ToString(), mailMessage.MessagingSubject, mailMessage.MessagingTo));

            await Sender.SendAsync(mailMessage);
            this.UpdateMessagingMessage(mailMessage);

            Logger.Debug(String.Format("{0} sent email *{1}* to *{2}*", Sender.ToString(), mailMessage.MessagingSubject, mailMessage.MessagingTo));
        }
    }
}
