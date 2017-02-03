using AutoMapper;
using KiddyShop.Domain;
using KiddyShop.Messaging.Models;
using KiddyShop.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Messaging.Services
{
    public class MessagingMessageService : BaseService, IMessagingMessageService
    {
        private readonly IMessagingDatabindingHelperService databindingHelper;

        public MessagingMessageService(IMessagingDatabindingHelperService databindingHelper, IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            this.databindingHelper = databindingHelper;
        }

        #region Override Methods
        public MessagingMessageModel GetMailMessage(Guid templateId, Dictionary<string, string> values)
        {
            MessagingTemplateContent messageTemplate = this.GetAvailableMessageTemplate(templateId);

            if (messageTemplate == null)
                throw new InvalidOperationException(String.Format("Invalid Email Template: {0}", templateId));

            MessagingMessage message = new MessagingMessage()
            {
                Id = Guid.NewGuid(),
                MessagingTemplateContentId = messageTemplate.Id,
                MessagingSubject = databindingHelper.bind(messageTemplate.MessagingSubject, values),
                MessagingFromName = databindingHelper.bind(messageTemplate.MessagingFromName, values),
                MessagingFromEmailAddress = databindingHelper.bind(messageTemplate.MessagingFromEmailAddress, values),
                MessagingTo = databindingHelper.bind(messageTemplate.MessagingTo, values),
                MessagingCc = databindingHelper.bind(messageTemplate.MessagingCc, values),
                MessagingBcc = databindingHelper.bind(messageTemplate.MessagingBcc, values),
                MessagingContent = databindingHelper.bind(messageTemplate.MessagingContent, values),
                Tags = messageTemplate.Tags,
                IsSent = false,
                IsMarkedAsRead = false,
                SentDate = null,
                CreatedDate = DateTime.UtcNow
            };

            this.UnitOfWork.MessagingMessageRepository.Insert(message);
            this.UnitOfWork.SaveChanges();

            MessagingMessageModel model = Mapper.Map<MessagingMessage, MessagingMessageModel>(message);
            return model;
        }

        public List<MessagingTemplateModel> GetMessagingTemplates()
        {
            List<MessagingTemplate> messagingTemplates = this.UnitOfWork.MessagingTemplateRepository.GetAll().OrderBy(x => x.MessagingTemplateName).ToList();
            List<MessagingTemplateModel> messagingTemplateDtos = AutoMapper.Mapper.Map<List<MessagingTemplate>, List<MessagingTemplateModel>>(messagingTemplates);
            return messagingTemplateDtos;
        }

        public GetMessagingTemplateModel GetMessagingContent()
        {
            GetMessagingTemplateModel messagingContentDto = new GetMessagingTemplateModel();
            messagingContentDto.MessagingTemplates = this.GetMessagingTemplates();

            return messagingContentDto;
        }

        public List<MessagingMessageModel> GetMessages()
        {
            List<MessagingMessage> messages = this.UnitOfWork.MessagingMessageRepository.GetAll().OrderByDescending(x => x.CreatedDate).ToList();
            List<MessagingMessageModel> messagingDtos = AutoMapper.Mapper.Map<List<MessagingMessage>, List<MessagingMessageModel>>(messages);
            return messagingDtos;
        }

        public GetMessageModel GetMessageTitles()
        {
            GetMessageModel messagesDto = new GetMessageModel();
            List<MessagingMessage> messageModels = this.UnitOfWork.MessagingMessageRepository.GetMessageTitles();
            List<MessagingMessageModel> messagingDtos = AutoMapper.Mapper.Map<List<MessagingMessage>, List<MessagingMessageModel>>(messageModels);

            int totalMessage = this.CountMessages();
            messagesDto.Messages = messagingDtos;
            messagesDto.Total = totalMessage;
            return messagesDto;
        }

        public int CountMessages()
        {
            return this.UnitOfWork.MessagingMessageRepository.CountMessages();
        }

        public GetTemplateContentList GetTemplateContentTitles(Guid templateId)
        {
            GetTemplateContentList templateContentTitleDto = new GetTemplateContentList();

            List<MessagingTemplateContent> templateContentModels = this.UnitOfWork.MessagingTemplateContentRepository.GetTemplateContentTitles(templateId);
            List<TemplateContentModel> templateContentDtos = Mapper.Map<List<MessagingTemplateContent>, List<TemplateContentModel>>(templateContentModels);

            templateContentTitleDto.TemplateId = templateId;
            templateContentTitleDto.TemplateName = this.UnitOfWork.MessagingTemplateRepository.GetAll().Where(x => x.Id == templateId).Select(x => x.MessagingTemplateName).FirstOrDefault();

            int total = this.CountTemplateContents(templateId);
            templateContentTitleDto.TemplateContentList = templateContentDtos;
            templateContentTitleDto.Total = total;

            return templateContentTitleDto;
        }

        public int CountTemplateContents(Guid templateId)
        {
            return this.UnitOfWork.MessagingTemplateContentRepository.CountTemplateContent(templateId);
        }

        public MessagingMessageModel GetMailMessage(Guid messageId)
        {
            MessagingMessage message = this.UnitOfWork.MessagingMessageRepository.GetById(messageId);
            MessagingMessageModel messageDto = AutoMapper.Mapper.Map<MessagingMessage, MessagingMessageModel>(message);

            return messageDto;
        }

        public TemplateContentModel GetMailTemplateContent(Guid contentId)
        {
            MessagingTemplateContent templateContent = this.UnitOfWork.MessagingTemplateContentRepository.GetById(contentId);
            TemplateContentModel contentDto = AutoMapper.Mapper.Map<MessagingTemplateContent, TemplateContentModel>(templateContent);

            return contentDto;

        }

        public TemplateContentModel SaveMailTemplateContent(TemplateContentModel contentDto)
        {
            if (contentDto != null)
            {
                if (contentDto.Id != null && contentDto.Id != Guid.Empty)
                {
                    MessagingTemplateContent templateContentEntity = AutoMapper.Mapper.Map<TemplateContentModel, MessagingTemplateContent>(contentDto);
                    this.UnitOfWork.MessagingTemplateContentRepository.Update(templateContentEntity, x => x.MessagingFromName, x => x.MessagingFromEmailAddress, x => x.MessagingTo, x => x.MessagingCc, x => x.MessagingBcc, x => x.MessagingSubject, x => x.MessagingContent, x => x.Tags, x => x.Lang, x => x.IsPublish, x => x.FromDate, x => x.EndDate, x => x.MessagingTemplateId);
                }
                else
                {
                    contentDto.Id = Guid.NewGuid();
                    contentDto.CreatedDate = DateTime.UtcNow;
                    MessagingTemplateContent templateContentEntity = AutoMapper.Mapper.Map<TemplateContentModel, MessagingTemplateContent>(contentDto);
                    this.UnitOfWork.MessagingTemplateContentRepository.Insert(templateContentEntity);
                }

                this.UnitOfWork.SaveChanges();

                return GetMailTemplateContent(contentDto.Id);
            }
            else
            {
                throw new NullReferenceException();
            }
        }
        #endregion
        #region Private Methods
        private MessagingTemplateContent GetAvailableMessageTemplate(Guid templateId)
        {
            DateTime today = DateTime.UtcNow;
            MessagingTemplateContent messageContent = this.UnitOfWork.MessagingTemplateContentRepository.GetAll().Where(x => x.MessagingTemplateId == templateId && x.IsPublish == true && x.FromDate < today && (x.EndDate == null || x.EndDate > today)).FirstOrDefault();
            return messageContent;
        }
        #endregion

    }
}
