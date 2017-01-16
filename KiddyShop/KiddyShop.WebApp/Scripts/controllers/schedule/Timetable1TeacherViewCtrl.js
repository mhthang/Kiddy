function Timetable1TeacherViewCtrl($scope, $http, $stateParams, Constants) {

    var scheduleId = $stateParams.sid;
    var semesterId = $stateParams.semid;

    $scope.IsLoading = false;

    $scope.onload = function () {
        //get(scheduleId);
        //loadSchedule(scheduleId);
        loadTeacherSchedule(scheduleId);
    };

    $scope.Model = null;
    $scope.WorkingDays = [];
    $scope.ScheduleBoard = null;

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

    var loadSchedule = function (id) {
        if (id == null) return;
        
        var model = {
            Id: id
        };

        $scope.IsLoading = true;

        $http.post(Constants.WebApi.Scheduling.LoadScheduleBoard, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.ScheduleBoard = response.data;
            $scope.IsLoading = false;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.     
            $scope.IsLoading = false;
        });
    };

    var loadTeacherSchedule = function (id) {
        if (id == null) return;

        var model = {
            Id: id
        };

        $scope.IsLoading = true;

        $http.post(Constants.WebApi.Scheduling.LoadTeacherScheduleBoard, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.ScheduleBoard = response.data;
            $scope.IsLoading = false;

            $scope.WorkingDays = [];
            var workingDays = $scope.ScheduleBoard.WorkingDays;
            for (var i = 0; i < workingDays; i++) {
                $scope.WorkingDays.push(i);
            }
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.     
            $scope.IsLoading = false;
        });
    };

}