function SemesterListCtrl($scope, $http, $stateParams, $modal, Constants) {
    
    var orgId = $stateParams.orgid;
    $scope.onload = function () {
        search(orgId);
    };

    $scope.SearchResponse = null;

    var search = function (orgId) {
        var searchRequest = {
            Id: orgId
        };

        $http.post(Constants.WebApi.Semester.GetAllSemesters, searchRequest).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SearchResponse = response.data;
            
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    $scope.open = function(id)
    {
        var modalInstance = $modal.open({
            templateUrl: 'semester/edit',
            controller: SemesterCtrl,
            resolve: {
                OrgId: function () {
                    return orgId;
                },
                SemesterId: function () {
                    return id;
                }
            }
        });

        modalInstance.result.then(function () {
            //on ok button press           
            search(orgId);
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
                    return Constants.TIMETABLE_TYPE.SEMESTER;
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
}