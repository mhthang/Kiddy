using System.Web.Mvc;

namespace PGAPP.Areas.MWG
{
    public class MWGAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "MWG";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "MWG_default",
                "MWG/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}