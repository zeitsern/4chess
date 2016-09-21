var piece = new Array(196);
var owner = new Array(196);
var lights = new Array(190);
var turn = 0; //4 players: 1,2,3,4
var selecting = 0;
var currentPiece = 0;
var currentOwner = 0;
var oldi = 0;
var pos = [0, 0];
var text = 0;
var player = -1;
var getplayer = 0;

var socket = io.connect('http://localhost:3000/');

socket.on('player', function(msg) {
	if(getplayer == 1)
	{
		player = msg;
		$("#player").html("Player: " + player);
		//getplayer = 0;
	}
});

socket.on('turn', function(msg) {
	turn = msg;
	$("#turn").html("Turn: " + turn);
	if(turn == 1)
	{
		$('#wall').css('display', 'none');
		$('#findingmatch').css('display', 'none');
	}
});

socket.on('new message', function(msg) {
	pos = msg.text.split(',');
	$('body').append(msg.text + "\n");
	if(pos[0] == player)
	{
		oldi = 0;
		i = 0;
	}
	else if(pos[0] == parseInt(player)+1 || pos[0] == (parseInt(player)-3))
	{
		oldi = parseInt(14*pos[1])+parseInt(13-pos[2]);
		i = parseInt(14*pos[3])+parseInt(13-pos[4]);
	}
	else if(pos[0] == parseInt(player)+2 || pos[0] == (parseInt(player)-2))
	{
		oldi = (14*(13-pos[2]))+parseInt(13-pos[1]);
		i = (14*(13-pos[4]))+parseInt(13-pos[3]);
	}
	else if(pos[0] == parseInt(player)+3 || pos[0] == (parseInt(player)-1))
	{
		oldi = parseInt(14*(13-pos[1]))+parseInt(pos[2]);
		i = parseInt(14*(13-pos[3]))+parseInt(pos[4]);
	}
	piece[i] = piece[oldi];
	owner[i] = owner[oldi];
	piece[oldi] = 0;
	owner[oldi] = 0;
	$('#box' + oldi).html("");
	$('#box' + i).html("<img src='images/" + owner[i] + piece[i] + ".png'></img>");
});

$(document).ready(function() {
	var selecting = 0;
	var currentPiece = 0;
	piece = [0, 0, 0, 2, 3, 4, 6, 5, 4, 3, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 6, 6, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 3, 4, 5, 6, 4, 3, 2, 0, 0, 0];
	owner = [0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0];
	
	$( "#submit" ).click(function() {
		if(getplayer == 0)
		{
			getplayer = 1;
			socket.emit('findmatch', 'findmatch');
			$('#wall').css('display', 'inline');
			$('#findingmatch').css('display', 'inline');
		}
	});
	
	for(i = 0; i < 196; i++) {
		if(((i%14 < 3 || i%14 > 10) && i < 42) || ((i%14 < 3 || i%14 > 10) && i > 153))
		{
			$('#container').append('<div id="box"><div id="blackbox' + i + '"></div></div>');
			$('#blackbox' + i).css( "width", "45px");
			$('#blackbox' + i).css( "height", "45px");
			$('#blackbox' + i).css("backgroundColor", "black");
		}
		else
		{
		$('#container').append('<div id="box"><div id="box' + i + '">' + i + '</div></div>');
		}
		$('#box' + i).css( "width", "45px");
		$('#box' + i).css( "height", "45px");
		$('#box' + i).html(i + "<br />" + piece[i] + "," + owner[i]);
		if(piece[i] > 0){$('#box' + i).html("<img src='images/" + owner[i] + piece[i] + ".png'></img>");}
		else{$('#box' + i).html("");}
		//$('#blackbox' + i).html(i + "<br />0"); //Fill black boxes with box number and piece value.
	}
	for(i=0; i<196; i++)
	{
		$("#box" + i).click(boxSelected(i));
	}
	
	for(i=0; i<196; i=i+14) {
		$('#box' + i).css( "border-left", "1px solid black");
		$('#blackbox' + i).css( "border-left", "1px solid black");
	}
	for(i=0; i<14; i++) {
		$('#box' + i).css( "border-top", "1px solid black");
		$('#blackbox' + i).css( "border-top", "1px solid black");
	}
});



function boxSelected( i ){
  return function(){
	if(turn == player && selecting == 0 && piece[i] != 0 && owner[i] == 1) //playing as player 1
	{
		$("#box" + i).css("backgroundColor", "orange");
		currentPiece = piece[i];
		currentOwner = owner[i];
		oldi = i;
		selecting = 1;
		lightPossibles( i );
	}
	else if(selecting == 1 && ($('#box' + i).css("backgroundColor") == "rgb(255, 255, 0)" || $('#box' + i).css("backgroundColor") == "rgb(255, 165, 0)"))
	{
		piece[oldi] = 0;
		owner[oldi] = 0;
		piece[i] = currentPiece;
		owner[i] = currentOwner;
		$('#box' + oldi).html(""); //Reset original piece
		$('#box' + i).html("<img src='images/" + owner[i] + piece[i] + ".png'></img>");
		$("#box" + oldi).css("backgroundColor", "initial");
		undoLights();
		text = player + "," + (oldi%14) + "," + parseInt(oldi/14) + "," + (i%14) + "," + parseInt(i/14);
		$('body').append(text + "\n\n");
		socket.emit('new message', { text: text });
		selecting = 0;
	if(turn > 3){turn=0;}
	}
  }
}

