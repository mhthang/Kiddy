var TimeKeepingFactory = function (HTTPFactory) {
    var factory = {};
    var URL = "MWG/TimeKeeping/";

    factory.getCheckInStatus = function (callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "GetCheckInStatus",
            callback: callback
        });
    }

    factory.checkIn = function (callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "CheckIn",
            callback: callback
        });
    }

    factory.getTimeKeepingHistory = function (pageIndex, callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "GetTimeKeepingHistory",

            data: {
                intPageIndex: pageIndex,
            },

            callback: callback
        });
    }

    return factory;
};

TimeKeepingFactory.$inject = ["HTTPFactory"];