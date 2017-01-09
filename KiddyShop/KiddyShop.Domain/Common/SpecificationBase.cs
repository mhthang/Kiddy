using KiddyShop.Domain.Models;
using System.Collections.Generic;

namespace KiddyShop.Domain.Common
{
    public abstract class SpecificationBase<TData> : ISpecification<TData>
    {
        protected abstract bool IsSatisfyBy(TData data, IList<ErrorExtraInfo> violations = null);

        protected virtual ISpecification<TData> Not(ISpecification<TData> specification)
        {
            return new NotSpecification(specification);
        }

        protected virtual ISpecification<TData> And(ISpecification<TData> left, ISpecification<TData> right)
        {
            return new AndSpecification(left, right);
        }

        protected virtual ISpecification<TData> Or(ISpecification<TData> left, ISpecification<TData> right)
        {
            return new OrSpecification(left, right);
        }

        bool ISpecification<TData>.IsSatisfyBy(TData data, IList<ErrorExtraInfo> violations)
        {
            return IsSatisfyBy(data, violations);
        }

        ISpecification<TData> ISpecification<TData>.Not(ISpecification<TData> specification)
        {
            return Not(specification);
        }

        ISpecification<TData> ISpecification<TData>.And(ISpecification<TData> right)
        {
            return And(this, right);
        }

        ISpecification<TData> ISpecification<TData>.Or(ISpecification<TData> right)
        {
            return Or(this, right);
        }

        protected bool IsNegated { get; set; }

        private class AndSpecification : SpecificationBase<TData>
        {
            public AndSpecification(ISpecification<TData> left, ISpecification<TData> right)
            {
                Left = left;
                Right = right;
            }

            protected override bool IsSatisfyBy(TData data, IList<ErrorExtraInfo> violations = null)
            {
                var leftResult = Left.IsSatisfyBy(data, violations);
                var rightResult = Right.IsSatisfyBy(data, violations);
                return leftResult && rightResult;
            }

            private ISpecification<TData> Left { get; set; }
            private ISpecification<TData> Right { get; set; }
        }

        private class OrSpecification : SpecificationBase<TData>
        {
            public OrSpecification(ISpecification<TData> left, ISpecification<TData> right)
            {
                Left = left;
                Right = right;
            }

            protected override bool IsSatisfyBy(TData data, IList<ErrorExtraInfo> violations = null)
            {
                var leftResult = Left.IsSatisfyBy(data, violations);
                var rightResult = Right.IsSatisfyBy(data, violations);
                return leftResult || rightResult;
            }

            private ISpecification<TData> Left { get; set; }
            private ISpecification<TData> Right { get; set; }
        }

        private class NotSpecification : SpecificationBase<TData>
        {
            public NotSpecification(ISpecification<TData> specification)
            {
                Specification = specification;
                var baseSpecification = Specification as SpecificationBase<TData>;
                if (baseSpecification != null)
                {
                    baseSpecification.IsNegated = !baseSpecification.IsNegated;
                }
            }

            protected override bool IsSatisfyBy(TData data, IList<ErrorExtraInfo> violations = null)
            {
                return !Specification.IsSatisfyBy(data, violations);
            }

            private ISpecification<TData> Specification { get; set; }
        }
    }
}

