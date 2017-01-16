function TimetableManagerCtrl($scope, $http, $stateParams, Constants) {

    $scope.SemId = $stateParams.semid;
    $scope.OrgId = $stateParams.orgid;

    $scope.IsLoading = false;

    $scope.onload = function () {
        get($scope.SemId);
    };

    $scope.Model = null;

    var get = function (semesterId) {
        if (semesterId == null) return;

        var configs = { cache: false };
        var payload = {
            "semesterId": semesterId
        };

        configs.params = payload;

        $scope.IsLoading = true;

        $http.post(Constants.WebApi.Schedule.GetSemesterScheduleInfo, null, configs).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Model = response.data;
            $scope.IsLoading = false;
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.IsLoading = false;
        });
    };    

    $scope.calculate = function ()
    {
        if ($scope.SemId == null) return;

        var configs = { cache: false };
        var payload = {
            "semesterId": $scope.SemId
        };

        configs.params = payload;

        $scope.IsLoading = true;
        $http.post(Constants.WebApi.Scheduling.CalculateScheduleBoard, null, configs).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Model = response.data;
            $scope.IsLoading = false;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
            $scope.IsLoading = false;
        });

    }
}