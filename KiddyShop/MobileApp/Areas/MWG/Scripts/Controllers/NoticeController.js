var NoticeListController = function ($scope, $timeout, $ionicScrollDelegate, NoticeFactory) {
    //#region Variable

    $scope.model = {};
    var lastKeyword;
    var lastCategoryID = 0;
    var intPageIndex = 1;
    const pageSize = 5;

    //#endretion

    //#endregion

    //#region Function

    //#region Support

    var search = function (isLoadMore) {
        NoticeFactory.search(lastKeyword, lastCategoryID, intPageIndex, pageSize, function (response) {
            if (response) {
                if (!isLoadMore || !$scope.model.noticeList) {
                    $scope.model.noticeList = response;
                } else {
                    $scope.model.noticeList = _.concat($scope.model.noticeList, response);
                }

                if (response.length < pageSize) {
                    $scope.model.hideLoadMoreButton = true;
                }
            }

            $scope.model.isSearching = false;
            $scope.model.isLoadingMore = false;

            if (intPageIndex > 1) {
                $timeout(function () {
                    $ionicScrollDelegate.scrollBottom();
                });
            }
        });
    }

    //#endregion

    //#region Verify

    //#endregion

    //#region Logic

    //#endregion Lic

    $scope.search = function () {
        $scope.model.hideLoadMoreButton = false;
        intPageIndex = 1;
        lastKeyword = $scope.model.keyword;
        lastCategoryID = $scope.model.selectedCategory.NotifyCategoryID;
        $scope.model.isSearching = true;
        search(false);
    }

    $scope.loadMore = function () {
        $scope.model.isLoadingMore = true;
        ++intPageIndex;
        search(true);
    }

    //#endregion

    //#region Init

    var initialise = function () {
        $scope.model.isLoadingCategory = true;

        NoticeFactory.getAllCategory(function (response) {
            if (response) {
                $scope.model.lstCategory = response;
                // Thêm cứng loại thông báo tất cả
                var allCategory = {
                    NotifyCategoryID: 0,
                    NotifyCategoryName: "Tất cả loại thông báo"
                };

                $scope.model.lstCategory.unshift(allCategory);
                $scope.model.selectedCategory = $scope.model.lstCategory[0];
                $scope.search();
            }

            $scope.model.isLoadingCategory = false;
        });
    }

    initialise();

    //#endregion
}

NoticeListController.$inject = ["$scope", "$timeout", "$ionicScrollDelegate", "NoticeFactory"];

var NoticeDetailController = function ($scope, $stateParams, $ionicScrollDelegate, NoticeFactory, PopupFactory) {
    //#region Variable

    $scope.model = {};
    $scope.model.focusAddComment = false;
    $scope.model.adminGroupID = ADMIN_PG_GROUP;

    //#endretion

    //#endregion

    //#region Function

    //#region Support

    //#endregion

    //#region Verify

    //#endregion

    //#region Logic

    $scope.scrollToComment = function () {
        $ionicScrollDelegate.scrollBottom();
    }

    $scope.addComment = function () {
        if (S($scope.model.commentContent).isEmpty()) {
            PopupFactory.alert("Vui lòng nhập nội dung bình luận");
        } else {
            $scope.model.isAddingComment = true;

            NoticeFactory.addComment($stateParams.id, $scope.model.commentContent, 0, function (response) {
                if (response) {
                    PopupFactory.alert("Gửi bình luận thành công");
                    $scope.model.notice.LstComment.push(response);
                }

                $scope.model.isAddingComment = false;
            });
        }
    }

    $scope.showHideAddComment = function (comment) {
        comment.showAddComment = !comment.showAddComment;

        if (comment.showAddComment) {
            comment.focusAddComment = true;
        }
    }

    //#endregion

    //#endregion

    //#region Init

    var initialise = function () {
        $scope.model.isLoading = true;

        NoticeFactory.getDetail($stateParams.id, function (response) {
            if (response) {
                $scope.model.notice = response;
            }

            $scope.model.isLoading = false;
        });
    }

    initialise();

    //#endregion
}

NoticeDetailController.$inject = ["$scope", "$stateParams", "$ionicScrollDelegate", "NoticeFactory", "PopupFactory"];