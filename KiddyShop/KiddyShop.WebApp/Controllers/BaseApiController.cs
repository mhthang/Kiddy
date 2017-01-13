using KiddyShop.Security.WebSecurity;
using KiddyShop.WebSecurity;
using log4net;
using Microsoft.AspNet.Identity.Owin;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace KiddyShop.WebApp.Controllers
{
    public class BaseApiController : ApiController
    {
        public ILog Logger;

        protected ModelFactory _modelFactory;
        protected ApplicationUserManager _userManager;
        protected ApplicationSignInManager _signInManager;
        public ApplicationUserManager UserManager
        {
            get { return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>(); }
            private set { _userManager = value; }
        }
        protected ModelFactory TheModelFactory
        {
            get
            {
                if (_modelFactory == null)
                {
                    _modelFactory = new ModelFactory(this.Request, this.UserManager);
                }
                return _modelFactory;
            }
        }

        public ApplicationSignInManager SignInManager
        {
            get { return _signInManager ?? HttpContext.Current.GetOwinContext().Get<ApplicationSignInManager>(); }
            private set { _signInManager = value; }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && UserManager != null)
            {
                UserManager.Dispose();
                UserManager = null;
            }

            base.Dispose(disposing);
        }
    }
}
