using System;
using System.Configuration;

namespace MobileApp.Utility
{
    public class ConfigData
    {
        #region Common

        public static string SessionUserName = ConfigurationManager.AppSettings["SessionUserName"];
        public static string Environment = ConfigurationManager.AppSettings["Environment"];
        public static int BundleVersion = Convert.ToInt32(ConfigurationManager.AppSettings["BundleVersion"]);

        #endregion Common
    }
}