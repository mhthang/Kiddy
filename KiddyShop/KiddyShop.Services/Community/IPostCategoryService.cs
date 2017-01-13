using KiddyShop.Common.Models;
using KiddyShop.Community.Models;
using KiddyShop.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Community.Services
{
    public interface IPostCategoryService : IBaseService
    {
        SearchResponse<PostCategoryModel> SearchPostCategory(SearchRequest request);
        //SearchResponse<PostCategoryModel> SearchSemesterBuilding(SearchRequest request);
        SearchResponse<PostCategoryModel> GetPostCategory(Guid semesterId);

        //PostCategoryModel GetBuilding(PostCategoryModel model);
        PostCategoryModel CreateOrUpdate(PostCategoryModel model);
    }
}
