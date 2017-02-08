using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KiddyShop.WebApp.Controllers
{
    public class ComController : Controller
    {
        // GET: Com
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Category()
        {
            return View();
        }
    }
}