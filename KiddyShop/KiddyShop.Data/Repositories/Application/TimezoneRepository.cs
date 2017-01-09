using KiddyShop.Application.Models;
using KiddyShop.Data.EntityFramework;
using KiddyShop.Data.Repositories;

namespace KiddyShop.Application.Repositories
{
    public class TimezoneRepository : Repository<Timezone, System.Int32>, ITimezoneRepository
    {
        public TimezoneRepository(IKSDataContext context) : base(context)
        {
        }
    }
}