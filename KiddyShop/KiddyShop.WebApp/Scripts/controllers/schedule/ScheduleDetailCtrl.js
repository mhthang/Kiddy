function ScheduleDetailCtrl($scope, $http, $stateParams, Constants) {

    var scheduleId = $stateParams.sid;
    var semesterId = $stateParams.semid;

    $scope.SemId = semesterId;
    $scope.OrgId = $stateParams.orgid;

    $scope.IsLoading1 = false;

    $scope.onload = function () {
        get(scheduleId);
    };

    $scope.Model = null;

    var get = function (id) {
        if (id == null) return;

        var model = {
            Id: id
        };

        $http.post(Constants.WebApi.Schedule.GetScheduleInfo, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Model = response.data;
            
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };    

    $scope.validate = function () 
    {
        if (scheduleId == null) return;

        $scope.IsLoading1 = true;

        var model = {
            Id: scheduleId
        };

        $http.post(Constants.WebApi.Scheduling.Validate, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Model = response.data;
            $scope.IsLoading1 = false;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
            $scope.IsLoading1 = false;
        });

    }

    $scope.generate = function ()
    {
        if (scheduleId == null) return;

        $scope.IsLoading1 = true;

        var model = {
            Id: scheduleId
        };

        $http.post(Constants.WebApi.Scheduling.Generate, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.IsLoading1 = false;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
            $scope.IsLoading1 = false;
        });
    }

    $scope.adjust = function () {
        if (scheduleId == null) return;

        $scope.IsLoading1 = true;

        var model = {
            Id: scheduleId
        };

        $http.post(Constants.WebApi.Scheduling.Adjust, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Model = response.data;
            $scope.IsLoading1 = false;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
            $scope.IsLoading1 = false;
        });
    }

    $scope.complete = function () {
        if (scheduleId == null) return;

        $scope.IsLoading1 = true;

        var model = {
            Id: scheduleId
        };

        $http.post(Constants.WebApi.Scheduling.Complete, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Model = response.data;
            $scope.IsLoading1 = false;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
            $scope.IsLoading1 = false;
        });
    }  
}