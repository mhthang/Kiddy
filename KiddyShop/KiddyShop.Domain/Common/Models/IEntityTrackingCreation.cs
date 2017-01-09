using System;

namespace KiddyShop.Domain.Models
{
    public interface IEntityTrackingCreation
    {
        DateTime DateCreated { set; }
    }
}
