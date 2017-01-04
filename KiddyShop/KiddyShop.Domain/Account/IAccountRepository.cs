using KiddyShop.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Account
{
    public interface IAccountRepository : IRepository<Account.Models.Account, System.Guid>
    {
        List<Models.Account> SearchAccount(string filter, int? userTypeId, int pageIndex, int pageSize);
        int CountAccount(string filter, int? userTypeId);

        Models.Account CreateAccountProfileForUser(String userId);

        Models.Account GetAccountByUserId(String userId);
    }
}
