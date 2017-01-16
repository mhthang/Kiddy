function ClientsCtrl($scope, $http, $modal, $stateParams, $localStorage, Constants, SweetAlert) {

    $scope.Clients = [];
    $scope.IsLoading = false;
    $scope.IsLoadMore = false;
    $scope.TotalRecords = 0;

    $scope.SearchFilter = {
        Title: null,
        Email: null,
        FromDate: null,
        EndDate: null,
        FilterBy: 0,
        IsDeleteOnly: false,
        Paging: {
            PageIndex: 0,
            PageSize: 20
        },
    };

    $scope.searchClients = function (filter) {
        $scope.IsLoading = true;
        $http.post(Constants.WebApi.Client.SearchUserProfiles, filter).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.TotalRecords = response.data.TotalRecords;

            if (response.data.Records != null) {
                $scope.Clients = $scope.Clients.concat(response.data.Records);

                if (response.data.Records.length >= filter.Paging.PageSize) {
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
            saveCache();
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

    var loadCache = function () {
        if ($localStorage.CacheSearchFilterClient != null) {
            $scope.SearchFilter = $localStorage.CacheSearchFilterClient;
            $scope.Clients = $localStorage.CacheSearchResultClient;
            $scope.TotalRecords = $localStorage.CacheTotalRecordsClient;
        }
    }

    var saveCache = function () {
        $localStorage.CacheSearchFilterClient = $scope.SearchFilter;
        $localStorage.CacheSearchResultClient = $scope.Clients;
        $localStorage.CacheTotalRecordsClient = $scope.TotalRecords;
    }

    $scope.onload = function () {
        loadCache();
    }    

    $scope.open = function(client)
    {
        var modalInstance = $modal.open({
            templateUrl: 'views/clients/client_view.html',
            controller: ClientViewCtrl,
            resolve: {
                ClientId: function () {
                    return client.Id;
                }
            }
        });

        modalInstance.result.then(function () {
            //on ok button press             
        }, function () {
            //on cancel button press
        });
    }

    $scope.search = function () {
        $scope.Clients = [];
        $scope.SearchFilter.Paging.PageIndex = 0;
        $scope.TotalRecords = 0;
        $scope.IsLoadMore = false;
        $scope.searchClients($scope.SearchFilter);
    }

    $scope.loadMore = function () {
        $scope.SearchFilter.Paging.PageIndex++;
        $scope.searchClients($scope.SearchFilter);
    }
};