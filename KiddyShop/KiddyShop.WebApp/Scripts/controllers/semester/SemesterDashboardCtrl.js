function SemesterDashboardCtrl($scope, $rootScope, $http, $stateParams, Constants) {

    $scope.OrgId = $stateParams.orgid;
    $scope.SemId = $stateParams.semid;    

    $scope.Model = null;
    $scope.TimeSlots = null;   

    $scope.onload = function () {
        //$rootScope.$broadcast(Constants.Events.SemesterChanged, $scope.SemId );
        get($scope.SemId);
        getTimeSlot($scope.SemId);
    };

    var get = function (id) {

        if (id == null) return;

        var model = {
            Id: id
        };

        $http.post(Constants.WebApi.Semester.GetSummary, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Model = response.data;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    var getTimeSlot = function(id)
    {
        if (id == null) return;

        var model = {
            Id: id
        };

        $http.post(Constants.WebApi.TimeSlot.GetSemesterTimeSlots, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.TimeSlots = response.data;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    }
}