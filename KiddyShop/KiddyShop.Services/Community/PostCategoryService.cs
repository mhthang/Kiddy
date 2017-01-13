using KiddyShop.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KiddyShop.Common.Models;
using KiddyShop.Community.Models;
using KiddyShop.Domain;
using AutoMapper;

namespace KiddyShop.Community.Services
{
    public class PostCategoryService : BaseService, IPostCategoryService
    {
        public PostCategoryService(IUnitOfWork unitOfWork) :base(unitOfWork)
        {

        }
        public PostCategoryModel CreateOrUpdate(PostCategoryModel model)
        {
            throw new NotImplementedException();
        }

        public SearchResponse<PostCategoryModel> GetPostCategory(Guid semesterId)
        {
            throw new NotImplementedException();
        }

        public SearchResponse<PostCategoryModel> SearchPostCategory(SearchRequest request)
        {
            Logger.Debug($"Search: {request.FilterText}");

            if (request == null)
                throw new System.ArgumentNullException("request");

            if (request.Pager == null)
                request.Pager = this.GetDefaultPager();

            SearchResponse<PostCategoryModel> response = new SearchResponse<PostCategoryModel>();

            List<Models.PostCategory> postCategories = this.UnitOfWork.PostCategoryRepository.SearchPostCategory(request.FilterText, request.Pager.PageIndex, request.Pager.PageSize);

            var postCategoriesModels = Mapper.Map<List<Models.PostCategory>, List<Models.PostCategoryModel>>(postCategories);
            response.Records = postCategoriesModels;
            response.Total = postCategoriesModels.Count;
            response.Pager = request.Pager;

            return response;
        }
    }
}
