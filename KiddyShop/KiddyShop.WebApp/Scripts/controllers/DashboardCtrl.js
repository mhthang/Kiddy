function DashboardCtrl($scope, $rootScope, $http, $modal, SweetAlert, timeAgo, Constants) {

    $rootScope.$on('logon', function (event, args) {
        $scope.onload();
    });

    $scope.onload = function () { }

 

}