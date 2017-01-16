'use strict';
function AuthInterceptorService($q, $location, $localStorage, $rootScope) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = $localStorage.authorizationData;
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    var _responseError = function (rejection) {
        switch (rejection.status) {
            case 401:
                $location.path('/login');
                break;
            case 404:
                $location.path('/errorOne');
                break;
            case 403:
            case 406:
            case 500:
                break;
            default:
                console.log("Server Error: " + rejection.status);
                break;
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
};