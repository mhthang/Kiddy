/**
 * INSPINIA - Responsive Admin Theme
 *
 * Main controller.js file
 * Define controllers with data used in Inspinia theme
 *
 *
 * Functions (controllers)
 *  - MainCtrl
 *  - translateCtrl
 *
 */

/**
 * MainCtrl - controller
 * Contains severals global data used in diferent view
 *
 */

function MainCtrl($scope, $rootScope, $http, $modal, $localStorage, $location, $translate, AuthService) {

    $rootScope.UserPhotos = [];
    $rootScope.lang = $localStorage.language;

    $rootScope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };

    $rootScope.$on('$translateChangeSuccess', function (event, data) {
        var language = data.language;
        $rootScope.lang = language;
        $localStorage.language = language;
    });
};


/**
 * translateCtrl - Controller for translate
 */
function TranslateCtrl($translate, $scope) {
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };
}


/**
 *
 * Pass all functions into module
 */
angular
    .module('inspinia')
    .controller('HeaderCtrl', HeaderCtrl)   
    .controller('AppNavigatorCtrl', AppNavigatorCtrl)
    .controller('AdminPortalNavigatorCtrl', AdminPortalNavigatorCtrl)
    .controller('NavigatorCtrl', NavigatorCtrl)
    .controller('MainCtrl', MainCtrl)
    .controller('UserProfileCtrl', UserProfileCtrl)
    .controller('TranslateCtrl', TranslateCtrl)
    .controller('SemesterDashboardCtrl', SemesterDashboardCtrl)
    .controller('TeacherListCtrl', TeacherListCtrl)
    .controller('TeacherCtrl', TeacherCtrl)
    .controller('DivisionListCtrl', DivisionListCtrl)
    .controller('DivisionCtrl', DivisionCtrl)
    .controller('SubjectGroupCtrl', SubjectGroupCtrl)
    .controller('SubjectGroupListCtrl', SubjectGroupListCtrl)
    .controller('SubjectCtrl', SubjectCtrl)
    .controller('SubjectListCtrl', SubjectListCtrl)
    .controller('ClassGroupCtrl', ClassGroupCtrl)
    .controller('ClassGroupListCtrl', ClassGroupListCtrl)
    .controller('ClassRoomCtrl', ClassRoomCtrl)
    .controller('ClassRoomListCtrl', ClassRoomListCtrl)
    .controller('ClassRoomTeacherCtrl', ClassRoomTeacherCtrl)
    .controller('ClassRoomCourseCtrl', ClassRoomTeacherCtrl)
    .controller('CourseCtrl', CourseCtrl)
    .controller('CourseListCtrl', CourseListCtrl)
    .controller('ClassCourseCtrl', ClassCourseCtrl)
    .controller('ClassCourseListCtrl', ClassCourseListCtrl)
    .controller('RoomCtrl', RoomCtrl)
    .controller('RoomListCtrl', RoomListCtrl)
    .controller('RoomClassRoomCtrl', RoomClassRoomCtrl)
    .controller('RoomClassCourseCtrl', RoomClassCourseCtrl)
    .controller('ProgramCtrl', ProgramCtrl)
    .controller('ProgramListCtrl', ProgramListCtrl)
    .controller('ProgramClassCtrl', ProgramClassCtrl)
    .controller('ProgramCourseCtrl', ProgramCourseCtrl)
    .controller('SemesterCtrl', SemesterCtrl)
    .controller('SemesterListCtrl', SemesterListCtrl)
    .controller('BuildingCtrl', BuildingCtrl)
    .controller('BuildingListCtrl', BuildingListCtrl)
    .controller('OrganizationCtrl', OrganizationCtrl)
    .controller('OrganizationListCtrl', OrganizationListCtrl)
    .controller('TimetableManagerCtrl', TimetableManagerCtrl)
    .controller('TimetableCtrl', TimetableCtrl)
    .controller('ScheduleCtrl', ScheduleCtrl)
    .controller('ScheduleListCtrl', ScheduleListCtrl)
    .controller('ScheduleDetailCtrl', ScheduleDetailCtrl)
    .controller('ScheduleDashboardCtrl', ScheduleDashboardCtrl)
    .controller('Timetable1TeacherViewCtrl', Timetable1TeacherViewCtrl)   
    .controller('Timetable2ClassViewCtrl', Timetable2ClassViewCtrl)   
    .controller('TimetableModificationCtrl', TimetableModificationCtrl)   
    .controller('AccountLoginCtrl', AccountLoginCtrl)
    //.controller('AccountRegisterCtrl', AccountRegisterCtrl)
    .controller('AccountForgotPasswordCtrl', AccountForgotPasswordCtrl)
    .controller('AccountChangePasswordCtrl', AccountChangePasswordCtrl)
    .controller('AccountNewPasswordCtrl', AccountNewPasswordCtrl)
    .controller('MessagingMailComposeCtrl', MessagingMailComposeCtrl)
    .controller('MessagingMailInboxCtrl', MessagingMailInboxCtrl)
    .controller('MessagingMailOutboxCtrl', MessagingMailOutboxCtrl)
    .controller('MessagingMailViewCtrl', MessagingMailViewCtrl)
    .controller('MessagingTemplateEditCtrl', MessagingTemplateEditCtrl)
    .controller('MessagingTemplateListCtrl', MessagingTemplateListCtrl)
    .controller('MessagingTemplateViewCtrl', MessagingTemplateViewCtrl)
    .controller('UserListCtrl', UserListCtrl)
    .controller('UserDetailCtrl', UserDetailCtrl);


