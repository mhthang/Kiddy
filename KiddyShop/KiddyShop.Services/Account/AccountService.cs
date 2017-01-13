using KiddyShop.Domain;
using KiddyShop.Services;
using KiddyShop.WebSecurity.Models;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;

namespace KiddyShop.Account.Services
{
    public class AccountService : BaseService, IAccountService
    {
        public AccountService(IUnitOfWork unitOfWork) : base(unitOfWork)
        { }

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