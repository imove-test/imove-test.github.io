'use strict';

var templates = new Templates();

callbacks.onDOMReady.push(function () {
    templates.loadTemplatesFromDOM();
    templates.goTo('index');
});

templates.on('index', (function () {
    var handlers = {
        load: function () {
            var slogan = templates.hookups['slogan'];
            slogan.innerText = 'Test your arm mobility.';
            slogan.addEventListener('click', sloganClick);
        }, unload: function () {}
    };
    return handlers;
    function sloganClick() {
        alert('Proof of concept? Proven!');
    }
})());

