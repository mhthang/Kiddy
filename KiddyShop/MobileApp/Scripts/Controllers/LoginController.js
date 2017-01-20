var LoginController = function ($scope, $rootScope, $state, $ionicSideMenuDelegate, SystemFactory, LocalFileFactory, LoginFactory, PopupFactory) {
    //#region Variable

    $scope.model = {};

    //#endretion

    //#endregion

    //#region Function

    //#region Support

    var logout = function () {
        $scope.model.isLoggingOut = true;

        LoginFactory.logOut(function (response) {
            if (response) {
                $rootScope.global.account = null;
                LocalFileFactory.deleteFile(LOCAL_FILE_ACCOUNT_FOLDER + "/" + LOCAL_FILE_ACCOUNT_DATA, function (result) { });
            } else {
                window.location.reload();
            }

            $scope.model.isLoggingOut = false;
        });
    }

    var getPGGroupList = function() {
        $scope.model.isLoadingPGGroupList = true;

        LoginFactory.getPGGroupList(function (response) {
            if (response) {
                $scope.model.PGGroupList = response;

                _.remove($scope.model.PGGroupList, function (group) {
                    // Ẩn group admin
                    return group.GroupID == 14;
                });
            }

            $scope.model.isLoadingPGGroupList = false;
        });
    }

    //#endregion

    //#region Verify

    var validate = function () {
        if (S($scope.model.phone).isEmpty()) {
            PopupFactory.alert("Vui lòng nhập số điện thoại", function () {
                $scope.model.focusPhone = true;
            });

            return false;
        } if (S($scope.model.password).isEmpty()) {
            PopupFactory.alert("Vui lòng nhập mật khẩu", function () {
                $scope.model.focusPassword = true;
            });

            return false;
        }

        return true;
    }

    //#endregion

    //#region Logic

    $scope.login = function () {
        var check = validate();

        if (check) {
            var password = CryptoJS.MD5($scope.model.password).toString();
            $scope.model.isLoading = true;

            LoginFactory.logIn($scope.model.phone, password, function (response) {
                if (response) {
                    if (response.ErrorMessage) {
                        $scope.model.errorMessage = response.ErrorMessage;
                    } else {
                        SystemFactory.loginSuccess(response);
                        $ionicSideMenuDelegate.canDragContent(true);
                        $state.go("app.home");
                    }
                } else {
                    $scope.model.errorMessage = "Lỗi kết nối";
                }

                $scope.model.isLoading = false;
            });
        }
    }

    //#endregion Logic

    //#endregion

    //#region Init

    var initialise = function () {
        // Ản menu trái
        $ionicSideMenuDelegate.canDragContent(false);
        logout();
        getPGGroupList();
    }

    initialise();

    //#endregion
}

LoginController.$inject = ["$scope", "$rootScope", "$state", "$ionicSideMenuDelegate", "SystemFactory", "LocalFileFactory", "LoginFactory", "PopupFactory"];