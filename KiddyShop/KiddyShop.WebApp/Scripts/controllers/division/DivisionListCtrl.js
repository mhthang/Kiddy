function DivisionListCtrl($scope, $http, $stateParams, $modal, Constants) {

    $scope.SemId = $stateParams.semid;

    $scope.onload = function () {
        search($scope.SemId);
    };

    $scope.SearchResponse = null;

    var search = function (semesterId) {
        var requestModel = {
            Id: semesterId
        };

        $http.post(Constants.WebApi.Division.Search, requestModel).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SearchResponse = response.data;
            
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    $scope.open = function(id)
    {
        var modalInstance = $modal.open({
            templateUrl: 'division/edit',
            controller: DivisionCtrl,
            resolve: {
                SemesterId: function () {
                    return $scope.SemId;
                },
                DivisionId: function () {
                    return id;
                }
            }
        });

        modalInstance.result.then(function () {
            //on ok button press           
            search($scope.SemId);
        }, function () {
            //on cancel button press
        });
    }
}