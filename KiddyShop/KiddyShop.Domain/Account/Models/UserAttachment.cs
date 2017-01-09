using KiddyShop.Application.Models;
using KiddyShop.Domain;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KiddyShop.Account.Models
{
    [Table("UserAttachments")]
    public class UserAttachment : IEntity<Guid>
    {
        public UserAttachment()
        {
        }

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

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        public Nullable<bool> IsDeleted { get; set; }
        public System.DateTime CreatedDate { get; set; }
    }
}