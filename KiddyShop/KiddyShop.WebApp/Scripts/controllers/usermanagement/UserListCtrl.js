function UserListCtrl($scope, $http, $stateParams, $modal, Constants) {

    $scope.IsLoading = false;

    $scope.pager = {
        PageIndex: 1,
        PageSize: Constants.PAGER_PAGE_SIZE
    }

    $scope.SearchModel = {
        FilterText: null,
        FilterId: null,
        UserType:0,
        Pager: $scope.pager
    }

    $scope.onload = function () {
        search();
    };

    $scope.onsearch = function () {
        $scope.pager.PageIndex = 1
        search();
    }

    var search = function () {

        $scope.IsLoading = true;
        $http.post(Constants.WebApi.Account.Search, $scope.SearchModel).then(function (response) {
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

    $scope.onPaging = function () {
        search();
    }

    $scope.open = function (userId, profileId) {
        var modalInstance = $modal.open({
            templateUrl: 'UserManagement/UserDetail',
            controller: UserDetailCtrl,
            resolve: {
                UserId: function () {
                    return userId;
                },
                ProfileId: function () {
                    return profileId;
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
    $scope.deleteUser = function (id, fullName) {
            //$http.get(Constants.WebApi.Account.DeleteUser, id).then(function (response) {
            //    wal("Deleted!", fullName + " has been deleted.", "success");
            //}, function (response) {
            //    // called asynchronously if an error occurs
            //    // or server returns response with an error status.    
        //    wal("Oops...!Something wrong", "ăidawijdoawijd.", "warning");
        //});
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover user: " + fullName,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function () {
            $http.get(Constants.WebApi.Account.DeleteUser + id).then(function (response) {
                swal({
                    title: "Deleted!",
                    text:fullName + " has been deleted.",
                    type: "success"}, 
                    function () {
                        search();
                    });
            }, function (response) { 
                swal("Oops...! Something went wrong.", parseErrors(response.data), "warning");
            });
        });
    };
    function parseErrors(response) {
        var errors = [];
        for (var key in response.ModelState) {
            for (var i = 0; i < response.ModelState[key].length; i++) {
                errors.push(response.ModelState[key][i] + '\n');
            }
        }
        return errors;
    }
}
