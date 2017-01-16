function AccountRegisterCtrl($scope, $rootScope, $http, $location, $translate, vcRecaptchaService, SweetAlert, AuthService, Constants) {

    var ResigterResultSuccess = "Please check your email to confirm your account.";
    var ResigterResultError = "Register Failed!";


    $scope.CreateUserBindingModel =
    {
        Email: '',
        UserName: '',
        FirstName: '',
        Password: '',
        ConfirmPassword: '',
        IsAcceptTerm: false,
        CaptchaResponse: null
    };

    $scope.gRecaptchaResponse = null;

    $scope.createNewUser = function () {
        if (vcRecaptchaService.getResponse() === ""){ //if string is empty
            SweetAlert.swal({
                title: "Please checked the captcha!",
                text: "Please resolve the captcha and submit",
                type: "warning"
            });
            return;
        }
        $scope.loading = true;
        $scope.CreateUserBindingModel.UserName = $scope.CreateUserBindingModel.Email;
        $scope.CreateUserBindingModel.ConfirmPassword = $scope.CreateUserBindingModel.Password;
        $scope.CreateUserBindingModel.CaptchaResponse = $scope.gRecaptchaResponse;

        $http.post(Constants.WebApi.Account.CreateUser, $scope.CreateUserBindingModel).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            SweetAlert.swal({
                title: "Register Successfully",
                text: ResigterResultSuccess,
                type: "success",
                confirmButtonText: "Back to the Login Page."
            },
            function () { $location.path("/login"); }
            );
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            $scope.loading = false;
            SweetAlert.swal({
                title: ResigterResultError,
                text: parseErrors(response.data),
                type: "warning"
            });
        });

        function parseErrors(response) {
            var errors = [];
            for (var key in response.ModelState) {
                for (var i = 1; i < response.ModelState[key].length; i++) {
                    errors.push(response.ModelState[key][i] + '\n');
                }
            }
            return errors;
        }

        $scope.gRecaptchaResponse = null;
        vcRecaptchaService.reload();
    };

    $scope.cbExpiration = function () {
        $scope.gRecaptchaResponse = null;
    }

    $scope.hasError = function (form, field, validation) {
        if (validation) {
            return (form[field].$dirty && form[field].$error[validation]) || ($scope.submitted && form[field].$error[validation]);
        }
        return (form[field].$dirty && form[field].$invalid) || ($scope.submitted && form[field].$invalid);
    };

    $scope.transalate = function (translations) {
        ResigterResultSuccess = translations.REGISTER_RESULT_SUCCESS;
        ResigterResultError = translations.REGISTER_RESULT_ERROR;
    }

    $translate(['REGISTER_RESULT_SUCCESS', 'REGISTER_RESULT_ERROR']).then(function (translations) {
        $scope.transalate(translations);
    });

    $rootScope.$on('$translateChangeSuccess', function () {
        $translate(['REGISTER_RESULT_SUCCESS', 'REGISTER_RESULT_ERROR']).then(function (translations) {
            $scope.transalate(translations);
        });
    });
};

function AccountLoginCtrl($scope, $http, SweetAlert, $location, AuthService) {

    $scope.processing = false;
    $scope.ErrorMessage = null;
    $scope.SuccessMessage = null;
    $scope.btnLoginDisable = false;

    AuthService.isAuthenticated().then(function (response) {
        if (response) {
            $location.path("/home/dashboard");
        }
    }, function (response) {
        alert("Could not check Authentication");
    });

    $scope.LoginUserBindingModel = {
        UserName: null,
        Password: null,
        RememberMe: false
    }

    $scope.login = function () {
        $scope.processing = true;
        $scope.btnLoginDisable = true;
        AuthService.login($scope.LoginUserBindingModel).then(function (response) {
            $scope.processing = false;
            $scope.ErrorMessage = null;
            $scope.SuccessMessage = "Login successfully. Wait a seconds...";
            $location.path("/home/dashboard");
        }, function (response) {
            $scope.processing = false;
            $scope.btnLoginDisable = false;
            $scope.ErrorMessage = response.Message;
            $scope.SuccessMessage = null;
        });
    };
    $scope.hasError = function (form, field, validation) {
        if (validation) {
            return (form[field].$dirty && form[field].$error[validation]) || ($scope.submitted && form[field].$error[validation]);
        }
        return (form[field].$dirty && form[field].$invalid) || ($scope.submitted && form[field].$invalid);
    };

};

