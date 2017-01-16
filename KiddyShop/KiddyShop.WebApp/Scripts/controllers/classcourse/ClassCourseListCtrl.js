function ClassCourseListCtrl($scope, $http, $stateParams, $modal, Constants) {

    $scope.SemId = $stateParams.semid;

    $scope.IsLoading = false;
    
    $scope.pager = {
        PageIndex: 1,
        PageSize: Constants.PAGER_PAGE_SIZE
    }

    $scope.maxSize = Constants.PAGER_MAX_SIZE;

    $scope.onload = function () {
        loadSemesterClassGroup($scope.SemId);
        search($scope.SemId);
    };

    $scope.SearchResponse = null;

    $scope.onSearch = function () {
        $scope.pager.PageIndex = 1;
        search($scope.SemId);
    }

    var search = function (semesterId) {
        var requestModel = {
            Id: semesterId,
            FilterId: $scope.classGroupId,
            FilterText: $scope.searchText,
            Pager: $scope.pager
        };

        $scope.IsLoading = true;

        $http.post(Constants.WebApi.ClassCourse.SearchSemesterCourse, requestModel).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SearchResponse = response.data;
            $scope.IsLoading = false;
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.   
            $scope.IsLoading = false;
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

    $scope.open = function(id)
    {
        var modalInstance = $modal.open({
            templateUrl: 'classcourse/edit',
            controller: ClassCourseCtrl,
            resolve: {
                SemesterId: function() {
                    return $scope.SemId;
                },
                CourseId: function () {
                    return id;
                }
            }
        });

        modalInstance.result.then(function () {
            //on ok button press           
            search($scope.SemId);
        }, function () {
            //on cancel button press
        });
    }

    $scope.openTimetable = function (model) {
        var modalInstance = $modal.open({
            templateUrl: 'scheduler/TimetableSetting',
            controller: TimetableCtrl,
            resolve: {
                TimetableType: function () {
                    return Constants.TIMETABLE_TYPE.COURSE;
                },
                ReferenceObjectId: function () {
                    return model.Id;
                },
                TimetableId: function () {
                    return model.TimetableId;
                }
            }
        });

        modalInstance.result.then(function () {
            //on ok button press           
            searchTeachers($scope.SemId);
        }, function () {
            //on cancel button press
        });
    }

    $scope.generateCourse = function(semesterId)
    {
        var requestModel = {
            Id: semesterId
        };

        $http.post(Constants.WebApi.ClassCourse.GenerateSemesterCourse, requestModel).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SearchResponse = response.data;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    }

    $scope.onPaging = function () {
        search($scope.SemId);
    }
}