function ClassRoomTeacherCtrl($scope, $http, $modalInstance, Constants, SemesterId, ClassRoomId, TeacherId, TeacherName) {

    $scope.onload = function () {
        loadSemesterTeachers(SemesterId);
        get(TeacherId);
    };

    $scope.SemesterTeachers = null;

    var get = function (id) {
        
        if (id == null) return;

        $scope.ForeignKeyId = id;
    };

    var loadSemesterTeachers = function (semesterId) {

        if (semesterId == null) return;

        var model = {
            Id: semesterId
        };
        
        $http.post(Constants.WebApi.Teacher.GetAvailableSemesterHomeroomTeachers, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            if ($scope.ForeignKeyId) response.data.unshift({ 'Id' : $scope.ForeignKeyId, 'FullName' : TeacherName });

            $scope.SemesterTeachers = response.data;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        if ($scope.ForeignKeyId == null) return;
        var model = {
            PrimaryKeyId: ClassRoomId,
            ForeignKeyId: $scope.ForeignKeyId
        };
        createOrUpdate(model);
    };

    $scope.remove = function () {
        var model = {
            PrimaryKeyId: ClassRoomId,
            ForeignKeyId: null
        };
        createOrUpdate(model);
    };

    var createOrUpdate = function (request) {
        
        $http.post(Constants.WebApi.ClassRoom.CreateOrUpdateTeacher, request).then(function (response) {
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