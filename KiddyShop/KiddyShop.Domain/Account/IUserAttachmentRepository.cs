using KiddyShop.Domain;
using KiddyShop.Account.Models;
using System;
using System.Collections.Generic;
using KiddyShop.Application.Models;

namespace KiddyShop.Account
{
    public interface IUserAttachmentRepository : IRepository<UserAttachment, System.Guid>
    {
        String GetBase64UserAvatarPhoto(string userId);
        void ChangeUserAvatarPhoto(string userId, string fileName, ATTACHMENT_TYPE type, decimal fileSize, string base64PhotoData);
    }
}
