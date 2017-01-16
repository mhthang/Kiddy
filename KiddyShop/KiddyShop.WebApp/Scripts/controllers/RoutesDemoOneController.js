function RoutesDemoOneCtrl($scope, $rootScope, $http, $stateParams, $modal, $localStorage, spinnerService, Constants) {

    var semesterId = $stateParams.semid;

    $scope.onload = function () {        
        getScheduleBoard(semesterId);
    };

    $scope.Timetable = null;
    $scope.ScheduleBoard = null;

    var getScheduleBoard = function (semesterId) {
        var model = {
            Id: semesterId
        };

        $http.post(Constants.WebApi.Scheduling.GetScheduleBoard, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.ScheduleBoard = response.data;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status. 
            alert('ccc');
        });
    };
}