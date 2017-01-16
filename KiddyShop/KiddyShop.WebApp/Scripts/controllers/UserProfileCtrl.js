function UserProfileCtrl($scope, $http, $modalInstance, SweetAlert, Constants) {
    $scope.ProfileModel = {
        Id: null,
        EmailAddress: '',
        FirstName: '',
        LastName: '',
        Lang: '',
        Gender: true,
        AvatarPhoto: null
    };

    $scope.Countries = [];
    $scope.TimeZones = [];
    $scope.Langs = [];

    $scope.loadingCount = 0;
    $scope.processingCount = 0;

    $scope.UserPhoto = {
        FileName: null,
        PhotoBase64Data: null,
        FileType: null,
        FileSize: 0
    };

    $scope.isPhotoChanged = false;

    $scope.loadUserProfile = function () {
        $http.post(Constants.WebApi.Account.GetCurrentUserProfile, null).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.ProfileModel = response.data;
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            SweetAlert.swal({
                title: "Error!",
                text: "Load User Profile Failed!",
                type: "warning"
            });
            console.log(response.data);
        });
    }

    $scope.saveUserProfile = function () {
        if ($scope.ProfileModel.Id != null) {
            $scope.processingCount++;
            $http.post(Constants.WebApi.Account.UpdateCurrentUserProfile, $scope.ProfileModel).then(function (response) {
                $scope.processingCount--;
                if ($scope.processingCount == 0) {
                    $scope.ok();
                }
            }, function (response) {
                $scope.processingCount--;
                SweetAlert.swal({
                    title: "Error!",
                    text: "Save User Profile Failed!",
                    type: "warning"
                });

                //console.log(response.data);
            });
        }
    }

    $scope.changeUserProfilePhoto = function () {

        if ($scope.ProfileModel.Id != null) {

            $scope.UserPhoto.PhotoBase64Data = $scope.ProfileModel.AvatarPhoto;

            $scope.processingCount++;
            $http.post(Constants.WebApi.Account.ChangeCurrentUserPhoto, $scope.UserPhoto).then(function (response) {
                $scope.processingCount--;
                if ($scope.processingCount == 0) {
                    $scope.ok();
                }
            }, function (response) {
                $scope.processingCount--;
                SweetAlert.swal({
                    title: "Error!",
                    text: "Change Avatar Failed!",
                    type: "warning"
                });

                //console.log(response.data);
            });
        }
    }

    $scope.fileChanged = function (e) {
        var files = e.target.files;

        var fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);

        fileReader.onload = function (e) {
            $scope.imgSrc = this.result;
            $scope.$apply();

            $scope.UserPhoto.FileName = files[0].name;
            $scope.UserPhoto.FileType = files[0].type;
            $scope.UserPhoto.FileSize = files[0].size;

            $scope.isPhotoChanged = true;
        };

    }

    $scope.clear = function () {
        $scope.imageCropStep = 1;
        delete $scope.imgSrc;
        delete $scope.result;
        delete $scope.resultBlob;
    };

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.loadCountries = function () {
        $scope.loadingCount++;
        $http.post(Constants.WebApi.Application.GetCountries, null).then(function (response) {
            $scope.Countries = response.data;

            $scope.loadingCount--;
            if ($scope.loadingCount == 0)
                $scope.loadUserProfile();
        }, function (response) {
            $scope.loadingCount--;
            if ($scope.loadingCount == 0)
                $scope.loadUserProfile();

            SweetAlert.swal({
                title: "Error!",
                text: response.data,
                type: "warning"
            });
        });
    }

    $scope.loadTimeZones = function () {
        $scope.loadingCount++;
        $http.post(Constants.WebApi.Application.GetTimezones, null).then(function (response) {
            $scope.TimeZones = response.data;
            $scope.loadingCount--;
            if ($scope.loadingCount == 0)
                $scope.loadUserProfile();
        }, function (response) {
            $scope.loadingCount--;
            if ($scope.loadingCount == 0)
                $scope.loadUserProfile();

            SweetAlert.swal({
                title: "Error!",
                text: response.data,
                type: "warning"
            });
        });
    }

    $scope.loadLangs = function () {
        var langEnglish = {
            Code: 'en',
            Text: 'English'
        }

        var langVietnam = {
            Code: 'vn',
            Text: 'Vietnamese'
        }

        $scope.Langs.push(langEnglish);
        $scope.Langs.push(langVietnam);
    }

    $scope.onload = function () {
        $scope.loadLangs();
        $scope.loadCountries();
        $scope.loadTimeZones();
    }

    $scope.saveProfile = function () {
        if ($scope.isPhotoChanged) {
            $scope.changeUserProfilePhoto();
        }
        $scope.saveUserProfile();
    }

}