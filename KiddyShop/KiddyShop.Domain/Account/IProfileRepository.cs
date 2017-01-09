using KiddyShop.Domain;
using System;

namespace KiddyShop.Account
{
    public interface IProfileRepository : IRepository<Account.Models.Profile, System.Guid>
    {
        Models.Profile GetUserProfile(string userId);

        void UpdateUserProfile(Guid profileId, string firstName, string lastName, string lang, string countryCode, string timezoneCode, Models.USER_TYPE userType, Models.PROFILE_TYPE profileType);

        Models.User GetUserByUserId(string userId);

        void DeleteUserGroupByIdUserAndIdRoleGroup(string idUser, Guid idRoleGroup);

        void CreateUserGroupBuIdUserAndIdRoleGroup(string idUser, Guid idRoleGroup);
    }
}
