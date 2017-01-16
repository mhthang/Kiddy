function ProgramListCtrl($scope, $http, $stateParams, $modal, SweetAlert, Constants) {

    $scope.SemId = $stateParams.semid;
    $scope.OrgId = $stateParams.orgid;

    $scope.pager = {
        PageIndex: 1,
        PageSize: Constants.PAGER_PAGE_SIZE
    }

    $scope.maxSize = Constants.PAGER_MAX_SIZE;

    $scope.onload = function () {
        search($scope.SemId);
    };

    $scope.SearchResponse = null;

    $scope.onsearch = function () {
        $scope.pager.PageIndex = 1
        search($scope.SemId);
    }

    var search = function (semId) {
        var requestModel =
        {
            Id: semId,
            FilterText: $scope.searchText,
            Pager: $scope.pager
        };

        $http.post(Constants.WebApi.ClassGroup.Search, requestModel).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SearchResponse = response.data;
            
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    $scope.onPaging = function () {
        search($scope.SemId);
    }

    $scope.open = function(id)
    {
        var modalInstance = $modal.open({
            templateUrl: 'trainingprogram/edit',
            controller: ProgramCtrl,
            resolve: {
                SemesterId: function () {
                    return $scope.SemId;
                },
                ProgramId: function () {
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
                    return Constants.TIMETABLE_TYPE.PROGRAM;
                },
                ReferenceObjectId: function () {
                    return model.TrainingProgramId;
                },
                TimetableId: function () {
                    return model.TimetableId;
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

    $scope.expand = function (model) {

        model.IsExpand = !model.IsExpand;

        if (model.IsExpand) {
            var index = 0;
            for (var i = 0; i < $scope.SearchResponse.Records.length; i++) {
                if ($scope.SearchResponse.Records[i].Id == model.Id) {
                    index = i;
                    break;
                }
            }

            var requestModel = { Id: model.Id };
            $http.post(Constants.WebApi.ClassRoom.GetByClassGroupId, requestModel).then(function (response) {
                
                $scope.SearchResponse.Records[index].ClassRooms = response.data;                

            }, function (response) {
                             
            });

            var requestSubjectModel = { Id: model.TrainingProgramId };
            $http.post(Constants.WebApi.Program.Get, requestSubjectModel).then(function (responseSubject) {
                
                $scope.SearchResponse.Records[index].CourseSubjects = responseSubject.data.CourseSubjects;

            }, function (responseSubject) {
                    
            });
        }
    }

    $scope.remove = function (id) {

        SweetAlert.swal({
            title: "Remove?",
            text: "Remove this Program?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, remove it!",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                var model = {
                    Id: id
                };

                 $http.post(Constants.WebApi.ClassGroup.Delete, model).then(function (response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    search($scope.SemId);

                });

            } else {
                //SweetAlert.swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
        });
    }

    $scope.openClass = function(classRoomId, classGroupId)
    {
        var modalInstance = $modal.open({
            templateUrl: 'trainingprogram/editclass',
            controller: ProgramClassCtrl,
            resolve: {
                SemesterId: function () {
                    return $scope.SemId;
                },
                ClassRoomId: function () {
                    return classRoomId;
                },
                ClassGroupId: function () {
                    return classGroupId;
                }
            }
        });

        modalInstance.result.then(function () {
            
            var index = 0;
            for (var i = 0; i < $scope.SearchResponse.Records.length; i++) {
                if ($scope.SearchResponse.Records[i].Id == classGroupId) {
                    index = i;
                    break;
                }
            }

            var requestModel = { Id: classGroupId };
            $http.post(Constants.WebApi.ClassRoom.GetByClassGroupId, requestModel).then(function (response) {

                $scope.SearchResponse.Records[index].ClassRooms = response.data;

            }, function (response) {

            });

        }, function () {
            //on cancel button press
        });
    }

    $scope.removeClass = function (classRoomId, classGroupId) {

        SweetAlert.swal({
            title: "Remove?",
            text: "Remove this Class?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, remove it!",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                var model = {
                    Id: classRoomId
                };

                $http.post(Constants.WebApi.ClassRoom.Delete, model).then(function (response) {
                    
                    var index = 0;
                    for (var i = 0; i < $scope.SearchResponse.Records.length; i++) {
                        if ($scope.SearchResponse.Records[i].Id == classGroupId) {
                            index = i;
                            break;
                        }
                    }

                    var requestModel = { Id: classGroupId };
                    $http.post(Constants.WebApi.ClassRoom.GetByClassGroupId, requestModel).then(function (response) {

                        $scope.SearchResponse.Records[index].ClassRooms = response.data;

                    }, function (response) {

                    });

                });

            } else {
                //SweetAlert.swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
        });
    }

    $scope.openCourse = function (courseId, trainingProgramId, classGroupId) {
        var modalInstance = $modal.open({
            templateUrl: 'trainingprogram/editcourse',
            controller: ProgramCourseCtrl,
            resolve: {
                SemesterId: function () {
                    return $scope.SemId;
                },
                CourseId: function () {
                    return courseId;
                },
                TrainingProgramId: function () {
                    return trainingProgramId;
                }
            }
        });

        modalInstance.result.then(function () {

            var index = 0;
            for (var i = 0; i < $scope.SearchResponse.Records.length; i++) {
                if ($scope.SearchResponse.Records[i].Id == classGroupId) {
                    index = i;
                    break;
                }
            }

            var requestSubjectModel = { Id: trainingProgramId };
            $http.post(Constants.WebApi.Program.Get, requestSubjectModel).then(function (responseSubject) {

                $scope.SearchResponse.Records[index].CourseSubjects = responseSubject.data.CourseSubjects;

            }, function (responseSubject) {

            });

        }, function () {
            //on cancel button press
        });
    }

    $scope.removeCourse = function (courseId, classGroupId, trainingProgramId) {

        SweetAlert.swal({
            title: "Remove?",
            text: "Remove this Subject?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, remove it!",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                var model = {
                    Id: courseId
                };

                $http.post(Constants.WebApi.Course.Delete, model).then(function (response) {

                    var index = 0;
                    for (var i = 0; i < $scope.SearchResponse.Records.length; i++) {
                        if ($scope.SearchResponse.Records[i].Id == classGroupId) {
                            index = i;
                            break;
                        }
                    }

                    var requestSubjectModel = { Id: trainingProgramId };
                    $http.post(Constants.WebApi.Program.Get, requestSubjectModel).then(function (responseSubject) {

                        $scope.SearchResponse.Records[index].CourseSubjects = responseSubject.data.CourseSubjects;

                    }, function (responseSubject) {

                    });

                });

            } else {
                //SweetAlert.swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
        });
    }
}