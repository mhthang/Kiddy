function TimetableModificationCtrl($scope, $http, $stateParams, Constants) {

    var scheduleId = $stateParams.sid;
    var semesterId = $stateParams.semid;

    $scope.IsLoading2 = false;

    $scope.onload = function () {
        get(scheduleId);
        loadSchedule(scheduleId);
    };

    $scope.Model = null;
    $scope.WorkingDays = [];
    $scope.ScheduleBoard2 = null;

    var get = function (id) {
        if (id == null) return;

        var model = {
            Id: id
        };

        $http.post(Constants.WebApi.Schedule.GetScheduleInfo, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Model = response.data;
            
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    var loadSchedule = function (id) {
        if (id == null) return;

        var model = {
            Id: id
        };

        $scope.IsLoading2 = true;

        $http.post(Constants.WebApi.Scheduling.LoadTeacherScheduleBoard, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.ScheduleBoard2 = response.data;
            $scope.IsLoading2 = false;

            $scope.WorkingDays = [];
            var workingDays = $scope.ScheduleBoard2.WorkingDays;
            for (var i = 0; i < workingDays; i++) {
                $scope.WorkingDays.push(i);
            }
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.     
            $scope.IsLoading2 = false;
        });
    };

    $scope.save = function () {
        createOrUpdate($scope.Model);
    };

    $scope.droppedObjects = [];

    $scope.onDropComplete = function (target, data, evt) {
        console.log("drop", "$scope", "onDropComplete", target, evt);

        if(data != null && data.ClassCourse != null)
        {
            //console.log("teacher", data.Course.Teacher);
            //var teacher = getTeacher(data.Course.Teacher.Id);
            //var teacherIdx = $scope.ScheduleBoard2.Teachers.indexOf(teacher);
            //console.log("teacher idx", teacherIdx);
            //if (teacherIdx > -1)
            //{
            //    var t = $scope.ScheduleBoard2.Teachers[teacherIdx].Timetable.TimeTableMatrix2;
            //    console.log("timetable", t);
            //}

            var tmp = angular.copy(target.ClassCourse);
            target.ClassCourse = data.ClassCourse;
            data.ClassCourse = tmp;

            if (target != null)
            {
                target.Checked = true;
                target.TimetableId = data.TimetableId;
            }
            if (data != null)
            {
                data.Checked = true;
            }
            //console.log("drop", target, tmp, data);
        }

        //var index = $scope.droppedObjects1.indexOf(data);
        //if (index == -1 && data != null) {
        //    $scope.droppedObjects1.push(data);
        //}

        //index = $scope.draggableObjects.indexOf(data);
        //if (index != -1) {
        //    $scope.draggableObjects.splice(index, 1);
        //}

    }

    $scope.onDragSuccess = function (data, evt) {
        //console.log("drag", "$scope", "onDragSuccess", "", evt);
        //var index = $scope.droppedObjects1.indexOf(data);
        //if (index > -1) {
        //    $scope.droppedObjects1.splice(index, 1);
        //}
    }

    var getTeacher = function(teacherId)
    {
        for(var i = 0;i < $scope.ScheduleBoard2.Teachers.length; i ++)
        {
            var teacher = $scope.ScheduleBoard2.Teachers[i];
            if (teacher != null && teacher.Id == teacherId)
                return teacher;
        }

        return null;
    }

    $scope.onSave = function()
    {
        var courseSections = [];

        for (var idx = 0; idx < $scope.ScheduleBoard2.Teachers.length; idx++) {
            var teacher = $scope.ScheduleBoard2.Teachers[idx];
            if (teacher != null)
            {
                var tmx = teacher.Timetable.TimeTableMatrix2
                for (var k = 0; k < 7; k++) {
                    for (var i = 0; i < 2; i++) {
                        for (var j = 0; j < 5; j++) {
                            var cs = tmx[k][i][j];
                            if(cs != null && cs.Checked)
                            {                                
                                courseSections.push(cs);
                            }
                        }
                    }
                }
            }               
        }

        if(courseSections.length > 0)
        {
            $scope.IsLoading2 = true;

            var model = {
                CourseSections: courseSections
            };

            $http.post(Constants.WebApi.Scheduling.UpdateTimetableBoard, model).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available    
                for (var i = 0; i < courseSections.length; i++)
                {
                    courseSections[i].Checked = false;
                }
                $scope.IsLoading2 = false;
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.     
                $scope.IsLoading2 = false;
            });
        }
    }

}