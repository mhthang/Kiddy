function OrderViewCtrl($scope, $http, $stateParams, SweetAlert, Constants, Commons) {

    $scope.LayoutOption1 = false;
    $scope.LayoutOption2 = false;
    $scope.LayoutOption3 = false;
    $scope.LayoutOption4 = false;

    $scope.OrderDto = {
        Id: $stateParams.id,
        CreatedDate: null
    };

    $scope.IsAttachmentProcessing = false;
    $scope.file1 = null;
    var FileUploads = [
            {
                FileName: null,
                Base64FileData: null
            },
    ];
    $scope.AttachmentType = null;
    $scope.AttachmentFiles = {};

    $scope.Invoices = {};

    $scope.AuditLogs = [];

    $scope.CommentText = null;

    $scope.IsCommentProcessingProcessing = false;
    $scope.IsLoading = false;

    $scope.Emails = null;
    $scope.IsEmailProcessing = false;

    var checkLayoutOptions = function (layoutOption, order)
    {
        var orderLayouts = [order.LogoLayout1, order.LogoLayout2, order.LogoLayout3];

        for (var i = 0; i < orderLayouts.length; i++) {
            if (orderLayouts[i] == layoutOption) {
                return true;
            }
        }
       
        return false;
    }

    var loadLayoutOptions = function (order) {
        $scope.LayoutOption1 = checkLayoutOptions(Constants.LayoutOptions.Image, order);
        $scope.LayoutOption2 = checkLayoutOptions(Constants.LayoutOptions.Text, order);
        $scope.LayoutOption3 = checkLayoutOptions(Constants.LayoutOptions.Horizontal, order);
        $scope.LayoutOption4 = checkLayoutOptions(Constants.LayoutOptions.Vertical, order);    
    }

    $scope.loadOrder = function (orderId) {
        var order = {
            Id: orderId
        }

        $scope.IsLoading = true;
        $http.post(Constants.WebApi.Project.GetOrder, order).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.OrderDto = response.data;
            loadLayoutOptions($scope.OrderDto);

            $scope.IsLoading = false;
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            $scope.IsLoading = false;
            toastr.options.closeButton = true;
            toastr.error('Could not load order!', response.data);
        });
    }

    $scope.loadAttachmentFiles = function (orderId) {
        var orderDto = {
            Id: orderId
        }
        $http.post(Constants.WebApi.Project.GetAttachmentFiles, orderDto).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.AttachmentFiles = response.data;
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            toastr.options.closeButton = true;
            toastr.error('Network Error', 'Could not load attachments!')
        });
    }

    $scope.loadInvoices = function (orderId) {
        var orderDto = {
            Id: orderId
        }
        $http.post(Constants.WebApi.Project.GetOrderInvoices, orderDto).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.Invoices = response.data;
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            toastr.options.closeButton = true;
            toastr.error('Network Error', 'Could not load project member!')
        });
    }

    $scope.loadRecentActivity = function (OrderId) {

        var auditLogDto = { RecordId: OrderId };

        $http.post(Constants.WebApi.AuditLog.GetOrderActivity, auditLogDto).then(function (response) {
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

    $scope.loadWorkingEmails = function () {

        $http.post(Constants.WebApi.Project.GetWorkingEmails, null).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.Emails = response.data;
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            toastr.options.closeButton = true;
            toastr.error('Could not load working email!', response.data);
        });
    }

    $scope.onload = function () {
        var stages = Constants.OrderStages;        
        var types = Constants.AttachmentTypes;

        $scope.OrderStages = stages.reduce(function (memo, obj) {
            return angular.extend(memo, obj);
        }, {});

        $scope.AttachmentTypes = types.reduce(function (memo, obj) {
            return angular.extend(memo, obj);
        }, {});

        var orderId = $stateParams.id;

        $scope.loadOrder(orderId);
        $scope.loadAttachmentFiles(orderId);
        $scope.loadInvoices(orderId);
        $scope.loadRecentActivity(orderId);
        $scope.loadWorkingEmails();
    }

    var getLayoutOptions = function () {
        var logoLayouts = [];
        var selectedList = [
            { Checked: $scope.LayoutOption1, Type: Constants.LayoutOptions.Image },
            { Checked: $scope.LayoutOption2, Type: Constants.LayoutOptions.Text },
            { Checked: $scope.LayoutOption3, Type: Constants.LayoutOptions.Horizontal },
            { Checked: $scope.LayoutOption4, Type: Constants.LayoutOptions.Vertical }];

        for (var i = 0; i < selectedList.length; i++) {
            if (selectedList[i].Checked) {
                logoLayouts.push(selectedList[i].Type);
            }
        }

        return logoLayouts;
    }

    $scope.save = function () {
        $scope.saveOrder($scope.OrderDto);
    }

    $scope.saveOrder = function (order) {
        $scope.IsLoading = true;

        var logoLayouts = getLayoutOptions();

        var saveOrder = {
            Order: order,
            LogoLayouts: logoLayouts,
        };

        $http.post(Constants.WebApi.Project.SaveOrder, saveOrder).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.IsLoading = false;
            $scope.loadRecentActivity(order.Id);
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            $scope.IsLoading = false;
            toastr.options.closeButton = true;
            toastr.error('Could not save order!', response.data);
        });
    }

    $scope.parseInt = function (number) {
        return parseInt(number, 10);
    }

    $scope.saveComment = function () {        
        $scope.IsCommentProcessing = true;
        var orderId = $scope.OrderDto.Id;
        var comment = {
            ObjectId: orderId,
            CommentText: $scope.CommentText
        };

        $http.post(Constants.WebApi.AuditLog.SaveOrderComment, comment).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.IsCommentProcessing = false;
            $scope.CommentText = null;
            $scope.loadRecentActivity(orderId);
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

    $scope.sendEmailRequest = function (emailTemplate) {
        $scope.IsEmailProcessing = true;
        var orderId = $scope.OrderDto.Id;
        var request = {
            ObjectId: orderId,
            EmailTemplateId: emailTemplate.Id
        };

        $http.post(Constants.WebApi.Project.SendEmailRequest, request).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.IsEmailProcessing = false;
            $scope.loadRecentActivity(orderId);
            toastr.options.closeButton = true;
            toastr.info('Sent!');
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            $scope.IsEmailProcessing = false;
            toastr.options.closeButton = true;
            toastr.error('Could not save comment!', response.data);
        });
    }

    $scope.fileRemoved = function () {
        $scope.file1 = null;

        FileUploads[0].FileName = null;
        FileUploads[0].Base64FileData = null;
    }

    $scope.fileChanged = function (e) {
        var files = e.target.files;

        var fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);

        fileReader.onload = function (e) {
            //$scope.fileData = this.result;

            $scope.file1 = files[0].name;

            FileUploads[0].FileName = $scope.file1;
            FileUploads[0].Base64FileData = this.result;

            $scope.$apply();
        };
    }

    $scope.uploadFiles = function()
    {
        $scope.IsAttachmentProcessing = true;

        var orderId = $scope.OrderDto.Id;
        var request = {
            ObjectId: orderId,
            AttachmentType: $scope.AttachmentType,
            Files: FileUploads
        };

        $http.post(Constants.WebApi.Project.AttachFiles, request).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.IsAttachmentProcessing = false;
            $scope.loadRecentActivity(orderId);
            $scope.loadAttachmentFiles(orderId);
            toastr.options.closeButton = true;
            toastr.info('Uploaded!');
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.                   
            $scope.IsAttachmentProcessing = false;
            toastr.options.closeButton = true;
            toastr.error('Upload file failed!', response.data);
        });
    }
};