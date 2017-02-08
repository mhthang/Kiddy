using KiddyShop.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KiddyShop.WebApp.Controllers
{
    public class AppApiController : BaseApiController
    {

        #region Members

        private IApplicationService appService;


        #endregion Members

        #region Constructor

        public AppApiController(IApplicationService appService)
        {
            this.appService = appService;
        }

        #endregion Constructor

        #region APIs
        [HttpPost]
        public IHttpActionResult GetCountries()
        {
            var l = this.appService.GetCountries();

            return Ok(l);
        }

        [HttpPost]
        public IHttpActionResult GetTimezones()
        {
            var l = this.appService.GetTimezones();

            return Ok(l);
        }

        #endregion APIs
    }
}
