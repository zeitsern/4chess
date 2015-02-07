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
			$('#box' + i).css("backgroundColor", "black");
			$('#box' + i).html(".");
		}
		loc[i%14][i/14] = i%14 + "," + parseInt(i/14);
		piece[i%14][i/14] = "0";
		$('#box' + i).html(i + "=" + piece[i%14][i/14] + "<br />" + loc[i%14][i/14]);
	}
	piece = [
	[0, 0, 0, 2, 3, 4, 6, 5, 4, 3, 2, 0, 0, 0],
	[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
	[3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3],
	[4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4],
	[6, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5],
	[5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 6],
	[4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4],
	[3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3],
	[2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
	[0, 0, 0, 2, 3, 4, 5, 6, 4, 3, 2, 0, 0, 0]
	];
	
	for(i=0; i<196; i++)
	{
		$("#box" + i).click(createCallback(i));
	}
	
	for(i=0; i<196; i=i+14) {
		$('#box' + i).css( "border-left", "1px solid black");
	}
	for(i=0; i<14; i++) {
		$('#box' + i).css( "border-top", "1px solid black");
	}
	for(i = 0; i < 196; i++) {
		$('#box' + i).html(i + "=" + piece[i%14][parseInt(i/14)] + "<br />" + loc[i%14][i/14]);
		if(((i%14 < 3 || i%14 > 10) && i < 42) || ((i%14 < 3 || i%14 > 10) && i > 153))
		{
			$('#box' + i).css("backgroundColor", "black");
			$('#box' + i).html(".");
		}
	}
});

function createCallback( i ){
  return function(){
    $("#box" + i).css("backgroundColor", "yellow");
  }
}