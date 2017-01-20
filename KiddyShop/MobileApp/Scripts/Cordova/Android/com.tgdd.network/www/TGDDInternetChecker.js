cordova.define("com.tgdd.network.TGDDInternetChecker", function(require, exports, module) {
if (typeof module != 'undefined' && module.exports) {
    module.exports = {
        CheckInternet: function (serverObject, success, error) {
            if (!serverObject) {
                var serverObject = {
                    "serverAddress": "www.thegioididong.com",
                    "serverTCPport": 443,
                    "timeoutMS": 500
                }
            }
            cordova.exec(success, error, "InternetChecker", "CheckInternet", [{
                "serverAddress": serverObject.serverAddress,
                "serverTCPport": serverObject.serverTCPport,
                "timeoutMS": serverObject.timeoutMS
            }]);
        },
               ExitApp: function (success, error) {
               cordova.exec(success, error, "InternetChecker", "ExitApp", []);
               }
    };
}
});