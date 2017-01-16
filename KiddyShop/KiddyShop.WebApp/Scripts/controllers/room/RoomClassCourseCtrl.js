function RoomClassCourseCtrl($scope, $http, $modalInstance, Constants, SemesterId, RoomId, ClassCourseId) {

    $scope.onload = function () {
        loadClassRooms(SemesterId);
        $scope.PrimaryKeyId = ClassCourseId;
        $scope.ForeignKeyId = RoomId;
    };

    $scope.Model = null;
    $scope.OriginalClassRoomId = null;
    $scope.SubjectName = null;
    $scope.ClassCourses = null;
    $scope.ClassRooms = null;

    var loadClassRooms = function (semesterId) {
        var request = {
            Id: semesterId,
            FilterText: 'All'
        };
        $http.post(Constants.WebApi.Room.GetClassRooms, request).then(function (response) {
            
            $scope.ClassRooms = response.data;
            get(ClassCourseId);

        }, function (response) {
                       
        });
    };

    $scope.changeClassRoom = function () {

        loadCourses($scope.Model.ClassRoomId);
        if ($scope.Model.ClassRoomId == $scope.OriginalClassRoomId)
            $scope.PrimaryKeyId = ClassCourseId;
        else
            $scope.PrimaryKeyId = null;
    }

    var loadCourses = function (classRoomId) {

        var model = {
            Id: classRoomId
        };

        $http.post(Constants.WebApi.Room.GetClassCourses, model).then(function (response) {

            if ($scope.OriginalClassRoomId && classRoomId == $scope.OriginalClassRoomId) response.data.unshift({ 'Id': ClassCourseId, 'SubjectName': $scope.SubjectName });
            $scope.ClassCourses = response.data;

        }, function (response) {
                        
        });
    };

    var get = function (id) {

        if (id == null) return;
            
        var model = { Id: id };

        $http.post(Constants.WebApi.ClassCourse.Get, model).then(function (response) {
            
            $scope.Model = response.data;
            $scope.OriginalClassRoomId = $scope.Model.ClassRoomId;
            $scope.SubjectName = $scope.Model.SubjectName;
            $scope.changeClassRoom();

        }, function (response) {

        });
    }
    

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        if ($scope.PrimaryKeyId == null) return;

        $scope.model = {
            PrimaryKeyId: $scope.PrimaryKeyId,
            ForeignKeyId: $scope.ForeignKeyId,
            PreviousPrimaryKeyId: ClassCourseId
        }
        createOrUpdate($scope.model);
    };

    var createOrUpdate = function (request) {

        $http.post(Constants.WebApi.Room.CreateOrUpdateClassCourse, request).then(function (response) {
            
            $modalInstance.close();

        }, function (response) {
                         
        });
    };
}