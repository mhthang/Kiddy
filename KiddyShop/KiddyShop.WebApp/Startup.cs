using KiddyShop.Security.WebSecurity;
using Microsoft.Owin;
using Owin;
using System.Web.Http;

[assembly: OwinStartup(typeof(KiddyShop.WebApp.Startup))]

namespace KiddyShop.WebApp
{
    public partial class Startup : SecurityStartup
    {
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
            HttpConfiguration httpConfig = new HttpConfiguration();

            ConfigureAuth(app);
            ConfigureOAuthTokenConsumption(app);
            ConfigureWebApi(httpConfig);

            app.UseWebApi(httpConfig);
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
        }
    }
}