using KiddyShop.Domain;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KiddyShop.Messaging.Models
{
    [Table("MessagingDataMapping")]
    public class MessagingDataMapping : IEntity<Guid>
    {
        public MessagingDataMapping()
        {

        }

        public string MappingName { get; set; }
        public string TokenKey { get; set; }

        [StringLength(128, ErrorMessage = "Table Name cannot be longer than 128 characters.")]
        public string TableName { get; set; }
        [StringLength(128, ErrorMessage = "Column Name cannot be longer than 128 characters.")]
        public string ColumnName { get; set; }

        [StringLength(128, ErrorMessage = "Required Column Name cannot be longer than 128 characters.")]
        public string RequiredColumnName { get; set; }

        public string Format { get; set; }
        public string SqlQuery { get; set; }
        public string Value { get; set; }
        public bool IsPublish { get; set; }
        public DateTime CreatedDate { get; set; }

        [Key]
        public Guid Id { get; set; }
        
    }
}