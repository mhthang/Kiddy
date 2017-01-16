function RoomListCtrl($scope, $http, $stateParams, $modal, Constants, SweetAlert) {

    $scope.OrgId = $stateParams.orgid;
    $scope.SemId = $stateParams.semid;

    $scope.pager = {
        PageIndex: 1,
        PageSize: 50
    }
    $scope.maxSize = 5;

    $scope.onload = function () {
        $scope.pager.PageIndex = 1;
        getBuiling($scope.SemId);
        search($scope.SemId);
    };

    $scope.onsearch = function () {
        $scope.pager.PageIndex = 1
        search($scope.SemId);
    }

    $scope.SearchResponse = null;

    var search = function (semesterId) {
        var requestModel = {
            Id: semesterId,
            FilterId: $scope.buildingId,
            FilterText: $scope.searchText,
            Pager: $scope.pager
        };

        $http.post(Constants.WebApi.Room.Search, requestModel).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SearchResponse = response.data;
            
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    var getBuiling = function (semesterId) {
        var requestModel = {
            Id: semesterId
        };

        $http.post(Constants.WebApi.Building.GetSemesterBuilding, requestModel).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            response.data.Records.unshift({ 'Id': null, 'Name': 'All' })
            $scope.Buildings = response.data.Records;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    }


    $scope.searchRoom = function () {
        search($scope.SemId);
    }

    $scope.open = function(id)
    {
        var modalInstance = $modal.open({
            templateUrl: 'room/edit',
            controller: RoomCtrl,
            resolve: {
                SemesterId: function () {
                    return $scope.SemId;
                },
                RoomId: function () {
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
            text: "Remove this Room?",
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

                $http.post(Constants.WebApi.Room.Delete, model).then(function (response) {
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
            $http.post(Constants.WebApi.Room.GetDetails, requestModel).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available  
                var index = 0;
                for (var i = 0; i < $scope.SearchResponse.Records.length; i++) {
                    if ($scope.SearchResponse.Records[i].Id == model.Id) {
                        index = i;
                        break;
                    }
                }
                $scope.SearchResponse.Records[index].Classes = response.data.Classes;
                $scope.SearchResponse.Records[index].Courses = response.data.Courses;

            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.             
            });
        }
    }

    $scope.onPaging = function () {
        search($scope.SemId);
    }

    $scope.openClass = function (roomId, classRoomId, classRoomName) {
        var modalInstance = $modal.open({
            templateUrl: 'room/editclassroom',
            controller: RoomClassRoomCtrl,
            resolve: {
                SemesterId: function () {
                    return $scope.SemId;
                },
                RoomId: function () {
                    return roomId;
                },
                ClassRoomId: function () {
                    return classRoomId;
                },
                ClassRoomName: function () {
                    return classRoomName;
                }
            }
        });

        modalInstance.result.then(function () {
            //on ok button press
            var requestModel = { Id: roomId };
            $http.post(Constants.WebApi.Room.GetDetails, requestModel).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available  
                var index = 0;
                for (var i = 0; i < $scope.SearchResponse.Records.length; i++) {
                    if ($scope.SearchResponse.Records[i].Id == roomId) {
                        index = i;
                        break;
                    }
                }
                $scope.SearchResponse.Records[index].Classes = response.data.Classes;
                $scope.SearchResponse.Records[index].Courses = response.data.Courses;

            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.             
            });
        }, function () {
            //on cancel button press
        });
    }

    $scope.removeClass = function (roomId, classRoomId) {

        SweetAlert.swal({
            title: "Remove?",
            text: "Remove Room of this class?",
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

                $http.post(Constants.WebApi.Room.CreateOrUpdateClassRoom, model).then(function (response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    //SweetAlert.swal("Remove!", "Your imaginary file has been deleted.", "success");

                    var requestModel = { Id: roomId };
                    $http.post(Constants.WebApi.Room.GetDetails, requestModel).then(function (response) {
                        // this callback will be called asynchronously
                        // when the response is available  
                        var index = 0;
                        for (var i = 0; i < $scope.SearchResponse.Records.length; i++) {
                            if ($scope.SearchResponse.Records[i].Id == roomId) {
                                index = i;
                                break;
                            }
                        }
                        $scope.SearchResponse.Records[index].Classes = response.data.Classes;
                        $scope.SearchResponse.Records[index].Courses = response.data.Courses;

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

    $scope.openCourse = function (roomId, classCourseId) {
        var modalInstance = $modal.open({
            templateUrl: 'room/editclasscourse',
            controller: RoomClassCourseCtrl,
            resolve: {
                SemesterId: function () {
                    return $scope.SemId;
                },
                RoomId: function () {
                    return roomId;
                },
                ClassCourseId: function () {
                    return classCourseId;
                }
            }
        });

        modalInstance.result.then(function () {
            //on ok button press
            var requestModel = { Id: roomId };
            $http.post(Constants.WebApi.Room.GetDetails, requestModel).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available  
                var index = 0;
                for (var i = 0; i < $scope.SearchResponse.Records.length; i++) {
                    if ($scope.SearchResponse.Records[i].Id == roomId) {
                        index = i;
                        break;
                    }
                }
                $scope.SearchResponse.Records[index].Classes = response.data.Classes;
                $scope.SearchResponse.Records[index].Courses = response.data.Courses;

            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.             
            });
        }, function () {
            //on cancel button press
        });
    }

    $scope.removeCourse = function (roomId, classCourseId) {

        SweetAlert.swal({
            title: "Remove?",
            text: "Remove Room of this course?",
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
                    PrimaryKeyId: classCourseId,
                    ForeignKeyId: null
                };

                $http.post(Constants.WebApi.Room.CreateOrUpdateClassCourse, model).then(function (response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    //SweetAlert.swal("Remove!", "Your imaginary file has been deleted.", "success");

                    var requestModel = { Id: roomId };
                    $http.post(Constants.WebApi.Room.GetDetails, requestModel).then(function (response) {
                        // this callback will be called asynchronously
                        // when the response is available  
                        var index = 0;
                        for (var i = 0; i < $scope.SearchResponse.Records.length; i++) {
                            if ($scope.SearchResponse.Records[i].Id == roomId) {
                                index = i;
                                break;
                            }
                        }
                        $scope.SearchResponse.Records[index].Classes = response.data.Classes;
                        $scope.SearchResponse.Records[index].Courses = response.data.Courses;

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