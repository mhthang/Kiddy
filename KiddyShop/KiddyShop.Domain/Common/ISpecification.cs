
using KiddyShop.Domain.Models;
using System.Collections.Generic;

namespace KiddyShop.Domain.Common
{
    public interface ISpecification<TData>
    {
        bool IsSatisfyBy(TData data, IList<ErrorExtraInfo> violations = null);

        ISpecification<TData> Not(ISpecification<TData> specification);
        ISpecification<TData> And(ISpecification<TData> right);
        ISpecification<TData> Or(ISpecification<TData> right);
    }
}
