function OrganizationCtrl($scope, $http, $modalInstance, Constants, OrganizationId) {

    $scope.onload = function () {
        get(OrganizationId);
    };

    $scope.Model = null;

    var get = function (id) {
    
        if (id == null) return;

        var model = {
            Id: id
        };

        $http.post(Constants.WebApi.Organization.Get, model).then(function (response) {
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
        $http.post(Constants.WebApi.Organization.CreateOrUpdate, model).then(function (response) {
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