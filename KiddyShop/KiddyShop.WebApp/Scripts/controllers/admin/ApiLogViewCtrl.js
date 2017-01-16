function ApiLogViewCtrl($scope, $http, $modalInstance, Constants, ApiLogId) {

    $scope.ApiLog = {};
    $scope.IsLoading = true;

    $scope.loadApiLog = function (apiLogId) {
        $scope.IsLoading = true;
        var apiLogDto = {
            Id: apiLogId
        }
        $http.post(Constants.WebApi.Admin.GetApiLog, apiLogDto).then(function (response) {
            $scope.ApiLog = response.data;
            $scope.IsLoading = false;
        }, function (response) {
            $scope.IsLoading = false;
            alert('failed!');
        });
    }

    $scope.onload = function()
    {
        $scope.loadApiLog(ApiLogId);
    }

    $scope.close = function () {
        $scope.ok();
    }

    $scope.ok = function () {
        $modalInstance.close();        
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};