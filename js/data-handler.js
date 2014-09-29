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
	    if (z > 88 && z < 92) {
	        this.startAngle = z;
	        this.state = "Ready";
		}
	} else if (this.state == "Ready") {
	    if (z < 88) {
	        this.state = "Starting";
	        this.r1 = -1;
	    }
	} else if (this.state == "Stopped") {
	    this.endAngle = z;
		if (this.test == "R1") {
			this.r1 = this.calculateR1(startAngle, endAngle);
        } else if (this.Test == "R2") {
			this.r2 = this.calculateR2(startAngle, endAngle);
        }
	} else {
		if (z > 89.5 && z < 90.5) {
		    this.gyroscope[this.eventCounterGyroscope] = x;
		    if (this.eventCounterGyroscope > 10) {
		        this.state = "Starting";
		        this.test = "R2";
		        this.eventCounterGyroscope = 0;
			}
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
    });
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

DataHandler.prototype.calculateR1 = function (start, end) {
    return start - end;
}

DataHandler.prototype.calculateR2 =	function (start, end) {
    return start - end;
}

DataHandler.prototype.returnR1 = function () {
    return this.r1;
}

DataHandler.prototype.returnR2 = function () {
    return this.r2;
}
