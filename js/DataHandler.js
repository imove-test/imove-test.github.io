
function DataHandler() {
	this.Gyroscope = new Array();
	this.Accelerometer =  new Array();

	this.State = "Starting";
	this.test = "R1"
	this.R1;
	this.R2;
	this.StartAngle;
	this.EndAngle;
	this.eventCounterGyroscope = 0;
	this.eventCounterAccelerometer = 0;
}

DataHandler.prototype.HandleIncomingGyroscopeEvents = function (GyroscopeEvent){
		
		if(State == "Starting")
		{
			if(GyroscopeEvent  > 89.5 && GyroscopeEvent < 90.5 && Gyroscope.length <= 10)
			{
				Gyroscope[eventCounterGyroscope] = GyroscopeEvent;
			}
		}
		else if(State =="Stopped")
		{
			Gyroscope[eventCounterGyroscope] = GyroscopeEvent;
			eventCounterGyroscope++;
			if(eventCounterGyroscope > 10)
			{
				endAngle = this.GetAverage(Gyroscope);
				if(test == "R1")
					R1 = this.CalculateR1(startAngle, endAngle);
				else if (test == "R2")
					R2 = this.CalculateR2(startAngle, endAngle);
					
			}
		}
		else
		{
			if(GyroscopeEvent  > 89.5 && GyroscopeEvent < 90.5)
			{
				Gyroscope[eventCounterGyroscope] = GyroscopeEvent;
				if(eventCounterGyroscope > 10)
				{
					state = "Starting"
					test = "R2"
					eventCounterGyroscope = 0;
				}
			}
		}
}


DataHandler.prototype.HandleIncomingAccelerometerEvents = function (AccelerometerEvent){
		if(State == "Starting" && AccelerometerEvent > 0.05)
		{
			Accelerometer[eventCounterAccelerometer] = AccelerometerEvent;
			eventCounterAccelerometer++;
			if(Accelerometer.length > 10)
			{
				State = "Moving";
				eventCounterAccelerometer = 0;
				StartAngle = GetAverage(Gyroscope);
			}
		}
		else if(State == "Moving")
		{
			if(AccelerometerEvent < 0.05)
			{
				Accelerometer[eventCounterAccelerometer] = AccelerometerEvent
				if(Accelerometer.length > 10)
					State = "Stopped";
			}
		}
}


	
	
	

DataHandler.prototype.GetAverage = 	function(someArray){
		var sum;
		for(var i = 0; i < someArray.length; i++)
		{
			sum += someArray[i];
		}
		return sum/someArray.lenght;
}

	
DataHandler.prototype.CalculateR1 = function(start, end){
		return start-end;
}

	
DataHandler.prototype.CalculateR2 =	function(start, end){
		return start-end;
}

console.log("Hello");
