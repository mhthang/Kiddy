function ClientViewCtrl($scope, $http, $stateParams, SweetAlert, Constants, Commons) {

    $scope.IsLoading = false;
    $scope.IsCommentProcessing = false;

    $scope.ClientDto = {
        Id: $stateParams.id,
    };

    $scope.AuditLogs = [];

    $scope.onload = function () {
        $scope.loadClient($scope.ClientDto);
        $scope.loadRecentActivity($scope.ClientDto.Id);
    };

    $scope.loadClient = function (client) {

        $scope.IsLoading = true;
        $http.post(Constants.WebApi.Client.GetClient, client).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.ClientDto = response.data;
            $scope.IsLoading = false;
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            $scope.IsLoading = false;
            toastr.options.closeButton = true;
            toastr.error('Could not load client!', response.data);
        });
    }

    $scope.loadRecentActivity = function (clientId) {

        var auditLogDto = { RecordId: clientId };

        $http.post(Constants.WebApi.AuditLog.GetClientActivity, auditLogDto).then(function (response) {
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
        $scope.saveClient($scope.ClientDto);
    }

    $scope.saveClient = function (client) {
        $scope.IsLoading = true;
        $http.post(Constants.WebApi.Client.SaveClient, client).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.IsLoading = false;
            $scope.loadRecentActivity(client.Id);
            toastr.options.closeButton = true;
            toastr.info('Save!');
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            $scope.IsLoading = false;
            toastr.options.closeButton = true;
            toastr.error('Could not save client!', response.data);
        });
    }

    $scope.parseInt = function (number) {
        return parseInt(number, 10);
    }

    $scope.saveComment = function () {
        $scope.IsCommentProcessing = true;
        var clientId = $scope.ClientDto.Id;
        var comment = {
            ObjectId: clientId,
            CommentText: $scope.CommentText
        };

        $http.post(Constants.WebApi.AuditLog.SaveClientComment, comment).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.IsCommentProcessing = false;
            $scope.CommentText = null;
            $scope.loadRecentActivity(clientId);
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
};