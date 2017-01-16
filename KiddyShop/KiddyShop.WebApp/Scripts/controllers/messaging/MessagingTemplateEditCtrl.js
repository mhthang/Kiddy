function MessagingTemplateEditCtrl($scope, $http, $location, $stateParams, SweetAlert, Constants) {
    $scope.MailTemplateContent = {
        Id: $stateParams.tid,
        MessagingTemplateId: null,
        MessagingTemplateName: null,
        Lang: 'en',
        MessagingSubject: '',
        MessagingFromName: '',
        MessagingFromEmailAddress: '',
        MessagingTo: '',
        MessagingCc: '',
        MessagingBcc: '',
        MessagingContent: '',
        Tags: '',
        IsPublish: false,
        FromDate: null,
        EndDate: null,
        CreatedDate: null
    }

    $scope.loadTemplateContent = function (contentId) {

        var configs = { cache: false };
        var payload = {
            "contentId": contentId
        };

        configs.params = payload;

        $http.post(Constants.WebApi.Messaging.GetMailTemplateContent, null, configs).then(function (response) {

            $scope.MailTemplateContent = response.data;

        }, function (response) {
            SweetAlert.swal({
                title: "Error!",
                text: "Load Template Content Failed!",
                type: "warning"
            });
        });

    }

    $scope.onload = function () {
        if ($scope.MailTemplateContent.Id != null) {
            $scope.loadTemplateContent($scope.MailTemplateContent.Id);
        }
    }

    $scope.save = function ()
    {
        $http.post(Constants.WebApi.Messaging.SaveMailTemplateContent, $scope.MailTemplateContent).then(function (response) {

            $scope.MailTemplateContent = response.data;

            toastr.options.closeButton = true;
            toastr.success('Save', 'Template saved.')
        }, function (response) {
            SweetAlert.swal({
                title: "Error!",
                text: "Save Template Content Failed!",
                type: "warning"
            });
        });
    }
}