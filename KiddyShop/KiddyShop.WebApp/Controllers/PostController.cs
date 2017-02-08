using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KiddyShop.WebApp.Controllers
{
    public class PostController : Controller
    {
        // GET: Post
        public ActionResult List()
        {
            return View();
        }
    }
}