function DivisionCtrl($scope, $http, $modalInstance, Constants, SemesterId, DivisionId) {

    $scope.onload = function () {
        get(DivisionId);
    };

    $scope.Model = null;

    var get = function (id) {
    
        if (id == null) return;
        
        var division = {
            Id: id
        };

        $http.post(Constants.WebApi.Division.Get, division).then(function (response) {
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

        $http.post(Constants.WebApi.Division.CreateOrUpdate, model).then(function (response) {
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