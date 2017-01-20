using PGAPP.Business.Logic.BusinessLogic;
using PGAPP.Models;
using PGAPP.Utility;
using PGAPP.WebServiceCaller.Insite_CommonSvc;
using System;
using System.Data;
using System.Web.Mvc;

namespace PGAPP.Areas.MWG.Controllers
{
    public class NoticeController : Controller
    {
        private NoticeLogic objNoticeLogic = new NoticeLogic(CommonFunctions.GetCurrentAccount());

        public ActionResult NoticeList()
        {
            return View();
        }

        public ActionResult NoticeDetail()
        {
            return View();
        }

        private ResponseModel GetResponseModelFromLogic(object objDataResult)
        {
            ResponseModel objResponse = CommonFunctions.GetResponseModelFromLogic(objNoticeLogic, objDataResult);
            return objResponse;
        }

        public ActionResult GetAllCategory()
        {
            ResponseModel objResponse;

            try
            {
                DataTable dtbResult = objNoticeLogic.GetAllCategory();
                objResponse = GetResponseModelFromLogic(dtbResult);
            }
            catch (Exception ex)
            {
                CommonFunctions.AddErrorLog("Lỗi lấy danh sách loại thông báo", ex);
                objResponse = new ResponseModel("Lỗi lấy danh sách loại thông báo", null, null);
            }

            return Json(objResponse);
        }

        public ActionResult Search(string strKeyword, int intCategoryID, int intPageIndex, int intPageSize)
        {
            ResponseModel objResponse;

            try
            {
                DataTable dtbResult = objNoticeLogic.GetNoticeList(strKeyword, intCategoryID, intPageIndex, intPageSize);
                objResponse = GetResponseModelFromLogic(dtbResult);
            }
            catch (Exception ex)
            {
                CommonFunctions.AddErrorLog("Lỗi tìm thông báo", ex);
                objResponse = new ResponseModel("Lỗi tìm thông báo", null, null);
            }

            return Json(objResponse);
        }

        public ActionResult GetDetail(int intNoticeID)
        {
            ResponseModel objResponse;

            try
            {
                PGNotifyBO objNotice = objNoticeLogic.GetNoticeDetail(intNoticeID);
                objResponse = GetResponseModelFromLogic(objNotice);
            }
            catch (Exception ex)
            {
                CommonFunctions.AddErrorLog("Lỗi lấy chi tiết thông báo", ex);
                objResponse = new ResponseModel("Lỗi lấy chi tiết thông báo", null, null);
            }

            return Json(objResponse);
        }
    }
}