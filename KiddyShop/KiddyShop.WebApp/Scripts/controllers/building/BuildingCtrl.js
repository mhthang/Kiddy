function BuildingCtrl($scope, $http, $modalInstance, Constants, SemesterId, BuildingId) {

    $scope.onload = function () {
        get(BuildingId);
    };

    $scope.Model = null;

    var get = function (id) {
    
        if (id == null) return;

        var model = {
            Id: id
        };

        $http.post(Constants.WebApi.Building.Get, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Model = response.data;
            
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        createOrUpdate($scope.Model);
    };

    var createOrUpdate = function (model) {
        model.SemesterId = SemesterId;

        $http.post(Constants.WebApi.Building.CreateOrUpdate, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            //response.data;

            $modalInstance.close();

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };
}