

var State = "Starting";
var Test = "R1"
var R1;
var R2;
var startAngle;
var endAngle;
var eventCounterGyroscope = 0;
var eventCounterAccelerometer = 0;
var Gyroscope = new Array();
var Accelerometer = new Array();
var startACC;

function DataHandler() {
}

DataHandler.prototype.Initialize = function()
{
    
}

DataHandler.prototype.HandleIncomingGyroscopeEvents = function (event) {

    var x = event.beta;  // In degree in the range [-180,180]
    var y = event.gamma; // In degree in the range [-90,90]
    var z = event.alpha; 
    console.log( "x: " + x + "\n");
    console.log("y: " + y + "\n");
    console.log("z: " + z + "\n");
    console.log("State: " + State);
    
    var Counter = 0;


	if(State == "Starting")
	{
	    if (z > 88 && z < 92)
		{
	        console.log("Start Test");
	        startAngle = z;
	        State = "Ready";
		}
	}
	else if(State == "Ready")
	{
	    if(z < 88)
	    {
	        console.log("Wrong Direction");
	        State = "Starting";
	        R1 = -1;
	    }
	}
	else if (State == "Stopped")
	{
	    endAngle = z;
		if(Test == "R1")
			R1 = endAngle - startAngle;
		else if (Test == "R2")
			R2 = endAngle - startAngle;
	}
	else
	{
		if(z  > 89.5 && z < 90.5)
		{
		    this.Gyroscope[eventCounterGyroscope] = x;
		    if (this.eventCounterGyroscope > 10)
			{
		        State = "Starting"
		        this.Test = "R2"
		        this.eventCounterGyroscope = 0;
			}
		}
	}

}


DataHandler.prototype.HandleIncomingAccelerometerEvents = function (AccelerometerEvent) {
    
    acceleration = AccelerometerEvent.accelerationIncludingGravity;
    console.log(acceleration);
    if (State == "Ready" && acceleration.y  < 9.8)
	{
        State = "Moving";
        startACC = acceleration.y;
	}
	else if(State == "Moving")
	{
	    Accelerometer[eventCounterAccelerometer] = AccelerometerEvent.acceleration.y;
	    eventCounterAccelerometer++;
	    if (eventCounterAccelerometer > 1)
	    {
	        eventCounterAccelerometer = 0;
	    }
	    if (Accelerometer.length > 0 && Accelerometer[0] == Accelerometer[1])
		{
			State = "Stopped";
		}
	}
    console.log(State);
}


	
DataHandler.prototype.CalculateR1 = function(start, end){
		return start-end;
}

	
DataHandler.prototype.CalculateR2 =	function(start, end){
		return start-end;
}

DataHandler.prototype.ReturnR1 = function()
{
    return R1;
}

DataHandler.prototype.ReturnR2 = function () {
    return R2;
}
