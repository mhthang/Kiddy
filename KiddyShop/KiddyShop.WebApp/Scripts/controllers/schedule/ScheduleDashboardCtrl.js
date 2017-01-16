function ScheduleDashboardCtrl($scope, $rootScope, $http, $stateParams, Constants) {

    var semesterId = $stateParams.semid;

    $scope.onload = function () {
        $rootScope.$broadcast(Constants.Events.SemesterChanged, semesterId );
    };
}