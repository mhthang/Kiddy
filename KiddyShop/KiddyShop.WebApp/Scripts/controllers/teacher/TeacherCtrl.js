function TeacherCtrl($scope, $http, $modalInstance, Constants, SemesterId, TeacherId) {

    $scope.onload = function () {
        loadSemesterDivisions(SemesterId);
        getTeacher(TeacherId);
        getTeacherConstraints(TeacherId, SemesterId);
        loadStaffConstraintList(TeacherId, SemesterId);
    };

    $scope.SemesterDivisions = null;
    $scope.TeacherModel = null;
    $scope.TeacherConstraints = [];
    $scope.StaffConstraintList = [];
    $scope.TeacherRemovedConstraints = [];

    $scope.IsEditing = false;

    var IsConstraintChanged = false;

    var getTeacher = function (teacherId) {

        if (teacherId == null) return;

        var teacher = {
            Id: teacherId
        };

        $http.post(Constants.WebApi.Teacher.Get, teacher).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.TeacherModel = response.data;
            
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    var getTeacherConstraints = function (teacherId, semesterId) {

        if (teacherId == null) return;

        var configs = { cache: false };
        var payload = {
            "teacherId": teacherId,
            "semesterId": semesterId
        };

        configs.params = payload;

        $http.post(Constants.WebApi.Teacher.GetTeacherConstraints, null, configs).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.TeacherConstraints = response.data;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    var loadStaffConstraintList = function (teacherId, semesterId) {

        var configs = { cache: false };
        var payload = {
            "teacherId": teacherId,
            "semesterId": semesterId
        };

        configs.params = payload;

        $http.post(Constants.WebApi.Teacher.GetStaffConstraintList, null, configs).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.StaffConstraintList = response.data;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    var loadSemesterDivisions = function (semesterId) {

        if (semesterId == null) return;

        var model = {
            Id: semesterId
        };

        $http.post(Constants.WebApi.Division.GetSemesterDivision, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SemesterDivisions = response.data.Records;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        createOrUpdate($scope.TeacherModel, TeacherId, SemesterId);
    };

    var createOrUpdate = function (model, teacherId, semesterId) {

        // Added constraints
        var addedConstraints = [];
        angular.forEach($scope.TeacherConstraints, function (value, key) {
            if (value.IsNew === true) {
                addedConstraints.push(value);
            }
        });

        var teacherEditingModel =
            {
                TeacherId: teacherId,
                SemesterId: semesterId,
                Teacher: model,
                RemovedConstraints: $scope.TeacherRemovedConstraints,
                AddedConstraints: addedConstraints
            };

        $http.post(Constants.WebApi.Teacher.CreateOrUpdate, teacherEditingModel).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            //response.data;

            $modalInstance.close();

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    $scope.addConstraint = function () {
        var newConstraint = {
            Id: null,
            Title: null,
            ConstraintId: null,
            TeacherId: TeacherId,
            SemesterId: SemesterId, 
            IsNew: true,
            IsEditing: true
        };

        angular.forEach($scope.TeacherConstraints, function (value, key) {
            if (value.IsEditing === true)
                value.IsEditing = false;
        });

        $scope.TeacherConstraints.push(newConstraint);

        $scope.IsEditing = true;        
    };

    $scope.acceptNewConstraint = function (constraint)
    {
        angular.forEach($scope.StaffConstraintList, function (value, key) {
            if (value.Id === constraint.ConstraintId)
                constraint.Title = value.Title;
        });

        constraint.IsEditing = false;

        $scope.IsEditing = false;

        IsConstraintChanged = true;
    }

    $scope.removeConstraint = function (constraint, idx)
    {
        if (constraint != null && constraint.Id != null)
            $scope.TeacherRemovedConstraints.push(constraint);

        $scope.TeacherConstraints.splice(idx, 1);

        IsConstraintChanged = true;
    }
}