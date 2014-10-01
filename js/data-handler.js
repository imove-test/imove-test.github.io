'use strict';

function DataHandler() {
    this.state = "Starting";
    this.test = "R1";
    this.r1;
    this.r2;
    this.startAngle;
    this.endAngle;
    this.eventCounterGyroscope = 0;
    this.eventCounterAccelerometer = 0;
    this.gyroscope = new Array();
    this.accelerometer = new Array();
    this.startACC;
    this.eventHandlers = {
        'valueschange': []
    };
}

DataHandler.prototype.handleOrientationEvents = function (event) {
    var initialState = this.state;
    var x = event.beta;  // In degree in the range [-180,180]
    var y = event.gamma; // In degree in the range [-90,90]
    var z = event.alpha;

    var counter = 0;

	if (this.state == "Starting") {
	    if (x > 88 && x < 92) {
	        this.startAngle = x;
	        this.state = "Ready";
		}
	} else if (this.state == "Ready") {
	} else if (this.state == "Stopped") {
	    this.endAngle = x;
	    if (this.test == "R1") {
	        this.r1 = this.calculateR1(this.startAngle, this.endAngle);
	        this.test = "R2";
	        this.state = "Starting";
	    } else if (this.test == "R2") {
	        this.r2 = this.calculateR2(this.startAngle, this.endAngle);
	        this.state = "Done";
	    }
	}

    this.sendEvent('valueschange', {
        'state': this.state,
        'orientation': {
            x: parseInt(x),
            y: parseInt(y),
            z: parseInt(z)
        },
        'r1': this.r1,
        'r2': this.r2,
        'a': this.startACC,
    });
}

DataHandler.prototype.handleAccelerationEvents = function (event) {
    var acceleration = event.acceleration;
    this.startACC = acceleration.z;
    if (this.state == "Ready" && acceleration.z > 1) {
        this.state = "Moving";
    }
    if (this.state == "Moving" && acceleration.z < 0.2) {
        this.state = "Stopped";
    }
}

DataHandler.prototype.addEventListener = function (name, callback) {
    this.eventHandlers[name].push(callback);
}

DataHandler.prototype.removeEventListener = function (name, callback) {
    var list = this.eventHandlers[name];
    var index = list.indexOf(callback);
    if (index >= 0) {
        list.splice(index, 1);
    }
}

DataHandler.prototype.sendEvent = function (name, data) {
    var handlers = this.eventHandlers[name];
    if (!handlers) {
        return;
    }
    for (var i = 0 ; i < handlers.length ; i++) {
        var handler = handlers[i];
        handler(data);
    }
}

DataHandler.prototype.calculateR1 = DataHandler.prototype.calculateR2 = function (start, end) {
    return Math.abs(start - end);
}

DataHandler.prototype.returnR1 = function () {
    return this.r1;
}

DataHandler.prototype.returnR2 = function () {
    return this.r2;
}
