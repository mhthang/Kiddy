function NavigatorCtrl($scope, $rootScope, $state, $http, $modal, $localStorage, Constants) {

    $scope.Organizations = null;

    $scope.onload = function ()
    {
        //loadOrganizations();
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
            loadOrganizations();
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
            loadOrganizations();
        }, function () {
            //on cancel button press
        });
    }

    var loadOrganizations = function()
    {        
        $http.post(Constants.WebApi.Application.GetUserOrganizations, null).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.Organizations = response.data;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    }
}