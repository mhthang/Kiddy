using KiddyShop.Account.Models;
using KiddyShop.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KiddyShop.Application.Models;
using KiddyShop.Data.EntityFramework;

namespace KiddyShop.Account.Repositories
{
    public class UserAttachmentRepository : Repository<UserAttachment, System.Guid>, IUserAttachmentRepository
    {
        public UserAttachmentRepository(IKSDataContext context) : base(context)
        {
        }
        public void ChangeUserAvatarPhoto(string userId, string fileName, ATTACHMENT_TYPE type, decimal fileSize, string base64PhotoData)
        {
            if (String.IsNullOrEmpty(userId))
                throw new ArgumentNullException("userId");

            if (String.IsNullOrEmpty(base64PhotoData))
                throw new ArgumentNullException("base64PhotoData");

            int existing = this.GetAll().Count(x => (!String.IsNullOrEmpty(x.UserId) && x.UserId.Equals(userId, StringComparison.OrdinalIgnoreCase)) && (!x.IsDeleted.HasValue || (x.IsDeleted.HasValue && !x.IsDeleted.Value)));

            if (existing > 0)
            {
                List<UserAttachment> attachments = this.GetAll().Where(x => (!String.IsNullOrEmpty(x.UserId) && x.UserId.Equals(userId, StringComparison.OrdinalIgnoreCase)) && (!x.IsDeleted.HasValue || (x.IsDeleted.HasValue && !x.IsDeleted.Value))).ToList();
                foreach (UserAttachment ua in attachments)
                {
                    ua.IsActive = false;

                    this.DataContext.Update<UserAttachment, Guid>(ua, x => x.IsActive);
                }

            }

            UserAttachment attachment = new UserAttachment()
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow,
                FileName = fileName,
                FileSize = fileSize,
                IsBase64Format = true,
                PhotoBase64Data = base64PhotoData,
                UserId = userId,
                IsActive = true,
                IsDeleted = false
            };

            this.DataContext.Insert<UserAttachment>(attachment);
        }

        public String GetBase64UserAvatarPhoto(string userId)
        {
            UserAttachment userAttachment = this.GetAll().Where(x=> (!String.IsNullOrEmpty(x.UserId) && x.UserId.Equals(userId, StringComparison.OrdinalIgnoreCase))).FirstOrDefault();
            if (userAttachment == null)
                throw new InvalidOperationException($"Attachment - Not Found - User:{userId}");

            return userAttachment.PhotoBase64Data;
        }
    }
}
