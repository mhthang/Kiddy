function SubjectListCtrl($scope, $http, $stateParams, $modal, Constants) {

    $scope.OrgId = $stateParams.orgid;
    $scope.SemId = $stateParams.semid;

     $scope.pager = {
        PageIndex: 1,
        PageSize: Constants.PAGER_PAGE_SIZE
    }
     $scope.maxSize = Constants.PAGER_MAX_SIZE;


    $scope.onload = function () {
        loadSemesterSubjectGroup($scope.SemId);
        loadSemesterClassGroup($scope.SemId);
        search($scope.SemId);
    };

    $scope.SearchResponse = null;
    $scope.SemesterSubjectGroups = [];
    $scope.SemesterClassGroups = [];

    $scope.onsearch = function () {
        $scope.pager.PageIndex = 1
        search($scope.SemId);
    }

    var search = function (semId) {
        var requestModel =
        {
            Id: semId,
            FilterText: $scope.SearchText,
            FilterId: $scope.SelectedSubjectGroupId,
            Tag: $scope.SelectedProgramId,
            Pager: $scope.pager
        };

        $http.post(Constants.WebApi.Subject.Search, requestModel).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SearchResponse = response.data;
            
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    $scope.onPaging = function () {
        search($scope.SemId);
    }

    var loadSemesterSubjectGroup = function (semesterId) {

         if (semesterId == null) return;

         var model = {
             Id: semesterId,
         };

         $http.post(Constants.WebApi.SubjectGroup.GetSemesterSubjectGroup, model).then(function (response) {
             // this callback will be called asynchronously
             // when the response is available            
             $scope.SemesterSubjectGroups = response.data.Records;

         }, function (response) {
             // called asynchronously if an error occurs
             // or server returns response with an error status.             
         });
     };

    var loadSemesterClassGroup = function (semesterId) {

        if (semesterId == null) return;

        var model = {
            Id: semesterId
        };

        $http.post(Constants.WebApi.ClassGroup.GetSemesterClassGroup, model).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available            
            $scope.SemesterClassGroups = response.data.Records;

        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.             
        });
    };

    $scope.open = function(id)
    {
        var modalInstance = $modal.open({
            templateUrl: 'subject/edit',
            controller: SubjectCtrl,
            resolve: {
                SemesterId: function () {
                    return $scope.SemId;
                },
                SubjectId: function () {
                    return id;
                }
            }
        });

        modalInstance.result.then(function () {
            //on ok button press           
            search($scope.SemId);
        }, function () {
            //on cancel button press
        });
    }

    $scope.expand = function (model) {

        model.IsExpand = !model.IsExpand;

        if (model.IsExpand == null || !model.IsExpand) {

        }
    }

    $scope.removeSubject = function (model) {
       
    }
}