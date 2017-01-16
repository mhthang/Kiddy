function MessagingTemplateListCtrl($scope, $http, $location, $stateParams, SweetAlert, Constants) {

    $scope.TemplateId = $stateParams.tid;

    $scope.TemplateName = '';
    $scope.Total = 0;
    $scope.TemplateContents = {};

    var loadTemplateContents = function (templateId) {

        var configs = { cache: false };
        var payload = {
            "templateId": templateId
        };

        configs.params = payload;

        $http.post(Constants.WebApi.Messaging.GetTemplateContentTitles, null, configs).then(function (response) {

            $scope.TemplateContents = response.data.TemplateContentList;
            $scope.Total = response.data.Total;
            $scope.TemplateName = response.data.TemplateName;

        }, function (response) {
            SweetAlert.swal({
                title: "Error!",
                text: "Load Inbox Failed!",
                type: "warning"
            });
        });

    }

    $scope.onload = function () {
        loadTemplateContents($scope.TemplateId);
    }

    $scope.sendTestMail = function (templateId) {
        var configs = { cache: false };
        var payload = {
            "templateId": templateId
        };

        configs.params = payload;

        $http.post(Constants.WebApi.Messaging.SendTestEmail, null, configs).then(function (response) {
            SweetAlert.swal({
                title: "Done",
                text: "Successful!",
                type: "info"
            });

        }, function (response) {
            SweetAlert.swal({
                title: "Error!",
                text: "Load Inbox Failed!",
                type: "warning"
            });
        });
    }
}