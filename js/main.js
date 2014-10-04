'use strict';

var app = angular.module('imove', ['ngRoute']);

app.config(function($routeProvider) {
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

app.factory('DataHandler', function() {
    return DataHandler;
});

app.controller('IndexController', function() {});

app.controller('TestBeginController', function() {

});

app.controller('TestRunController', function($scope, DataHandler, $location) {
    $scope.percent = 0;
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

    var onValuesChange = function(values) {
        // update the ui appropriately
        // if values are complete, then save and push user along to results page
        $scope.$apply(function() {
            $scope.data.values = values;
        });
    };

    var onStateChange = function() {
        // update status bar when new a new step has been completed
        $scope.$apply(function() {
            $scope.percent = (($scope.data.values.eventStack.length + 1) / 4) * 100;
        });
    }

    var finishTest = function(values) {
        // store test results
        // navigate to results page
        Store.getInstance().setJSONEntry(values.keyID, values);
        $location.url('results/1');
    }

    // connect the data handler to orientation events, and data handler events to controller
    var handler = dataHandler.handleOrientationEvents.bind(dataHandler);
    var acchandler = dataHandler.handleAccelerationEvents.bind(dataHandler);
    window.addEventListener('deviceorientation', handler, true);
    window.addEventListener('devicemotion', acchandler, true);
    dataHandler.addEventListener('valueschange', onValuesChange);
    dataHandler.addEventListener('statechange', onStateChange);
    dataHandler.addEventListener('finishtest', finishTest);

    // remove the connections when the user navigated away from this page
    $scope.$on('$destroy', function() {
        window.removeEventListener('deviceorientation', handler);
        dataHandler.removeEventListener('valueschange', onValuesChange);
        dataHandler.removeEventListener('statechange', onStateChange);
        dataHandler.removeEventListener('finishtest', finishTest);
    });
});

app.controller('ResultsController', function($scope) {

    $scope.results = Store.getInstance().getAllEntries();
    
});

app.controller('ResultController', function($scope) {

    $scope.exportPdf = function() {
        pdfconv();
    }

});

app.controller('ResultSendController', function() {

});
