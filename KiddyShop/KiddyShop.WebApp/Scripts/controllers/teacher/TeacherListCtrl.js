function TeacherListCtrl($scope, $http, $stateParams, $modal, Constants) {

    $scope.OrgId = $stateParams.orgid;
    $scope.SemId = $stateParams.semid;

    $scope.IsLoading = false;

    $scope.pager = {
    	PageIndex: 1,
    	PageSize: Constants.PAGER_PAGE_SIZE
    }
    $scope.maxSize = Constants.PAGER_MAX_SIZE;

    $scope.onload = function () {
    	searchTeachers($scope.SemId);
    	loadSemesterDivisions($scope.SemId);
    };

    $scope.SearchResponse = null;

    $scope.onsearch = function () {
		$scope.pager.PageIndex = 1;
		searchTeachers($scope.SemId);
    }

    var searchTeachers = function (semesterId) {

        var requestModel = {
        	Id: semesterId, 
        	FilterText: $scope.searchText,
        	FilterId: $scope.divisionGroupId,
    		Pager: $scope.pager
        };


        $scope.IsLoading = true;

        $http.post(Constants.WebApi.Teacher.Search, requestModel).then(function (response) {
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

    var loadSemesterDivisions = function (semesterId) {

    	if (semesterId == null) return;

    	var model = {
    		Id: semesterId
    	};

    	$http.post(Constants.WebApi.Division.GetSemesterDivision, model).then(function (response) {
    		// this callback will be called asynchronously
    		// when the response is available 
    		response.data.Records.unshift({ 'Id': null, 'Name': 'All' });
    		$scope.SemesterDivisions = response.data.Records;

    	}, function (response) {
    		// called asynchronously if an error occurs
    		// or server returns response with an error status.             
    	});
    };

    $scope.open = function(teacherId)
    {
        var modalInstance = $modal.open({
            templateUrl: 'teacher/edit',
            controller: TeacherCtrl,
            resolve: {
                SemesterId: function () {
                    return $scope.SemId;
                },
                TeacherId: function () {
                    return teacherId;
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

    $scope.openTimetable = function (model) {
        var modalInstance = $modal.open({
            templateUrl: 'scheduler/TimetableSetting',
            controller: TimetableCtrl,
            resolve: {
                TimetableType: function() {
                    return Constants.TIMETABLE_TYPE.TEACHER;
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

    $scope.expand = function (model) {

        model.IsExpand = !model.IsExpand;

        if (model.IsExpand == null || !model.IsExpand) {

        }
    }

    $scope.onPaging = function () {
    	searchTeachers($scope.SemId);
	}
}