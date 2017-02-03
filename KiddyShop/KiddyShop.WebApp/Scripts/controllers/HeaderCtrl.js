function HeaderCtrl($scope, $rootScope, $http, $modal, $localStorage, $location, Constants, AuthService) {

    AuthService.isAuthenticated().then(function (response) {
        if (!response) {
            $location.path("/login");
        }
    }, function (response) {
        alert("Could not check Authentication");
    });

    $scope.logout = function () {
        AuthService.logOut().then(function (response) {
            if (response) {
                $location.path("/login");
            }
            else {
                alert("Could not Logout");
            }
        }, function (response) {
            alert("Could not Logout");
        });

        return false;
    };

    $scope.UserProfile = {
        Id: null,
        FirstName: '',
        LastName: '',
        FullName: '',
        Gender: true,
        AvatarPhoto: 'Images/default_avatar.png',
    };

    $scope.openUserProfile = function () {
        var modalInstance = $modal.open({
            templateUrl: 'account/UserProfile',
            controller: UserProfileCtrl,
        });

        modalInstance.result.then(function () {
            //on ok button press 
            $scope.getUserProfile();
        }, function () {
            //on cancel button press
        });
    }

    $scope.loadUserProfile = function () {
        $http.post(Constants.WebApi.Account.GetCurrentUserProfile, {}).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.UserProfile = response.data;
            if ($scope.UserProfile.Lang != $rootScope.lang) {
                $rootScope.changeLanguage($scope.UserProfile.Lang);
            }

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status. 
            if (response.status !== 401) {
                toastr.options.closeButton = true;
                toastr.error('Error: ' + response.data, 'User Profile Error: ' + response.status);
            }
        });
    }

    $scope.changeUserLanguage = function (langCode) {
        var user = {
            Lang: langCode,
        }

        $http.post(Constants.WebApi.Account.ChangeCurrentUserLanguage, user).then(function (response) {
            $scope.UserProfile.Lang = langCode;

            if ($scope.UserProfile.Lang != $rootScope.lang) {
                $rootScope.changeLanguage($scope.UserProfile.Lang);
            }

        }, function (response) {
            SweetAlert.swal({
                title: "Error!",
                text: "Change User Language Failed!",
                type: "warning"
            });
        });
    }

    $scope.onload = function () {
        $scope.loadUserProfile();
    }
}