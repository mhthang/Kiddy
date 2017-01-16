angular.module('ngAutoSave', [])
  .directive('autoSave', function ($timeout) {
        return {
            restrict: 'A',
            require: ['^form'],
            link: function ($scope, $element, $attrs, $ctrls) {
                var $formCtrl = $ctrls[0];
                var savePromise = null;
                var expression = $attrs.autoSave || 'true';

                $scope.$watch(function () {

                    if ($formCtrl.$valid && $formCtrl.$dirty) {

                        if (savePromise) {
                            $timeout.cancel(savePromise);
                        }

                        savePromise = $timeout(function () {

                            savePromise = null;

                            // Still valid?

                            if ($formCtrl.$valid) {

                                if ($scope.$eval(expression) !== false) {
                                    //console.log('Form data persisted -- setting prestine flag');
                                    $formCtrl.$setPristine();
                                }

                            }

                        }, 800);
                    }
                });// watch
            }// link
        }// return
    });
