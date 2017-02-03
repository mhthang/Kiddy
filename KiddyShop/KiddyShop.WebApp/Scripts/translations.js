/**
 * INSPINIA - Responsive Admin Theme
 *
 */
function config($translateProvider) {

    $translateProvider
        .translations('en', {

            // Define some custom text
            BOTTOM_TEXT_COMPANY_NAME: 'KiddyShop.com',
            BOTTOM_TEXT_COPY_RIGHT: '2017',

            WELCOME: 'Welcome Amelia',
            MESSAGEINFO: 'You have 42 messages and 6 notifications.',
            SEARCH: 'Search for something...',

            WORKING_TIME: 'Working Time',
            WORKING_TIME_TEXT: 'Define working time',

            // GENERAL
            GENERAL_MY_DASHBOARD: 'My Dashboard',
            GENERAL_ORG: 'Organization',
            GENERAL_ORGS: 'Organizations',
            GENERAL_USERNAME: 'Username',
            GENERAL_PASSWORD: 'Password',
            GENERAL_LOGIN: 'Login',
            GENERAL_REGISTER: 'Register',
            GENERAL_RESET: 'Reset',
            GENERAL_SEND: 'Send',
            GENERAL_EMAIL: 'Email',
            GENERAL_FULLNAME: 'Name',
            GENERAL_FIRST_NAME: 'First Name',
            GENERAL_LAST_NAME: 'Last Name',
            GENERAL_PHONE: 'Phone',
            GENERAL_MOBILE: 'Mobile',
            GENERAL_LANGUAGE: 'Language',
            GENERAL_COUNTRY: 'Country',
            GENERAL_TIMEZONE: 'Timezone',
            GENERAL_PROFILE: 'Profile',
            GENERAL_MY_SETTING: 'My Setting',
            GENERAL_FAQ: 'FAQ',
            GENERAL_ACCOUNT: 'Account',
            GENERAL_CHANGE_PASSWORD: 'Change Password',
            GENERAL_LOGOUT: 'Logout',
            GENERAL_SAVE: 'Save',
            GENERAL_CLOSE: 'Close',
            GENERAL_USERTYPE: 'User Type',
            GENERAL_PROFILETYPE: 'Profile Type',
            GENERAL_ROLETITLE: 'Role',
            GENERAL_AVATAR: 'AVATAR',

            REGISTER_TITLE: 'Shool Timetable',
            REGISTER_SUB_TITLE_2: 'Online',
            REGISTER_SUB_TITLE: 'Create new account - Only Take 5 seconds',
            REGISTER_ALREADY_HAVE_AN_ACCOUNT: 'Already have an account?',
            REGISTER_TERM_AND_POLICY: 'Term and Policy',
            REGISTER_RESULT_SUCCESS: 'Please check your email to confirm your account.',
            REGISTER_RESULT_ERROR: 'Register Failed!',
        })
        .translations('vn', {

            // Define some custom text
            BOTTOM_TEXT_COMPANY_NAME: 'KiddyShop.com',
            BOTTOM_TEXT_COPY_RIGHT: '2017',
            WELCOME: 'Welcome Amelia',
            MESSAGEINFO: 'Bạn có 42 tin nhắn và 6 thông báo.',
            SEARCH: 'Tìm kiếm...',

            WORKING_TIME: 'Working Time',
            WORKING_TIME_TEXT: 'Define working time',

            // GENERAL
            GENERAL_MY_DASHBOARD: 'Bảng Điều Khiển',
            GENERAL_ORG: 'Tổ Chức/Trường',
            GENERAL_ORGS: 'Tổ Chức/Trường',
            GENERAL_USERNAME: 'Tên',
            GENERAL_PASSWORD: 'Mật khẩu',
            GENERAL_LOGIN: 'Đăng Nhập',
            GENERAL_REGISTER: 'Đăng Ký',
            GENERAL_RESET: 'Thay Đổi',
            GENERAL_SEND: 'Gởi',
            GENERAL_EMAIL: 'Email',
            GENERAL_FULLNAME: 'Tên',
            GENERAL_FIRST_NAME: 'Tên',
            GENERAL_LAST_NAME: 'Họ và Tên đệm',
            GENERAL_PHONE: 'Điện Thoại',
            GENERAL_MOBILE: 'Di Động',
            GENERAL_LANGUAGE: 'Ngôn Ngữ',
            GENERAL_COUNTRY: 'Quốc Gia',
            GENERAL_TIMEZONE: 'Timezone',
            GENERAL_PROFILE: 'Hồ sơ',
            GENERAL_MY_SETTING: 'Cài đặt',
            GENERAL_FAQ: 'Câu hỏi Thường gặp',
            GENERAL_ACCOUNT: 'Tài khoản',
            GENERAL_CHANGE_PASSWORD: 'Đổi mật khẩu',
            GENERAL_LOGOUT: 'Thoát',
            GENERAL_SAVE: 'Save',
            GENERAL_CLOSE: 'Close',
            GENERAL_USERTYPE: 'User Type',
            GENERAL_PROFILETYPE: 'Profile Type',
            GENERAL_ROLETITLE: 'Phân quyền',
            GENERAL_AVATAR: 'Ảnh đại diện',

            REGISTER_TITLE: 'Thời Khóa Biểu',
            REGISTER_SUB_TITLE_2: 'Trực Tuyến',
            REGISTER_SUB_TITLE: 'Tạo tài khoản sự dụng chỉ mất 5 giây!',
            REGISTER_ALREADY_HAVE_AN_ACCOUNT: 'Bạn đã có tài khoản?',
            REGISTER_TERM_AND_POLICY: 'Điều khoản sử dụng',
            REGISTER_RESULT_SUCCESS: 'Vui lòng xác nhận email sử dụng qua email.',
            REGISTER_RESULT_ERROR: 'Đăng ký lỗi!',

        })
        .translations('es', {

            // Define some custom text
            WELCOME: 'Bienvenido Amelia',
            MESSAGEINFO: 'Usted tiene 42 mensajes y 6 notificaciones.',
            SEARCH: 'Busca algo ...',
        });

    $translateProvider.preferredLanguage('vn');

}

angular
    .module('inspinia')
    .config(config)
