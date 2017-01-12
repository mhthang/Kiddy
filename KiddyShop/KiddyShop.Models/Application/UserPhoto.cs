using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Application.Models
{
    public class UserPhoto
    {
        [Key]
        public Guid Id { get; set; }

        public string FileName { get; set; }
        public string FilePath { get; set; }
        public ATTACHMENT_TYPE FileType { get; set; }
        public decimal FileSize { get; set; }
        public bool IsActive { get; set; }

        public bool IsBase64Format { get; set; }
        public string PhotoBase64Data { get; set; }

        public string UserId { get; set; }

    }
}
