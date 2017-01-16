function UserDetailCtrl($scope, $http, $modalInstance, SweetAlert, Constants, UserId, ProfileId) {
    $scope.ProfileModel = {
        Id: ProfileId,
        EmailAddress: '',
        FirstName: '',
        LastName: '',
        Lang: '',
        Gender: true,
        AvatarPhoto: null,
        UserType: '',
        ProfileType:''
    };

    $scope.Countries = [];
    $scope.TimeZones = [];
    $scope.Langs = [];
    $scope.optionsUserTypeEnum = [];
    $scope.optionsProfileTypeEnum = [];
    $scope.roleGroups = {
        RoleGroups:[],
        IdUser:UserId
    };

    $scope.loadingCount = 0;
    $scope.processingCount = 0;

    $scope.UserPhoto = {
        UserId: UserId,
        FileName: null,
        PhotoBase64Data: null,
        FileType: null,
        FileSize: 0
    };

    $scope.isPhotoChanged = false;

    $scope.loadUserProfile = function (userId) {

        var configs = { cache: false };
        var payload = {
            "userId": userId
        };

        configs.params = payload;

        $http.post(Constants.WebApi.Account.GetUserProfile, null, configs).then(function (response) {
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

    $scope.saveUserRoleGroup = function () {
        var data = { model: $scope.roleGroups, idUser: UserId };
        $http({
            method: 'POST',
            url: Constants.WebApi.Account.UpdateUserGroupsForUser,
            data: $scope.roleGroups
        }).success(function (data) {
            SweetAlert.swal({
                title: "Save Successfully",
                text: "",
                type: "success"
            });
        }).
        error(function (data) {
            SweetAlert.swal({
                title: "Save Failed!",
                text: "",
                type: "warning"
            });
        });
    }

    $scope.changeUserProfilePhoto = function () {

        if ($scope.ProfileModel.Id != null) {

            $scope.UserPhoto.PhotoBase64Data = $scope.ProfileModel.AvatarPhoto;

            $scope.processingCount++;
            $http.post(Constants.WebApi.Account.ChangeUserPhoto, $scope.UserPhoto).then(function (response) {
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
                $scope.loadUserProfile(UserId);
        }, function (response) {
            $scope.loadingCount--;
            if ($scope.loadingCount == 0)
                $scope.loadUserProfile(UserId);

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
                $scope.loadUserProfile(UserId);
        }, function (response) {
            $scope.loadingCount--;
            if ($scope.loadingCount == 0)
                $scope.loadUserProfile(UserId);

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

    $scope.loadUserType = function() {
        var UserTypeUser = {
            Code: 1,
            Text: "USER"
        };
        var UserTypeStaff = {
            Code: 2,
            Text: "STAFF"
        };
        var UserTypeAdmin = {
            Code: 3,
            Text: "ADMIN"
        };
        $scope.optionsUserTypeEnum.push(UserTypeUser);
        $scope.optionsUserTypeEnum.push(UserTypeStaff);
        $scope.optionsUserTypeEnum.push(UserTypeAdmin);
    }

    $scope.loadProfileType = function () {
        var ProfileTypeClient = {
            Code: 1,
            Text: "CLIENT"
        };
        var ProfileTypeClientAdmin = {
            Code: 2,
            Text: "CLIENT_ADMIN"
        };
        var ProfileTypeTeacher = {
            Code: 3,
            Text: "TEACHER"
        };
        var ProfileTypeStaff = {
            Code: 4,
            Text: "STAFF"
        };
        var ProfileTypeManager = {
            Code: 5,
            Text: "MANAGER"
        };
        var ProfileTypeAdmin = {
            Code: 6,
            Text: "ADMIN"
        };
        $scope.optionsProfileTypeEnum.push(ProfileTypeClient);
        $scope.optionsProfileTypeEnum.push(ProfileTypeClientAdmin);
        $scope.optionsProfileTypeEnum.push(ProfileTypeTeacher);
        $scope.optionsProfileTypeEnum.push(ProfileTypeStaff);
        $scope.optionsProfileTypeEnum.push(ProfileTypeManager);
        $scope.optionsProfileTypeEnum.push(ProfileTypeAdmin);
    }

    $scope.loadRoleGroups = function () {
        $http.get(Constants.WebApi.Account.GetRoleUsers + UserId).then(function (response) {
            $scope.roleGroups = response.data;
        }, function (response) {
            SweetAlert.swal({
                title: "Error!",
                text: Constants.WebApi.Account.GetRoleUsers + UserId,
                type: "warning"
            });
        });
    }

    $scope.onload = function () {
        $scope.loadLangs();
        $scope.loadCountries();
        $scope.loadTimeZones();
        $scope.loadUserType();
        $scope.loadProfileType();
        $scope.loadRoleGroups();
    }

    $scope.saveProfile = function () {
        if ($scope.isPhotoChanged) {
            $scope.changeUserProfilePhoto();
        }
        $scope.saveUserProfile();
        $scope.saveUserRoleGroup();
    }

     $scope.hasError = function (form, field, validation) {
        if (validation) {
            return (form[field].$dirty && form[field].$error[validation]) || ($scope.submitted && form[field].$error[validation]);
        }
        return (form[field].$dirty && form[field].$invalid) || ($scope.submitted && form[field].$invalid);
    };
}