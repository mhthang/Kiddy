using KiddyShop.Domain;
using KiddyShop.Application.Models;
using System;
using System.Collections.Generic;

namespace KiddyShop.Application
{
    public interface IAppFunctionRepository : IRepository<AppFunction, System.Guid>
    {
        IEnumerable<AppClaim> GetAppClaimsByFunctionName(string functionName);
    }
}
