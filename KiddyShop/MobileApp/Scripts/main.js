var trustHtml = function ($sce) {
    return function (input) {
        if (!input) {
            return "";
        }

        return $sce.trustAsHtml(input);
    };
}

trustHtml.$inject = ["$sce"];

var dateFormat = function ($filter) {
    return function (input) {
        if (!input) {
            return "";
        }

        var resultDate;

        if (input instanceof Date) {
            resultDate = input;
        } else {
            var temp = input.replace(/\//g, "").replace("(", "").replace(")", "").replace("Date", "").replace("+0700", "");

            if (input.indexOf("Date") > -1) {
                resultDate = new Date(+temp);
            } else {
                resultDate = new Date(temp);
            }

            var utc = resultDate.getTime() + (resultDate.getTimezoneOffset() * 60000);

            // create new Date object for different city
            // using supplied offset
            resultDate = new Date(utc + (3600000 * 7));
        }

        return $filter("date")(resultDate, "dd/MM/yyyy");
    };
}

dateFormat.$inject = ["$filter"];

var dateTimeFormat = function ($filter) {
    function getCurrentDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = "0" + dd;
        }

        if (mm < 10) {
            mm = "0" + mm;
        }

        today = dd + "/" + mm + "/" + yyyy;
        return today;
    };

    return function (input) {
        if (!input) { return ""; }
        var temp = input.replace(/\//g, "").replace("(", "").replace(")", "").replace("Date", "").replace("+0700", "");

        var date;
        var resultDate;

        if (input.indexOf("Date") > -1) {
            resultDate = new Date(+temp);
            date = $filter("date")(resultDate, "dd/MM/yyyy");
            var utc = resultDate.getTime() + (resultDate.getTimezoneOffset() * 60000);

            // create new Date object for different city
            // using supplied offset
            resultDate = new Date(utc + (3600000 * 7));

            if (getCurrentDate() === date) {
                return " Hôm nay " + $filter("date")(resultDate, "HH:mm");
            } else {
                return $filter("date")(resultDate, "dd/MM/yyyy") + " " + $filter("date")(resultDate, "HH:mm ");
            }
        } else {
            date = $filter("date")(new Date(temp), "dd/MM/yyyy");

            if (getCurrentDate() === date) {
                return "Hôm nay";
            } else {
                var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

                // create new Date object for different city
                // using supplied offset
                resultDate = new Date(utc + (3600000 * 7));
                return $filter("date")(resultDate, "dd/MM/yyyy");
            }
        }
    };
}

dateTimeFormat.$inject = ["$filter"];

var shortenedName = function () {
    var processName;

    processName = function (name) {
        var result = "";

        if (name) {
            var preHyphen = "";
            var hyphenIndex = name.indexOf("-");

            if (hyphenIndex > 0) {
                var postHyphenIndex = hyphenIndex;

                if (name.charAt(postHyphenIndex + 1) == " ") {
                    ++postHyphenIndex;
                }

                preHyphen = name.substring(0, postHyphenIndex + 1);
                name = name.substring(postHyphenIndex + 1, name.length);
                result = preHyphen;
            }

            var arrNames = name.split(" ");

            for (var i = 0; i < arrNames.length - 1; ++i) {
                var temp = arrNames[i];

                if (!isNaN(temp)) {
                    result += temp + " ";
                } else {
                    result += temp.charAt(0) + ".";
                }
            }

            result += arrNames[arrNames.length - 1];
        }

        return result;
    }

    return function (name) {
        var result = "";

        if (name) {
            var lstString;

            if (name.indexOf("(") > -1) {
                lstString = name.split("(");
            } else {
                lstString = [];
                lstString.push(name);
            }

            var trimedList = [];

            lstString.forEach(function (current) {
                current = current.trim();

                if (current.length > 0) {
                    trimedList.push(current);
                }
            });

            lstString = trimedList;

            lstString.forEach(function (current) {
                var temp = ""

                if (current.indexOf(")") > -1) {
                    temp = "(" + processName(current.substring(0, current.length - 1)) + ")";
                } else {
                    temp = processName(current);
                }

                result += temp + " ";
            });

            result = result.substring(0, result.length);
        }

        return result;
    }
}

shortenedName.$inject = [];

var filterByAllProperty = function () {
    function change_alias(alias) {
        var str = alias;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ  |ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ  |ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\"| |\"|\&|\#|\[|\]|~|$|_/g, "-");
        /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
        str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
        str = str.replace(/^\-+|\-+$/g, "");
        //cắt bỏ ký tự - ở đầu và cuối chuỗi
        return str;
    }

    return function (items, props) {
        var out = [];
        if (angular.isArray(items)) {
            items.forEach(function (item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    if (item[prop]) {
                        var text = props[prop].toLowerCase();
                        if (change_alias(item[prop].toString().toLowerCase()).indexOf(change_alias(text)) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }
                }
                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            out = items;
        }
        return out;
    };
};

filterByAllProperty.$inject = [];
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