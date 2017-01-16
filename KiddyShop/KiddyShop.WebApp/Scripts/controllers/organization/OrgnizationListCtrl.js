function OrganizationListCtrl($scope, $http, $modal, Constants) {
    $scope.onload = function () {
        search();
    };

    $scope.SearchResponse = null;

    var search = function () {
        $http.post(Constants.WebApi.Organization.Search, null).then(function (response) {
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
            templateUrl: 'organization/edit',
            controller: OrganizationCtrl,
            resolve: {
                OrganizationId: function () {
                    return id;
                }
            }
        });

        modalInstance.result.then(function () {
            //on ok button press           
            search();
        }, function () {
            //on cancel button press
        });
    }
}