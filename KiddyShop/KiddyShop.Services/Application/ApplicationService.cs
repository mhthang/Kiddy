using AutoMapper;
using KiddyShop.Application.Models;
using KiddyShop.Domain;
using KiddyShop.Services;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KiddyShop.Application.Services
{
    internal class ApplicationService : BaseService, IApplicationService
    {
        public ApplicationService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public List<Application.Models.CountryModel> GetCountries()
        {
            List<Application.Models.Country> countries = this.UnitOfWork.CountryRepository.GetAll().ToList();
            List<Application.Models.CountryModel> countryModels = Mapper.Map<List<Country>, List<CountryModel>>(countries);

            return countryModels;
        }

        public List<Application.Models.TimezoneModel> GetTimezones()
        {
            List<Timezone> timezones = this.UnitOfWork.TimezoneRepository.GetAll().ToList();
            List<TimezoneModel> timezoneModels = Mapper.Map<List<Timezone>, List<TimezoneModel>>(timezones);

            return timezoneModels;
        }

        public List<KiddyShop.Models.ViewModel.RoleGroupViewModel> GetRoleGroups()
        {
            try
            {
                var roleGroups = this.UnitOfWork.RoleGroupRepository.GetAll().Where(x => x.IsDeleted == false)
                    .Select(x => new KiddyShop.Models.ViewModel.RoleGroupViewModel { RoleId = x.Id.ToString(), RoleName = x.Name, IsChecked = false, IsActiveAgo = false }).ToList();
                return roleGroups;
            }
            catch (Exception ex)
            {
                Logger.Error(ex.ToString());
                throw;
            }
        }
    }
}