var LoginFactory = function (HTTPFactory) {
    var factory = {};
    var URL = "Login/";

    factory.logOut = function (callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "LogOut",
            callback: callback
        });
    }

    factory.getPGGroupList = function (callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "GetPGGroupList",
            callback: callback
        });
    }

    factory.logIn = function (username, password, callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "ManualLogIn",

            data: {
                strUserName: username,
                strPassword: password
            },

            callback: callback,

            noAlert: true
        });
    }

    return factory;
};

LoginFactory.$inject = ["HTTPFactory"];