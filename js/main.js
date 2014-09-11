'use strict';

var templates = new Templates();

templates.addRoutes({
    '/': 'index',
    '/test/begin': 'beginTest',
    '/test/run': 'test'
});

templates.on('index', (function () {
    var handlers = {
        load: function () {
            var startButton = templates.hookups['startTest'];
            startButton.addEventListener('click', startTest);
        }, unload: function () {}
    };
    return handlers;
    function startTest() {
        templates.goTo('beginTest');
    }
})());

templates.on('beginTest', (function () {
    var handlers = {
        load: function () {
            var readiedButton = templates.hookups['doneStrappingIn'];
            readiedButton.addEventListener('click', readied);
        }, unload: function () {}
    };
    return handlers;
    function readied() {
        templates.goTo('test');
    }
})());

templates.on('test', (function () {
    var handlers = {
        load: function () {
            // initialize the orientation event listener
            // start pumping data into it
            // update the ui to indicate the step the user is at
        }, unload: function () {}
    };
    return handlers;
})());

document.addEventListener('DOMContentLoaded', function () {
    templates.bootUp();
});
