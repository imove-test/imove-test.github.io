'use strict';

function DataHandler() {
    this.State = "Starting";
    this.Test = "R1";
    this.R1;
    this.R2;
    this.startAngle;
    this.endAngle;
    this.eventCounterGyroscope = 0;
    this.eventCounterAccelerometer = 0;
    this.Gyroscope = new Array();
    this.Accelerometer = new Array();
    this.startACC;
}

DataHandler.prototype.HandleIncomingGyroscopeEvents = function (event) {
    var x = event.beta;  // In degree in the range [-180,180]
    var y = event.gamma; // In degree in the range [-90,90]
    var z = event.alpha; 
    console.log("x: " + x + "\n");
    console.log("y: " + y + "\n");
    console.log("z: " + z + "\n");
    console.log("State: " + State);

    var Counter = 0;

	if (this.State == "Starting") {
	    if (z > 88 && z < 92) {
	        console.log("Start Test");
	        this.startAngle = z;
	        this.State = "Ready";
		}
	} else if (this.State == "Ready") {
	    if (z < 88) {
	        console.log("Wrong Direction");
	        this.State = "Starting";
	        this.R1 = -1;
	    }
	} else if (this.State == "Stopped") {
	    this.endAngle = z;
		if (this.Test == "R1") {
			this.R1 = endAngle - startAngle;
        } else if (this.Test == "R2") {
			this.R2 = endAngle - startAngle;
        }
	} else {
		if (z  > 89.5 && z < 90.5) {
		    this.Gyroscope[eventCounterGyroscope] = x;
		    if (this.eventCounterGyroscope > 10) {
		        this.State = "Starting";
		        this.Test = "R2";
		        this.eventCounterGyroscope = 0;
			}
		}
	}

}


DataHandler.prototype.HandleIncomingAccelerometerEvents = function (AccelerometerEvent) {
    var acceleration = AccelerometerEvent.accelerationIncludingGravity;
    console.log(acceleration);
    if (this.State == "Ready" && acceleration.y  < 9.8) {
        this.State = "Moving";
        this.startACC = acceleration.y;
	} else if (State == "Moving") {
	    this.Accelerometer[eventCounterAccelerometer] = AccelerometerEvent.acceleration.y;
	    this.eventCounterAccelerometer++;
	    if (this.eventCounterAccelerometer > 1) {
	        this.eventCounterAccelerometer = 0;
	    }
	    if (Accelerometer.length > 0 && Accelerometer[0] == Accelerometer[1]) {
			this.State = "Stopped";
		}
	}
    console.log(State);
}


DataHandler.prototype.CalculateR1 = function (start, end) {
    return start - end;
}

DataHandler.prototype.CalculateR2 =	function (start, end) {
    return start - end;
}

DataHandler.prototype.ReturnR1 = function () {
    return this.R1;
}

DataHandler.prototype.ReturnR2 = function () {
    return this.R2;
}
