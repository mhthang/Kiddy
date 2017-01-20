var ProfileController = function ($scope, $rootScope, $timeout, ProfileFactory, CameraFactory) {
    //#region Variable

    $scope.model = {};
    $scope.model.showRotate = true;

    //#endregion

    //#region Function

    //#region Support

    //#endregion

    //#region Verify

    //#endregion

    //#region Logic

    $scope.changeAvatar = function () {
        if (!$scope.model.isRotating) {
            CameraFactory.takePhoto(function (result) {
                if (!S(result).isEmpty()) {
                    $scope.model.isChangingAvatar = true;

                    ProfileFactory.changeAvatar(result, function (response) {
                        if (response) {
                            $rootScope.global.account.ImagePath = response;
                        }

                        $timeout(function () {
                            $scope.model.isChangingAvatar = false;
                        });
                    });
                }
            }, 3);
        }
    }

    $scope.rotate = function (type) {
        if (!$scope.model.isRotating) {
            $scope.model.isRotating = true;

            ProfileFactory.rotate(type, function (response) {
                if (response) {
                    $rootScope.global.account.ImagePath = response;
                }

                $scope.model.isRotating = false;
            });
        }
    }

    //#endregion

    //#endregion

    //#region Init

    var initialise = function () {
    }

    initialise();

    //#endregion
}

ProfileController.$inject = ["$scope", "$rootScope", "$timeout", "ProfileFactory", "CameraFactory"];

var ChangePasswordController = function ($scope, $rootScope, $state, ProfileFactory, PopupFactory, SystemFactory) {
    //#region Variable

    $scope.model = {};

    //#endregion

    //#region Function

    //#region Support

    var focusNewPassword = function () {
        $scope.model.focusNewPassword = true;
    }

    var focusRetypedNewPassword = function () {
        $scope.model.focusRetypedNewPassword = true;
    }

    //#endregion

    //#region Verify

    //#endregion

    //#region Logic

    $scope.changePassword = function () {
        if (S($scope.model.oldPassword).isEmpty()) {
            PopupFactory.alert("Vui lòng nhập mật khẩu cũ", function () {
                $scope.model.focusOldPassword = true;
            });
        } else if (S($scope.model.newPassword).isEmpty()) {
            PopupFactory.alert("Vui lòng nhập mật khẩu mới", focusNewPassword);
        } else if ($scope.model.oldPassword == $scope.model.retypedNewPassword) {
            PopupFactory.alert("Mật khẩu cũ và mật khẩu mới không được giống nhau", focusNewPassword);
        } else if (S($scope.model.retypedNewPassword).isEmpty()) {
            PopupFactory.alert("Vui lòng nhập lại mật khẩu mới", focusRetypedNewPassword);
        } else if ($scope.model.newPassword != $scope.model.retypedNewPassword) {
            PopupFactory.alert("Mật khẩu mới nhập lần đầu và nhập lại không giống nhau", focusRetypedNewPassword);
        } else {
            $scope.model.isChangingPassword = true;
            var oldPassword = CryptoJS.MD5($scope.model.oldPassword).toString();
            var newPassword = CryptoJS.MD5($scope.model.newPassword).toString();

            ProfileFactory.setNewPassword(oldPassword, newPassword, function (response) {
                if (response) {
                    $state.go("app.profile");

                    // Gán lại mật khẩu mới vô đối tượng account và lưu lại file để lần sau auto login được
                    $rootScope.global.account.Password = newPassword;
                    SystemFactory.saveUserData(function () { });
                }

                $scope.model.isChangingPassword = false;
            });
        }
    }

    //#endregion

    //#endregion

    //#region Init

    var initialise = function () {
    }

    initialise();

    //#endregion
}

ChangePasswordController.$inject = ["$scope", "$rootScope", "$state", "ProfileFactory", "PopupFactory", "SystemFactory"];