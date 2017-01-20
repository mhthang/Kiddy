using Newtonsoft.Json;
using PGAPP.Business.DataModel;
using PGAPP.Business.Logic;
using PGAPP.Cache;
using PGAPP.Models;
using System;
using System.Data;
using System.IO;
using System.Web;
using System.Web.Optimization;
using System.Web.Routing;
using TGDD.Logging.DataObjects;
using static PGAPP.Utility.StaticData;

namespace PGAPP.Utility
{
    public class CommonFunctions
    {
        /// <summary>
        /// Hàm đóng gói việc ghi log lỗi
        /// </summary>
        /// <param name="strTitle"></param>
        /// <param name="strContent"></param>
        /// <param name="strEvent">Mặc định null, khỏi truyền có thể tự tìm ra tên hàm controller</param>
        /// <param name="strModule">Mặc định null, khỏi truyền có thể tự tìm ra tên controller</param>
        public static void AddErrorLog(string strTitle, string strContent, string strEvent = null, string strModule = null, AccountModel objAccount = null)
        {
            if (objAccount == null)
            {
                objAccount = GetCurrentAccount();
            }

            var strCustomerID = "null";

            if (objAccount != null)
            {
                strCustomerID = objAccount.CustomerID + string.Empty;
            }

            if (string.IsNullOrEmpty(strEvent) && string.IsNullOrEmpty(strModule))
            {
                // Lấy tên hàm và tên controller
                RouteValueDictionary objRouteValues = HttpContext.Current.Request.RequestContext.RouteData.Values;

                if (objRouteValues != null)
                {
                    if (objRouteValues.ContainsKey("action"))
                    {
                        strEvent = objRouteValues["action"].ToString();
                    }
                }

                strModule = GetCurrentController();
            }

            SystemErrorDAO.WriteLog(strTitle, strContent, strEvent, strCustomerID, 0, strModule);
        }

        public static void AddErrorLog(string strTitle, Exception ex, string strEvent = null, string strModule = null, AccountModel objAccount = null)
        {
            AddErrorLog(strTitle, ex.ToString(), strEvent, strModule, objAccount);
        }

        public static string GetCurrentController()
        {
            RouteValueDictionary objRouteValues = HttpContext.Current.Request.RequestContext.RouteData.Values;

            if (objRouteValues != null)
            {
                if (objRouteValues.ContainsKey("controller"))
                {
                    return objRouteValues["controller"].ToString();
                }
            }

            return null;
        }

        public static AccountModel GetCurrentAccount()
        {
            if (HttpContext.Current != null && HttpContext.Current.Session != null)
            {
                HttpSessionStateBase session = new HttpSessionStateWrapper(HttpContext.Current.Session);
                return session[ConfigData.SessionUserName] as AccountModel;
            }

            return null;
        }

        public static string ConvertDataTableToString(DataTable dt)
        {
            string strResult = JsonConvert.SerializeObject(dt);
            return strResult;
        }

        /// <summary>
        ///  Lấy hệ điều hành
        /// </summary>
        /// <returns></returns>
        public static Platform GetPlatform()
        {
            string strUserAgent = HttpContext.Current.Request.UserAgent;

            if (string.IsNullOrEmpty(strUserAgent))
            {
                return Platform.None;
            }
            else
            {
                strUserAgent = strUserAgent.ToLower();

                if (strUserAgent.Contains("iphone") || strUserAgent.Contains("ipad") || strUserAgent.Contains("ipod"))
                {
                    return Platform.iOS;
                }

                if (strUserAgent.Contains("android"))
                {
                    return Platform.Android;
                }

                if (strUserAgent.Contains("windows") || strUserAgent.Contains("windowsphone") || strUserAgent.Contains("iemobile"))
                {
                    return Platform.Windows;
                }

                return Platform.None;
            }
        }

        /// <summary>
        /// Đóng gói việc kiểm tra lỗi của logic và trả về đối tượng kết quả tương ứng, đồng thời ghi log lỗi dùm luôn
        /// </summary>
        /// <param name="objLogic">Đối tượng logic</param>
        /// <param name="objDataResult">Dữ liệu kết quả</param>
        /// <returns></returns>
        public static ResponseModel GetResponseModelFromLogic(AbstractLogic objLogic, object objDataResult)
        {
            ResponseModel objResponse;

            if (string.IsNullOrEmpty(objLogic.ErrorMessage))
            {
                if (objDataResult is DataTable)
                {
                    string strData = ConvertDataTableToString((DataTable)objDataResult);
                    objResponse = new ResponseModel(null, strData, null);
                }
                else
                {
                    objResponse = new ResponseModel(null, null, objDataResult);
                }
            }
            else
            {
                objResponse = new ResponseModel(objLogic.ErrorMessage, null, null);
                AddErrorLog(objLogic.ErrorMessage, objLogic.ErrorMessageDetail);
            }

            return objResponse;
        }
    }
}