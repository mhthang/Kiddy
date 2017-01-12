using KiddyShop.Security.Identity;
using KiddyShop.Security.WebSecurity;
using KiddyShop.WebSecurity.Models;
using System.Net.Http;
using System.Web.Http.Routing;

namespace StoneCastle.WebSecurity
{
    public class ModelFactory
    {
        private UrlHelper _UrlHelper;
        private ApplicationUserManager _appUserManager;

        public ModelFactory(HttpRequestMessage request, ApplicationUserManager appUserManager)
        {
            _UrlHelper = new UrlHelper(request);
            _appUserManager = appUserManager;
        }

        public UserReturn Create(ApplicationUser appUser)
        {
            return new UserReturn
            {
                Url = _UrlHelper.Link("GetUserById", new { id = appUser.Id }),
                Id = appUser.Id,
                UserName = appUser.UserName,
                FullName = string.Format("{0} {1}", appUser.FirstName, appUser.LastName),
                Email = appUser.Email,
                EmailConfirmed = appUser.EmailConfirmed,
                Claims = _appUserManager.GetClaimsAsync(appUser.Id).Result
            };
        }
    }
}