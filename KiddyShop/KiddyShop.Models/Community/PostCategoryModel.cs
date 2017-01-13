using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Community.Models
{
    public class PostCategoryModel
    {
        public PostCategoryModel()
        {
            Posts = new HashSet<PostModel>();
        }
        public System.Guid ID { set; get; }

        [StringLength(256, ErrorMessage = "Name cannot be longer than 256 characters.")]
        public string Name { set; get; }


        public string Alias { set; get; }

        public string Description { set; get; }

        public int? ParentID { set; get; }
        public int? DisplayOrder { set; get; }

        public string Image { set; get; }

        public bool? HomeFlag { set; get; }

        public virtual ICollection<PostModel> Posts { set; get; }

        public DateTime? CreatedDate { set; get; }


        public string CreatedBy { set; get; }

        public DateTime? UpdatedDate { set; get; }


        public string UpdatedBy { set; get; }


        public string MetaKeyword { set; get; }

        public string MetaDescription { set; get; }

        public bool Status { set; get; }
    }
}
