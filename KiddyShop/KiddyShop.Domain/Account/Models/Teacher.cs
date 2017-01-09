using KiddyShop.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Account.Models
{
    [Table("Teachers")]
    public class Teacher : IEntity<System.Guid>
    {
        public Teacher()
        {
            //Subjects = new HashSet<Subject>();
            //TeacherDivisions = new HashSet<TeacherDivision>();
        }

        [Key]
        public System.Guid Id { get; set; }

        public System.Guid AccountId { get; set; }
        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; }

        //public virtual ICollection<TeacherDivision> TeacherDivisions { get; set; }
        //public virtual ICollection<Subject> Subjects { get; set; }

        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
