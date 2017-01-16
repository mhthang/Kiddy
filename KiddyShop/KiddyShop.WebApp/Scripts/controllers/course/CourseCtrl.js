function CourseCtrl($scope, $http, $modalInstance, Constants, SemesterId, CourseId) {

    $scope.SemesterPrograms = null;
    $scope.SemesterSubjectGroups = null;
    $scope.SemesterSubjects = null;
    $scope.Model = null;

    $scope.SelectedSubjectGroup = null;

    $scope.onload = function () {
        loadPrograms(SemesterId);
        loadSemesterSubjects(SemesterId);
        get(CourseId);        
    };

    var loadPrograms = function (semesterId) {
        var requestModel = { Id: semesterId };
        $http.post(Constants.WebApi.Program.GetSemesterPrograms, requestModel).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SemesterPrograms = response.data;            
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.            
        });
    };

    var loadSemesterSubjects = function (semesterId) {
        var requestModel = { Id: semesterId };
        $http.post(Constants.WebApi.SubjectGroup.GetSemesterSubjectByGroup, requestModel).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SemesterSubjectGroups = response.data;
            loadSelectedSubject($scope.Model, $scope.SemesterSubjectGroups);
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

        $http.post(Constants.WebApi.Course.Get, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Model = response.data;
            loadSelectedSubject($scope.Model, $scope.SemesterSubjectGroups);
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    var loadSelectedSubject = function (model, groups) {
        if (groups != null && model != null && model.SubjectId != null)
        {
            angular.forEach(groups, function (value, key) {
                if (value.Id === model.Subject.SubjectGroupId) {
                    $scope.SelectedSubjectGroup = value;
                }
            });            
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        createOrUpdate($scope.Model);
    };

    var createOrUpdate = function (model) {
        $http.post(Constants.WebApi.Course.CreateOrUpdate, model).then(function (response) {
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