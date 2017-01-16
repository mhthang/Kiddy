function ClassRoomCtrl($scope, $http, $modalInstance, Constants, SemesterId, ClassRoomId) {

    $scope.onload = function () {
        loadSemesterClassGroup(SemesterId);
        loadBuildingRooms(SemesterId);
        loadSemesterTeachers(SemesterId);
    };

    $scope.Buildings = null;
    $scope.SemesterClassGroups = null;
    $scope.SemesterTeachers = null;
    $scope.Model = null;

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

    var loadSemesterTeachers = function (semesterId) {

        if (semesterId == null) return;

        var model = {
            Id: semesterId
        };

        $http.post(Constants.WebApi.Teacher.GetAvailableSemesterHomeroomTeachers, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.SemesterTeachers = response.data;
            get(ClassRoomId);
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

        $http.post(Constants.WebApi.ClassRoom.Get, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Model = response.data;
            loadSelectedRoom($scope.Model, $scope.Buildings);
            if ($scope.Model.HomeroomTeacher) {
                $scope.SemesterTeachers.unshift({ 'Id': $scope.Model.HomeroomTeacher.Id, 'FullName': $scope.Model.HomeroomTeacher.Account.Profile.FullName });
            }
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    var loadSemesterClassGroup = function (semesterId) {

        if (semesterId == null) return;

        var model = {
            Id: semesterId
        };

        $http.post(Constants.WebApi.ClassGroup.GetSemesterClassGroup, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SemesterClassGroups = response.data.Records;

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
        
        $http.post(Constants.WebApi.ClassRoom.CreateOrUpdate, model).then(function (response) {
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