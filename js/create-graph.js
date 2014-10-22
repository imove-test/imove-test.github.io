// Given an input of the DOM element, data, and dates in a string
// form that can be converted to a Date object, create a graph.
function creategraph(element,data,dates) {
	// Canvas of size 640 x 480 in DOM element "element"
	console.log(datesToInts(dates));
	var r = Raphael(element,640,480),
		txtattr = {font:"20px sans-serif"};
	r.text(340,10,"Tardieu Scale Results").attr(txtattr);
	r.linechart(10,20,630,460,datesToInts(dates),data,{axis: "0 0 0 1", symbol: 'circle'}).hoverColumn(function () {
		this.tags = r.set();
		for (var i = 0, ii = this.y.length; i < ii; i++) {
			this.tags.push(r.tag(this.x, this.y[i], intsToDates(this.values)[i], 160, 10).insertBefore(this).attr([{ fill: "#fff" }, { fill: this.attr("fill") }]));
			}
		}, function () {
			this.tags && this.tags.remove();
	});
	// console.log("Graph created");
}

// Convert array of dates (in string format) to ints.
function datesToInts(dates) {
	var ints = [];
	for (var i = 0; i < dates.length; i++) {
		ints.push(new Date(dates[i]).getTime());
	}
	return ints;
}

// Convert array of dates (in int format) to string.
function intsToDates(ints) {
	var dates = [];
	for (var i = 0; i < ints.length; i++) {
		dates.push(new Date(ints[i]));
	}
	return dates;
}

// Used to generate x values (so that the points are spread equally.
function range(start,end) {
    var array = [];
    for (var i = start; i <= end; i++) {
        array.push(i);
    }
    return array;
}
