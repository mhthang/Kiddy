function AdminPortalNavigatorCtrl($scope, $rootScope, $state, $http, $modal, $localStorage, Constants) {

    $scope.EmailTemplates = null;

    $rootScope.$on('logon', function (event, args) {
        //$scope.onload();
    });

    $rootScope.$on('logoff', function () {
        //$stateProvider.state.go('login');
    });

    $scope.onload = function ()
    {
        loadEmailTemplates();
    }

    $scope.createNewOrg = function () {
        var modalInstance = $modal.open({
            templateUrl: 'organization/edit',
            controller: OrganizationCtrl,
            resolve: {
                OrganizationId: function () {
                    return null; //create new
                }
            }
        });

        modalInstance.result.then(function () {
            //on ok button press           
            loadEmailTemplates();
        }, function () {
            //on cancel button press
        });
    }

    $scope.createNewSemester = function (orgId) {
        var modalInstance = $modal.open({
            templateUrl: 'semester/edit',
            controller: SemesterCtrl,
            resolve: {
                OrgId: function () {
                    return orgId;
                },
                SemesterId: function () {
                    return null; //create new
                }
            }
        });

        modalInstance.result.then(function () {
            //on ok button press           
            loadEmailTemplates();
        }, function () {
            //on cancel button press
        });
    }

    var loadEmailTemplates = function()
    {        
        $http.post(Constants.WebApi.Messaging.GetMessagingContent, null).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.EmailTemplates = response.data.MessagingTemplates;
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    }
}