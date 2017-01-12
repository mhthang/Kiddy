using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Security.Commons
{
    public static class Constants
    {
        public static string ENTITY_FRAMEWORK_CONNECTION_STRING = "KSDbContext";
        public static string COOKIE_PATH = "";
        public static string CONFIGURATION_AUDIENCE_ID = ConfigurationManager.AppSettings["as:AudienceId"];
        public static string CONFIGURATION_AUDIENCE_SECRET = ConfigurationManager.AppSettings["as:AudienceSecret"];
        public static string CONFIGURATION_ISSUER = ConfigurationManager.AppSettings["as:issuer"];
        public static string CONFIGURATION_TOKEN_ENDPOINT = ConfigurationManager.AppSettings["as:TokenEndPoint"];
        public static int ACCESSTOKEN_EXPIRE_TIMESPAN_MINUTES = 30;
        public static int TOKEN_LIFESPAN_MINUTES = 30;
        public static int PASSWORD_MIN_LENGHT = 8;

        public const string LOGIN_SUCCESSFULLY = "Login successfully. Wait a seconds...";
        public const string LOGIN_INVALID_USERNAME_PASSWORD = "Username or Password is incorrect.";
        public const string CHANGE_PASSWORD_CONFIRM_FAIL = "Password does not match the confirm password.";
        public const string CHANGE_PASSWORD_INVALID_NEWPASSWORD = "Password must contain: minimum 8 characters, upper case letter and numberic value.";
        public const string CHANGE_PASSWORD_TOKEN_EXPIRED = "User does not exist or Access token has expired.";
    }
}
