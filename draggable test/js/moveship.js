var current_size = 0;
var current_ship;
var current_x;
var current_y;
var orientation = "Horizontal";
var ship_array = [];
var air_carrier, battle_ship, sub, destroyer, boat; 

function battleship (name,orientation,size,x,y,coords)
{
 this.name = name;
 this.orientation = orientation;
 this.size = size;
 this.x = x;
 this.y = y;
 this.coords = coords;
}


$(function () {
	$('.ship').draggable({
	containment: '.gameboard',
	cursor: 'move',
	cursorAt: {left:0},
	revert: true,
	opacity:0.35,
	drag: function()
	{
		current_size = $(this).data('size');
		current_ship = $(this).data('type');
	}
	}).on('mousedown',(function(event){
	if (event.which === 3) // right click to rotate ship
		{
			if (orientation === "Horizontal")
			{
				orientation = "Vertical";
				//$(this).draggable({cursorAt: {top:0}});
				$(this).css({"transform" : "rotate(90deg)", "-webkit-transform" : "rotate(90deg)", "-moz-transform" : "rotate(90deg)"});
			}
			else if (orientation === "Vertical")
			{
				orientation = "Horizontal";
				//$(this).draggable({cursorAt: {left:0}});
				$(this).css({"transform" : "rotate(0deg)", "-webkit-transform" : "rotate(0deg)", "-moz-transform" : "rotate(0deg)"});
			}
		}
	}))
});
//});

$(function () {
	$('.cell').droppable({
	tolerance: "pointer",
	hoverClass: "position",
	drop: positionShip,
	});
});

// checks if ships are placed horizontally out of the game grid
function outOfBounds_h()
{
	if ((current_x + (current_size - 1)) < 10)
	{
	alert(current_x + (current_size - 1));
		return false;
	}
	else
	{
		return true; 
	}
}

// checks if ships are placed vertically out of the game grid
function outOfBounds_v()
{
	if ((current_y + (current_size - 1)) < 10)
	{
		return false;
	}
	else
	{
		return true; 
	}
}

// checks if ships over lap horizontally
function checkOverLap_h(selected_ship)
{
	if(ship_array.length < 1)
	{
		return false;
	}
	else
	{
		for ( var ship in ship_array)
		{	// check for horizontal ship overlap
			if (ship.orientation === "Horizontal")
			{
				if(ship.y === selected_ship.y && (ship.x + (ship.size -1)) >= selected_ship.x )
				{
					return true;
				}
			}	// check for vertical ship overlap
			else if (ship.orientation ==="Vertical")
			{
				if( (selected_ship.x + (selected_ship.size - 1)) >= ship.x)
				{
					return true;
				}
			}
		}
		
		return false;
	}
}


function checkOverLap_v(selected_ship)
{
	if(ship_array.length < 1)
	{
		return false;
	}
	else
	{
		for ( var ship in ship_array)
		{	//check for vertical ship overlap
			if (ship.orientation === "Vertical")
			{
				if(ship.x === selected_ship.x && (ship.y + (ship.size -1)) >= selected_ship.y )
				{
					return true;
				}
			}// check for horizontal ship overlap
			else if (ship.orientation === "Horizontal")
			{
				if( (ship.x + (ship.size - 1)) >= selected_ship.x)
				{
					return true;
				}
			}
		}
		
		return false;
	}
}

