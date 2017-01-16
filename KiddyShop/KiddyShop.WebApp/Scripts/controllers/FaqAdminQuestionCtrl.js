function FaqAdminQuestionCtrl($scope, $http, $modalInstance, faqId, Constants) {
    $scope.QuestionDto = {
        Id: null,
        Lang: 'en',
        FullName: '',
        EmailAddress: '',
        Question: '',
        AssistantName: '',
        Answer: '',
        Tags: '',
        DisplayOrder: 5,
        Voting: 12,
        CreatedDate: '',
        IsPublish: true
    };
   
    $scope.SubmitQuestion = function() {
        if ($scope.QuestionDto.Id == null) {
            $http.post(Constants.WebApi.Faq.CreateQuestion, $scope.QuestionDto).then(function(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.ok();
            }, function(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.                   
                alert('Failed');
            });
        }
        else 
            $http.post(Constants.WebApi.Faq.EditQuestion, $scope.QuestionDto).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.ok();
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.                   
                alert('Failed');
            });
    }

    $scope.LoadFaq = function (faqId) {
        $scope.loading = true;
        if (faqId != null) {
            $http.get(Constants.WebApi.Faq.GetFaq, { params: { id: faqId } }).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.QuestionDto = response.data;
                $scope.loading = false;
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.                   
                $scope.loading = false;
                SweetAlert.swal({
                    title: "Error!",
                    text: "Load Recent Project Failed!",
                    type: "warning"
                });
            });
        }
    }

    $scope.ok = function () {
        $modalInstance.close();        
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.LoadFaq(faqId);
}