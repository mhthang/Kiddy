using System.Web;
using System.Web.Optimization;

namespace KiddyShop.WebApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
            //            "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/modernizr-*"));

            //bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
            //          "~/Scripts/bootstrap.js",
            //          "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/controllers")
                    .IncludeDirectory("~/Scripts/controllers", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/teacher", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/category", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/post", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/division", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/subject", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/subjectgroup", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/classgroup", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/classroom", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/course", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/classcourse", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/room", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/program", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/semester", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/building", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/organization", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/scheduler", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/schedule", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/usermanagement", "*.js")
                    .IncludeDirectory("~/Scripts/controllers/messaging", "*.js")
                    .Include("~/Scripts/controllers.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquerys").Include(
                     "~/Scripts/jquery/jquery-2.1.1.min.js",
                     "~/Scripts/plugins/jquery-ui/jquery-ui.js",
                     "~/Scripts/bootstrap/bootstrap.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/services").Include(
                     "~/Scripts/services/AuthService.js",
                     "~/Scripts/services/AuthInterceptorService.js",
                     "~/Scripts/services/UserPhotoService.js"));

            bundles.Add(new ScriptBundle("~/bundles/apps").Include(
                     "~/Scripts/inspinia.js",
                     "~/Scripts/app.js",
                     "~/Scripts/constants.js",
                     "~/Scripts/commons.js",
                     "~/Scripts/config.js",
                     "~/Scripts/translations.js",
                     "~/Scripts/directives.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularjs").Include(
                     "~/Scripts/angular/angular.min.js",
                     "~/Scripts/angular/angular-sanitize.js",
                     "~/Scripts/angular/angular-animate.min.js",
                     "~/Scripts/angular/angular-aria.min.js",
                     "~/Scripts/angular/angular-messages.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
                      "~/Scripts/plugins/oclazyload/dist/ocLazyLoad.min.js",
                      "~/Scripts/angular-translate/angular-translate.min.js",
                      "~/Scripts/ui-router/angular-ui-router.min.js",
                      "~/Scripts/bootstrap/ui-bootstrap-tpls-0.12.0.min.js",
                      "~/Scripts/plugins/angular-idle/angular-idle.js"));

            bundles.Add(new ScriptBundle("~/bundles/plugins").Include(
                     "~/Scripts/plugins/metisMenu/jquery.metisMenu.js",
                     "~/Scripts/plugins/slimscroll/jquery.slimscroll.min.js",
                     "~/Scripts/plugins/pace/pace.min.js",
                     "~/Scripts/plugins/ngstorage/ngStorage.min.js",
                     "~/Scripts/plugins/autosave/autoSave.js",
                     "~/Scripts/plugins/iCheck/icheck.min.js",
                     "~/Scripts/plugins/sweetalert/sweetalert.min.js",
                     "~/Scripts/plugins/sweetalert/angular-sweetalert.min.js",
                     "~/Scripts/plugins/angularSpinners/angular-spinners.min.js",
                     "~/Scripts/plugins/image-crop/image-crop.js",
                     "~/Scripts/plugins/toastr/toastr.min.js",
                     "~/Scripts/plugins/datapicker/angular-datepicker.js",
                     "~/Scripts/plugins/timeago/angular-timeago.js",
                     "~/Scripts/plugins/isoCurrency/isocurrency.common.js",
                     "~/Scripts/plugins/isoCurrency/isocurrency.js",
                     "~/Scripts/plugins/angular_material/angular-material.min.js",
                     "~/Scripts/plugins/angular-google-chart/ng-google-chart.js",
                     "~/Content/plugins/flag-icon-css-master/assets/docs.js",
                     "~/Scripts/plugins/summernote/summernote.min.js",
                     "~/Scripts/plugins/summernote/angular-summernote.min.js",
                     "~/Scripts/plugins/ngDraggable/ngDraggable.js",
                     "~/Scripts/plugins/angular-recaptcha/angular-recaptcha.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Plugins/css").Include(
                      "~/Content/plugins/iCheck/custom.css",
                      "~/Content/plugins/sweetalert/sweetalert.css",
                      "~/Content/plugins/image-crop/image-crop-styles.css",
                      "~/Content/plugins/datapicker/angular-datapicker.css",
                      "~/Content/plugins/angular_material/angular-material.min.css",
                      "~/Content/plugins/flag-icon-css-master/assets/docs.css",
                      "~/Content/plugins/summernote/summernote.css",
                      "~/Content/plugins/summernote/summernote-bs3.css",
                      "~/Content/plugins/flag-icon-css-master/css/flag-icon.css"));

#if DEBUG
            BundleTable.EnableOptimizations = false;
#else
            BundleTable.EnableOptimizations = false;
#endif
        }
    }
}
