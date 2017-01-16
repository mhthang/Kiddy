function OrdersCtrl($scope, $http, $modal, $stateParams, $localStorage, SweetAlert, Constants) {    

    $scope.Orders = null;
    $scope.IsLoading = false;
    $scope.IsLoadMore = false;
    $scope.TotalRecords = 0;

    $scope.Today = new Date();
    
    $scope.OrderStatuses = [
        {
            Name: 'New',
            Value: 0,
            Checked: false
        },
        {
            Name: 'Ready',
            Value: 1,
            Checked: false
        },
        {
            Name: 'Ongoing',
            Value: 2,
            Checked: false
        },
        {
            Name: 'Completed',
            Value: 3,
            Checked: false
        },
        {
            Name: 'Canceled',
            Value: 4,
            Checked: false
        },
        {
            Name: 'Pending',
            Value: 5,
            Checked: false
        },
        {
            Name: 'Suspended',
            Value: 6,
            Checked: false
        },
        {
            Name: 'Unpaid',
            Value: 7,
            Checked: false
        },
    ];

    $scope.SearchFilter = {
        Title: null,
        Statuses: [],
        Contact: {
            FirstName: null,
            EmailAddress: null,
            PhoneNumber: null
        },
        FromDate: null,
        EndDate: null,
        Paging: {
            PageIndex: 0,
            PageSize: 999
        },
    };

    var loadCache = function()
    {
        if ($localStorage.OrderCacheSearchFilter != null) {
            $scope.SearchFilter = $localStorage.OrderCacheSearchFilter;
            $scope.Orders = $localStorage.OrderCacheSearchResult;
            $scope.TotalRecords = $localStorage.OrderCacheTotalRecords;
        }
    }

    var saveCache = function () {
        $localStorage.OrderCacheSearchFilter = $scope.SearchFilter;
        $localStorage.OrderCacheSearchResult = $scope.Orders;
        $localStorage.OrderCacheTotalRecords = $scope.TotalRecords;
    }

    $scope.onload = function()
    {
        loadCache();

        if ($scope.SearchFilter != null && $scope.SearchFilter.Statuses != null)
        {
            for(var i = 0; i < $scope.SearchFilter.Statuses.length; i ++)
            {
                var idx = $scope.SearchFilter.Statuses[i];

                $scope.OrderStatuses[idx].Checked = true;
            }
        }
    }

    $scope.open = function (order) {
        var modalInstance = $modal.open({
            templateUrl: 'views/projects/order.html',
            controller: OrderViewCtrl,
            resolve: {
                OrderId: function () {
                    return order.Id;
                }
            }
        });

        modalInstance.result.then(function () {
            //on ok button press             
        }, function () {
            //on cancel button press
        });
    }

    var updateSearchFilter = function () {
        $scope.SearchFilter.Statuses = [];
        for(var i = 0; i < $scope.OrderStatuses.length; i ++)
        {
            var stage = $scope.OrderStatuses[i];
            if(stage.Checked)
            {
                $scope.SearchFilter.Statuses.push(stage.Value);
            }
        }
    }

    $scope.searchOrders = function (searchFilter) {
        $scope.IsLoading = true;
        updateSearchFilter();

        $http.post(Constants.WebApi.Project.SearchOrders, searchFilter).then(function (response) {

            $scope.TotalRecords = response.data.TotalRecords;

            if (response.data.Records != null) {
                $scope.Orders = $scope.Orders.concat(response.data.Records);

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

            saveCache();

        }, function (response) {
            $scope.IsLoading = false;
            SweetAlert.swal({
                title: "Error!",
                text: response.data,
                type: "warning"
            });
        });
    };

    $scope.search = function () {
        $scope.Orders = [];
        $scope.SearchFilter.Paging.PageIndex = 0;
        $scope.TotalRecords = 0;
        $scope.IsLoadMore = false;
        $scope.searchOrders($scope.SearchFilter);
    }

    $scope.loadMore = function () {
        $scope.SearchFilter.Paging.PageIndex++;
        $scope.searchOrders($scope.SearchFilter);
    }
};