function lightPossibles( i ){
	var c = 0;
	if( piece[i] == 1) //Pawn
	{
		if( piece[i-14] == 0)
		{
			$("#box" + (i-14)).css("backgroundColor", "yellow");
			lights.push(i-14);
			if(i>170 && i<179 && piece[i-28] == 0)
			{
				$("#box" + (i-28)).css("backgroundColor", "yellow");
				lights.push(i-28);
			}
		}
		if(piece[i-13] > 0 && owner[i-13] > 1)
		{
			$("#box" + (i-13)).css("backgroundColor", "yellow");
			lights.push(i-13);
		}
		if(piece[i-15] > 0 && owner[i-15] > 1)
		{
			$("#box" + (i-15)).css("backgroundColor", "yellow");
			lights.push(i-15);
		}
	}
	if( piece[i] == 2 || piece[i] == 5) //Rook or Queen
	{
		for(c=1;c<14;c++)
		{
			if((i+c)%14==0 || owner[i+c] == 1) {break;}
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
			if((i-c)%14==13 || owner[i-c] == 1) {break;}
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
			if(i+(14*c)>196 || owner[i+(14*c)] == 1) {break;}
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
			if(i-(14*c)<0 || owner[i-(14*c)] == 1) {break;}
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
	if( piece[i] == 4 || piece[i] == 5) //Knight or Queen
	{
		for(c=1;c<14;c++)
		{
			if( (i+(14*c)+c)%14 == 0 || owner[(i+(14*c)+c)] == 1){break;}
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
			if( ((i+(14*c)-c))%14 == 13 || owner[(i+(14*c)-c)] == 1){break;}
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
			if( (i-(14*c)+c)%14 == 0 || owner[(i-(14*c)+c)] == 1){break;}
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
			if( (i-(14*c)-c)%14 == 13 || owner[(i-(14*c)-c)] == 1){break;}
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
	if( piece[i] == 3) //Bishop
	{
		if(owner[i-29] != 1 && i%14 > 0){$("#box" + (i-29)).css("backgroundColor", "yellow"); lights.push(i-29);}
		if(owner[i-27] != 1 && i%14 < 13){$("#box" + (i-27)).css("backgroundColor", "yellow"); lights.push(i-27);}
		if(owner[i-16] != 1 && i%14 > 1){$("#box" + (i-16)).css("backgroundColor", "yellow"); lights.push(i-16);}
		if(owner[i-12] != 1 && i%14 < 12){$("#box" + (i-12)).css("backgroundColor", "yellow"); lights.push(i-12);}
		if(owner[i+12] != 1 && i%14 > 1){$("#box" + (i+12)).css("backgroundColor", "yellow"); lights.push(i+12);}
		if(owner[i+16] != 1 && i%14 < 12){$("#box" + (i+16)).css("backgroundColor", "yellow"); lights.push(i+16);}
		if(owner[i+27] != 1 && i%14 > 0){$("#box" + (i+27)).css("backgroundColor", "yellow"); lights.push(i+27);}
		if(owner[i+29] != 1 && i%14 < 13){$("#box" + (i+29)).css("backgroundColor", "yellow"); lights.push(i+29);}
	}
	if( piece[i] == 6) //King
	{
		if(owner[i-1] != 1 && i%14 > 0){$("#box" + (i-1)).css("backgroundColor", "yellow"); lights.push(i-1);}
		if(owner[i+1] != 1 && i%14 < 13){$("#box" + (i+1)).css("backgroundColor", "yellow"); lights.push(i+1);}
		if(owner[i-15] != 1 && i%14 > 0){$("#box" + (i-15)).css("backgroundColor", "yellow"); lights.push(i-15);}
		if(owner[i-14] != 1){$("#box" + (i-14)).css("backgroundColor", "yellow"); lights.push(i-14);}
		if(owner[i-13] != 1 && i%14 < 13){$("#box" + (i-13)).css("backgroundColor", "yellow"); lights.push(i-13);}
		if(owner[i+13] != 1 && i%14 > 0){$("#box" + (i+13)).css("backgroundColor", "yellow"); lights.push(i+13);}
		if(owner[i+14] != 1){$("#box" + (i+14)).css("backgroundColor", "yellow"); lights.push(i+14);}
		if(owner[i+15] != 1 && i%14 < 13){$("#box" + (i+15)).css("backgroundColor", "yellow"); lights.push(i+15);}
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