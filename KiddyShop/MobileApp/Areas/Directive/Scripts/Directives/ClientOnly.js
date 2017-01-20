// Icon quay vòng vòng
var LoadingIcon = function () {
    var directive = {
        restrict: "E",

        scope: {
            icon: "@"
        },

        transclude: true,
        templateUrl: "Directive/ClientOnly/LoadingIcon",

        link: function (scope, element, attrs) {
        },
    };

    return directive;
};

LoadingIcon.$inject = [];

// Link xổ lên xổ xuống
var UpDownLink = function ($timeout) {
    var directive = {
        restrict: "E",

        scope: {
            linktext: "@",
            togglemodel: "=",
            changetoggle: "&"
        },

        transclude: true,
        templateUrl: "Directive/ClientOnly/UpDownLink",

        link: function (scope, element, attrs) {
            //#region Variable

            //#endregion

            //#region Function

            //#region Support

            //#endregion

            //#region Verify

            //#endregion

            //#region Logic

            scope.toggle = function () {
                scope.togglemodel = !scope.togglemodel;

                if (scope.changetoggle) {
                    $timeout(scope.changetoggle);
                }
            }

            //#endregion

            //#endregion

            //#region Init

            var initialise = function () {
            }

            initialise();

            //#endregion
        },
    };

    return directive;
};

UpDownLink.$inject = ["$timeout"];

// Hình đại diện
var Avatar = function ($rootScope) {
    var directive = {
        restrict: "E",

        scope: {
            imagesize: "=",
            roundimage: "=",
            imagepath: "@"
        },

        transclude: true,
        templateUrl: "Directive/ClientOnly/Avatar",

        link: function (scope, element, attrs) {
            //#region Variable

            scope.model = {};

            //#endregion

            //#region Function

            //#region Support

            var setImagePath = function () {
                // Nếu truyền đường dẫn thì xài, không truyền lấy hình tài khoản đăng nhập
                if (scope.imagepath) {
                    scope.model.imagePath = scope.imagepath;
                } else if ($rootScope.global.account) {
                    scope.model.imagePath = $rootScope.global.account.ImagePath;
                }
            }

            //#endregion

            //#region Verify

            //#endregion

            //#region Logic

            scope.$watch("imagepath", function () {
                setImagePath();
            });

            $rootScope.$watch("global.account.ImagePath", function () {
                setImagePath();
            });

            //#endregion

            //#endregion

            //#region Init

            var initialise = function () {
                setImagePath();
            }

            initialise();

            //#endregion

            scope.$watch
        },
    };

    return directive;
};

Avatar.$inject = ["$rootScope"];

// Tự focus lúc bật giá trị bằng true
var GetFocus = function ($timeout) {
    var directive = {
        restrict: "A",

        scope: {
            getfocus: "="
        },

        link: function (scope, element, attrs) {
            scope.$watch("getfocus", function () {
                if (scope.getfocus) {
                    $timeout(function () {
                        element[0].focus();
                    });
                }
            });

            element.bind("blur", function () {
                if (scope.getfocus != undefined) {
                    scope.getfocus = false;
                }
            });
        }
    };

    return directive;
}

GetFocus.$inject = ["$timeout"];

// Link điện thoại
var PhoneLink = function () {
    var directive = {
        restrict: "E",

        scope: {
            phone: "@"
        },

        transclude: true,
        templateUrl: "Directive/ClientOnly/PhoneLink",

        link: function (scope, element, attrs) {
            scope.call = function () {
                window.open("tel:" + scope.phone, "_system", "hidden=yes");
            }
        },
    };

    return directive;
};

PhoneLink.$inject = [];