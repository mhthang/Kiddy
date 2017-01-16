function ClassCourseCtrl($scope, $http, $modalInstance, Constants, SemesterId, CourseId) {

    $scope.SemesterClassrooms = null;
    $scope.CourseSubjects = null;
    $scope.SemesterTeachers = null;
    $scope.SemesterRooms = null;

    $scope.LoadingCount = 0;
    $scope.SaveProcessing = false;

    $scope.Model = null;

    $scope.onload = function () {

        loadClassRooms(SemesterId);
        loadCourses(SemesterId);
        loadTeachers(SemesterId);
        loadRooms(SemesterId);

        // model
        get(CourseId);
    };

    var startLoading = function()
    {
        $scope.LoadingCount++;
    }

    var stopLoading = function () {
        $scope.LoadingCount--;
    }

    var loadClassRooms = function (semesterId) {
        var requestModel = { Id: semesterId };
        startLoading();
        $http.post(Constants.WebApi.ClassRoom.Search, requestModel).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SemesterClassrooms = response.data.Records;
            stopLoading();
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status. 
            stopLoading();
        });
    };

    var loadCourses = function (semesterId) {
        var configs = { cache: false };
        var payload = {
            "semesterId": semesterId
        };

        configs.params = payload;

        startLoading();
        $http.post(Constants.WebApi.Course.GetSemesterCourses, null, configs).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.CourseSubjects = response.data;
            stopLoading();
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status. 
            stopLoading();
        });
    };

    var loadTeachers = function (semesterId) {
        var requestModel = {
            Id: semesterId
        };

        startLoading();
        $http.post(Constants.WebApi.Teacher.GetSemesterTeachers, requestModel).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SemesterTeachers = response.data;
            stopLoading();
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.       
            stopLoading();
        });
    };

    var loadRooms = function (semesterId) {
        var requestModel = {
            Id: semesterId
        };
        startLoading();
        $http.post(Constants.WebApi.Room.GetSemesterRooms, requestModel).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SemesterRooms = response.data;
            stopLoading();
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.     
            stopLoading();
        });
    };

    var get = function (id) {
    
        if (id == null) return;

        var model = {
            Id: id
        };

        stopLoading();
        $http.post(Constants.WebApi.ClassCourse.Get, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Model = response.data;
            stopLoading();
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.     
            stopLoading();
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        createOrUpdate($scope.Model);
    };

    var createOrUpdate = function (model) {
        $scope.SaveProcessing = true;
        $http.post(Constants.WebApi.ClassCourse.CreateOrUpdate, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            //response.data;
            $scope.SaveProcessing = false;
            $modalInstance.close();

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.SaveProcessing = false;
        });
    };
}