cordova.define("com.tgdd.Utils.TGDD_Utils", function(require, exports, module) {
if (typeof module != 'undefined' && module.exports) {
    module.exports = {
        changeUrl: function (url, success, error) {
            cordova.exec(success, error, "TGDDUtils", "changeUrl", [{
                "url": url
            }]);
        }
    };
}
});