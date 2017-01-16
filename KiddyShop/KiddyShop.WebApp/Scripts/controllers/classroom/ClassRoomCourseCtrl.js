function ClassRoomCourseCtrl($scope, $http, $modalInstance, Constants, SemesterId, ClassRoomId, ClassCourseId, CourseId, CourseName) {

    $scope.onload = function () {
        loadCourses(ClassRoomId);
        loadBuildingRooms(SemesterId);
        get(ClassCourseId);
    };

    $scope.Courses = null;
    $scope.Buildings = null;
    $scope.CourseTeachers = null;
    $scope.Model = null;

    var loadCourses = function (classRoomId) {

        var model = {
            Id: classRoomId
        };

        $http.post(Constants.WebApi.Course.GetAvailableCoursesByClassRoomId, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            var subject = { 'Name': CourseName };
            if (ClassCourseId != null) response.data.unshift({ 'Id': CourseId, 'Subject': subject });
            $scope.Courses = response.data;
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    var loadSelectedRoom = function (model, buildings) {
        if (buildings != null && model != null && model.RoomId != null) {
            angular.forEach(buildings, function (value, key) {
                if (value.Id === model.Room.BuildingId) {
                    $scope.SelectedBuilding = value;
                }
            });
        }
    };

    var loadBuildingRooms = function (semesterId) {
        var requestModel = { Id: semesterId };
        $http.post(Constants.WebApi.Building.GetSemesterBuilding, requestModel).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Buildings = response.data.Records;
            loadSelectedRoom($scope.Model, $scope.Buildings);
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.            
        });
    };

    var loadCourseTeachers = function (courseId) {

        var model = {
            Id: courseId
        };

        $http.post(Constants.WebApi.Teacher.GetTeachersForCourse, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.CourseTeachers = response.data;
            
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    var get = function (id) {

        if (id == null) return;

        var model = {
            Id: id
        };

        $http.post(Constants.WebApi.ClassCourse.Get, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Model = response.data;
            loadSelectedRoom($scope.Model, $scope.Buildings);
            loadCourseTeachers($scope.Model.CourseId);

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        if ($scope.Model.CourseId == null) return;

        $scope.Model.ClassRoomId = ClassRoomId;
        createOrUpdate($scope.Model);
    };

    var createOrUpdate = function (request) {

        $http.post(Constants.WebApi.ClassCourse.CreateOrUpdate, request).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            //response.data;

            $modalInstance.close();

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    $scope.changeCourse = function () {
        $scope.Model.TeacherId = null;
        loadCourseTeachers($scope.Model.CourseId);
    }
}