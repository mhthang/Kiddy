var TimeKeepingController = function ($scope, $timeout, $ionicScrollDelegate, TimeKeepingFactory, PopupFactory) {
    //#region Variable

    $scope.model = {};
    var pageIndex = 0;

    //#endregion

    //#region Function

    //#region Support

    var getTimeKeepingHistory = function () {
        TimeKeepingFactory.getTimeKeepingHistory(pageIndex, function (response) {
            if (response) {
                if (!$scope.model.historyList) {
                    $scope.model.historyList = response;
                } else {
                    $scope.model.historyList = _.concat($scope.model.historyList, response);
                }

                $scope.model.isLoadingMore = false;
                $scope.model.isLoadingHistory = false;

                $timeout(function () {
                    $ionicScrollDelegate.scrollBottom();
                });
            }
        })
    }

    //#endregion

    //#region Verify

    //#endregion

    //#region Logic

    $scope.viewHistory = function () {
        if ($scope.model.showHistory && !$scope.model.historyList) {
            $scope.model.isLoadingHistory = true;
            getTimeKeepingHistory();
        }
    }

    $scope.checkIn = function () {
        $scope.model.isCheckingIn = true;

        TimeKeepingFactory.checkIn(function (response) {
            if (response) {
                PopupFactory.alert("Chấm công thành công", function () {
                    $scope.model.status.CheckedIn = true;
                });
            }

            $scope.model.isCheckingIn = false;
        })
    }

    $scope.loadMore = function () {
        $scope.model.isLoadingMore = true;
        ++pageIndex;
        getTimeKeepingHistory();
    }

    //#endregion Logic

    //#endregion

    //#region Init

    var initialise = function () {
        $scope.model.isLoadingStatus = true;

        TimeKeepingFactory.getCheckInStatus(function (response) {
            if (response) {
                $scope.model.status = response;
            }

            $scope.model.isLoadingStatus = false;
        })
    }

    initialise();

    //#endregion
}

TimeKeepingController.$inject = ["$scope", "$timeout", "$ionicScrollDelegate", "TimeKeepingFactory", "PopupFactory"];