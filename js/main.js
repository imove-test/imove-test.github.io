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

app.factory('DataHandler', (function () {
    function DataHandlerFactory() {
    function TemporaryProxyHandler() {}
    TemporaryProxyHandler.prototype.handleEvent = function (event) {
        console.log(event);
    };
    TemporaryProxyHandler.prototype.addEventListener = function (eventName, handler) {};
    var handler = new TemporaryProxyHandler();
    return handler;
}}());

app.controller('IndexController', function () {});

app.controller('TestBeginController', function () {
    
});

app.controller('TestRunController', function ($scope, DataHandler) {
    var dataHandler = new DataHandler();
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

    tardieuOrientationDataHandler.addEventListener('valueschange', function (tardieuValues) {
        // update the ui appropriately
        // if values are complete, then save and push user along to results page
    });

    // connect the data handler to orientation events
    var deviceOrientationHandler = tardieuOrientationDataHandler.handleEvent.bind(tardieuOrientationDataHandler);
    window.addEventListener('deviceorientation', dataHandler.HandleIncomingGyroscopeEvents, true);
    if (window.DeviceMotionEvent) {
        console.log("DeviceMotion");
        window.addEventListener('devicemotion', dataHandler.HandleIncomingAccelerometerEvents, false);
    }


    // remove the connection when the user navigated away from this page
    $scope.$on('$destroy', function () {
        window.removeEventListener('deviceorientation', deviceOrientationHandler);
    });
});

app.controller('ResultsController', function() {
    
});

app.controller('ResultController', function ($scope) {

    $scope.exportPdf = function () {
        pdfconv();
    }

});

app.controller('ResultSendController', function () {
    
});
