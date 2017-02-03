using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Common.Models
{
    public class SearchRequest
    {
        public Guid Id { get; set; }
        public Guid? FilterId { get; set; }
        public string FilterText { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? EndDate { get; set; }
        public Pager Pager { get; set; }

        public string Tag { get; set; }
    }
}
