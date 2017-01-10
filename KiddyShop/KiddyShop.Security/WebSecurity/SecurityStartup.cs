using KiddyShop.Security.Identity;
using KiddyShop.Security.Providers;

using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security;
using System.Web.Http;
using System.Net.Http.Formatting;
using Newtonsoft.Json.Serialization;
using System.Linq;

namespace KiddyShop.Security.WebSecurity
{
    public class SecurityStartup
    {
        public void ConfigureAuth(IAppBuilder app)
        {
            app.CreatePerOwinContext(ApplicationDbContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
            app.CreatePerOwinContext<ApplicationSignInManager>(ApplicationSignInManager.Create);

            var CookieOptions = new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString(KiddyShop.Security.Commons.Constants.COOKIE_PATH),
                Provider = new CookieAuthenticationProvider
                {
                    OnValidateIdentity = SecurityStampValidator.OnValidateIdentity<ApplicationUserManager, ApplicationUser>(
                        validateInterval: TimeSpan.FromMinutes(KiddyShop.Security.Commons.Constants.ACCESSTOKEN_EXPIRE_TIMESPAN_MINUTES),
                        regenerateIdentity: (manager, user) => user.GenerateUserIdentityAsync(manager))
                }
            };

            OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString(KiddyShop.Security.Commons.Constants.CONFIGURATION_TOKEN_ENDPOINT),
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(KiddyShop.Security.Commons.Constants.ACCESSTOKEN_EXPIRE_TIMESPAN_MINUTES),
                Provider = new CustomOAuthProviderToken(),
                AccessTokenFormat = new CustomJwtFormat(KiddyShop.Security.Commons.Constants.CONFIGURATION_ISSUER)
            };

            app.UseCookieAuthentication(CookieOptions);
            app.UseOAuthAuthorizationServer(OAuthServerOptions);
        }

        public void ConfigureOAuthTokenConsumption(IAppBuilder app)
        {
            var issuer = KiddyShop.Security.Commons.Constants.CONFIGURATION_ISSUER;//Uri.UriSchemeHttp;
            string audienceId = KiddyShop.Security.Commons.Constants.CONFIGURATION_AUDIENCE_ID;
            byte[] audienceSecret = TextEncodings.Base64Url.Decode(KiddyShop.Security.Commons.Constants.CONFIGURATION_AUDIENCE_SECRET);

            app.UseJwtBearerAuthentication(
                new JwtBearerAuthenticationOptions
                {
                    AuthenticationMode = AuthenticationMode.Active,
                    AllowedAudiences = new[] { audienceId },
                    IssuerSecurityTokenProviders = new IIssuerSecurityTokenProvider[]
                    {
                        new SymmetricKeyIssuerSecurityTokenProvider(issuer, audienceSecret)
                    }
                });
        }

        public void ConfigureWebApi(HttpConfiguration config)
        {
            // Configure Web API to use only bearer token authentication.
            //config.SuppressDefaultHostAuthentication();
            //config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            config.MapHttpAttributeRoutes();

            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}
