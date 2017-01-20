var AccountFactory = function (HTTPFactory, LocalFileFactory, $state) {
    var factory = {};
    var URL = "Account/";

    factory.autoLogIn = function (callback) {
        LocalFileFactory.readFile(LOCAL_FILE_ACCOUNT_FOLDER + "/" + LOCAL_FILE_ACCOUNT_DATA, function (response) {
            if (response) {
                var account = JSON.parse(response);

                HTTPFactory.sendRequestToServer({
                    url: URL + "AutoLogIn",

                    data: {
                        objAccount: account
                    },

                    callback: callback
                });
            } else {
                $state.go("app.login");
            }
        });
    }

    return factory;
};

AccountFactory.$inject = ["HTTPFactory", "LocalFileFactory", "$state"]