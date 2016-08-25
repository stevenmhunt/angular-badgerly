/*****************************
 * Angular Badgerly
 * Written by Steven Hunt
 * MIT License
 *****************************/

(function (root) {

    /**
     * Handles registration of the directive to the given module.
     * @param ngModule The Angular module instance to register the directive to.
     */
    function register(ngModule) {

        if (!ngModule) {
            throw 'The given Angular module must not be null!';
        }
        if (!ngModule.directive || typeof ngModule.directive !== 'function') {
            throw 'Expected directive to be a function!';
        }

        // register the directive.
        ngModule.directive('badgerly', function () {
            return {
                restrict: 'EA',
                scope: {
                    color: '@',
                    size: '@',
                    shape: '@',
                    ribbon: '@',
                    type: '@',
                    border: '@'
                },
                transclude: true,
                template: '<div class="badge {{size}}">'+
                '<div ng-show="type === \'lanyard\'" class="lanyard">'+
                '<div class="ribbon left {{ribbon}}"></div>'+
                '<div class="ribbon right {{ribbon}}"></div>'+
                '</div>'+
                '<div ng-show="type !== \'lanyard\'" class="ribbon {{ribbon}}">'+
                '</div>'+
                '<div class="{{shape}} {{color}}{{ (border === \'yes\' ? \' border\' : \'\') }}" ng-transclude>'+
                '</div>'+
                '</div>'
            }
        });
    }

    // check for RequireJS
    if(typeof define === "function" && define.amd) {
        define(["angular-badgerly"], register);
    }
    // check for CommonJS
    else if(typeof module === "object" && module.exports) {
        module.exports = register;
    }
    // we're in an ordinary browser apparently.
    else {
        root.badgerly = register;
    }
})(window);