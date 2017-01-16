function TimetableListCtrl($scope, $http, $stateParams, $modal, Constants) {

    $scope.OrgId = $stateParams.orgid;
    $scope.SemId = $stateParams.semid;

    $scope.onload = function () {
        //search($scope.SemId);
    };

    $scope.SearchResponse = null;

    var search = function (semId) {        
        var requestModel = {Id: semId};
        $http.post(Constants.WebApi.ClassRoom.Search, requestModel).then(function (response) {
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
            templateUrl: 'classroom/edit',
            controller: ClassRoomCtrl,
            resolve: {
                SemesterId: function () {
                    return $scope.SemId;
                },
                ClassRoomId: function () {
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

    $scope.expand = function (model) {

        model.IsExpand = !model.IsExpand;

        if (model.IsExpand == null || !model.IsExpand) {
            
        }
    }
}