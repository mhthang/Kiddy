using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KiddyShop.WebApp.Controllers
{
    public class AccountController : Controller
    {
        public ActionResult ForgotPassword()
        {
            return View();
        }

        public ActionResult NewPassword()
        {
            return View();
        }

        public ActionResult ChangePassword()
        {
            return View();
        }

        public ActionResult Register()
        {
            return View();
        }

        public ActionResult UserProfile()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpGet]
        public ActionResult LogOff(string returnUrl)
        {
            //AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return RedirectToAction("Login", "Account");
        }
    }
}