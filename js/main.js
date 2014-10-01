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

app.factory('DataHandler', function () {
    return DataHandler;
});

app.controller('IndexController', function () {});

app.controller('TestBeginController', function () {
    
});

app.controller('TestRunController', function ($scope, DataHandler) {
    $scope.data = {
        values: {}
    };
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

    var dataHandler = new DataHandler();

    var onValuesChange = function (values) {
        // update the ui appropriately
        // if values are complete, then save and push user along to results page
        $scope.$apply(function () {
            $scope.data.values = values;
        });
    };

    // connect the data handler to orientation events, and data handler events to controller
    var handler = dataHandler.handleOrientationEvents.bind(dataHandler);
    window.addEventListener('deviceorientation', handler, true);
    dataHandler.addEventListener('valueschange', onValuesChange);

    // remove the connections when the user navigated away from this page
    $scope.$on('$destroy', function () {
        window.removeEventListener('deviceorientation', handler);
        dataHandler.removeEventListener('valueschange', onValuesChange);
    });
});

app.controller('ResultsController', function ($scope) {
    //$scope.results = Storage.getResults();
    $scope.results = [{
        id: 1,
        date: "asd 12, 2014",
        r1: 10
    }, {
        id: 2,
        date: "gfdg 12, 2014",
        r1: 200
    }];
});

app.controller('ResultController', function ($scope) {

    $scope.exportPdf = function () {
        pdfconv();
    }

});

app.controller('ResultSendController', function () {
    
});
