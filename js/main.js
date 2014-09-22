'use strict';

var app = angular.module('imove', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/index.html',
        controller: 'IndexController'
    }).when('/test/begin', {
        templateUrl: 'partials/test/begin.html',
        controller: 'TestBeginController'
    }).when('/test/run', {
        templateUrl: 'partials/test/run.html',
        controller: 'TestRunController'
    }).when('/results', {
        templateUrl: 'partials/results.html',
        controller: 'ResultsController'
    }).when('/results/:id', {
        templateUrl: 'partials/result.html',
        controller: 'ResultController'
    });
});

app.factory('tardieuOrientationDataHandler', function tardieuOrientationDataHandlerFactory() {
    function TemporaryProxyHandler() {}
    TemporaryProxyHandler.prototype.handleEvent = function (event) {
        console.log(event);
    };
    TemporaryProxyHandler.prototype.addEventListener = function (eventName, handler) {};
    var handler = new TemporaryProxyHandler();
    return handler;
});

app.controller('IndexController', function () {});

app.controller('TestBeginController', function () {
    
});

app.controller('TestRunController', function ($scope, tardieuOrientationDataHandler) {
    $scope.steps = [{
        'text': 'With you elbow at 90 degrees, point up',
        'state': ''
    }, {
        'text': 'Quickly rotate your forearm down',
        'state': ''
    }, {
        'text': 'Done',
        'state': ''
    }];

    var deviceOrientationHandler = tardieuOrientationDataHandler.handleEvent.bind(tardieuOrientationDataHandler);
    tardieuOrientationDataHandler.onTardieuStateChange(function (tardieuValues) {
        // update the ui appropriately
        // if values are complete, then save and push user along to results page
    });
    window.addEventListener('deviceorientation', deviceOrientationHandler);
    $scope.$on('$destroy', function () {
        window.removeEventListener('deviceorientation', deviceOrientationHandler);
    });

    $scope.greeting = "Hi!";
});

app.controller('ResultsController', function() {
    
});

app.controller('ResultController', function () {
    
});

app.controller('ResultSendController', function () {
    
});
