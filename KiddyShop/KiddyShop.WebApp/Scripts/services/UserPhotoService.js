'use strict';
function UserPhotoService($q, $http, $rootScope, Constants) {

    var userPhotoServiceFactory = {};

    var _userPhoto = {
        UserId: null,
        Photo: null
    };

    var _getUserPhoto = function (user) {

        var deferred = $q.defer();

        var base64Photo = null;
        if (user != null && user.Id != null) {
            if ($rootScope.UserPhotos == null) {
                $rootScope.UserPhotos = {};
            }
            var userPhotos = $rootScope.UserPhotos;

            angular.forEach(userPhotos, function (value, key) {
                if (value.UserId != null && value.UserId == user.Id) {
                    base64Photo = value.Photo;
                    user.Photo = base64Photo;
                }
            });
    
            if(base64Photo == null)
            {
                var downloadResult = _downloadUserPhoto(user.Id);
    
                downloadResult.then(function (data) {
                    _userPhoto = data;
                    userPhotos.push(_userPhoto);
                    base64Photo = _userPhoto.Photo;
                    user.Photo = base64Photo;

                    deferred.resolve(base64Photo);
                    console.debug('photo downloaded:', _userPhoto.UserId);
                }, function (error) { 
                    console.debug('download photo exception:', error);
                    deferred.reject(err);
                });
            }
            else {
                deferred.resolve(base64Photo);
            }
        } else {
            base64Photo = '//:0';
            deferred.resolve(base64Photo);
        }

        return deferred.promise;
    }

    var _downloadUserPhoto = function (userId) {

        var deferred = $q.defer();

        $http.get(Constants.WebApi.Client.GetUserPhoto, { params: { userId: userId } }).success(function (response) {

            var userPhoto = {
                UserId: userId,
                Photo: response
            };

            deferred.resolve(userPhoto);

        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    userPhotoServiceFactory.getUserPhoto = _getUserPhoto;
    userPhotoServiceFactory.downloadUserPhoto = _downloadUserPhoto;

    return userPhotoServiceFactory;
}