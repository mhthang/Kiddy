'use strict';
function AuthService($rootScope, $http, $q, $localStorage, Constants) {

    var authServiceFactory = {};
    var _authentication = {
        isAuth: false,
        userName: "",
        firstName: "",
        token: ""
    };

    var _isAuthenticated = function()
    {
        var deferred = $q.defer();

        $http.post(Constants.WebApi.Account.IsCookieAuth).success(function (response) {
            if ($localStorage.authorizationData != null && $localStorage.authorizationData.isAuth && response) {
                deferred.resolve(true);
            }
            else {
                deferred.resolve(false);
            }
        }).error(function (response) {
            deferred.reject(response);
        });

        return deferred.promise;
    }

    var _login = function (LoginUserBindingModel) {

        var deferred = $q.defer();

        $http.post(Constants.WebApi.Account.Signin, LoginUserBindingModel).success(function (response) {
            _authentication = {
                isAuth: true,
                userName: response.userNameOrEmail,
                firstName: response.firstName,
                token: response.access_token
            };
            $localStorage.authorizationData = _authentication;
            deferred.resolve(response);

        }).error(function (response) {
            _logOut();
            deferred.reject(response);
        });

        return deferred.promise;
    };

    var _logOut = function () {

        var deferred = $q.defer();

        $http.post(Constants.WebApi.Account.Signout).success(function (response) {
            if (response) {
                $localStorage.authorizationData = null;
                _authentication = {
                    isAuth: false,
                    userName: "",
                    firstName: "",
                    token: ""
                };
                deferred.resolve(true);
            }
            else {
                deferred.resolve(false);
            }
        }).error(function (response) {
            deferred.reject(response);
        });

        return deferred.promise;
    };

    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.isAuthenticated = _isAuthenticated;

    return authServiceFactory;
}