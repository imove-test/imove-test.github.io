function pdfconv() {
	var doc = new jsPDF();
	var specialElementHandlers = {
		'#ignorePDF': function(element,renderer) {
			return true;
		}
	};
	
	// Render section with id="render"
	doc.fromHTML($('#render').get(0),
		15,		// x coord
		15,		// y coord
		{
			'width': 170, // max width of contents
			'elementHandlers': specialElementHandlers
		});
	
	doc.output('dataurlnewwindow');
}
