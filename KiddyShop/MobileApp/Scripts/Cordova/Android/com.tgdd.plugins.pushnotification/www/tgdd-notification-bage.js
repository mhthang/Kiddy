cordova.define("com.tgdd.plugins.pushnotification.TGDDNotification", function (require, exports, module) { /*global cordova, module*/
    if (typeof module != 'undefined' && module.exports) {
        module.exports = {
            setBadge: function (badge, successCallback, errorCallback) {
                cordova.exec(successCallback, errorCallback, "TGDDNotification", "setBadge", [badge]);
            }
        };
    }
});