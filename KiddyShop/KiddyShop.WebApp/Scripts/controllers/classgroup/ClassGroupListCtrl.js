function ClassGroupListCtrl($scope, $http, $stateParams, $modal, SweetAlert, Constants) {

    $scope.SemId = $stateParams.semid;

    $scope.pager = {
        PageIndex: 1,
        PageSize: 50
    }
    $scope.maxSize = 5;

    $scope.onsearch = function () {
        $scope.pager.PageIndex = 1
        search($scope.SemId);
    }

    $scope.onload = function () {
        search($scope.SemId);
    };

    $scope.SearchResponse = null;

    var search = function (semId) {

        var requestModel =
        {
            Id: semId,
            FilterText: $scope.searchText,
            Pager: $scope.pager
        };

        $http.post(Constants.WebApi.ClassGroup.Search, requestModel).then(function (response) {
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
            templateUrl: 'classGroup/edit',
            controller: ClassGroupCtrl,
            resolve: {
                SemesterId: function () {
                    return $scope.SemId;
                },
                ClassGroupId: function () {
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

    $scope.onPaging = function () {
        search($scope.SemId);
    }

    $scope.remove = function (id) {

        SweetAlert.swal({
            title: "Remove?",
            text: "Remove this Class Group?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, remove it!",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                var model = {
                    Id: id
                };

                $http.post(Constants.WebApi.ClassGroup.Delete, model).then(function (response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    search($scope.SemId);

                });

            } else {
                //SweetAlert.swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
        });
    }
}