function positionShip(event, ui)
{	
alert($(this).data('cellLoc'));
	current_y = $(this).data('cellLoc').charAt(0);
	current_x = $(this).data('cellLoc').charAt(2);
	
	alert("current ship size : " + current_size);
	alert("X coord: " + current_x);
	alert("Y coord: " + current_y);
	
	// checks size of current ship
		if (current_size == 5)
		{	// check orentation 
			if (orientation === "Horizontal")
			{	// checks for out of bounds 
				if (outOfBounds_h())
				{
					alert('Cannot place ship here - out of bounds h');
					//ui.draggable.draggable("option", "revert", true);
				}
				else // if not out of bounds create ship object 
				{
					air_carrier = new battleship("air carrier","Horizontal",current_size,current_y,current_x,
						[[current_y,current_x],[current_y,current_x+1],[current_y,current_x+2],[current_y,current_x+3],[current_y,current_x+4]]
						);
						
					if(!checkOverLap_h(air_carrier))
					{
						index = ship_array.indexOf(air_carrier);
						
						if(index > -1)
						{
							delete ship_array[index];
						}
						
						ship_array.push(air_carrier);
						
						ui.draggable.position({
						of: $(this),
						my: 'left top',
						at: 'left top'
						});
					}
					
					else
					{
						alert('Cannot place ship here - over lap');
						//ui.draggable.draggable("option", "revert", true);
					}
					
				}
			}
			else
			{
				if (outOfBounds_v())
				{
					alert('Cannot place ship here - out of bounds v');
				}
				else // if not out of bounds create ship object 
				{
					air_carrier = new battleship("air carrier","Vertical",current_size,current_y,current_x,
						[[current_y,current_x],[current_y+1,current_x],[current_y+2,current_x],[current_y+3,current_x],[current_y+4,current_x]]
						);
				
					if(!checkOverLap_v(air_carrier))
					{
						index = ship_array.indexOf(air_carrier);
						
						if(index > -1)
						{
							delete ship_array[index];
						}
						
						ship_array.push(air_carrier);
						
						ui.draggable.position({
						of: $(this),
						my: 'left top',
						at: 'left top'
						});
					}
					else
					{
						alert('Cannot place ship here - over lap');
					}
				}
			
			//$(this).droppable('destroy');
			}
		}
		
		else if (current_size == 4)
		{
			if (orientation === "Horizontal")
			{	// checks for out of bounds 
				if (outOfBounds_h())
				{
					alert('Cannot place ship here - out of bounds - h');
				}
				else // if not out of bounds create ship object 
				{
					
					battle_ship = new battleship("battle ship","Horizontal",current_size,current_y,current_x,
					[[current_y,current_x],[current_y,current_x+1],[current_y,current_x+2],[current_y,current_x+3]]
					);
						
					if(!checkOverLap_h(battle_ship))
					{
						index = ship_array.indexOf(battle_ship);
						
						if(index > -1)
						{
							delete ship_array[index];
						}

						ship_array.push(battle_ship);
						
						ui.draggable.position({
						of: $(this),
						my: 'left top',
						at: 'left top'
						});
					}
					
					else
					{
						alert('Cannot place ship here - over lap');
					}
					
				}
			}
			else
			{
				if (outOfBounds_v())
				{
					alert('Cannot place ship here - out of bounds v');
				}
				else // if not out of bounds create ship object 
				{
					battle_ship = new battleship("battle ship","Vertical",current_size,current_y,current_x,
					[[current_y,current_x],[current_y+1,current_x],[current_y+2,current_x],[current_y+3,current_x]]
					);
						
					if(!checkOverLap_v(battle_ship))
					{
						index = ship_array.indexOf(battle_ship);
						
						if(index > -1)
						{
							delete ship_array[index];
						}
						
						ship_array.push(battle_ship);
						
						ui.draggable.position({
						of: $(this),
						my: 'left top',
						at: 'left top'
						});
					}
					
					else
					{
						alert('Cannot place ship here - over lap');
					}

				}
			//$(this).droppable('destroy');
			}
		}
		else if (current_size == 3)
		{
			if(current_ship === "sub")
			{
				if (orientation === "Horizontal")
				{// checks for out of bounds 
					if (outOfBounds_h())
					{
						alert('Cannot place ship here');
					}
					else // if not out of bounds create ship object 
					{
						sub = new battleship("sub","Horizontal",current_size,current_y,current_x,
						[[current_y,current_x],[current_y,current_x+1],[current_y,current_x+2]]
						);
							
						if(!checkOverLap_h(sub))
						{
							index = ship_array.indexOf(sub);
							
							if(index > -1)
							{
								delete ship_array[index];
							}
							
							ship_array.push(sub);
							
							ui.draggable.position({
							of: $(this),
							my: 'left top',
							at: 'left top'
							});
						}
						
						else
						{
							alert('Cannot place ship here');
						}
						
					}
				}
				else
				{
					if (outOfBounds_v())
					{
						alert('Cannot place ship here');
					}
					else // if not out of bounds create ship object 
					{
						sub = new battleship("sub","Vertical",current_size,current_y,current_x,
						[[current_y,current_x],[current_y+1,current_x],[current_y+2,current_x]]
						);
							
						if(!checkOverLap_v(sub))
						{
							index = ship_array.indexOf(sub);
							
							if(index > -1)
							{
								delete ship_array[index];
							}
							
							ship_array.push(sub);
							
							ui.draggable.position({
							of: $(this),
							my: 'left top',
							at: 'left top'
							});
						}
					}
				}
			}
			else
			{
				if (orientation === "Horizontal")
				{	// checks for out of bounds 
					if (outOfBounds_h())
					{
						alert('Cannot place ship here');
					}
					else // if not out of bounds create ship object 
					{
						destroyer = new battleship("destroyer","Horizontal",current_size,current_y,current_x,
						[[current_y,current_x],[current_y,current_x+1],[current_y,current_x+2]]
						);
						
						if(!checkOverLap_h(destroyer))
						{
							index = ship_array.indexOf(destroyer);
							
							if(index > -1)
							{
								delete ship_array[index];
							}
							
							ship_array.push(destroyer);
							
							ui.draggable.position({
							of: $(this),
							my: 'left top',
							at: 'left top'
							});
						}
						
						else
						{
							alert('Cannot place ship here');
						}
					}
				}
				else
				{
					if (outOfBounds_v())
					{
						alert('Cannot place ship here');
					}
					else // if not out of bounds create ship object 
					{
						destroyer = new battleship("destroyer","Vertical",current_size,current_y,current_x,
						[[current_y,current_x],[current_y+1,current_x],[current_y+2,current_x]]
						);
						
						if(!checkOverLap_v(destroyer))
						{
							index = ship_array.indexOf(destroyer);
							
							if(index > -1)
							{
								delete ship_array[index];
							}
							
							ship_array.push(destroyer);
							
							ui.draggable.position({
							of: $(this),
							my: 'left top',
							at: 'left top'
							});
						}
					}
				}
			}
		}
		
		else
		{
			if (orientation === "Horizontal")
			{	// checks for out of bounds 
				if (outOfBounds_h())
				{
					alert('Cannot place ship here');
				}
				else // if not out of bounds create ship object 
				{
					boat = new battleship("boat","Horizontal",current_size,current_y,current_x,
					[[current_y,current_x],[current_y,current_x+1]]
					);
						
					if(!checkOverLap_h(boat))
					{
						index = ship_array.indexOf(boat);
						
						if(index > -1)
						{
							delete ship_array[index];
						}
						
						ship_array.push(boat);
						
						ui.draggable.position({
						of: $(this),
						my: 'left top',
						at: 'left top'
						});
					}
					
					else
					{
						alert('Cannot place ship here');
					}
				}
			}
			else
			{
				if (outOfBounds_v())
				{
					alert('Cannot place ship here');
				}
				else // if not out of bounds create ship object 
				{
					boat = new battleship("boat","Vertical",current_size,current_y,current_x,
					[[current_y,current_x],[current_y+1,current_x]]
					);
					
					if(!checkOverLap_v(boat))
					{
						index = ship_array.indexOf(boat);
						
						if(index > -1)
						{
							delete ship_array[index];
						}
						
						ship_array.push(boat);
						
						ui.draggable.position({
						of: $(this),
						my: 'left top',
						at: 'left top'
						});
					}
				}
			//$(this).droppable('destroy');
			}
		}	
	ui.draggable.draggable("option", "revert", false);
	ui.draggable.draggable("option","grid", [52,52]);
	ui.draggable.draggable("option","snap", true);
	}