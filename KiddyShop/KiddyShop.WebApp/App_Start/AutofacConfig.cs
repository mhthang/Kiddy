using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using KiddyShop.Data.EntityFramework;
using KiddyShop.Data.Repositories;
using KiddyShop.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace KiddyShop.WebApp
{
    public class AutofacConfig
    {
        public static void ConfigureContainer()
        {
            const string connectionStr = Commons.Constants.ENTITY_FRAMEWORK_CONNECTION_STRING;

            var builder = new ContainerBuilder();

            // Register dependencies in controllers
            builder.RegisterControllers(typeof(WebApiApplication).Assembly);
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // Register dependencies in filter attributes
            builder.RegisterFilterProvider();

            // Register dependencies in custom views
            builder.RegisterSource(new ViewRegistrationSource());

            // Register our Data dependencies
            builder.RegisterModule(new KSLog4NetAutofacModule());

            builder.RegisterType<BaseService>().AsSelf().PropertiesAutowired();

            builder.RegisterModule(new DataEntityFrameworkAutoFacModule(connectionStr));

            builder.RegisterModule(new SKRepositoryAutoFacModule(connectionStr));

            builder.RegisterModule(new KSServicesAutoFacModule());

            var container = builder.Build();

            // Set MVC DI resolver to use our Autofac container
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver((IContainer)container);
        }
    }
}