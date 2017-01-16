function CourseListCtrl($scope, $http, $stateParams, $modal, Constants) {

    $scope.OrgId = $stateParams.orgid;
    $scope.SemId = $stateParams.semid;

    $scope.pager = {
        PageIndex: 1,
        PageSize: 50
    }
    $scope.maxSize = 5;    

    $scope.onload = function () {        
        search($scope.SemId);
    };

    $scope.SearchResponse = null;
   
    var search = function (semesterId) {
        var requestModel = {
            Id: semesterId,          
            Pager: $scope.pager
        };

        $http.post(Constants.WebApi.Course.Search, requestModel).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SearchResponse = response.data;
            
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    $scope.open = function (id) {
        var modalInstance = $modal.open({
            templateUrl: 'course/edit',
            controller: CourseCtrl,
            resolve: {
                SemesterId: function () {
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
    };

    $scope.openTimetable = function (model) {
        var modalInstance = $modal.open({
            templateUrl: 'scheduler/TimetableSetting',
            controller: TimetableCtrl,
            resolve: {
                TimetableType: function () {
                    return Constants.TIMETABLE_TYPE.SUBJECT;
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
    };     

    $scope.onPaging = function () {
        search($scope.SemId);
    }
}