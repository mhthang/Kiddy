using KiddyShop.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KiddyShop.Account.Models;
using AutoMapper;
using KiddyShop.Services;
using KiddyShop.Application.Models;

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

        public void UpdateUserProfile(Models.ProfileModel model)
        {
            if (model == null)
                throw new ArgumentNullException("model");

            Logger.Info($"ProfileId: {model.Id}");

            this.UnitOfWork.ProfileRepository.UpdateUserProfile(model.Id, model.FirstName, model.LastName, model.Lang, model.CountryCode, model.TimezoneCode, (Models.USER_TYPE)model.UserType, (Models.PROFILE_TYPE)model.ProfileType);
            this.UnitOfWork.SaveChanges();
        }

        public void ChangeUserAvatarPhoto(String userId, UserPhoto userPhoto)
        {
            this.ChangeUserAvatarPhoto(userId, userPhoto.FileName, userPhoto.FileType, userPhoto.FileSize, userPhoto.PhotoBase64Data);
        }

        public void ChangeUserAvatarPhoto(string userId, string fileName, ATTACHMENT_TYPE type, decimal fileSize, string base64PhotoData)
        {
            Logger.Info($"UserId: {userId}");

            if (String.IsNullOrEmpty(userId))
                throw new ArgumentNullException("userId");

            this.UnitOfWork.UserAttachmentRepository.ChangeUserAvatarPhoto(userId, fileName, type, fileSize, base64PhotoData);
            this.UnitOfWork.SaveChanges();
        }

        public KiddyShop.Models.ViewModel.ListRoleGroupsViewModel GetRoleGroupMergeUserGroupByIdUser(string idUser)
        {
            try
            {
                Logger.Info($"idUser: {idUser}");

                if (String.IsNullOrEmpty(idUser))
                    throw new ArgumentNullException("idUser");

                var roleGroups = this.UnitOfWork.RoleGroupRepository.GetAll().Where(x => x.IsDeleted == false)
                    .Select(x => new KiddyShop.Models.ViewModel.RoleGroupViewModel { RoleId = x.Id.ToString(), RoleName = x.Name, IsChecked = false, IsActiveAgo = false }).ToList();
                var userGroups = this.UnitOfWork.ProfileRepository.GetUserByUserId(idUser).RoleGroups.ToList();
                for (int i = 0; i < userGroups.Count; i++)
                {
                    for (int j = 0; j < roleGroups.Count; j++)
                        if (!roleGroups[j].IsActiveAgo && userGroups[i].Id == Guid.Parse(roleGroups[j].RoleId))
                        {
                            roleGroups[j].IsActiveAgo = true;
                            roleGroups[j].IsChecked = true;
                            break;
                        }
                }
                KiddyShop.Models.ViewModel.ListRoleGroupsViewModel result = new KiddyShop.Models.ViewModel.ListRoleGroupsViewModel { RoleGroups = roleGroups, IdUser = idUser };
                return result;
            }
            catch (Exception ex)
            {
                Logger.Error(ex.ToString());
                throw;
            }
        }

        public void UpdateUserRoleGroups(List<KiddyShop.Models.ViewModel.RoleGroupViewModel> model, string idUser)
        {
            Logger.Info($"Update user Role Groups with role: {model} and UserId: {idUser}");
            try
            {
                if (String.IsNullOrEmpty(idUser))
                    throw new ArgumentNullException("userId");
                List<KiddyShop.Models.ViewModel.RoleGroupViewModel> listActiveAgo = new List<KiddyShop.Models.ViewModel.RoleGroupViewModel>();
                for (int i = 0; i < model.Count; i++)
                {
                    if (model[i].IsActiveAgo && !model[i].IsChecked)
                    {
                        //delete
                        this.UnitOfWork.ProfileRepository.DeleteUserGroupByIdUserAndIdRoleGroup(idUser, Guid.Parse(model[i].RoleId));
                    }
                    else if (!model[i].IsActiveAgo && model[i].IsChecked)
                    {
                        //Add
                        this.UnitOfWork.ProfileRepository.CreateUserGroupByIdUserAndIdRoleGroup(idUser, Guid.Parse(model[i].RoleId));

                    }
                }
                this.UnitOfWork.SaveChanges();
            }
            catch (Exception ex)
            {
                Logger.Error(ex.ToString());
                throw;
            }
        }

        public void CreateUserGroupsClientRoleByIdUser(string idUser)
        {
            Logger.Info($"Create UserId: {idUser}");
            try
            {
                if (String.IsNullOrEmpty(idUser))
                    throw new ArgumentNullException("userId");
                string clientRoleGroupId = System.Configuration.ConfigurationManager.AppSettings["ClientRoleGroups:Id"];
                Guid idRoleClient = Guid.Parse(clientRoleGroupId);
                if (idRoleClient == Guid.Empty)
                {
                    Logger.Error($"Wrong Role Group Client ID ({clientRoleGroupId}). Check your AppSettings.config for key 'ClientRoleGroups:Id'.");
                    throw new InvalidOperationException($"Wrong Role Group Client ID ({clientRoleGroupId}). Check your AppSettings.config for key 'ClientRoleGroups:Id'.");
                }
                this.UnitOfWork.ProfileRepository.CreateUserGroupByIdUserAndIdRoleGroup(idUser, idRoleClient);
                this.UnitOfWork.SaveChanges();
            }
            catch (Exception ex)
            {
                Logger.Error(ex.ToString());
                throw;
            }
        }
    }
}