function AccountForgotPasswordCtrl($scope, $http, SweetAlert) {

    $scope.processing = false;
    $scope.btnSendDisable = false;

    $scope.ForgotPasswordBindingModel = {
        Email: null
    }

    $scope.gRecaptchaResponse = null;

    $scope.sendMail = function () {
        $scope.processing = true;
        $scope.btnSendDisable = true;

        $scope.ForgotPasswordBindingModel.CaptchaResponse = $scope.gRecaptchaResponse;
        $http.post(Constants.WebApi.Account.ForgotPassword, $scope.ForgotPasswordBindingModel).then(function (response) {
            $scope.processing = false;
            $scope.btnSendDisable = false;

            SweetAlert.swal({
                title: "Forgot Password!",
                text: "An email has been sent to you!",
                type: "success"
            });
        }, function (response) {
            $scope.processing = false;
            $scope.btnSendDisable = false;
            SweetAlert.swal({
                title: "Forgot Password!",
                text: "Your email has not been existed!",
                type: "info"
            });
        });
    }

    $scope.cbExpiration = function () {
        $scope.gRecaptchaResponse = null;
    }

    $scope.hasError = function (form, field, validation) {
        if (validation) {
            return (form[field].$dirty && form[field].$error[validation]) || ($scope.submitted && form[field].$error[validation]);
        }
        return (form[field].$dirty && form[field].$invalid) || ($scope.submitted && form[field].$invalid);
    };

};

function AccountNewPasswordCtrl($scope, $http, SweetAlert, $stateParams, $location) {

    $scope.processing = false;
    $scope.btnSubmitDisable = false;

    $scope.gRecaptchaResponse = null;

    $scope.NewPasswordBindingModel = {
        NewPassword: null,
        ConfirmNewPassword: null,
        UserId: $stateParams.userid,
        Code: $stateParams.code
    }

    $scope.newPassword = function () {
        $scope.processing = true;
        $scope.btnSubmitDisable = true;
        $scope.NewPasswordBindingModel.CaptchaResponse = $scope.gRecaptchaResponse;

        $http.post(Constants.WebApi.Account.NewPassword, $scope.NewPasswordBindingModel).then(function (response) {
            $scope.processing = false;
            $scope.btnSubmitDisable = false;
            SweetAlert.swal({
                title: "New Password!",
                text: "Your password has been changed successfully!",
                type: "success",
                confirmButtonText: "Back to the Login Page."
            }, function () { $location.path("/login"); });
        }, function (response) {
            $scope.processing = false;
            $scope.btnSubmitDisable = false;
            SweetAlert.swal({
                title: "New Password!",
                text: response.data.Message,
                type: "info"

            });
        });
    }

    $scope.cbExpiration = function () {
        $scope.gRecaptchaResponse = null;
    }

    $scope.hasError = function (form, field, validation) {
        if (validation) {
            return (form[field].$dirty && form[field].$error[validation]) || ($scope.submitted && form[field].$error[validation]);
        }
        return (form[field].$dirty && form[field].$invalid) || ($scope.submitted && form[field].$invalid);
    };

};

function AccountChangePasswordCtrl($scope, $http, SweetAlert, AuthService, $location) {

    AuthService.isAuthenticated().then(function (response) {
        if (!response) {
            $location.path("/login");
        }
    }, function (response) {
        alert("Could not check Authentication");
    });

    $scope.processing = false;
    $scope.btnSubmitDisable = false;

    $scope.ChangePasswordBindingModel = {
        OldPassword: null,
        NewPassword: null,
        ConfirmNewPassword: null,
    }

    $scope.changePassword = function () {
        $scope.processing = true;
        $scope.btnSubmitDisable = true;
        $http.post(Constants.WebApi.Account.ChangePassword, $scope.ChangePasswordBindingModel).then(function (response) {
            $scope.processing = false;
            $scope.btnSubmitDisable = false;
            SweetAlert.swal({
                title: "Change Password!",
                text: "Your password has been changed successfully!",
                type: "success",
                confirmButtonText: "Back to the Login Page."
            }, function () {
                AuthService.logOut().then(function (response) {
                    if (response) {
                        $location.path("/login");
                    }
                    else {
                        alert("Could not Logout");
                    }
                }, function (response) {
                    alert("Could not Logout");
                });
            });
        }, function (response) {
            $scope.processing = false;
            $scope.btnSubmitDisable = false;
            SweetAlert.swal({
                title: "Change Password!",
                text: response.data.Message,
                type: "info"

            });
        });
    }
};