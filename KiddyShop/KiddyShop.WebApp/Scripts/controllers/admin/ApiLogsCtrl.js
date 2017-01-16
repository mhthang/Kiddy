function AdminApiLogsCtrl($scope, $http, $modal, $stateParams, Constants, SweetAlert) {

    $scope.ApiLogs = [];
    $scope.IsLoading = false;
    $scope.IsLoadMore = false;
    $scope.TotalRecords = 0;

    $scope.SearchFilter = {
        RequestUri: null,
        UserId: null,
        ApplicationName: null,
        FromDate: null,
        EndDate: null,
        Paging: {
            PageIndex: 0,
            PageSize: 20
        },
    }

    $scope.searchApiLogs = function (searchFilter) {
        $scope.IsLoading = true;
        $http.post(Constants.WebApi.Admin.GetApiLogs, searchFilter).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.TotalRecords = response.data.TotalRecords;

            if (response.data.Records != null) {
                $scope.ApiLogs = $scope.ApiLogs.concat(response.data.Records);                

                if (response.data.Records.length >= searchFilter.Paging.PageSize) {
                    $scope.IsLoadMore = true;
                }
                else {
                    $scope.IsLoadMore = false;
                }
            }
            else {
                $scope.IsLoadMore = false;
            }
            $scope.IsLoading = false;
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            $scope.IsLoading = false;
            SweetAlert.swal({
                title: "Error!",
                text: response.data,
                type: "warning"
            });
        });
    }

    $scope.onload = function () {
        
    }    

    $scope.open = function(apilog)
    {
        var modalInstance = $modal.open({
            templateUrl: 'views/admin/apilog_view.html',
            controller: ApiLogViewCtrl,
            resolve: {
                ApiLogId: function () {
                    return apilog.Id;
                }
            }
        });

        modalInstance.result.then(function () {
            //on ok button press             
        }, function () {
            //on cancel button press
        });
    }

    $scope.search = function()
    {
        $scope.ApiLogs = [];
        $scope.SearchFilter.Paging.PageIndex = 0;
        $scope.TotalRecords = 0;
        $scope.IsLoadMore = false;
        $scope.searchApiLogs($scope.SearchFilter);
    }

    $scope.loadMore = function () {
        $scope.SearchFilter.Paging.PageIndex ++;
        $scope.searchApiLogs($scope.SearchFilter);
    }

};