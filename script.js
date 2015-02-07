var loc = new Array(14);
var piece = new Array(14);
for(i=0; i<14; i++)
{
	loc[i] = new Array(14);
	piece[i] = new Array(14);
}

$(document).ready(function() {
	for(i = 0; i < 196; i++) {
		$('#container').append('<div id="box"><div id="box' + i + '">' + i + '</div></div>');
		$('#box' + i).css( "width", "40px");
		$('#box' + i).css( "height", "40px");
		if(((i%14 < 3 || i%14 > 10) && i < 42) || ((i%14 < 3 || i%14 > 10) && i > 153))
		{
			$('#box' + i).css("backgroundColor", "green");
		}
		loc[i%14, i/14] = i%14 + "," + parseInt(i/14);
		piece[i%14, i/14] = "0";
		$('#box' + i).html(i + "=" + piece[i%14, i/14] + "<br />" + loc[i%14, i/14]);
	}
	for(i=0; i<196; i=i+14) {
		$('#box' + i).css( "border-left", "1px solid black");
	}
	for(i=0; i<14; i++) {
		$('#box' + i).css( "border-top", "1px solid black");
	}
});