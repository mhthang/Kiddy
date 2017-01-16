function AppNavigatorCtrl($scope, $rootScope, $state, $http, $stateParams, Constants) {

    $scope.OrgId = $stateParams.orgid;
    $scope.SemId = $stateParams.semid;

    $scope.Semester = null;

    $rootScope.$on(Constants.Events.SemesterChanged, function (event, args) {
        $scope.SemId = args;
        if ($scope.SemId != null)
            loadSemester($scope.SemId);
    });

    $scope.onload = function ()
    {
        if ($scope.SemId != null)
            loadSemester($scope.SemId);
    }

    var loadSemester = function (semesterId)
    {
        var model = {
            Id: semesterId
        };

        $http.post(Constants.WebApi.Application.GetSemester, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Semester = response.data;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    }
}