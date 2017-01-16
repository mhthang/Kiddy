function MessagingMailViewCtrl($scope, $http, $location, $stateParams, SweetAlert, Constants) {

    $scope.MailMessage = {
        Id: $stateParams.Id
    }

    $scope.loadMessage = function (messageId) {
        $http.get(Constants.WebApi.Messaging.GetMailMessage, { params: { messageId: messageId } }).then(function (response) {

            $scope.MailMessage = response.data;

        }, function (response) {
            SweetAlert.swal({
                title: "Error!",
                text: "Load Message Failed!",
                type: "warning"
            });
        });

    }

    $scope.onload = function () {
        $scope.loadMessage($scope.MailMessage.Id);
    }
}