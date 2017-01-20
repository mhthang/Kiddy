namespace MobileApp.Utility
{
    public class StaticData
    {
        #region Bundles

        public const string BUNDLE_FORMAT_SCRIPT = "<script type=\"text/javascript\" src=\"{0}\"></script>";
        public const string BUNDLE_FORMAT_CSS = "<link rel=\"stylesheet\" type=\"text/css\" href=\"{0}\"></link>";

        public const string BUNDLE_CSS_IONIC = "~/CSS_IONIC";
        public const string BUNDLE_CSS_COMPONENT = "~/CSS_COMPONENT";
        public const string BUNDLE_CSS_MAIN = "~/CSS_MAIN";
        public const string BUNDLE_SCRIPT_CONFIG = "~/SCRIPT_CONFIG";
        public const string BUNDLE_SCRIPT_ANDROID = "~/SCRIPT_ANDROID";
        public const string BUNDLE_SCRIPT_IOS = "~/SCRIPT_IOS";
        public const string BUNDLE_SCRIPT_CORE = "~/SCRIPT_CORE";
        public const string BUNDLE_SCRIPT_IONIC = "~/SCRIPT_IONIC";
        public const string BUNDLE_SCRIPT_ANGULAR = "~/SCRIPT_ANGULAR";
        public const string BUNDLE_SCRIPT_COMPONENT = "~/SCRIPT_COMPONENT";
        public const string BUNDLE_SCRIPT_APPLICATION = "~/SCRIPT_APPLICATION";
        public const string BUNDLE_SCRIPT_MAIN = "~/SCRIPT_MAIN";

        #endregion Bundles

        #region Environments

        public const string ENVIRONMENT_DEV = "Dev";
        public const string ENVIRONMENT_TEST = "Test";
        public const string ENVIRONMENT_RC = "RC";
        public const string ENVIRONMENT_LIVE = "Live";

        #endregion Environments

        public enum Platform
        {
            None = 0,
            iOS = 1,
            Android = 2,
            Windows = 3
        }
    }
}