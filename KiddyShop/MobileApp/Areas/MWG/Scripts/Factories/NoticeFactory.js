﻿var NoticeFactory = function (HTTPFactory) {
    var factory = {};
    var URL = "MWG/Notice/";

    factory.getAllCategory = function (callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "GetAllCategory",
            callback: callback
        });
    }

    factory.search = function (keyword, categoryID, pageIndex, pageSize, callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "Search",

            data: {
                strKeyword: keyword,
                intCategoryID: categoryID,
                intPageIndex: pageIndex,
                intPageSize: pageSize
            },

            callback: callback
        });
    }

    factory.getDetail = function (noticeID, callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "GetDetail",

            data: {
                intNoticeID: noticeID
            },

            callback: callback
        });
    }

    return factory;
};

NoticeFactory.$inject = ["HTTPFactory"];