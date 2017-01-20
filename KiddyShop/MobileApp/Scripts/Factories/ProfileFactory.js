var ProfileFactory = function (HTTPFactory) {
    var factory = {};
    var URL = "Profile/";

    factory.changeAvatar = function (imageData, callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "ChangeAvatar",

            data: {
                strImageData: imageData
            },

            callback: callback
        });
    }

    factory.rotate = function (type, callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "Rotate",

            data: {
                intType: type
            },

            callback: callback
        });
    }

    factory.setNewPassword = function (oldPassword, newPassword, callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "SetNewPassword",

            data: {
                strOldPassword: oldPassword,
                strNewPassword: newPassword
            },

            callback: callback
        });
    }

    return factory;
};

ProfileFactory.$inject = ["HTTPFactory"]