using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Common.Models
{
    public class SearchResponse<T> where T : class 
    {
        public Pager Pager { get; set; }
        public long Total { get; set; }
        public List<T> Records { get; set; }
    }
}
