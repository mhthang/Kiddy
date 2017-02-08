using KiddyShop.Services;
using System.Collections.Generic;

namespace KiddyShop.Application.Services
{
    public interface IApplicationService : IBaseService
    {
        List<Application.Models.CountryModel> GetCountries();

        List<Application.Models.TimezoneModel> GetTimezones();

        List<KiddyShop.Models.ViewModel.RoleGroupViewModel> GetRoleGroups();
    }
}