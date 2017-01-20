var AddNoticeComment = function (AddNoticeCommentFactory, PopupFactory) {
    var directive = {
        restrict: "E",

        scope: {
            notice: "=",
            parentid: "=",
            focuscontent: "="
        },

        transclude: true,
        templateUrl: "Directive/AddNoticeComment/AddNoticeComment",

        link: function (scope, element, attrs) {
            scope.model = {};

            scope.addComment = function () {
                if (S(scope.model.commentContent).isEmpty()) {
                    PopupFactory.alert("Vui lòng nhập nội dung bình luận", function () {
                        if (scope.focuscontent != undefined) {
                            scope.focuscontent = true;
                        }
                    });
                } else {
                    scope.model.isAddingComment = true;

                    AddNoticeCommentFactory.addComment(scope.notice.NotifyID, scope.model.commentContent, scope.parentid, function (response) {
                        if (response) {
                            scope.notice.LstComment.push(response);
                            scope.model.commentContent = "";
                        }

                        scope.model.isAddingComment = false;
                    });
                }
            }
        },
    };

    return directive;
};

AddNoticeComment.$inject = ["AddNoticeCommentFactory", "PopupFactory"];