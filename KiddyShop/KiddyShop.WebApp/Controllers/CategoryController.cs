using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KiddyShop.WebApp.Controllers
{
    public class CategoryController : Controller
    {
        // GET: Category
        public ActionResult List()
        {
            return View();
        }

        public ActionResult Edit()
        {
            return View();
        }
    }
}