var piece = new Array(196);
var lights = new Array(190);
var turn = 0; //4 players: 0,1,2,3
var selecting = 0;
var currentPiece = 0;
var oldi = 0;
for(i=0; i<14; i++)
{
	piece[i] = new Array(14);
}

$(document).ready(function() {
	var turn = 0; //4 players: 0,1,2,3
	var selecting = 0;
	var currentPiece = 0;
	piece = [0, 0, 0, 2, 3, 4, 6, 5, 4, 3, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 6, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 6, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 3, 4, 5, 6, 4, 3, 2, 0, 0, 0];

	for(i = 0; i < 196; i++) {
		$('#container').append('<div id="box"><div id="box' + i + '">' + i + '</div></div>');
		$('#box' + i).css( "width", "40px");
		$('#box' + i).css( "height", "40px");
		if(((i%14 < 3 || i%14 > 10) && i < 42) || ((i%14 < 3 || i%14 > 10) && i > 153))
		{
			$('#box' + i).css("backgroundColor", "black");
			$('#box' + i).html("<br \>");
		}
		$('#box' + i).html(i + "<br />" + piece[i]);
	}
	for(i=0; i<196; i++)
	{
		$("#box" + i).click(boxSelected(i));
	}
	
	for(i=0; i<196; i=i+14) {
		$('#box' + i).css( "border-left", "1px solid black");
	}
	for(i=0; i<14; i++) {
		$('#box' + i).css( "border-top", "1px solid black");
	}
	for(i = 0; i < 196; i++) {
		if(((i%14 < 3 || i%14 > 10) && i < 42) || ((i%14 < 3 || i%14 > 10) && i > 153))
		{
			$('#box' + i).css("backgroundColor", "black");
			$('#box' + i).html(".");
		}
	}
});

function boxSelected( i ){
  return function(){
	if(turn < 5 && selecting == 0 && piece[i] != 0) //turn < 5 for now, anyone can play as anyone.
	{
		$("#box" + i).css("backgroundColor", "orange");
		currentPiece = piece[i];
		oldi = i;
		selecting = 1;
		lightPossibles( i );
	}
	else if(turn < 4 && selecting == 1)
	{
		piece[oldi] = 0;
		piece[i] = currentPiece;
		$('#box' + oldi).html(oldi + "<br />0"); //Reset original piece
		$('#box' + i).html(i + "<br />" + currentPiece);
		$("#box" + oldi).css("backgroundColor", "initial");
		undoLights();
		selecting = 0;
		turn ++;
	
	if(turn > 3){turn=0;}
	}
  }
}

function lightPossibles( i ){
	var c = 0;
	if( piece[i] == 1)
	{
		$("#box" + (i-14)).css("backgroundColor", "yellow");
		lights[0] = i-14;
		if(i>170 && i<179)
		{
			$("#box" + (i-28)).css("backgroundColor", "yellow");
			lights[1] = i-28;
		}
	}
	if( piece[i] == 2)
	{
		for(c=1;c<14;c++)
		{
			if( piece[i+c] == 0 )
			{
				$("#box" + (i+c)).css("backgroundColor", "yellow");
				lights.push(i+c);
			}
			else
			{
				$("#box" + (i+c)).css("backgroundColor", "yellow");
				lights.push(i+c);
				break;
			}
		}
		for(c=1;c<14;c++)
		{
			if( piece[i-c] == 0 )
			{
				$("#box" + (i-c)).css("backgroundColor", "yellow");
				lights.push(i-c);
			}
			else
			{
				$("#box" + (i-c)).css("backgroundColor", "yellow");
				lights.push(i-c);
				break;
			}
		}
		for(c=1;c<14;c++)
		{
			if( piece[i+(14*c)] == 0 )
			{
				$("#box" + (i+(14*c))).css("backgroundColor", "yellow");
				lights.push(i+(14*c));
			}
			else
			{
				$("#box" + (i+(14*c))).css("backgroundColor", "yellow");
				lights.push(i+(14*c));
				break;
			}
		}
		for(c=1;c<14;c++)
		{
			if( piece[i-(14*c)] == 0 )
			{
				$("#box" + (i-(14*c))).css("backgroundColor", "yellow");
				lights.push(i-(14*c));
			}
			else
			{
				$("#box" + (i-(14*c))).css("backgroundColor", "yellow");
				lights.push(i-(14*c));
				break;
			}
		}
	}
	if( piece[i] == 3)
	{
		for(c=1;c<14;c++)
		{
			if( piece[i+(14*c)+c] == 0 )
			{
				$("#box" + (i+(14*c)+c)).css("backgroundColor", "yellow");
				lights.push(i+(14*c)+c);
			}
			else
			{
				$("#box" + (i+(14*c)+c)).css("backgroundColor", "yellow");
				lights.push(i+(14*c)+c);
				break;
			}
		}
		for(c=1;c<14;c++)
		{
			if( piece[i+(14*c)-c] == 0 )
			{
				$("#box" + (i+(14*c)-c)).css("backgroundColor", "yellow");
				lights.push(i+(14*c)-c);
			}
			else
			{
				$("#box" + (i+(14*c)-c)).css("backgroundColor", "yellow");
				lights.push(i+(14*c)-c);
				break;
			}
		}
		for(c=1;c<14;c++)
		{
			if( piece[i-(14*c)+c] == 0 )
			{
				$("#box" + (i-(14*c)+c)).css("backgroundColor", "yellow");
				lights.push(i-(14*c)+c);
			}
			else
			{
				$("#box" + (i-(14*c)+c)).css("backgroundColor", "yellow");
				lights.push(i-(14*c)+c);
				break;
			}
		}
		for(c=1;c<14;c++)
		{
			if( piece[i-(14*c)-c] == 0 )
			{
				$("#box" + (i-(14*c)-c)).css("backgroundColor", "yellow");
				lights.push(i-(14*c)-c);
			}
			else
			{
				$("#box" + (i-(14*c)-c)).css("backgroundColor", "yellow");
				lights.push(i-(14*c)-c);
				break;
			}
		}
	}
}

function undoLights(){
	/*if( currentPiece == 1)
	{
		$("#box" + (oldi-14)).css("backgroundColor", "initial");
		$("#box" + (oldi-28)).css("backgroundColor", "initial");
	}*/
	for(i=0;i<lights.length;i++)
	{
		$("#box" + lights[i]).css("backgroundColor", "initial");
	}
}