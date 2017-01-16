function ProductsCtrl($scope, $http, $modal, $stateParams, Constants, SweetAlert) {

    $scope.Products = [];
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

    $scope.searchProducts = function (filter) {
        $scope.IsLoading = true;
        $http.post(Constants.WebApi.Project.SearchProducts, filter).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.TotalRecords = response.data.TotalRecords;

            if (response.data.Records != null) {
                $scope.Products = $scope.Products.concat(response.data.Records);

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

    $scope.open = function(product)
    {
        var modalInstance = $modal.open({
            templateUrl: 'views/product/product_view.html',
            controller: ProductViewCtrl,
            resolve: {
                productId: function () {
                    return product.Id;
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
        $scope.Products = [];
        $scope.SearchFilter.Paging.PageIndex = 0;
        $scope.TotalRecords = 0;
        $scope.IsLoadMore = false;
        $scope.searchProducts($scope.SearchFilter);
    }

    $scope.loadMore = function () {
        $scope.SearchFilter.Paging.PageIndex++;
        $scope.searchProducts($scope.SearchFilter);
    }
};