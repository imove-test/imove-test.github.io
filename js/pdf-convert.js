function pdfconv() {
	var table = tableToJson($('#table').get(0));
	var doc = new jsPDF('p','pt','a4',true);
	var element = document.getElementById('render');
	doc.fromHTML(element, 15, 15, {'width': 170});
	doc.cellInitialize();
	$.each(table, function (i, row){
  		$.each(row, function (j, cell){
    			doc.cell(10, 200, 100, 20, cell, i);
  		})
	})
	doc.save();
	doc.output('dataurlnewwindow');
}

function tableToJson(table) {
    var data = [];

    // first row needs to be headers
    var headers = [];
    for (var i=0; i<table.rows[0].cells.length; i++) {
        headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
    }

    // go through cells
    for (var i=1; i<table.rows.length; i++) {

        var tableRow = table.rows[i];
        var rowData = {};

        for (var j=0; j<tableRow.cells.length; j++) {

            rowData[ headers[j] ] = tableRow.cells[j].innerHTML;

        }

        data.push(rowData);
    }       

    return data;
}
