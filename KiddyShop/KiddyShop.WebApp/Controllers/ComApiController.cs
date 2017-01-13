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
    public class ComApiController : BaseApiController
    {
        #region member
        IPostCategoryService postCategoryService;
        #endregion

        #region Constractor
        public ComApiController(IPostCategoryService postCategoryService)
        {
            this.postCategoryService = postCategoryService;
        }

        #endregion

        #region PostCategory
        [HttpPost]
        public IHttpActionResult SearchPostCategory(SearchRequest request)
        {
            var l = this.postCategoryService.SearchPostCategory(request);

            return Ok(l);
        }
        #endregion
    }
}