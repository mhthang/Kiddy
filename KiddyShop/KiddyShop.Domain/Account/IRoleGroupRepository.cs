using KiddyShop.Domain;
using KiddyShop.Account.Models;
using System;
using System.Collections.Generic;

namespace KiddyShop.Account
{
    public interface IRoleGroupRepository : IRepository<RoleGroup, System.Guid>
    {
    }
}
