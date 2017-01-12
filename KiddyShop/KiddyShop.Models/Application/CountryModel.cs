using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Application.Models
{
    public class CountryModel
    {
        public CountryModel()
        {
        }

        [Key]
        public Int32 Id { get; set; }

        [StringLength(2, ErrorMessage = "Country Code cannot be longer than 2 characters.")]
        public string CountryCode { get; set; }

        [StringLength(128, ErrorMessage = "Name cannot be longer than 128 characters.")]
        public string CountryName { get; set; }

        public int CountryNumCode { get; set; }
        public int CountryPhoneCode { get; set; }

    }
}
