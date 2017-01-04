namespace KiddyShop.Data.EntityFramework
{
    internal class DbFactory : Disposable, IDbFactory
    {
        private IKSDataContext _context;

        public DbFactory(IKSDataContext context)
        {
            this._context = context;
        }

        public DbFactory()
        {
        }

        public IKSDataContext Init()
        {
            return _context ?? (_context = new KSDataContext(KiddyShop.Commons.Constants.ENTITY_FRAMEWORK_CONNECTION_STRING));
        }

        protected override void DisposeCore()
        {
            if (_context != null)
                _context.Dispose();
        }
    }
}