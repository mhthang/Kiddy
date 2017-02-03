using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace KiddyShop.WebApp
{
    public static class Constants
    {
        //public const string ENTITY_FRAMEWORK_CONNECTION_STRING = "StoneCastleAppContext";

        public static readonly string CXT = ConfigurationManager.AppSettings["CXT"];
    }
}