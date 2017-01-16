function InvoicesCtrl($scope, $http, $modal, $stateParams, $localStorage, Constants, SweetAlert) {

    $scope.Invoices = [];
    $scope.IsLoading = false;
    $scope.IsLoadMore = false;
    $scope.TotalRecords = 0;

    $scope.SearchFilter = {
        Title: null,
        Statuses: [],
        PaymentMethods: [],
        Contact: {
            FirstName: null,
            EmailAddress: null,
            PhoneNumber: null
        },
        FromDate: null,
        EndDate: null,
        Paging: {
            PageIndex: 0,
            PageSize: 999
        },
    };

    $scope.searchInvoices = function (filter) {
        $scope.IsLoading = true;
        
        $http.post(Constants.WebApi.Project.SearchInvoices, filter).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.TotalRecords = response.data.TotalRecords;

            if (response.data.Records != null) {
                $scope.Invoices = $scope.Invoices.concat(response.data.Records);

                if (response.data.Records.length >= filter.Paging.PageSize) {
                    $scope.IsLoadMore = true;
                }
                else {
                    $scope.IsLoadMore = false;
                }
            }
            else {
                $scope.IsLoadMore = false;
            }

            $scope.IsLoading = false;
            saveCache();
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.       
            $scope.IsLoading = false;
            SweetAlert.swal({
                title: "Error!",
                text: response.data,
                type: "warning"
            });
        });
    }

    var loadCache = function () {
        if ($localStorage.InvoiceCacheSearchFilter != null) {
            $scope.SearchFilter = $localStorage.InvoiceCacheSearchFilter;
            $scope.Invoices = $localStorage.InvoiceCacheSearchResult;
            $scope.TotalRecords = $localStorage.InvoiceCacheTotalRecords;
        }
    }

    var saveCache = function () {
        $localStorage.InvoiceCacheSearchFilter = $scope.SearchFilter;
        $localStorage.InvoiceCacheSearchResult = $scope.Invoices;
        $localStorage.InvoiceCacheTotalRecords = $scope.TotalRecords;
    }

    $scope.onload = function () {
        loadCache();

        if ($scope.SearchFilter != null && $scope.SearchFilter.PaymentMethods != null) {
            for (var i = 0; i < $scope.SearchFilter.PaymentMethods.length; i++) {
                var paymentMethodId = $scope.SearchFilter.PaymentMethods[i];

                setPaymentMethod(paymentMethodId);
            }
        }

        if ($scope.SearchFilter != null && $scope.SearchFilter.Statuses != null) {
            for (var i = 0; i < $scope.SearchFilter.Statuses.length; i++) {
                var idx = $scope.SearchFilter.Statuses[i];

                $scope.InvoiceStatuses[idx].Checked = true;
            }
        }
    }    

    var setPaymentMethod = function(paymentMethodId)
    {
        for (var i = 0; i < $scope.PaymentMethods.length; i++) {
            var stage = $scope.PaymentMethods[i];
            if (stage.Value === paymentMethodId) {
                stage.Checked = true;
            }
        }
    }

    var updateSearchFilter = function () {
        $scope.SearchFilter.Statuses = [];

        for (var i = 0; i < $scope.InvoiceStatuses.length; i++) {
            var stage = $scope.InvoiceStatuses[i];
            if (stage.Checked) {
                $scope.SearchFilter.Statuses.push(stage.Value);
            }
        }

        $scope.SearchFilter.PaymentMethods = [];

        for (var i = 0; i < $scope.PaymentMethods.length; i++) {
            var stage = $scope.PaymentMethods[i];
            if (stage.Checked) {
                $scope.SearchFilter.PaymentMethods.push(stage.Value);
            }
        }
    }

    $scope.open = function (invoice)
    {
        var modalInstance = $modal.open({
            templateUrl: 'views/projects/invoice.html',
            controller: InvoiceViewCtrl,
            resolve: {
                InvoiceId: function () {
                    return invoice.Id;
                }
            }
        });

        modalInstance.result.then(function () {
            //on ok button press             
        }, function () {
            //on cancel button press
        });
    }

    $scope.search = function () {
        $scope.Invoices = [];
        $scope.SearchFilter.Paging.PageIndex = 0;
        $scope.TotalRecords = 0;
        $scope.IsLoadMore = false;
        updateSearchFilter();
        $scope.searchInvoices($scope.SearchFilter);
    }

    $scope.loadMore = function () {
        $scope.SearchFilter.Paging.PageIndex++;
        $scope.searchInvoices($scope.SearchFilter);
    }

    $scope.InvoiceStatuses = [
        {
            Name: 'NEW',
            Value: 0,
            Checked: false
        },
        {
            Name: 'COMPLETED',
            Value: 1,
            Checked: false
        },
        {
            Name: 'CANCELED',
            Value: 2,
            Checked: false
        },
        {
            Name: 'UNPAID',
            Value: 3,
            Checked: false
        },
        {
            Name: 'EXPIRED',
            Value: 4,
            Checked: false
        },
        {
            Name: 'ASSESSING',
            Value: 5,
            Checked: false
        },
        {
            Name: 'PENDING',
            Value: 6,
            Checked: false
        },
        {
            Name: 'SUSPENDED',
            Value: 7,
            Checked: false
        },
        {
            Name: 'PAUSED',
            Value: 8,
            Checked: false
        },
        {
            Name: 'FAILED_TO_PAY',
            Value: 9,
            Checked: false
        },
    ];

    $scope.PaymentMethods = [
        {
            Name: 'PAYPAL',
            Value: 1,
            Checked: false
        },
        {
            Name: '1PAY',
            Value: 2,
            Checked: false
        },
        {
            Name: 'BANK TRANFER',
            Value: 3,
            Checked: false
        },
        {
            Name: 'CASH ON DELIVERY',
            Value: 5,
            Checked: false
        },
        {
            Name: 'CASH',
            Value: 6,
            Checked: false
        },
        {
            Name: 'OTHER',
            Value: 12,
            Checked: false
        },
    ];
};