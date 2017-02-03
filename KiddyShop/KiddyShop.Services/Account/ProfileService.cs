using KiddyShop.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KiddyShop.Account.Models;
using AutoMapper;
using KiddyShop.Services;

namespace KiddyShop.Account.Services
{
    public class ProfileService : BaseService, IProfileService
    {
        public ProfileService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public ProfileModel GetUserProfile(string userId)
        {
            Logger.Info($"UserId: {userId}");

            if (String.IsNullOrEmpty(userId))
                throw new ArgumentNullException("userId");

            Account.Models.Profile p = this.UnitOfWork.ProfileRepository.GetUserProfile(userId);

            if (p == null)
                throw new InvalidOperationException($"Profile.User {userId} does not exist.");

            var profileModel = Mapper.Map<Models.Profile, Models.ProfileModel>(p);

            try
            {
                profileModel.AvatarPhoto = this.UnitOfWork.UserAttachmentRepository.GetBase64UserAvatarPhoto(userId);
            }
            catch (InvalidOperationException ex)
            {
                // do nothing
            }


            return profileModel;
        }
    }
}
