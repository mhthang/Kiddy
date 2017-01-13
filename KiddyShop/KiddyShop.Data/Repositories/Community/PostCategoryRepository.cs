using KiddyShop.Community.Models;
using KiddyShop.Data.EntityFramework;
using KiddyShop.Data.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace KiddyShop.Community.Repositories
{
    public class PostCategoryRepository : Repository<PostCategory, System.Guid>, IPostCategoryRepository
    {
        public PostCategoryRepository(IKSDataContext context) : base(context)
        { }

        public List<PostCategory> SearchPostCategory(string filter, int pageIndex, int pageSize)
        {
            var postCategory = this.GetAll().Where(x => x.Name.Contains(filter)).Skip((pageIndex - 1) * pageSize).Take(pageSize);
            return postCategory.ToList();
        }
    }
}