using KiddyShop.Common.Models;
using KiddyShop.Commons;
using KiddyShop.Domain;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Services
{
    public abstract class BaseService : DisposableObject, IBaseService
    {
        public ILog Logger { get; set; }

        protected IUnitOfWork UnitOfWork { get; set; }
        private BaseService()
        {

        }

        protected BaseService(IUnitOfWork unitOfWork)
        {
            this.UnitOfWork = unitOfWork;
        }

        #region Protected Methods
        protected Pager GetDefaultPager()
        {
            Pager pager = new Pager()
            {
                PageIndex = 0,
                PageSize = 9999
            };

            return pager;
        }
        #endregion

        #region Dispose
        private bool _disposed;

        protected override void Dispose(bool isDisposing)
        {
            if (!this._disposed)
            {
                if (isDisposing)
                {
                    UnitOfWork = null;
                }
                _disposed = true;
            }
        }
        #endregion
    }
}
