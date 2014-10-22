// Given an input of the DOM element and data, create a graph.
function creategraph(element,data,dates) {
	// Canvas of size 640 x 480 in DOM element "element"
	var r = Raphael(element,640,480),
		txtattr = {font:"20px sans-serif"};
	r.text(340,10,"Tardieu Scale Results").attr(txtattr);
	r.linechart(10,20,630,460,range(1,data.length),data,{axis: "0 0 0 1", symbol: 'circle'}).hoverColumn(function () {
		this.tags = r.set();
		console.log(this.tags);
		for (var i = 0, ii = this.y.length; i < ii; i++) {
			this.tags.push(r.tag(this.x, this.y[i], dates[i], 160, 10).insertBefore(this).attr([{ fill: "#fff" }, { fill: this.attr("fill") }]));
			}
		}, function () {
			this.tags && this.tags.remove();
	});
	// console.log("Graph created");
}

// Used to generate x values (so that the points are spread equally.
function range(start,end) {
    var array = [];
    for (var i = start; i <= end; i++) {
        array.push(i);
    }
    return array;
}
