using PGAPP.Business.DataModel;
using PGAPP.Business.Logic.BusinessLogic;
using PGAPP.Models;
using PGAPP.Utility;
using System;
using System.Collections.Generic;
using System.Data;
using System.Web.Mvc;

namespace PGAPP.Areas.MWG.Controllers
{
    public class TimeKeepingController : Controller
    {
        private TimeKeepingLogic objTimeKeepingLogic = new TimeKeepingLogic(CommonFunctions.GetCurrentAccount());

        // GET: MWG/Timekeeping
        public ActionResult Timekeeping()
        {
            return View();
        }

        private ResponseModel GetResponseModelFromLogic(object objDataResult)
        {
            ResponseModel objResponse = CommonFunctions.GetResponseModelFromLogic(objTimeKeepingLogic, objDataResult);
            return objResponse;
        }

        public ActionResult GetCheckInStatus()
        {
            ResponseModel objResponse;

            try
            {
                TimeKeepingModel.StatusModel objResult = objTimeKeepingLogic.GetCheckInStatus();
                objResponse = GetResponseModelFromLogic(objResult);
            }
            catch (Exception ex)
            {
                CommonFunctions.AddErrorLog("Lỗi kiểm tra trạng thái chấm công", ex);
                objResponse = new ResponseModel("Lỗi kiểm tra trạng thái chấm công", null, null);
            }

            return Json(objResponse);
        }

        public ActionResult GetTimeKeepingHistory(int intPageIndex)
        {
            ResponseModel objResponse;

            try
            {
                List<TimeKeepingModel.HistoryModel> lstHistory = objTimeKeepingLogic.GetTimeKeepingHistory(intPageIndex);
                objResponse = GetResponseModelFromLogic(lstHistory);
            }
            catch (Exception ex)
            {
                CommonFunctions.AddErrorLog("Lỗi lấy lịch sử chấm công", ex);
                objResponse = new ResponseModel("Lỗi lấy lịch sử chấm công", null, null);
            }

            return Json(objResponse);
        }

        public ActionResult CheckIn()
        {
            ResponseModel objResponse;

            try
            {
                int intResult = objTimeKeepingLogic.CheckIn();
                objResponse = GetResponseModelFromLogic(intResult);
            }
            catch (Exception ex)
            {
                CommonFunctions.AddErrorLog("Lỗi chấm công", ex);
                objResponse = new ResponseModel("Lỗi chấm công", null, null);
            }

            return Json(objResponse);
        }
    }
}