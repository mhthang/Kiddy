using KiddyShop.Application.Models;
using KiddyShop.Data.EntityFramework;
using KiddyShop.Data.Repositories;

namespace KiddyShop.Application.Repositories
{
    public class AppClaimRepository : Repository<AppClaim, System.Guid>, IAppClaimRepository
    {
        public AppClaimRepository(IKSDataContext context) : base(context)
        {
        }
    }
}