using KiddyShop.Account;
using KiddyShop.Application;
using KiddyShop.Community;
using KiddyShop.Messaging;

namespace KiddyShop.Domain
{
    public interface IUnitOfWork
    {
        int SaveChanges();
        IAppClaimRepository AppClaimRepository { get; }
        IAppFunctionRepository AppFunctionRepository { get; }
        IRoleGroupRepository RoleGroupRepository { get; }

        ICountryRepository CountryRepository { get; }
        ITimezoneRepository TimezoneRepository { get; }

        IUserAttachmentRepository UserAttachmentRepository { get; }

        IProfileRepository ProfileRepository { get; }
        IAccountRepository AccountRepository { get; }

        IPostCategoryRepository PostCategoryRepository { get; }

        IMessagingDataMappingRepository MessagingDataMappingRepository { get; }
        IMessagingMessageRepository MessagingMessageRepository { get; }
        IMessagingTemplateContentRepository MessagingTemplateContentRepository { get; }
        IMessagingTemplateRepository MessagingTemplateRepository { get; }
        IMessagingTypeRepository MessagingTypeRepository { get; }
    }
}