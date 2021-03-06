'use strict';

function DataHandler() {
    this.keyID = 0;
    this.state = "Starting";
    this.test = "R1";
    this.r1;
    this.r2;
    this.currentAngle;
    this.lastAngle = 0;
    this.startAngle;
    this.endAngle;
    this.scaleNum = 0;
    this.eventCounterGyroscope = 0;
    this.eventCounterAccelerometer = 0;
    this.gyroscope = new Array();
    this.accelerometer = new Array();
    this.startACC;
    this.scaleValue;
    this.eventHandlers = {
        'valueschange': [],
        'statechange': [],
        'finishtest': [],
    };
    this.eventStack = [];
}

DataHandler.prototype.handleOrientationEvents = function (event) {
    var initialState = this.state;
    var x = event.beta; // In degree in the range [-180,180]
    var y = event.gamma; // In degree in the range [-90,90]
    var z = event.alpha;
    var counter = 0;
    this.eventCounterGyroscope = 1

    if (x > 90)
        x = x - 90;
    else if (x < 0)
        x = 0;
    else
        x = 90 - x;

    this.currentAngle = x;
    if (this.state == "Starting") {
        if (x < 6 && x >= 0) {
            this.startAngle = x;
            this.state = "Ready";
            this.sendEvent("statechange");
            if (this.test == "R1") {
                this.eventStack.push("First resting position");
            } else if (this.test == "R2") {
                this.eventStack.push("Second resting position");
            }

        }
    } else if (this.state == "Stopped") {
        this.endAngle = x;
        if (this.test == "R1") {
            this.r1 = this.calculateR1(this.startAngle, this.endAngle);
            this.test = "R2";
            this.state = "Starting";
            this.sendEvent("statechange");
            this.eventStack.push("R1 Calculated");
        } else if (this.test == "R2") {
            this.r2 = this.calculateR2(this.startAngle, this.endAngle);
            this.state = "Done";
            this.sendEvent("statechange");
            this.eventStack.push("R2 Calculated, Test Finished");
            this.keyID = new Date().getTime();
            this.sendEvent("finishtest", {
                'keyID': this.keyID,
                'date': new Date(),
                'state': this.state,
                'orientation': {
                    x: parseInt(x),
                    y: parseInt(y),
                    z: parseInt(z)
                },
                'r1': this.r1,
                'r2': this.r2,
                'a': this.startACC,
                't': this.getScaleValue(),
                'eventStack': this.eventStack
            });
        }
    } else if (this.test == "R2" && this.state == "Moving") {
        if (this.lastAngle > this.currentAngle)
            this.state = "Stopped";
    }


    this.sendEvent('valueschange', {
        'keyID': this.keyID,
        'date': new Date(),
        'state': this.state,
        'orientation': {
            x: parseInt(x),
            y: parseInt(y),
            z: parseInt(z)
        },
        'r1': this.r1,
        'r2': this.r2,
        'a': this.startACC,
        't': this.getScaleValue(),
        'eventStack': this.eventStack
    });
    this.lastAngle = this.currentAngle;
    console.log(this.state);
}

DataHandler.prototype.handleAccelerationEvents = function (event) {
    var acceleration = event.acceleration;
    this.startACC = acceleration.z;
    var acc = Math.abs(acceleration.z);
    if (this.state == "Ready" && acc > 1 && this.test == "R1") {
        this.state = "Moving";
        console.log(this.state);
    }
    else if (this.state == "Moving" && Math.floor(acc) == 0 && this.test == "R1") {
        this.state = "Stopped";
    }
    else if (this.state == "Ready" && this.currentAngle > 6 && this.test == "R2") {
        this.state = "Moving";
    }
}

DataHandler.prototype.addEventListener = function (name, callback)
{
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
    for (var i = 0; i < handlers.length; i++) {
        var handler = handlers[i];
        handler(data);
    }
}

DataHandler.prototype.calculateR1 = DataHandler.prototype.calculateR2 = function (start, end) {
    return Math.abs(end - start);
}

DataHandler.prototype.returnR1 = function () {
    return this.r1;
}

DataHandler.prototype.returnR2 = function () {
    return this.r2;
}

DataHandler.prototype.getState = function () {
    return this.state;
}

DataHandler.prototype.getScaleValue = function () {
    return Math.abs(this.r2 - this.r1);
}
