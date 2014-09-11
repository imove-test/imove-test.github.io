'use strict';

// steal this id generating function from SO, so it isn't done in smaller, stupider places
// http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
function makeid(length) {
    length = length || 6;
    var text = "";
    var corpus = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0 ; i < length ; i++) {
        text += corpus.charAt(Math.floor(Math.random() * corpus.length));
    }

    return text;
}

function Templates() {
    this.templates = {};
    this.handlers = {};
    this.hookups = {};
    this.routes = {};

    this.currentTemplateName = null;
}
Templates.prototype.loadTemplates = function (givenTemplates) {
    var templates = !givenTemplates.length ? [givenTemplates] : givenTemplates;
    for (var i=0 ; i < templates.length ; i++) {
        var template = templates[i];
        this.templates[template.name] = template;
    }
};
Templates.prototype.on = function (name, handlers) {
    this.handlers[name] = handlers;
};
Templates.prototype.goTo = function (name) {
    this.triggerHandler('unload');
    document.location.hash = '!' + this.getPathForTemplateId(name);
};
Templates.prototype.getPathForTemplateId = function (id) {
    for (var path in this.routes) {
        if (this.routes[path] === id) {
            return path;
        }
    }
}
Templates.prototype.triggerHandler = function (name, data) {
    var handlers = this.handlers[this.currentTemplateName];
    if (handlers && handlers[name]) {
        handlers[name](data);
    }
};
Templates.prototype.loadHookups = function () {
    this.hookups = {};
    var thingsWithIds = document.querySelectorAll('[id]');
    var length = thingsWithIds.length;
    while (length--) {
        var thing = thingsWithIds[length];
        this.hookups[thing.id] = thing;
    }
};
Templates.prototype.loadTemplatesFromDOM = function () {
    var tmp = [];
    var elements = document.querySelectorAll('script[type="text/html"]');
    for (var i=0 ; i < elements.length ; i++) {
        var script = elements[i];
        tmp.push({
            name: script.id,
            content: script.innerText
        });
    }
    this.loadTemplates(tmp);
}
Templates.prototype.addRoutes = function (routes) {
    for (var url in routes) {
        var id = routes[url];
        this.routes[url] = id;
    }
}
Templates.prototype.bootUp = function () {
    this.loadTemplatesFromDOM();
    this.installNavigationListener();
    this.onHashChange();
}
Templates.prototype.navigateTo = function (pathname) {
    var templateId = this.getTemplateIdForHash(document.location.hash);
    this.goTo(templateId);
}
Templates.prototype.installNavigationListener = function () {
    window.addEventListener('hashchange', this.onHashChange.bind(this));
}
Templates.prototype.onHashChange = function () {
    var hash = window.location.hash;
    var id = this.getTemplateIdForHash(hash);
    if (!this.templates.hasOwnProperty(id)) {
        id = '404';
    }
    var template = this.templates[id];
    this.currentTemplateName = id;
    document.body.innerHTML = template.content;
    this.loadHookups();
    this.triggerHandler('load');
}
Templates.prototype.getTemplateIdForHash = function (hash) {
    var strippedHash = hash.replace(/^#!/, '') || '/';
    return this.routes[strippedHash];
}

function onDrag(element, handler) {
    var isBeingMoved = false;
    var boundHandler = handler.bind(element);
    var downEvent = null;
    var previousEvent = null;
    element.addEventListener('mousedown', function (event) {
        isBeingMoved = true;
        previousEvent = downEvent = event;
    });
    element.addEventListener('mousemove', function (event) {
        if (!isBeingMoved) {
            return;
        }
        var oldPreviousEvent = previousEvent;
        previousEvent = event;
        boundHandler(event, oldPreviousEvent);
    });
    element.addEventListener('mouseup', onOutOrUp);
    element.addEventListener('mouseleave', onOutOrUp);
    function onOutOrUp() {
        isBeingMoved = false;
    }
}

/**
 * map/reduce partials and array util
 */
function bucket(previousValue, currentValue, index, array) {
    var group = Math.floor(index / array.length * previousValue.length);
    previousValue[group] = previousValue[group] || [];
    previousValue[group].push(currentValue);
    return previousValue;
}

function add(previousValue, currentValue) {
    if (typeof previousValue != 'number') {
        previousValue = previousValue.reduce(add, 0);
    }
    if (typeof currentValue != 'number') {
        currentValue = currentValue.reduce(add, 0);
    }
    return previousValue + currentValue;
};

function count(previousValue, currentValue) {
    return previousValue + 1;
}

function countDeep(previousValue, currentValue) {
    var newValue = 1;
    if (typeof currentValue !== 'number') {
        if (currentValue.reduce) {
            newValue = currentValue.reduce(countDeep, 0);
        } else {
            newValue = currentValue.length || 0;
        }
    }
    return previousValue + newValue;
}

function average(previousValue, currentValue, index, array) {
    return previousValue + currentValue / array.length;
}

function flatten(previousValue, currentValue) {
    return previousValue.concat(currentValue);
}

function flattenDeep(previousValue, currentValue) {
    var newValue = currentValue;
    if (Array.isArray(currentValue)) {
        newValue = currentValue.reduce(flattenDeep, []);
    } else if (currentValue instanceof Float32Array) {
        // specific case to handle audio api output, copy to regular array
        newValue = new Array(currentValue.length);
        for (var i=0 ; i < currentValue.length ; i++) {
            newValue[i] = currentValue[i];
        }
    }
    return previousValue.concat(newValue);
}

function normalize(value, min, max) {
    var normalized = (value - min) / (max - min);
    return normalized;
}
