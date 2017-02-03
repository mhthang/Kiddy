using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KiddyShop.WebApp.Controllers
{
    [RoutePrefix("kdadmin")]
    public class AdminController : Controller
    {
        // GET: Admin
        [Route("")]
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult App()
        {
            ViewBag.Title = "Main App";

            return View();
        }

        public ActionResult Dashboard()
        {
            ViewBag.Title = "Dashboard";

            return View();
        }

        public ActionResult Admin()
        {
            ViewBag.Title = "Admin Portal";

            return View();
        }

        public ActionResult Dash()
        {
            return View();
        }

    }
}