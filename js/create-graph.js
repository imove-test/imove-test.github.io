// Given an input of the DOM element and data, create a graph.
function creategraph(element,data) {
	// Canvas of size 640 x 480 in DOM element "element"
	var r = Raphael(element,640,480),
		txtattr = {font:"20px sans-serif"};
	r.text(340,10,"Results").attr(txtattr);
	r.linechart(0,20,640,460,range(1,data.length),data);
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
