using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KiddyShop.Account.Models;
using KiddyShop.Services;

namespace KiddyShop.Account.Services
{
    public interface IProfileService : IBaseService
    {
        ProfileModel GetUserProfile(string userId);
    }
}
