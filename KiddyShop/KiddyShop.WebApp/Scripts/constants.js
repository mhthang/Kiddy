'use strict';

var Constants = (function () {
    // local
    var rootApiUrl = '/api';
    var authenticationService = '/oauth/';

    // dev
    //var rootApiUrl = '/api';
    //var authenticationService = '/oauth/';

    var PAGER_PAGE_SIZE = 30;
    var PAGER_MAX_SIZE = 5;

    var WebApi = {
        Application: {
            GetCountries: rootApiUrl + '/appApi/GetCountries',
            GetTimezones: rootApiUrl + '/appApi/GetTimezones',
            GetOrganizations: rootApiUrl + '/appApi/GetOrganizations',
            GetUserOrganizations: rootApiUrl + '/appApi/GetUserOrganizations',
            GetSemester: rootApiUrl + '/appApi/GetSemester',
            SearchUserSemesters: rootApiUrl + '/appApi/SearchUserSemesters',
        },
        Account: {
            GetCurrentUserProfile: rootApiUrl + '/AccountApi/GetCurrentUserProfile',
            UpdateCurrentUserProfile: rootApiUrl + '/AccountApi/UpdateCurrentUserProfile',
            ChangeCurrentUserPhoto: rootApiUrl + '/AccountApi/ChangeCurrentUserPhoto',
            GetUserProfile: rootApiUrl + '/AccountApi/GetUserProfile',
            UpdateUserProfile: rootApiUrl + '/AccountApi/UpdateUserProfile',
            ChangeUserPhoto: rootApiUrl + '/AccountApi/ChangeUserPhoto',
            Signin: rootApiUrl + '/AccountApi/Signin',
            Signout: rootApiUrl + '/AccountApi/Signout',
            IsCookieAuth: rootApiUrl + '/AccountApi/IsCookieAuth',
            CreateUser: rootApiUrl + '/AccountApi/Register',
            Search: rootApiUrl + '/AccountApi/Search',
            ForgotPassword: rootApiUrl + '/AccountApi/ForgotPassword',
            NewPassword: rootApiUrl + '/AccountApi/NewPassword',
            ChangePassword: rootApiUrl + '/AccountApi/ChangePassword',
            DeleteUser: rootApiUrl + "/AccountApi/DeleteUser/?id=",
            GetRoleUsers: rootApiUrl + "/AccountApi/GetRoleGroupByIdUser?id=",
            UpdateUserGroupsForUser: rootApiUrl + "/AccountApi/UpdateUserRoleGroups",
        },
        Schedule: {
            Get: rootApiUrl + '/OrganizationApi/GetSchedule',
            Search: rootApiUrl + '/OrganizationApi/SearchSemesterSchedule',
            CreateOrUpdate: rootApiUrl + '/OrganizationApi/CreateOrUpdateSchedule',
            GetScheduleInfo: rootApiUrl + '/OrganizationApi/GetScheduleInfo',
            GetSemesterScheduleInfo: rootApiUrl + '/OrganizationApi/GetSemesterScheduleInfo',
        },
        Scheduling: {
            GetTimetable: rootApiUrl + '/Scheduling/GetTimetable',
            UpdateTimetable: rootApiUrl + '/Scheduling/UpdateTimetable',
            GetScheduleBoard: rootApiUrl + '/Scheduling/GetScheduleBoard',
            ProceedNextStep: rootApiUrl + '/Scheduling/ProceedNextStep',
            Validate: rootApiUrl + '/Scheduling/ValidateScheduleBoard',
            Generate: rootApiUrl + '/Scheduling/GenerateScheduleBoard',
            Adjust: rootApiUrl + '/Scheduling/AdjustScheduleBoard',
            Complete: rootApiUrl + '/Scheduling/CompleteScheduleBoard',
            LoadScheduleBoard: rootApiUrl + '/Scheduling/LoadScheduleBoard',
            LoadTeacherScheduleBoard: rootApiUrl + '/Scheduling/LoadTeacherScheduleBoard',
            LoadClassScheduleBoard: rootApiUrl + '/Scheduling/LoadClassScheduleBoard',
            CalculateScheduleBoard: rootApiUrl + '/Scheduling/CalculateScheduleBoard',
            UpdateTimetableBoard: rootApiUrl + '/Scheduling/UpdateTimetableBoard',
        },
        Organization: {
            Get: rootApiUrl + '/OrganizationApi/GetOrganization',
            Search: rootApiUrl + '/OrganizationApi/SearchOrganization',
            CreateOrUpdate: rootApiUrl + '/OrganizationApi/CreateOrUpdateOrganization',
        },
        Teacher: {
            Get: rootApiUrl + '/OrganizationApi/GetTeacher',
            GetSemesterTeachers: rootApiUrl + '/OrganizationApi/GetSemesterTeachers',
            Search: rootApiUrl + '/OrganizationApi/SearchTeacher',
            CreateOrUpdate: rootApiUrl + '/OrganizationApi/CreateOrUpdateTeacher',
            GetAvailableSemesterHomeroomTeachers: rootApiUrl + '/OrganizationApi/GetAvailableSemesterHomeroomTeachers',
            GetTeachersForClassCourse: rootApiUrl + '/OrganizationApi/GetTeachersForClassCourse',
            GetTeachersForCourse: rootApiUrl + '/OrganizationApi/GetTeachersForCourse',
            GetTeacherConstraints: rootApiUrl + '/OrganizationApi/GetTeacherConstraints',
            GetStaffConstraintList: rootApiUrl + '/OrganizationApi/GetStaffConstraintList',
        },
        Division: {
            Get: rootApiUrl + '/OrganizationApi/GetDivision',
            GetSemesterDivision: rootApiUrl + '/OrganizationApi/GetSemesterDivision',
            Search: rootApiUrl + '/OrganizationApi/GetDivisions',
            CreateOrUpdate: rootApiUrl + '/OrganizationApi/CreateOrUpdateDivision',
        },
        Subject: {
            Get: rootApiUrl + '/OrganizationApi/GetSubject',
            Search: rootApiUrl + '/OrganizationApi/SearchSubject',
            CreateOrUpdate: rootApiUrl + '/OrganizationApi/CreateOrUpdateSubject',
        },
        SubjectGroup: {
            Get: rootApiUrl + '/OrganizationApi/GetSubjectGroup',
            GetSemesterSubjectGroup: rootApiUrl + '/OrganizationApi/GetSemesterSubjectGroup',
            GetSemesterSubjectByGroup: rootApiUrl + '/OrganizationApi/GetSemesterSubjectByGroup',
            Search: rootApiUrl + '/OrganizationApi/SearchSubjectGroup',
            CreateOrUpdate: rootApiUrl + '/OrganizationApi/CreateOrUpdateSubjectGroup',
        },
        ClassGroup: {
            Get: rootApiUrl + '/OrganizationApi/GetClassGroup',
            GetSemesterClassGroup: rootApiUrl + '/OrganizationApi/GetSemesterClassGroup',
            Search: rootApiUrl + '/OrganizationApi/SearchClassGroup',
            CreateOrUpdate: rootApiUrl + '/OrganizationApi/CreateOrUpdateClassGroup',
            Delete: rootApiUrl + '/OrganizationApi/DeleteClassGroup',
        },
        ClassRoom: {
            Get: rootApiUrl + '/OrganizationApi/GetClassRoom',
            Search: rootApiUrl + '/OrganizationApi/SearchClassRoom',
            CreateOrUpdate: rootApiUrl + '/OrganizationApi/CreateOrUpdateClassRoom',
            CreateOrUpdateTeacher: rootApiUrl + '/OrganizationApi/CreateOrUpdateClassRoomTeacher',
            Delete: rootApiUrl + '/OrganizationApi/DeleteClassRoom',
            GetByClassGroupId: rootApiUrl + '/OrganizationApi/GetClassRoomsByClassGroupId',
        },
        ClassCourse: {
            Get: rootApiUrl + '/OrganizationApi/GetClassCourse',
            GetByClassRoomId: rootApiUrl + '/OrganizationApi/GetClassCoursesByClassRoomId',
            Search: rootApiUrl + '/OrganizationApi/SearchClassCourse',
            SearchSemesterCourse: rootApiUrl + '/OrganizationApi/SearchSemesterClassCourse',
            CreateOrUpdate: rootApiUrl + '/OrganizationApi/CreateOrUpdateClassCourse',
            GenerateSemesterCourse: rootApiUrl + '/OrganizationApi/GenerateSemesterClassCourse',
            Delete: rootApiUrl + '/OrganizationApi/DeleteClassCourse',
        },
        Course: {
            GetSemesterCourses: rootApiUrl + '/OrganizationApi/GetSemesterCourses',
            Get: rootApiUrl + '/OrganizationApi/GetCourse',
            Search: rootApiUrl + '/OrganizationApi/SearchCourse',
            CreateOrUpdate: rootApiUrl + '/OrganizationApi/CreateOrUpdateCourse',
            GetAvailableCoursesByClassRoomId: rootApiUrl + '/OrganizationApi/GetAvailableCoursesByClassRoomId',
            Delete: rootApiUrl + '/OrganizationApi/DeleteCourse',
        },
        Room: {
            Get: rootApiUrl + '/OrganizationApi/GetRoom',
            GetDetails: rootApiUrl + '/OrganizationApi/GetRoomDetails',
            Search: rootApiUrl + '/OrganizationApi/SearchSemesterRoom',
            GetSemesterRooms: rootApiUrl + '/OrganizationApi/GetSemesterRooms',
            CreateOrUpdate: rootApiUrl + '/OrganizationApi/CreateOrUpdateRoom',
            Delete: rootApiUrl + '/OrganizationApi/DeleteRoom',
            GetClassRooms: rootApiUrl + '/OrganizationApi/GetClassRoomsForRoom',
            CreateOrUpdateClassRoom: rootApiUrl + '/OrganizationApi/CreateOrUpdateClassRoomRoom',
            GetClassCourses: rootApiUrl + '/OrganizationApi/GetClassCoursesForRoom',
            CreateOrUpdateClassCourse: rootApiUrl + '/OrganizationApi/CreateOrUpdateClassCourseRoom',
        },
        Program: {
            Get: rootApiUrl + '/OrganizationApi/GetProgram',
            GetSemesterPrograms: rootApiUrl + '/OrganizationApi/GetSemesterPrograms',
            Search: rootApiUrl + '/OrganizationApi/SearchProgram',
            SearchSemesterProgram: rootApiUrl + '/OrganizationApi/SearchSemesterProgram',
            CreateOrUpdate: rootApiUrl + '/OrganizationApi/CreateOrUpdateProgram',
        },
        Semester: {
            Get: rootApiUrl + '/OrganizationApi/GetSemester',
            GetAllSemesters: rootApiUrl + '/OrganizationApi/GetAllSemesters',
            Search: rootApiUrl + '/OrganizationApi/SearchSemester',
            CreateOrUpdate: rootApiUrl + '/OrganizationApi/CreateOrUpdateSemester',
            GetSummary: rootApiUrl + '/OrganizationApi/GetSemesterSummary',
        },
        Building: {
            Get: rootApiUrl + '/OrganizationApi/GetBuilding',
            GetSemesterBuilding: rootApiUrl + '/OrganizationApi/GetSemesterBuilding',
            Search: rootApiUrl + '/OrganizationApi/SearchBuilding',
            CreateOrUpdate: rootApiUrl + '/OrganizationApi/CreateOrUpdateBuilding',
        },
        Category: {
            Get: rootApiUrl + '/OrganizationApi/GetBuilding',
            GetSemesterBuilding: rootApiUrl + '/OrganizationApi/GetSemesterBuilding',
            Search: rootApiUrl + '/ComApi/SearchPostCategory',
            CreateOrUpdate: rootApiUrl + '/OrganizationApi/CreateOrUpdateBuilding',
        },
        Messaging: {
            SendTestEmail: rootApiUrl + '/MessagingApi/sendTestEmail',
            GetMessagingContent: rootApiUrl + '/MessagingApi/getMessagingContent',
            GetMessages: rootApiUrl + '/MessagingApi/getMessages',
            GetTemplateContentTitles: rootApiUrl + '/MessagingApi/GetTemplateContentTitles',
            GetMailMessage: rootApiUrl + '/MessagingApi/getMailMessage',
            GetMailTemplateContent: rootApiUrl + '/MessagingApi/getMailTemplateContent',
            SaveMailTemplateContent: rootApiUrl + '/MessagingApi/saveMailTemplateContent',
        },
        TimeSlot: {
            GetSemesterTimeSlots: rootApiUrl + '/OrganizationApi/SearchSemesterTimeSlot',
        },
    };

    var Events = {
        SemesterChanged: 'SemesterChanged',
    };

    var TIMETABLE_TYPE = {
        SEMESTER: 1,
        PROGRAM: 2,
        SUBJECT: 3,
        COURSE: 4,
        TEACHER: 5,
        CLASS: 6
    };

    return {
        WebApi: WebApi,
        Events: Events,
        AuthenticationService: authenticationService,
        TIMETABLE_TYPE: TIMETABLE_TYPE,
        PAGER_PAGE_SIZE: PAGER_PAGE_SIZE,
        PAGER_MAX_SIZE: PAGER_MAX_SIZE
    };
})();