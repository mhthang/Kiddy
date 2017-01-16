function FaqAdminCtrl($scope, $http, $modal, $stateParams, SweetAlert, Constants) {

    $scope.createNewQuestion = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/modals/FaqAdminQuestion.html',
            controller: FaqAdminQuestionCtrl,
            resolve: {
                faqId: function () {
                    return null;
                }
            }
        });

        modalInstance.result.then(function () {
            //on ok button press 
            $scope.loadFaqs();
        }, function () {
            //on cancel button press
        });
    }

    $scope.Faqs = [];

    $scope.loadFaqs = function () {
        $scope.loading = true;

        $http.get(Constants.WebApi.Faq.GetFaqs).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.Faqs = response.data;
            
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

    $scope.loadFaqs();

    $scope.deleteQuestion = function(id)
    {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function (isConfirm) {
            if (isConfirm) {
                $http.post(Constants.WebApi.Faq.DeletFaq + id).then(function (response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    SweetAlert.swal("Deleted!", "Your imaginary file has been deleted.", "success");
                    var index;
                    for (var i = 0; i < $scope.Faqs.length; i++) {
                        if ($scope.Faqs[i].Id === id) {
                            index = i;
                            break;
                        }
                    }

                    $scope.Faqs.splice(index, 1);
                });
              
            } else {
                SweetAlert.swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
        });
    }

    $scope.editQuestion = function (faqId) {
        var modalInstance = $modal.open({
            templateUrl: 'views/modals/FaqAdminQuestion.html',
            controller: FaqAdminQuestionCtrl,
            resolve: {
                faqId: function () {
                    return faqId;
                }
            }
        });

        modalInstance.result.then(function () {
            //on ok button press 
            $scope.loadFaqs();
        }, function () {
            //on cancel button press
        });
    }

    $scope.loadFaq = function (id) {
        $scope.loading = true;

        $http.get(Constants.WebApi.Faq.GetFaq + '/' + id).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.Faqs = response.data;
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