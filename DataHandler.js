
function DataHandler() {
	var Gyroscope = new Array();
	var Accelerometer =  new Array();

	var State = "Starting";
	var test = "R1"
	var R1;
	var R2;
	var StartAngle;
	var EndAngle;
	var eventCounterGyroscope = 0;
	var eventCounterAccelerometer = 0;


	function HandleIncomingGyroscopeEvents(GyroscopeEvent)
	{
		
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
				endAngle = GetAverage(Gyroscope);
				if(test == "R1")
					R1 = CalculateR1(startAngle, endAngle);
				else if (test == "R2")
					R2 =  CalculateR2(startAngle, endAngle);
					
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
	};
	
	function HandleIncomingAccelerometerEvents(AccelerometerEvent)
	{
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
	};

	function GetAverage(someArray)
	{
		var sum;
		for(var i = 0; i < someArray.length; i++)
		{
			sum += someArray[i];
		}
		return sum/someArray.lenght;
	};
	
	function CalculateR1(start, end)
	{
		return start-end;
	};
	
	function CalculateR2(start, end)
	{
		return start-end;
	};
};