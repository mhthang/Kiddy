function UsersCtrl($scope, $http, $modal, $stateParams, Constants, SweetAlert) {

    $scope.Users = [];
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

    $scope.searchUsers = function (filter) {
        $scope.IsLoading = true;
        $http.post(Constants.WebApi.Accounts.SearchUsers, filter).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.TotalRecords = response.data.TotalRecords;

            if (response.data.Records != null) {
                $scope.Users = $scope.Users.concat(response.data.Records);

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

    $scope.open = function(user)
    {
        var modalInstance = $modal.open({
            templateUrl: 'views/clients/user_view.html',
            controller: UserViewCtrl,
            resolve: {
                UserId: function () {
                    return user.Id;
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
        $scope.Users = [];
        $scope.SearchFilter.Paging.PageIndex = 0;
        $scope.TotalRecords = 0;
        $scope.IsLoadMore = false;
        $scope.searchUsers($scope.SearchFilter);
    }

    $scope.loadMore = function () {
        $scope.SearchFilter.Paging.PageIndex++;
        $scope.searchUsers($scope.SearchFilter);
    }
};