using System;

namespace KiddyShop.Domain.Models
{
    public interface IEntityTrackingModified
    {
        DateTime DateModified { set; }
    }
}
