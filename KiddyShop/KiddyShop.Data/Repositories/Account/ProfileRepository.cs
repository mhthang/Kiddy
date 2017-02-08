using KiddyShop.Account.Models;
using KiddyShop.Data.EntityFramework;
using KiddyShop.Data.Repositories;
using System;
using System.Linq;

namespace KiddyShop.Account.Repositories
{
    public class ProfileRepository : Repository<Account.Models.Profile, System.Guid>, IProfileRepository
    {
        public ProfileRepository(IKSDataContext context) : base(context)
        { }

        public void CreateUserGroupByIdUserAndIdRoleGroup(string idUser, Guid idRoleGroup)
        {
            try
            {
                Models.User user = this.DataContext.Get<Models.User>().Where(x => x.Id == idUser).FirstOrDefault();
                if (user == null)
                {
                    throw new ArgumentNullException($"The system don't have the userId: {idUser}");
                }
                Models.RoleGroup role = this.DataContext.Get<Models.RoleGroup>().Where(x => x.Id == idRoleGroup).FirstOrDefault();
                if (role == null)
                {
                    throw new ArgumentNullException($"The system don't have the roleId: {idRoleGroup}");
                }
                user.RoleGroups.Add(role);
                this.DataContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void DeleteUserGroupByIdUserAndIdRoleGroup(string idUser, Guid idRoleGroup)
        {
            try
            {
                Models.User user = this.DataContext.Get<Models.User>().Where(x => x.Id == idUser).FirstOrDefault();
                var result = user.RoleGroups.Remove(user.RoleGroups.Where(x => x.Id == idRoleGroup).FirstOrDefault());
                this.DataContext.Update<Models.User, string>(user, x => x.RoleGroups);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public User GetUserByUserId(string userId)
        {
            if (userId == null)
            {
                throw new ArgumentNullException("userId");
            }

            Models.User u = this.DataContext.Get<Models.User>().Where(x => x.Id == userId).FirstOrDefault();

            return u;
        }

        public Profile GetUserProfile(string userId)
        {
            var profile = this.GetAll().Where(x => (!string.IsNullOrEmpty(x.UserId) && x.UserId.Equals(userId, StringComparison.OrdinalIgnoreCase))).FirstOrDefault();
            return profile;
        }

        public void UpdateUserProfile(Guid profileId, string firstName, string lastName, string lang, string mobile,string phone , string countryCode, string timezoneCode, USER_TYPE userType, PROFILE_TYPE profileType)
        {
            if (profileId == null || profileId == Guid.Empty)
                throw new ArgumentNullException("profileId");
            Models.Profile profile = this.GetById(profileId);
            if (profile == null)
                throw new InvalidOperationException($"Profile ({profileId}) doest not exist.");

            if (profile.IsDeleted)
                throw new InvalidOperationException($"Profile ({profileId}) has been deleted.");
            profile.FirstName = firstName;
            profile.LastName = lastName;
            profile.Lang = lang;
            profile.CountryCode = countryCode;
            profile.TimezoneCode = timezoneCode;
            profile.UserType = userType;
            profile.Mobile = mobile;
            profile.Phone = phone;
            profile.ProfileType = profileType;
            this.DataContext.Update<Models.Profile, Guid>(profile, x => x.FirstName, x => x.LastName, x => x.Lang, x => x.CountryCode, x => x.TimezoneCode);
        }
    }
}