using KiddyShop.Application.Models;
using KiddyShop.Data.EntityFramework;
using KiddyShop.Data.Repositories;

namespace KiddyShop.Application.Repositories
{
    public class CountryRepository : Repository<Country, System.Int32>, ICountryRepository
    {
        public CountryRepository(IKSDataContext context) : base(context)
        {
        }
    }
}