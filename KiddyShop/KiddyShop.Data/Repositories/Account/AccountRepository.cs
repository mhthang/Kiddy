using KiddyShop.Data.EntityFramework;
using KiddyShop.Data.Repositories;
using System;
using System.Collections.Generic;

namespace KiddyShop.Account.Repositories
{
    public class AccountRepository : Repository<Account.Models.Account, System.Guid>, IAccountRepository
    {
        public AccountRepository(IKSDataContext context) : base(context)
        {
        }

        public int CountAccount(string filter, int? userTypeId)
        {
            throw new NotImplementedException();
        }

        public Models.Account CreateAccountProfileForUser(string userId)
        {
            throw new NotImplementedException();
        }

        public Models.Account GetAccountByUserId(string userId)
        {
            throw new NotImplementedException();
        }

        public List<Models.Account> SearchAccount(string filter, int? userTypeId, int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }
    }
}