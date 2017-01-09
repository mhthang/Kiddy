using KiddyShop.Domain;
using KiddyShop.Application.Models;
using System;
using System.Collections.Generic;

namespace KiddyShop.Application
{
    public interface ITimezoneRepository : IRepository<Timezone, System.Int32>
    {
    }
}
