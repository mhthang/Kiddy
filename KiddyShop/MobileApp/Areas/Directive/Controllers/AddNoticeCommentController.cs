using PGAPP.Business.DataModel;
using PGAPP.Business.Logic.BusinessLogic;
using PGAPP.Models;
using PGAPP.Utility;
using PGAPP.WebServiceCaller.Insite_CommonSvc;
using System;
using System.Web.Mvc;

namespace PGAPP.Areas.Directive.Controllers
{
    public class AddNoticeCommentController : Controller
    {
        private AccountModel objAccount = CommonFunctions.GetCurrentAccount();
        private NoticeLogic objNoticeLogic = new NoticeLogic(CommonFunctions.GetCurrentAccount());

        public ActionResult AddNoticeComment()
        {
            return View();
        }

        private ResponseModel GetResponseModelFromLogic(object objDataResult)
        {
            ResponseModel objResponse = CommonFunctions.GetResponseModelFromLogic(objNoticeLogic, objDataResult);
            return objResponse;
        }

        public ActionResult AddComment(int intNoticeID, string strContent, int intParentID)
        {
            ResponseModel objResponse;

            try
            {
                int intResult = objNoticeLogic.AddComment(intNoticeID, strContent, intParentID);
                // Tạo đối tượng comment trả về cho giao diện nhét thêm vô danh sách
                PGNotifyCommentBO objComment = new PGNotifyCommentBO();
                objComment.Content = strContent;
                objComment.ParentID = intParentID;
                objComment.CreateDate = DateTime.Now;
                objComment.Fullname = objAccount.FullName;
                objComment.StoreName = objAccount.StoreName;
                objComment.GroupName = objAccount.PartnerName;
                objComment.Mobile = objAccount.PhoneNumber;
                objComment.CommentID = intResult;
                objResponse = GetResponseModelFromLogic(objComment);
            }
            catch (Exception ex)
            {
                CommonFunctions.AddErrorLog("Lỗi bình luận thông báo", ex);
                objResponse = new ResponseModel("Lỗi bình luận thông báo", null, null);
            }

            return Json(objResponse);
        }
    }
}