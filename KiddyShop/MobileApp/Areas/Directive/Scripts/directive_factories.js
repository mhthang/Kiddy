var AddNoticeCommentFactory = function (HTTPFactory) {
    var factory = {};
    var URL = "Directive/AddNoticeComment/";

    factory.addComment = function (noticeID, content, parentID, callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "AddComment",

            data: {
                intNoticeID: noticeID,
                strContent: content,
                intParentID: parentID
            },

            callback: callback
        });
    }

    return factory;
}

AddNoticeCommentFactory.$inject = ["HTTPFactory"];