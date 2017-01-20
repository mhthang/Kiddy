var HomeController = function ($scope, SystemFactory) {
    //#region Variable

    //#endregion

    //#region Function

    //#region Support

    //#endregion

    //#region Verify

    //#endregion

    //#region Logic

    //#endregion

    //#endregion

    //#region Init

    var initialise = function () {
        SystemFactory.getMenuList(function (response) { });
    }

    initialise();

    //#endregion
}

HomeController.$inject = ["$scope", "SystemFactory"];