using KiddyShop.Account.Models;
using KiddyShop.Data.EntityFramework;
using KiddyShop.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Account.Repositories
{
    public class RoleGroupRepository : Repository<RoleGroup,System.Guid> , IRoleGroupRepository
    {
        public RoleGroupRepository(IKSDataContext context) : base(context)
        { }
    }
}
