function RoomClassRoomCtrl($scope, $http, $modalInstance, Constants, SemesterId, RoomId, ClassRoomId, ClassRoomName) {

    $scope.onload = function () {
        loadClassRooms(SemesterId);
        $scope.PrimaryKeyId = ClassRoomId;
        $scope.ForeignKeyId = RoomId;
    };

    $scope.ClassRooms = null;

    var loadClassRooms = function (semesterId) {
        var request = { Id: semesterId };
        $http.post(Constants.WebApi.Room.GetClassRooms, request).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            if (ClassRoomId != null) response.data.unshift({ 'Id': ClassRoomId, 'Name': ClassRoomName });
            $scope.ClassRooms = response.data;
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };
    
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        if ($scope.PrimaryKeyId == null) return;

        $scope.model = {
            PrimaryKeyId: $scope.PrimaryKeyId,
            ForeignKeyId: $scope.ForeignKeyId,
            PreviousPrimaryKeyId: ClassRoomId
        }
        createOrUpdate($scope.model);
    };

    var createOrUpdate = function (request) {

        $http.post(Constants.WebApi.Room.CreateOrUpdateClassRoom, request).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            //response.data;

            $modalInstance.close();

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };
}