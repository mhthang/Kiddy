using System.ComponentModel.DataAnnotations.Schema;

namespace KiddyShop.Domain.Models
{
    public interface IObjectState
    {
        [NotMapped]
        ObjectState State { get; set; }
    }
}