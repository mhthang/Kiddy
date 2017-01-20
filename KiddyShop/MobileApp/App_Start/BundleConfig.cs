using System.Web;
using System.Web.Optimization;

namespace MobileApp
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            AddCSSIonicBundle(bundles);
            AddCSSComponentBundle(bundles);
            AddCSSMainBundle(bundles);

            AddScriptConfigBundle(bundles);
            AddScriptAndroidBundle(bundles);
            AddScriptiOSBundle(bundles);
            AddScriptCoreBundle(bundles);
            AddScriptIonicBundle(bundles);
            AddScriptAngularBundle(bundles);
            AddScriptComponentBundle(bundles);
            AddScriptApplicationBundle(bundles);
            AddScriptMainBundle(bundles);
        }

        #region CSS

        private static void AddCSSIonicBundle(BundleCollection bundles)
        {
            StyleBundle objStyleBundle = new StyleBundle(StaticData.BUNDLE_CSS_IONIC);
            objStyleBundle.IncludeDirectory("~/Content/ionic/css", "*.css");
            bundles.Add(objStyleBundle);
        }

        private static void AddCSSComponentBundle(BundleCollection bundles)
        {
            StyleBundle objStyleBundle = new StyleBundle(StaticData.BUNDLE_CSS_COMPONENT);
            objStyleBundle.IncludeDirectory("~/Content/css/Component", "*.css");
            bundles.Add(objStyleBundle);
        }

        private static void AddCSSMainBundle(BundleCollection bundles)
        {
            StyleBundle objStyleBundle = new StyleBundle(StaticData.BUNDLE_CSS_MAIN);
            objStyleBundle.IncludeDirectory("~/Content/css", "*.css");
            bundles.Add(objStyleBundle);
        }

        #endregion

        #region Javascript

        private static void AddScriptConfigBundle(BundleCollection bundles)
        {
            ScriptBundle objAndroidBundle = new ScriptBundle(StaticData.BUNDLE_SCRIPT_CONFIG);
            objAndroidBundle.Include("~/Scripts/Main/config.js");
            bundles.Add(objAndroidBundle);
        }

        private static void AddScriptAndroidBundle(BundleCollection bundles)
        {
            ScriptBundle objAndroidBundle = new ScriptBundle(StaticData.BUNDLE_SCRIPT_ANDROID);

            switch (ConfigData.Environment)
            {
                case StaticData.ENVIRONMENT_DEV:
                    objAndroidBundle.Include("~/Scripts/Cordova/Android/cordova_android.js");
                    break;

                case "Test":
                    objAndroidBundle.Include("~/Scripts/Cordova/Android/cordova_android.js");
                    break;

                case StaticData.ENVIRONMENT_RC:
                    objAndroidBundle.Include("~/Scripts/Cordova/Android/cordova_android.js");
                    break;

                case StaticData.ENVIRONMENT_LIVE:
                    objAndroidBundle.Include("~/Scripts/Cordova/Android/cordova_android.min.js");
                    break;

                default:
                    break;
            }

            bundles.Add(objAndroidBundle);
        }

        private static void AddScriptiOSBundle(BundleCollection bundles)
        {
            ScriptBundle objiOSBundle = new ScriptBundle(StaticData.BUNDLE_SCRIPT_IOS);

            switch (ConfigData.Environment)
            {
                case StaticData.ENVIRONMENT_DEV:
                    objiOSBundle.Include("~/Scripts/Cordova/iOS/cordova_ios.js");
                    break;

                case "Test":
                    objiOSBundle.Include("~/Scripts/Cordova/iOS/cordova_ios.js");
                    break;

                case StaticData.ENVIRONMENT_RC:
                    objiOSBundle.Include("~/Scripts/Cordova/iOS/cordova_ios.js");
                    break;

                case StaticData.ENVIRONMENT_LIVE:
                    objiOSBundle.Include("~/Scripts/Cordova/iOS/cordova_ios.min.js");
                    break;

                default:
                    break;
            }

            bundles.Add(objiOSBundle);
        }

        private static void AddScriptCoreBundle(BundleCollection bundles)
        {
            ScriptBundle objCorebundle = new ScriptBundle(StaticData.BUNDLE_SCRIPT_CORE);

            switch (ConfigData.Environment)
            {
                case StaticData.ENVIRONMENT_DEV:
                    objCorebundle.IncludeDirectory("~/Scripts/Libraries/Core", "*.js");
                    break;

                case "Test":
                    objCorebundle.IncludeDirectory("~/Scripts/Libraries/Core", "*.js");
                    break;

                case StaticData.ENVIRONMENT_RC:
                    objCorebundle.Include("~/Scripts/Libraries/libraries_core.js");
                    break;

                case StaticData.ENVIRONMENT_LIVE:
                    objCorebundle.Include("~/Scripts/Libraries/libraries_core.min.js");
                    break;

                default:
                    break;
            }

            bundles.Add(objCorebundle);
        }

        private static void SetIonincBundleForDevAndTest(ScriptBundle objIonicBundle)
        {
            objIonicBundle.Include("~/Scripts/Libraries/Ionic/ionic.bundle.js");
            objIonicBundle.Include("~/Scripts/Libraries/Ionic/ionic.filter.bar.js");
        }

        private static void AddScriptIonicBundle(BundleCollection bundles)
        {
            ScriptBundle objIonicBundle = new ScriptBundle(StaticData.BUNDLE_SCRIPT_IONIC);

            switch (ConfigData.Environment)
            {
                case StaticData.ENVIRONMENT_DEV:
                    SetIonincBundleForDevAndTest(objIonicBundle);
                    break;

                case "Test":
                    SetIonincBundleForDevAndTest(objIonicBundle);
                    break;

                case StaticData.ENVIRONMENT_RC:
                    objIonicBundle.Include("~/Scripts/Libraries/libraries_ionic.js");
                    break;

                case StaticData.ENVIRONMENT_LIVE:
                    objIonicBundle.Include("~/Scripts/Libraries/libraries_ionic.min.js");
                    break;

                default:
                    break;
            }

            bundles.Add(objIonicBundle);
        }

        private static void AddScriptAngularBundle(BundleCollection bundles)
        {
            ScriptBundle objAngularBundle = new ScriptBundle(StaticData.BUNDLE_SCRIPT_ANGULAR);

            switch (ConfigData.Environment)
            {
                case StaticData.ENVIRONMENT_DEV:
                    objAngularBundle.IncludeDirectory("~/Scripts/Libraries/Angular", "*.js");
                    break;

                case "Test":
                    objAngularBundle.IncludeDirectory("~/Scripts/Libraries/Angular", "*.js");
                    break;

                case StaticData.ENVIRONMENT_RC:
                    objAngularBundle.Include("~/Scripts/Libraries/libraries_angular.js");
                    break;

                case StaticData.ENVIRONMENT_LIVE:
                    objAngularBundle.Include("~/Scripts/Libraries/libraries_angular.min.js");
                    break;

                default:
                    break;
            }

            bundles.Add(objAngularBundle);
        }

        private static void AddScriptComponentBundle(BundleCollection bundles)
        {
            ScriptBundle objComponentBundle = new ScriptBundle(StaticData.BUNDLE_SCRIPT_COMPONENT);

            switch (ConfigData.Environment)
            {
                case StaticData.ENVIRONMENT_DEV:
                    objComponentBundle.IncludeDirectory("~/Scripts/Libraries/Component", "*.js");
                    break;

                case "Test":
                    objComponentBundle.IncludeDirectory("~/Scripts/Libraries/Component", "*.js");
                    break;

                case StaticData.ENVIRONMENT_RC:
                    objComponentBundle.Include("~/Scripts/Libraries/libraries_component.js");
                    break;

                case StaticData.ENVIRONMENT_LIVE:
                    objComponentBundle.Include("~/Scripts/Libraries/libraries_component.min.js");
                    break;

                default:
                    break;
            }

            bundles.Add(objComponentBundle);
        }

        private static void SetApplicationBundleForDevAndTest(ScriptBundle objApplicationBundle)
        {
            objApplicationBundle.IncludeDirectory("~/Areas/Directive/Scripts/Directives", "*.js");
            objApplicationBundle.IncludeDirectory("~/Areas/Directive/Scripts/Factories", "*.js");
            objApplicationBundle.IncludeDirectory("~/Areas/MWG/Scripts/Controllers", "*.js");
            objApplicationBundle.IncludeDirectory("~/Areas/MWG/Scripts/Factories", "*.js");
            objApplicationBundle.IncludeDirectory("~/Scripts/Controllers", "*.js");
            objApplicationBundle.IncludeDirectory("~/Scripts/Factories", "*.js");
        }

        private static void AddScriptApplicationBundle(BundleCollection bundles)
        {
            ScriptBundle objApplicationBundle = new ScriptBundle(StaticData.BUNDLE_SCRIPT_APPLICATION);

            switch (ConfigData.Environment)
            {
                case StaticData.ENVIRONMENT_DEV:
                    SetApplicationBundleForDevAndTest(objApplicationBundle);
                    break;

                case "Test":
                    SetApplicationBundleForDevAndTest(objApplicationBundle);
                    break;

                case StaticData.ENVIRONMENT_RC:
                    objApplicationBundle.Include("~/Areas/Directive/Scripts/directives.js");
                    objApplicationBundle.Include("~/Areas/Directive/Scripts/directive_factories.js");
                    objApplicationBundle.Include("~/Areas/MWG/Scripts/mwg_controllers.js");
                    objApplicationBundle.Include("~/Areas/MWG/Scripts/mwg_factories.js");
                    objApplicationBundle.Include("~/Scripts/index_controllers.js");
                    objApplicationBundle.Include("~/Scripts/index_factories.js");
                    break;

                case StaticData.ENVIRONMENT_LIVE:
                    objApplicationBundle.Include("~/Areas/Directive/Scripts/directives.min.js");
                    objApplicationBundle.Include("~/Areas/Directive/Scripts/directive_factories.min.js");
                    objApplicationBundle.Include("~/Areas/MWG/Scripts/mwg_controllers.min.js");
                    objApplicationBundle.Include("~/Areas/MWG/Scripts/mwg_factories.min.js");
                    objApplicationBundle.Include("~/Scripts/index_controllers.min.js");
                    objApplicationBundle.Include("~/Scripts/index_factories.min.js");
                    break;

                default:
                    break;
            }

            bundles.Add(objApplicationBundle);
        }

        private static void SetMainBundleForDevAndTest(ScriptBundle objMainBundle)
        {
            objMainBundle.Include("~/Scripts/Main/filters.js");
            objMainBundle.Include("~/Scripts/Main/application.js");
        }

        private static void AddScriptMainBundle(BundleCollection bundles)
        {
            ScriptBundle objMainBundle = new ScriptBundle(StaticData.BUNDLE_SCRIPT_MAIN);

            switch (ConfigData.Environment)
            {
                case StaticData.ENVIRONMENT_DEV:
                    SetMainBundleForDevAndTest(objMainBundle);
                    break;

                case "Test":
                    SetMainBundleForDevAndTest(objMainBundle);
                    break;

                case StaticData.ENVIRONMENT_RC:
                    objMainBundle.Include("~/Scripts/main.js");
                    break;

                case StaticData.ENVIRONMENT_LIVE:
                    objMainBundle.Include("~/Scripts/main.min.js");
                    break;

                default:
                    break;
            }

            bundles.Add(objMainBundle);
        }

        #endregion Javascript
    }
}
