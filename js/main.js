'use strict';

var app = angular.module('imove', []);

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
    }).when('/result/:id', {
        templateUrl: 'partials/result.html',
        controller: 'ResultController'
    });
});

app.controller('IndexController', function () {});

app.controller('TestBeginController', function () {
    
});

app.controller('TestRunController', function () {
    
});

app.controller('ResultsController', function () {
    
});

app.controller('ResultController', function () {
    
});

app.controller('ResultSendController', function () {
    
});
