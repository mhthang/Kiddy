function SubjectCtrl($scope, $http, $modalInstance, Constants, SemesterId, SubjectId) {

    $scope.onload = function () {
        loadSemesterSubjectGroups(SemesterId);
        get(SubjectId);
    };

    $scope.Model = null;

    var get = function (id) {
    
        if (id == null) return;

        var model = {
            Id: id
        };

        $http.post(Constants.WebApi.Subject.Get, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Model = response.data;
            
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    var loadSemesterSubjectGroups = function (semesterId) {

        if (semesterId == null) return;

        var model = {
            Id: semesterId
        };

        $http.post(Constants.WebApi.SubjectGroup.GetSemesterSubjectGroup, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SemesterSubjectGroups = response.data.Records;

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
        $http.post(Constants.WebApi.Subject.CreateOrUpdate, model).then(function (response) {
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