function InvoiceViewCtrl($scope, $http, $stateParams, SweetAlert, Constants, Commons) {

    $scope.InvoiceDto = {
        Id: $stateParams.id,
    };

    $scope.Members = {};
    $scope.AuditLogs = [];

    $scope.IsLoading = false;

    $scope.loadInvoice = function (invoice) {

        $scope.IsLoading = true;
        $http.post(Constants.WebApi.Project.GetInvoice, invoice).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.InvoiceDto = response.data;
            $scope.IsLoading = false;
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            $scope.IsLoading = false;
            toastr.options.closeButton = true;
            toastr.error('Could not load invoice!', response.data);
        });
    }

    $scope.loadRecentActivity = function (InvoiceId) {

        var auditLogDto = { RecordId: InvoiceId };

        $http.post(Constants.WebApi.AuditLog.GetInvoiceActivity, auditLogDto).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.AuditLogs = response.data;
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            toastr.options.closeButton = true;
            toastr.error('Could not load activity!', response.data);
        });
    }

    $scope.onload = function () {

        var stages = Constants.InvoiceStages;

        $scope.InvoiceStages = stages.reduce(function (memo, obj) {
            return angular.extend(memo, obj);
        }, {});

        var methods = Constants.PaymentMethods;

        $scope.PaymentMethods = methods.reduce(function (memo, obj) {
            return angular.extend(memo, obj);
        }, {});

        $scope.Currencies = Constants.Currencies;

        $scope.loadInvoice($scope.InvoiceDto);
        $scope.loadRecentActivity($scope.InvoiceDto.Id);
    }

    $scope.save = function () {
        $scope.saveInvoice($scope.InvoiceDto);
    }

    $scope.saveInvoice = function (invoice) {
        $scope.IsLoading = true;
        $http.post(Constants.WebApi.Project.SaveInvoice, invoice).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.IsLoading = false;
            $scope.loadRecentActivity(invoice.Id);
            toastr.options.closeButton = true;
            toastr.info('Save!');
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            $scope.IsLoading = false;
            toastr.options.closeButton = true;
            toastr.error('Could not save invoice!', response.data);
        });
    }

    $scope.parseInt = function (number) {
        return parseInt(number, 10);
    }

    $scope.saveComment = function () {
        $scope.IsCommentProcessing = true;
        var invoiceId = $scope.InvoiceDto.Id;
        var comment = {
            ObjectId: invoiceId,
            CommentText: $scope.CommentText
        };

        $http.post(Constants.WebApi.AuditLog.SaveInvoiceComment, comment).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.IsCommentProcessing = false;
            $scope.CommentText = null;
            $scope.loadRecentActivity(invoiceId);
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            $scope.IsCommentProcessing = false;
            toastr.options.closeButton = true;
            toastr.error('Could not save comment!', response.data);
        });
    }

    $scope.hasError = function (form, field, validation) {
        if (validation) {
            return (form[field].$dirty && form[field].$error[validation]) || ($scope.submitted && form[field].$error[validation]);
        }
        return (form[field].$dirty && form[field].$invalid) || ($scope.submitted && form[field].$invalid);
    };
};