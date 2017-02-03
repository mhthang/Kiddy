using KiddyShop.Common.Models;
using KiddyShop.Models.Account;
using KiddyShop.Services;
using KiddyShop.WebSecurity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Account.Services
{
    public interface IAccountService : IBaseService
    {
        bool CreateAccountProfileForUser(String userId);

        SearchResponse<UserProfileModel> SearchUserProfile(SearchRequest request);

        Object LoginReturnToken(Signin model);

        void SoftDeleteAccountByIdUser(string idUser);
    }
}
