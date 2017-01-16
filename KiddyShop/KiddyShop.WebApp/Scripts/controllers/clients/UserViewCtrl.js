function UserViewCtrl($scope, $http, $stateParams, SweetAlert, Constants, Commons) {
    $scope.IsLoading = false;
    $scope.IsCommentProcessing = false;

    $scope.Countries = [];
    $scope.TimeZones = [];
    $scope.Langs = [];

    $scope.UserDto = {
        Id: $stateParams.id,
    };

    $scope.AuditLogs = [];

    $scope.onload = function () {
        $scope.loadingCount = 2;
        $scope.loadLangs();
        $scope.loadCountries();
        $scope.loadTimeZones();

        $scope.loadUser($scope.UserDto);
        $scope.loadRecentActivity($scope.UserDto.Id);
    };

    $scope.loadUser = function (user) {

        $scope.IsLoading = true;
        $http.post(Constants.WebApi.Client.GetUser, user).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.UserDto = response.data;
            $scope.IsLoading = false;
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            $scope.IsLoading = false;
            toastr.options.closeButton = true;
            toastr.error('Could not load invoice!', response.data);
        });
    }

    $scope.loadRecentActivity = function (userId) {

        var auditLogDto = { RecordId: userId };

        $http.post(Constants.WebApi.AuditLog.GetUserActivity, auditLogDto).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.AuditLogs = response.data;
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            toastr.options.closeButton = true;
            toastr.error('Could not load activity!', response.data);
        });
    }

    $scope.save = function () {
        $scope.saveUser($scope.UserDto);
    }

    $scope.saveUser = function (user) {
        $scope.IsLoading = true;
        $http.post(Constants.WebApi.Client.SaveUser, user).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.IsLoading = false;
            $scope.loadRecentActivity(user.Id);
            toastr.options.closeButton = true;
            toastr.info('Save!');
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            $scope.IsLoading = false;
            toastr.options.closeButton = true;
            toastr.error('Could not save invoice!', response.data);
        });
    }

    $scope.parseInt = function (number) {
        return parseInt(number, 10);
    }

    $scope.saveComment = function () {
        $scope.IsCommentProcessing = true;
        var userId = $scope.UserDto.Id;
        var comment = {
            ObjectId: userId,
            CommentText: $scope.CommentText
        };

        $http.post(Constants.WebApi.AuditLog.SaveUserComment, comment).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.IsCommentProcessing = false;
            $scope.CommentText = null;
            $scope.loadRecentActivity(userId);
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            $scope.IsCommentProcessing = false;
            toastr.options.closeButton = true;
            toastr.error('Could not save comment!', response.data);
        });
    }

    $scope.hasError = function (form, field, validation) {
        if (validation) {
            return (form[field].$dirty && form[field].$error[validation]) || ($scope.submitted && form[field].$error[validation]);
        }
        return (form[field].$dirty && form[field].$invalid) || ($scope.submitted && form[field].$invalid);
    };

    $scope.loadCountries = function () {
        $http.post(Constants.WebApi.Accounts.GetCountry, null).then(function (response) {
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
        $http.post(Constants.WebApi.Accounts.GetTimeZone, null).then(function (response) {
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
};