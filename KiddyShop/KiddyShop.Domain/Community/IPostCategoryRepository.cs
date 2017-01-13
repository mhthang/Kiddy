using KiddyShop.Community.Models;
using KiddyShop.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Community
{
    public interface IPostCategoryRepository  : IRepository<PostCategory, Guid>
    {
        List<Models.PostCategory> SearchPostCategory(string filter, int pageIndex, int pageSize);
    }
}
