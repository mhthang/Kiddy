using KiddyShop.Common.Models;
using KiddyShop.Community.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KiddyShop.WebApp.Controllers
{
    public class CategoryApiController : ApiController
    {
        #region Members

        private IPostCategoryService cateService;


        #endregion Members

        #region Constructor

        public CategoryApiController(IPostCategoryService cateService)
        {
            this.cateService = cateService;
        }

        #endregion Constructor

        #region APIs
        [HttpPost]
        public IHttpActionResult GetCountries(SearchRequest a)
        {
            var l = this.cateService.SearchPostCategory(a);

            return Ok(l);
        }


        #endregion APIs
    }
}
