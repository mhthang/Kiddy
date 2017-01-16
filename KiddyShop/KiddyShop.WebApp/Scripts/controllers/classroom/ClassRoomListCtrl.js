function ClassRoomListCtrl($scope, $http, $stateParams, $modal, SweetAlert, Constants) {

    $scope.OrgId = $stateParams.orgid;
    $scope.SemId = $stateParams.semid;

    $scope.IsLoading = false;

    $scope.pager = {
        PageIndex: 1,
        PageSize: Constants.PAGER_PAGE_SIZE
    }

    $scope.maxSize = Constants.PAGER_MAX_SIZE;

    $scope.onload = function () {
        search($scope.SemId);
        loadSemesterClassGroup($scope.SemId);
    };

    $scope.onsearch = function () {
        $scope.pager.PageIndex = 1
        search($scope.SemId);
    }

    $scope.SearchResponse = null;
    $scope.SemesterClassGroups = [];

    var search = function (semId) {

        var requestModel =
        { 
            Id: semId,
            FilterId: $scope.classGroupId,
            FilterText: $scope.searchText,
            Pager: $scope.pager
        };

        $scope.IsLoading = true;

        $http.post(Constants.WebApi.ClassRoom.Search, requestModel).then(function (response) {
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
            templateUrl: 'classroom/edit',
            controller: ClassRoomCtrl,
            resolve: {
                SemesterId: function () {
                    return $scope.SemId;
                },
                ClassRoomId: function () {
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

    $scope.remove = function (id) {

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
                    Id: id
                };

                $http.post(Constants.WebApi.ClassRoom.Delete, model).then(function (response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    search($scope.SemId);

                });

            } else {
                //SweetAlert.swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
        });
    }

    $scope.expand = function (model) {
        model.IsExpand = !model.IsExpand;

        if (model.IsExpand) {
            var requestModel = { Id: model.Id };
            $http.post(Constants.WebApi.ClassCourse.GetByClassRoomId, requestModel).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available  
                var index = 0;
                for (var i = 0; i < $scope.SearchResponse.Records.length; i++) {
                    if ($scope.SearchResponse.Records[i].Id == model.Id) {
                        index = i;
                        break;
                    }
                }
                $scope.SearchResponse.Records[index].Courses = response.data;

            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.             
            });
        }
    }

    $scope.onPaging = function () {
        search($scope.SemId);
    }

    $scope.openTeacher = function (classRoomId, teacherId, teacherName) {
        var modalInstance = $modal.open({
            templateUrl: 'classroom/editteacher',
            controller: ClassRoomTeacherCtrl,
            resolve: {
                SemesterId: function () {
                    return $scope.SemId;
                },
                ClassRoomId: function () {
                    return classRoomId;
                },
                TeacherId: function () {
                    return teacherId;
                },
                TeacherName: function () {
                    return teacherName;
                }
            }
        });

        modalInstance.result.then(function () {
            //on ok button press           
            var model = null;
            var index = 0;
            for (var i = 0; i < $scope.SearchResponse.Records.length; i++) {
                if ($scope.SearchResponse.Records[i].Id == classRoomId) {
                    model = $scope.SearchResponse.Records[i];
                    index = i;
                    break;
                }
            }

            $http.post(Constants.WebApi.ClassRoom.Get, model).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available  
                
                $scope.SearchResponse.Records[index].HomeroomTeacher = response.data.HomeroomTeacher;
                $scope.SearchResponse.Records[index].TeacherId = response.data.TeacherId;

            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.             
            });
        }, function () {
            //on cancel button press
        });
    }

    $scope.removeTeacher = function (classRoomId) {

        SweetAlert.swal({
            title: "Remove?",
            text: "Remove Homeroomteacher of this class?",
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
                    PrimaryKeyId: classRoomId,
                    ForeignKeyId: null
                };

                $http.post(Constants.WebApi.ClassRoom.CreateOrUpdateTeacher, model).then(function (response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    //SweetAlert.swal("Remove!", "Your imaginary file has been deleted.", "success");

                    var model = null;
                    var index = 0;
                    for (var i = 0; i < $scope.SearchResponse.Records.length; i++) {
                        if ($scope.SearchResponse.Records[i].Id == classRoomId) {
                            model = $scope.SearchResponse.Records[i];
                            index = i;
                            break;
                        }
                    }

                    $http.post(Constants.WebApi.ClassRoom.Get, model).then(function (response) {
                        // this callback will be called asynchronously
                        // when the response is available  

                        $scope.SearchResponse.Records[index].HomeroomTeacher = response.data.HomeroomTeacher;
                        $scope.SearchResponse.Records[index].TeacherId = response.data.TeacherId;

                    }, function (response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.             
                    });
                });

            } else {
                //SweetAlert.swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
        });
    }

    $scope.openCourse = function (classCourseId, courseId, courseName, classRoomId) {
        var modalInstance = $modal.open({
            templateUrl: 'classroom/editcourse',
            controller: ClassRoomCourseCtrl,
            resolve: {
                SemesterId: function () {
                    return $scope.SemId;
                },
                ClassRoomId: function () {
                    return classRoomId;
                },
                ClassCourseId: function () {
                    return classCourseId;
                },
                CourseId: function () {
                    return courseId;
                },
                CourseName: function () {
                    return courseName;
                }
            }
        });

        modalInstance.result.then(function () {
            //on ok button press           
            var index = 0;
            for (var i = 0; i < $scope.SearchResponse.Records.length; i++) {
                if ($scope.SearchResponse.Records[i].Id == classRoomId) {
                    index = i;
                    break;
                }
            }

            var requestModel = { Id: classRoomId };
            $http.post(Constants.WebApi.ClassCourse.GetByClassRoomId, requestModel).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available            
                $scope.SearchResponse.Records[index].Courses = response.data;

            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.             
            });

        }, function () {
            //on cancel button press
        });
    }

    $scope.removeCourse = function (id, classRoomId) {

        SweetAlert.swal({
            title: "Remove?",
            text: "Remove ClassCourse of this class?",
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

                $http.post(Constants.WebApi.ClassCourse.Delete, model).then(function (response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    var index = 0;
                    for (var i = 0; i < $scope.SearchResponse.Records.length; i++) {
                        if ($scope.SearchResponse.Records[i].Id == classRoomId) {
                            index = i;
                            break;
                        }
                    }

                    var requestModel = { Id: classRoomId };
                    $http.post(Constants.WebApi.ClassCourse.GetByClassRoomId, requestModel).then(function (response) {
                        // this callback will be called asynchronously
                        // when the response is available            
                        $scope.SearchResponse.Records[index].Courses = response.data;

                    }, function (response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.             
                    });

                });

            } else {
                //SweetAlert.swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
        });
    }

}