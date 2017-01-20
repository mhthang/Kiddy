var dependencyList = [];
dependencyList.push("ngSanitize");
dependencyList.push("ionic");
dependencyList.push("angular-svg-round-progressbar");
dependencyList.push("dcbImgFallback");
dependencyList.push("ui.select");

var pgapp = angular.module("pgapp", dependencyList);

//#region Khai báo factory

//#region Utility

pgapp.factory("LocalFileFactory", LocalFileFactory);
pgapp.factory("LocalStorageFactory", LocalStorageFactory);
pgapp.factory("ErrorLogFactory", ErrorLogFactory);
pgapp.factory("HTTPFactory", HTTPFactory);
pgapp.factory("CameraFactory", CameraFactory);
pgapp.factory("DeviceFactory", DeviceFactory);
pgapp.factory("PopupFactory", PopupFactory);
pgapp.factory("SystemFactory", SystemFactory);

//#endregion

//#region Index

pgapp.factory("AccountFactory", AccountFactory);
pgapp.factory("LoginFactory", LoginFactory);
pgapp.factory("ProfileFactory", ProfileFactory);

//#endregion

//#region Directive

pgapp.factory("AddNoticeCommentFactory", AddNoticeCommentFactory);

//#endregion

//#region MWG

pgapp.factory("NoticeFactory", NoticeFactory);
pgapp.factory("TimeKeepingFactory", TimeKeepingFactory);

//#endregion

//#endregion

//#region Khai báo directive

pgapp.directive("loadingicon", LoadingIcon);
pgapp.directive("updownlink", UpDownLink);
pgapp.directive("addnoticecomment", AddNoticeComment);
pgapp.directive("avatar", Avatar);
pgapp.directive("getfocus", GetFocus);
pgapp.directive("phonelink", PhoneLink);

//#endregion

//#region Khai báo filter

pgapp.filter("trustHtml", trustHtml);
pgapp.filter("dateFormat", dateFormat);
pgapp.filter("dateTimeFormat", dateTimeFormat);
pgapp.filter("shortenedName", shortenedName);
pgapp.filter("filterByAllProperty", filterByAllProperty);

//#endregion

//#region Khai báo hàm config

var configFunction = function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state("app", {
        url: "app",
        abstract: true,
        templateUrl: "Home/Menu",
        controller: null
    })

    var setAppSubState = function (state, url, templateURL, controller, params, cache) {
        if (!cache) {
            cache = false;
        }

        $stateProvider.state("app." + state, {
            url: "/" + url,
            cache: cache,

            views: {
                "menuContent": {
                    templateUrl: templateURL,
                    controller: controller
                }
            },

            params: params
        })
    }

    //#region Index

    setAppSubState("home", "home", "MWG/Notice/NoticeList", NoticeListController);
    setAppSubState("updateapp", "updateapp", "UpdateApp/UpdateApp", null);

    var setProfileSubState = function (state, url, templateURL, controller, params, cache) {
        setAppSubState(state, url, "Profile/" + templateURL, controller, params, cache)
    }

    setProfileSubState("profile", "profile", "ViewProfile", ProfileController);
    setProfileSubState("changepassword", "changepassword", "ChangePassword", ChangePasswordController);

    //#endregion

    setAppSubState("login", "login", "Login/Login", LoginController);

    //#region MWG

    var setMWGSubState = function (state, url, templateURL, controller, params, cache) {
        setAppSubState(state, url, "MWG/" + templateURL, controller, params, cache)
    }

    //#region Notice

    var setNoticeSubState = function (state, url, templateURL, controller, params, cache) {
        setMWGSubState(state, url, "Notice/" + templateURL, controller, params, cache)
    }

    setNoticeSubState("notice", "notice", "NoticeList", NoticeListController);

    setNoticeSubState("noticedetail", "noticedetail", "NoticeDetail", NoticeDetailController, {
        id: null
    });

    //#endregion

    setMWGSubState("timekeeping", "timekeeping", "TimeKeeping/TimeKeeping", TimeKeepingController);

    //#endregion

    $urlRouterProvider.otherwise("/app/home");
};

configFunction.$inject = ["$stateProvider", "$urlRouterProvider"];

pgapp.config(configFunction);

//#endregion

//#region Khai báo hàm run

var runFunction = function ($ionicPlatform, $location, $rootScope, $state, $ionicScrollDelegate, ErrorLogFactory, DeviceFactory, SystemFactory) {
    $rootScope.global = {};

    $rootScope.scrollToTop = function () {
        $ionicScrollDelegate.scrollTop();
    }

    // Khởi tạo những thứ liên quan Cordova
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }

        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        //#region Location Change

        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            $rootScope.global.isChangingPage = true;
        });

        $rootScope.$on("$locationChangeSuccess", function (event, next, current) {
            // Chuyển trang là tự ẩn nút scroll top
            $rootScope.global.currentLocation = $location.path();
            $rootScope.global.isChangingPage = false;

            if (!$rootScope.global.account && !$rootScope.global.isInitialising) {
                $state.go("app.login");
            }
        });

        $rootScope.$on("$locationChangeError", function (event, next, current, error) {
            $rootScope.global.isChangingPage = false;
            alert("Có lỗi xảy ra khi chuyển trang!");
            ErrorLogFactory.addErrorLog("Lỗi chuyển trang", error, "$locationChangeError", "application");
        });

        //#endregion

        // Khởi tạo đối tượng lưu thông tin toàn cục

        // Bắt đầu gửi hết log lỗi local lên server
        ErrorLogFactory.sendErrorListToServer();

        SystemFactory.setScriptVersion(function () { });
        DeviceFactory.initialise();
    });
}

runFunction.$inject = ["$ionicPlatform", "$location", "$rootScope", "$state", "$ionicScrollDelegate", "ErrorLogFactory", "DeviceFactory", "SystemFactory"];

pgapp.run(runFunction);

//#endregion