using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Application.Models
{
    public class TimezoneModel
    {
        public TimezoneModel()
        {
        }

        [Key]
        public Int32 Id { get; set; }

        [StringLength(2, ErrorMessage = "Country Code cannot be longer than 2 characters.")]
        public string CountryCode { get; set; }

        [StringLength(15, ErrorMessage = "Coordinates cannot be longer than 15 characters.")]
        public string Coordinates { get; set; }

        [StringLength(35, ErrorMessage = "Timezone cannot be longer than 35 characters.")]
        public string TimezoneName { get; set; }

        public float UtcOffset { get; set; }
        public float UtcDstOffset { get; set; }
        public float RawOffset { get; set; }
        public bool IsDefault { get; set; }

        [StringLength(255, ErrorMessage = "Timezone cannot be longer than 35 characters.")]
        public string Notes { get; set; }
    }
}
