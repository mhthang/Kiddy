using KiddyShop.Account.Services;
using KiddyShop.WebSecurity.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace KiddyShop.WebApp.Controllers
{
    public class AccountApiController : BaseApiController
    {
        private IAccountService _accountService;
        private IProfileService _profileService;
        public AccountApiController()
        {
        }

        public AccountApiController(
                                    IAccountService accountService, IProfileService profileService)
        {
            this._accountService = accountService;
        }
        [AllowAnonymous]
        [HttpPost]
        public bool IsCookieAuth()
        {
            return User.Identity.IsAuthenticated;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IHttpActionResult> Signin(Signin model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(Security.Commons.Constants.LOGIN_INVALID_USERNAME_PASSWORD);
            }
            if (model == null)
            {
                return BadRequest();
            }

            SignInStatus result = await SignInManager.PasswordSignInAsync(model.UserName, model.Password, isPersistent: false, shouldLockout: false);
            switch (result)
            {
                case SignInStatus.Success:
                    {
                        //return Ok(_accountService.LoginReturnToken(model));
                        return Ok();
                    }
                case SignInStatus.Failure:
                default:
                    return BadRequest(Security.Commons.Constants.LOGIN_INVALID_USERNAME_PASSWORD);
            }
        }

        [Authorize]
        [HttpPost]
        public bool Signout()
        {
            try
            {
                HttpContext.Current.GetOwinContext().Authentication.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                return true;
            }
            catch
            {
                return false;
            }
        }

        [Authorize]
        [HttpPost]
        public IHttpActionResult GetCurrentUserProfile()
        {
            try
            {
                string userId = User.Identity.GetUserId();

                var profile = this._profileService.GetUserProfile(userId);
                return Ok(profile);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
