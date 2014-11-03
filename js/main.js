'use strict';

var app = angular.module('imove', ['ngRoute', 'angular.directives-round-progress']);

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

app.controller('TestRunController', function ($scope, DataHandler, $location) {
    var stateCount = 0;
    $scope.percent = 0;
    $scope.data = {
        values: {}
    };

    $scope.progressWheel = {
        label: '',
        percentage: 0
    };

    $scope.steps = [{
        'text': 'Move (appendage) to resting position.',
        'state': 'Current'
    }, {
        'text': 'Quickly rotate your (appendage) down as far as possible',
        'state': ''
    }, {
        'text': 'Move (appendage) to resting position',
        'state': ''
    }, {
        'text': 'Slowly rotate your (appendage) down as far as possible',
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
            if($scope.data.values.orientation.x >= 0) {
                $scope.progressWheel = {
                    label: $scope.data.values.orientation.x,
                    percentage: $scope.data.values.orientation.x/100
              }
            }
        });
    };

    var onStateChange = function () {
        // update status bar when new a new step has been completed
        $scope.$apply(function () {
            $scope.percent = (($scope.data.values.eventStack.length + 1) / 4) * 100;
        });
        $scope.steps[stateCount]['state'] = 'Done';
        stateCount++;
        $scope.steps[stateCount]['state'] = 'Current'
    }

    var finishTest = function (values) {
        // store test results
        // navigate to results page
        Store.getInstance().setJSONEntry(values.keyID, values);
        $location.url('results/');
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
    $scope.$on('$destroy', function () {
        window.removeEventListener('deviceorientation', handler);
        dataHandler.removeEventListener('valueschange', onValuesChange);
        dataHandler.removeEventListener('statechange', onStateChange);
        dataHandler.removeEventListener('finishtest', finishTest);
    });
});

app.controller('ResultsController', function ($scope) {

    $scope.results = Store.getInstance().getAllEntries();
    
    $scope.genDebugTest = function () {
        var debugTest1 = {
            'keyID': 1234,
            'date': new Date(),
            'state': 0,
            'orientation': {
                x: parseInt(0),
                y: parseInt(0),
                z: parseInt(0)
            },
            'r1': 1.0,
            'r2': 1.0,
            'a': 0,
            'eventStack': 0
        };
        var debugTest2 = {
            'keyID': 1235,
            'date': new Date(),
            'state': 0,
            'orientation': {
                x: parseInt(0),
                y: parseInt(0),
                z: parseInt(0)
            },
            'r1': 2.0,
            'r2': 2.0,
            'a': 0,
            'eventStack': 0
        };        
        Store.getInstance().setJSONEntry(debugTest1.keyID, debugTest1);
        Store.getInstance().setJSONEntry(debugTest2.keyID, debugTest2);
    }
});

app.controller('ResultController', function ($scope, $routeParams) {

    $scope.result = Store.getInstance().getJSONEntry($routeParams.id);

    $scope.exportPdf = function () {
        pdfconv();
    }

});

app.controller('ResultSendController', function () {

});
