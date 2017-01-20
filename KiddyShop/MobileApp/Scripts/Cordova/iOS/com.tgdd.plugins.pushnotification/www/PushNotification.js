cordova.define("com.tgdd.plugins.pushnotification.PushNotification", function(require, exports, module) { var PushNotification = function () {
};
// Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
PushNotification.prototype.register = function (successCallback, errorCallback, options) {
    if (errorCallback == null) { errorCallback = function () { } }

    if (typeof errorCallback != "function") {
        console.log("PushNotification.register failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.register failure: success callback parameter must be a function");
        return
    }

    cordova.exec(successCallback, errorCallback, "PushPlugin", "register", [options]);
};

// Call this to unregister for push notifications
PushNotification.prototype.unregister = function (successCallback, errorCallback, options) {
    if (errorCallback == null) { errorCallback = function () { } }

    if (typeof errorCallback != "function") {
        console.log("PushNotification.unregister failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.unregister failure: success callback parameter must be a function");
        return
    }

    cordova.exec(successCallback, errorCallback, "PushPlugin", "unregister", [options]);
};

// Call this to cancel all notifications
PushNotification.prototype.clearAllNotification = function (successCallback, errorCallback, options) {
    if (errorCallback == null) { errorCallback = function () { } }

    if (typeof errorCallback != "function") {
        console.log("PushNotification.clearAllNotification failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.clearAllNotification failure: success callback parameter must be a function");
        return
    }

    cordova.exec(successCallback, errorCallback, "PushPlugin", "clearallnotify", [options]);
};
// Call this if you want to show toast notification on WP8
PushNotification.prototype.showToastNotification = function (successCallback, errorCallback, options) {
    if (errorCallback == null) { errorCallback = function () { } }

    if (typeof errorCallback != "function") {
        console.log("PushNotification.register failure: failure parameter not a function");
        return
    }

    cordova.exec(successCallback, errorCallback, "PushPlugin", "showToastNotification", [options]);
}
// Call this to set the application icon badge
PushNotification.prototype.setApplicationIconBadgeNumber = function (successCallback, errorCallback, badge) {
    if (errorCallback == null) { errorCallback = function () { } }

    if (typeof errorCallback != "function") {
        console.log("PushNotification.setApplicationIconBadgeNumber failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.setApplicationIconBadgeNumber failure: success callback parameter must be a function");
        return
    }

    cordova.exec(successCallback, errorCallback, "PushPlugin", "setApplicationIconBadgeNumber", [{ badge: badge }]);
};
// Call this to set app is forceground mode
PushNotification.prototype.initPushNotification = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "PushPlugin", "init", []);
};
//-------------------------------------------------------------------

if (!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.pushNotification) {
    window.plugins.pushNotification = new PushNotification();
}

if (typeof module != 'undefined' && module.exports) {
    module.exports = PushNotification;
}
});