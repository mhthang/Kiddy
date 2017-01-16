/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */

function setUrlMatcherFactoryProvider($urlMatcherFactoryProvider) {
  var GUID_REGEXP = /^[a-f\d]{8}-([a-f\d]{4}-){3}[a-f\d]{12}$/i;
  $urlMatcherFactoryProvider.type('guid', {
    encode: angular.identity,
    decode: angular.identity,
    is: function(item) {
       return GUID_REGEXP.test(item);
    }
  });
}  

function config($stateProvider, $urlRouterProvider, $httpProvider, $localStorageProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds

    $httpProvider.interceptors.push('AuthInterceptorService');

    $urlRouterProvider.otherwise("/login");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });
    

    $stateProvider
        .state('home', {
            abstract: true,
            url: "/home",
            templateUrl: "Home/Dashboard",
        })
        .state('app', {
            abstract: true,
            url: "/app",
            templateUrl: "Home/App",
        })
        .state('home.dashboard', {
            url: "/dashboard",
            templateUrl: "organization/dashboard",
            controller: OrganizationHomeCtrl,
            data: { pageTitle: 'Dashboard' },
        })
        .state('home.org', {
            url: "/org/:orgid",
            templateUrl: "organization/list",
            controller: OrganizationListCtrl,
            data: { pageTitle: 'Organization' },
        })
        .state('app.semester', {
            url: "/semester/:orgid/:semid",
            templateUrl: "semester/dashboard",
            controller: SemesterDashboardCtrl,
            data: { pageTitle: 'Semester' },
        })
        .state('app.classrooms', {
            url: "/semester/:orgid/:semid/classrooms",
            templateUrl: "classroom/list",
            controller: ClassRoomListCtrl
        })
        .state('app.orgs', {
            url: "/orgs",
            templateUrl: "organization/list",
            controller: OrganizationListCtrl
        })
        .state('app.semesters', {
            url: "/semesters/:orgid",
            templateUrl: "semester/list",
            controller: SemesterListCtrl,
            data: { pageTitle: 'Semesters' },
        })
        .state('app.teachers', {
            url: "/semester/:orgid/:semid/teachers",
            templateUrl: "teacher/list",
            controller: TeacherListCtrl
        })
        .state('app.divisions', {
            url: "/semester/:orgid/:semid/divisions",
            templateUrl: "division/list",
            controller: DivisionListCtrl
        })
        .state('app.subjects', {
            url: "/semester/:orgid/:semid/subjects",
            templateUrl: "subject/list",
            controller: SubjectListCtrl
        })
        .state('app.subjectGroups', {
            url: "/semester/:orgid/:semid/subjectGroups",
            templateUrl: "subjectGroup/list",
            controller: SubjectGroupListCtrl
        })
        .state('app.classgroups', {
            url: "/semester/:orgid/:semid/classgroups",
            templateUrl: "classGroup/list",
            controller: ClassGroupListCtrl
        })
        .state('app.classcourses', {
            url: "/semester/:orgid/:semid/classcourses",
            templateUrl: "classcourse/list",
            controller: ClassCourseListCtrl
        })
        .state('app.courses', {
            url: "/semester/:orgid/:semid/courses",
            templateUrl: "course/list",
            controller: CourseListCtrl
        })
        .state('app.rooms', {
            url: "/semester/:orgid/:semid/rooms",
            templateUrl: "room/list",
            controller: RoomListCtrl
        })
        .state('app.programs', {
            url: "/semester/:orgid/:semid/programs",
            templateUrl: "trainingProgram/list",
            controller: ProgramListCtrl
        })
        .state('app.buildings', {
            url: "/semester/:orgid/:semid/buildings",
            templateUrl: "building/list",
            controller: BuildingListCtrl
        })
        .state('app.timetable', {
            url: "/semester/:orgid/:semid/timetable/:tid",
            templateUrl: "schedule/TimetableManager",
            controller: TimetableManagerCtrl
        })
        .state('app.modification', {
            url: "/semester/:orgid/:semid/:sid/modification",
            templateUrl: "schedule/Modification",
            controller: TimetableModificationCtrl
        })
        .state('app.schedules', {
            url: "/semester/:orgid/:semid/schedules",
            templateUrl: "schedule/list",
            controller: ScheduleListCtrl
        })
        .state('app.sdetail', {
            url: "/semester/:orgid/:semid/:sid/sdetail",
            templateUrl: "schedule/detail",
            controller: ScheduleDetailCtrl
        })
        .state('app.timetable1', {
            url: "/semester/:orgid/:semid/:sid/timetable1",
            templateUrl: "schedule/timetable1",
            controller: Timetable1TeacherViewCtrl
        })
        .state('app.timetable2', {
            url: "/semester/:orgid/:semid/:sid/timetable2",
            templateUrl: "schedule/timetable2",
            controller: Timetable2ClassViewCtrl
        })
        .state('admin', {
            abstract: true,
            url: "/admin",
            templateUrl: "Home/Admin",
        })
        .state('admin.users', {
            url: "/users",
            templateUrl: "UserManagement/List",
            controller: UserListCtrl
        })
        .state('admin.etempletes', {
            url: "/etempletes/:tid",
            templateUrl: "Messaging/Template_List",
            controller: MessagingTemplateListCtrl
        })
        .state('admin.tview', {
            url: "/tview/:tid",
            templateUrl: "Messaging/Template_View",
            controller: MessagingTemplateViewCtrl
        })
        .state('admin.minbox', {
            url: "/inbox",
            templateUrl: "Messaging/Mail_Inbox",
            controller: MessagingMailInboxCtrl
        })
        .state('admin.moutbox', {
            url: "/outbox",
            templateUrl: "Messaging/Mail_Outbox",
            controller: MessagingMailOutboxCtrl
        })
        .state('admin.tedit', {
            url: "/tedit/:tid",
            templateUrl: "Messaging/Template_Edit",
            controller: MessagingTemplateEditCtrl,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['Content/plugins/summernote/summernote.css', 'Content/plugins/summernote/summernote-bs3.css', 'Scripts/plugins/summernote/summernote.min.js']
                        },
                        {
                            name: 'summernote',
                            files: ['Content/plugins/summernote/summernote.css', 'Content/plugins/summernote/summernote-bs3.css', 'Scripts/plugins/summernote/summernote.min.js', 'Scripts/plugins/summernote/angular-summernote.min.js']
                        }
                    ]);
                }
            }
        })
        .state('login', {
            url: "/login?logout",
            templateUrl: "/Account/Login",
            controller: AccountLoginCtrl,
            data: { pageTitle: 'Login', specialClass: 'gray-bg' }
        })
        .state('register', {
            url: "/Account/Register",
            templateUrl: "/Account/Register",
            controller: AccountRegisterCtrl,
            data: { pageTitle: 'Register' }
        })
        .state('forgotPassword', {
            url: "/Account/ForgotPassword",
            templateUrl: "/Account/ForgotPassword",
            controller: AccountForgotPasswordCtrl,
            data: { pageTitle: 'Forgot Password' }
        })
        .state('newPassword', {
            url: "/Account/NewPassword/:userid/:code",
            templateUrl: "/Account/NewPassword",
            controller: AccountNewPasswordCtrl,
            data: { pageTitle: 'New Password' }
        })
        .state('changePassword', {
            url: "/Account/ChangePassword",
            templateUrl: "/Account/ChangePassword",
            controller: AccountForgotPasswordCtrl,
            data: { pageTitle: 'Change Password' }
        });
}
angular
    .module('inspinia')
    .constant('Constants', Constants)
    .constant('Commons', Commons)
    .factory('AuthService', AuthService)
    .factory('AuthInterceptorService', AuthInterceptorService)
    .factory('UserPhotoService', UserPhotoService)
    .config(setUrlMatcherFactoryProvider)
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
