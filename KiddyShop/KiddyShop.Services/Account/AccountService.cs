using KiddyShop.Common.Models;
using KiddyShop.Domain;
using KiddyShop.Models.Account;
using KiddyShop.Services;
using KiddyShop.WebSecurity.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;

namespace KiddyShop.Account.Services
{
    public class AccountService : BaseService, IAccountService
    {
        public AccountService(IUnitOfWork unitOfWork) : base(unitOfWork)
        { }
        public SearchResponse<UserProfileModel> SearchUserProfile(SearchRequest request)
        {
            if (request == null)
                throw new System.ArgumentNullException("request");

            if (request.Pager == null)
                request.Pager = this.GetDefaultPager();

            Logger.Debug($"Search: {request.FilterText}. UserType: ${request.FilterId}");

            SearchResponse<UserProfileModel> response = new SearchResponse<UserProfileModel>();

            int? userType = null;
            if (!String.IsNullOrEmpty(request.Tag))
                userType = int.Parse(request.Tag);

            List<Models.Account> accounts = this.UnitOfWork.AccountRepository.SearchAccount(request.FilterText, userType, request.Pager.PageIndex - 1, request.Pager.PageSize);
            response.Total = this.UnitOfWork.AccountRepository.CountAccount(request.FilterText, userType);

            var userProfiles = accounts.Select(x => new UserProfileModel
            {
                Id = x.Profile.UserId,
                FirstName = x.Profile.FirstName,
                LastName = x.Profile.LastName,
                Email = x.Profile.Email,
                UserName = x.Profile.Email,
                Phone = x.Profile.Phone,
                ProfileId = x.ProfileId,
                UserType = x.Profile.UserType,
                ProfileType = x.Profile.ProfileType,
                AvatarPhotoUrl = x.Profile.AvatarPhotoUrl
            }).ToList();

            foreach (UserProfileModel user in userProfiles)
            {
                try
                {
                    user.AvatarPhoto = this.UnitOfWork.UserAttachmentRepository.GetBase64UserAvatarPhoto(user.Id);
                }
                catch (InvalidOperationException ex)
                {
                    // do nothing
                }
            }

            response.Records = userProfiles;
            response.Pager = request.Pager;

            return response;
        }
        public bool CreateAccountProfileForUser(string userId)
        {
            try
            {
                if (String.IsNullOrEmpty(userId))
                    throw new System.ArgumentNullException("userId");
                string clientRoleGroupId = System.Configuration.ConfigurationManager.AppSettings["ClientRoleGroups:Id"];
                Guid idRoleClient;
                if (!Guid.TryParse(clientRoleGroupId, out idRoleClient))
                {
                    Logger.Error($"Wrong Role Group Client ID ({clientRoleGroupId}). Check your AppSettings.config for key 'ClientRoleGroups:Id'.");
                    throw new InvalidOperationException($"Wrong Role Group Client ID ({clientRoleGroupId}). Check your AppSettings.config for key 'ClientRoleGroups:Id'.");
                }
                //Models.Account account = this.UnitOfWork.AccountRepository.CreateAccountProfileForUser(userId, idRoleClient);
                Models.Account account=null;
                if (account == null) return false;
                this.UnitOfWork.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);
                return false;
            }
        }

        public object LoginReturnToken(Signin model)
        {
            var tokenEndPoint = string.Concat(Security.Commons.Constants.CONFIGURATION_ISSUER, Security.Commons.Constants.CONFIGURATION_TOKEN_ENDPOINT);
            var content = string.Format("grant_type=password&username={0}&password={1}", model.UserName, model.Password);
            var client = new System.Net.Http.HttpClient();
            var response = client.PostAsync(tokenEndPoint, new StringContent(content, Encoding.UTF8, "application/x-www-form-urlencoded")).Result;
            var jsonObj = JsonConvert.DeserializeObject(response.Content.ReadAsStringAsync().Result);
            return jsonObj;
        }

        public void SoftDeleteAccountByIdUser(string idUser)
        {
            Logger.Info(idUser);
            if (String.IsNullOrEmpty(idUser))
            {
                throw new System.ArgumentNullException("userId");
            }
            var account = this.UnitOfWork.AccountRepository.GetAccountByUserId(idUser);
            account.IsActive = false;
            //account.Profile.IsDeleted = account.IsDeleted = true;
            this.UnitOfWork.AccountRepository.Update(account);
            this.UnitOfWork.SaveChanges();
        }
    }
}