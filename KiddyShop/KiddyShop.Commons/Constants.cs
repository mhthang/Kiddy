using System.Configuration;

namespace KiddyShop.Commons
{
    public static class Constants
    {
        public static int DAY_OF_WEEK = 7;

        public const string ENTITY_FRAMEWORK_CONNECTION_STRING = "pintshir_Webstore";
        public static string COOKIE_PATH = "";
        public static string CONFIGURATION_AUDIENCE_SECRET = ConfigurationManager.AppSettings["as:AudienceSecret"];
        public static string CONFIGURATION_AUDIENCE_ID = ConfigurationManager.AppSettings["as:AudienceId"];
        public static int ACCESSTOKEN_EXPIRE_TIMESPAN_MINUTES = 0;
        public static int TOKEN_LIFESPAN_MINUTES = 60;
        public static int PASSWORD_MIN_LENGHT = 8;

        public static string[] HighlightColors = new string[] { "#9C27B0", "#F44336", "#7E57C2", "#3F51B5", "#26A69A", "#D4E157", "#FFA000", "#795548" };
    }
}