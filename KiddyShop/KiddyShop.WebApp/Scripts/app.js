/**
 * INSPINIA - Responsive Admin Theme
 *
 */
(function () {
    angular.module('inspinia', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'pascalprecht.translate',       // Angular Translate
        'ngIdle',                       // Idle timer
        'ngSanitize',                    // ngSanitize
        'ngMaterial',
        'googlechart',
        'oitozero.ngSweetAlert',
        'angularSpinners',
        'angular-timeago',
        'ngStorage',
        'ngDraggable',
        'datePicker',
        'ImageCropper',
        'ngAutoSave',
        'isoCurrency',
        'vcRecaptcha'
    ])
})();

// Other libraries are loaded dynamically in the config.js file using the library ocLazyLoad