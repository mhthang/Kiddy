var DeviceFactory = function ($rootScope, $ionicPopup, $state, $timeout, CameraFactory, AccountFactory, SystemFactory, PopupFactory) {
    var factory = {};
    factory.backButtonCount = 0;

    var setAppVersionAndDeviceInfo = function () {
        if (window.device) {
            $rootScope.global.device = {};
            $rootScope.global.device.UUID = window.device.uuid;
            $rootScope.global.device.PlatformVersion = window.device.platform;
            $rootScope.global.device.IMEI = window.device.imei;
            $rootScope.global.device.DeviceName = window.device.marketingname;
            $rootScope.global.device.Model = window.device.model;
            $rootScope.global.device.Manufacturer = window.device.manufacturer;

            switch (window.device.platform.toLowerCase()) {
                case "ios":
                    $rootScope.global.device.PlatformID = 1;
                    break;

                case "android":
                    $rootScope.global.device.PlatformID = 2;
                    break;

                default:
                    break;
            }

            cordova.getAppVersion(function (version) {
                $rootScope.global.device.AppVersion = version;
            });

            $rootScope.global.localFilePath = "";

            if ($rootScope.global.device.PlatformID == 1) {
                $rootScope.global.localFilePath = "NoCloud/";
            }

            $rootScope.global.localFilePath += "PGApp";
        }
    }

    //#region Event

    var onResume = function () {
        SystemFactory.checkAndUpdateScriptAndApp(function () { });
    };

    var onBackKeyDown = function () {
        if ($rootScope.global.currentLocation == "app/login") {
            navigator.app.exitApp();
        }

        ++factory.backButtonCount;

        $timeout(function () {
            factory.backButtonCount = 0;
        }, 3000);

        // Trong 3 giây mà bấm nút back 2 lần thì hiểu là muốn thoát app
        if (factory.backButtonCount == 2) {
            PopupFactory.confirm("Bạn có chắc muốn đóng ứng dụng?", function (res) {
                if (res) {
                    navigator.app.exitApp();
                } else {
                    factory.backButtonCount = 0;
                }
            });
        } else if (CameraFactory.cameraMode) {
            CameraFactory.cameraMode = false;
        } else {
            navigator.app.backHistory();
        }
    }

    var onOffline = function () {
        $rootScope.global.isOnline = false;
    };

    var onOnline = function () {
        $rootScope.global.isOnline = true;
    };

    var addEventListeners = function () {
        document.addEventListener("resume", onResume, false);
        document.addEventListener("offline", onOffline, false);
        document.addEventListener("online", onOnline, false);
        document.addEventListener("backbutton", onBackKeyDown, false);
    }

    var onDeviceReady = function () {
        $rootScope.global.isInitialising = true;

        SystemFactory.checkAndUpdateApp(function (response) {
            navigator.splashscreen.hide();

            // false -> không update app, chạy tiếp
            if (!response) {
                addEventListeners();
                setAppVersionAndDeviceInfo();

                if (navigator.connection.type != Connection.UNKNOWN && navigator.connection.type != Connection.NONE) {
                    $rootScope.global.isOnline = true;
                }

                AccountFactory.autoLogIn(function (response) {
                    if (response) {
                        SystemFactory.loginSuccess(response);
                        $state.go("app.home");
                    } else {
                        $state.go("app.login");
                    }

                    $rootScope.global.isInitialising = false;
                });
            }
        });
    };

    //#endregion

    factory.initialise = function () {
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    return factory;
}

DeviceFactory.$inject = ["$rootScope", "$ionicPopup", "$state", "$timeout", "CameraFactory", "AccountFactory", "SystemFactory", "PopupFactory"];