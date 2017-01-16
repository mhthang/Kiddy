function ProgramCourseCtrl($scope, $http, $modalInstance, Constants, SemesterId, CourseId, TrainingProgramId) {

    $scope.onload = function () {
        loadSemesterSubjectGroups(SemesterId);
    };

    $scope.SemesterSubjectGroups = null;
    $scope.Model = null;

    var loadSelectedSubject = function (model, subjectGroups) {
        if (subjectGroups != null && model != null && model.SubjectId != null) {
            angular.forEach(subjectGroups, function (value, key) {
                if (value.Id === model.Subject.SubjectGroupId) {
                    $scope.SelectedSubjectGroup = value;
                }
            });
        }
    };

    var loadSemesterSubjectGroups = function (semesterId) {

        if (semesterId == null) return;

        var model = {
            Id: semesterId
        };

        $http.post(Constants.WebApi.SubjectGroup.GetSemesterSubjectByGroup, model).then(function (response) {
                
            $scope.SemesterSubjectGroups = response.data;
            get(CourseId);

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    var get = function (id) {

        if (id == null) {
            $scope.Model = { 
                TrainingProgramId: TrainingProgramId,
                SubjectId: null,
                Name: '',
                ShortName: '',
                TotalSection: 0,
                SectionPerWeek: 0,
                IsTeachingByHomeroomTeacher: false,
                IsActive: false
            };

            return;
        }

        var model = {
            Id: id
        };

        $http.post(Constants.WebApi.Course.Get, model).then(function (response) {
                       
            $scope.Model = response.data;
            loadSelectedSubject($scope.Model, $scope.SemesterSubjectGroups);

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
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