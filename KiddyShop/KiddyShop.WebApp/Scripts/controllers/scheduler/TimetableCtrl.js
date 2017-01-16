function TimetableCtrl($scope, $http, $modalInstance, Constants, TimetableType, ReferenceObjectId, TimetableId) {

    $scope.onload = function () {
        loadTimetable(TimetableId, TimetableType, ReferenceObjectId);
        //get(ClassRoomId);
    };

    $scope.Timetable = null;
    $scope.Model = null;

    var get = function (id) {
    
        if (id == null) return;

        var model = {
            Id: id
        };

        $http.post(Constants.WebApi.ClassRoom.Get, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Model = response.data;
            
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    var loadTimetable = function (timetableId, timetableType, refObjectId) {

        if (timetableId == null && timetableType == null && refObjectId == null) return;

        var model = {
            Id: timetableId,
            Type: timetableType,
            ReferenceObjectId: refObjectId
        };

        $http.post(Constants.WebApi.Scheduling.GetTimetable, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Timetable = response.data;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        updateTimetable($scope.Timetable);
    };

    var updateTimetable = function (timetable) {
        
        $http.post(Constants.WebApi.Scheduling.UpdateTimetable, timetable).then(function (response) {
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