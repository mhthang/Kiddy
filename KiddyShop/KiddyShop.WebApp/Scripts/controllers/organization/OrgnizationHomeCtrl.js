function OrganizationHomeCtrl($scope, $http, $modal, Constants) {
    $scope.IsLoading = false;

    $scope.SearchRequest = {
        FilterText: null,
        FilterId: null,
        Pager: {
            PageSize: Constants.PAGER_PAGE_SIZE,
            PageIndex: 0
        }
    };

    $scope.SemesterOrganizations = null;
    $scope.SearchResponse = null;

    $scope.onload = function () {
        getOrganization();
        searchSemesters($scope.SearchRequest);
    };

    var searchSemesters = function (searchRequest) {

        $scope.IsLoading = true;
        $http.post(Constants.WebApi.Application.SearchUserSemesters, searchRequest).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SearchResponse = response.data;
            $scope.IsLoading = false;
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.IsLoading = false;
        });
    };

    var getOrganization = function () {
        $http.post(Constants.WebApi.Organization.Search, null).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SemesterOrganizations = response.data.Records;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    $scope.onsearch = function()
    {
        $scope.SearchRequest.Pager.PageIndex = 0;
        searchSemesters($scope.SearchRequest);
    }

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