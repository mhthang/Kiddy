using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace KiddyShop.Domain.Models
{
    [Serializable]
    public abstract class EntityBase : IObjectState
    {
        [NotMapped]
        public ObjectState State { get; set; }
    }
}
