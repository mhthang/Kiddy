using Autofac;

namespace KiddyShop.Data.EntityFramework
{
    public class DataEntityFrameworkAutoFacModule : Module
    {
        private string connStr;

        public DataEntityFrameworkAutoFacModule(string connString)
        {
            this.connStr = connString;
        }

        protected override void Load(ContainerBuilder builder)
        {
            builder.Register(c => new KSDataContext(this.connStr)).As<IKSDataContext>().InstancePerLifetimeScope();

            //builder.RegisterType<DbContextBase>().WithParameter(new TypedParameter(typeof(string), this.connStr)).As<IDbContext>().InstancePerLifetimeScope();
            builder.RegisterType<KSDataContext>().WithParameter(new TypedParameter(typeof(string), this.connStr)).As<IKSDataContext>().InstancePerLifetimeScope();
        }
    }
}