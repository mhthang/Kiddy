using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KiddyShop.Account.Models;
using KiddyShop.Services;
using KiddyShop.Application.Models;

namespace KiddyShop.Account.Services
{
    public interface IProfileService : IBaseService
    {
        ProfileModel GetUserProfile(string userId);
        void UpdateUserProfile(Models.ProfileModel model);
        void ChangeUserAvatarPhoto(String userId, UserPhoto userPhoto);
        void ChangeUserAvatarPhoto(string userId, string fileName, ATTACHMENT_TYPE type, decimal fileSize, string base64PhotoData);
        KiddyShop.Models.ViewModel.ListRoleGroupsViewModel GetRoleGroupMergeUserGroupByIdUser(string idUser);
        void UpdateUserRoleGroups(List<KiddyShop.Models.ViewModel.RoleGroupViewModel> model, string idUser);
        void CreateUserGroupsClientRoleByIdUser(string idUser);
    }
}
