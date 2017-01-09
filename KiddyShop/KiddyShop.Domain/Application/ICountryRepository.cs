using KiddyShop.Domain;
using KiddyShop.Application.Models;
using System;
using System.Collections.Generic;

namespace KiddyShop.Application
{
    public interface ICountryRepository : IRepository<Country, System.Int32>
    {
    }
}
