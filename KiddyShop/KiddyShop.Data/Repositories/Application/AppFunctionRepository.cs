using KiddyShop.Application.Models;
using KiddyShop.Data.EntityFramework;
using KiddyShop.Data.Repositories;
using KiddyShop.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace KiddyShop.Application.Repositories
{
    public class AppFunctionRepository : Repository<AppFunction, System.Guid>, IAppFunctionRepository
    {
        public AppFunctionRepository(IKSDataContext context) : base(context)
        {
        }

        public IEnumerable<AppClaim> GetAppClaimsByFunctionName(string functionName)
        {
            if (string.IsNullOrEmpty(functionName))
            {
                return null;
            }

            Expression<Func<AppFunction, bool>> predicate = f => f.Name == functionName;
            var functionCommand = this.FindBy(predicate, x => x.AppClaims).FirstOrDefault();
            if (functionCommand == null)
            {
                return null;
            }

            return functionCommand.AppClaims;
        }

    }
}