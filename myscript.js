//Gameplay object containing commands and other gameplay parameters
var Gameplay = {cmd:["n", "e", "s", "w", "look", "take", "unlock", "help", "climb", "eat", "inventory", "clear", "listen","cheatmode","sarcasm","w**dman","007"], points:0, cheatmode:0};
//Added command descriptions, used for help
Gameplay.cmd_desc = ["Go North","Go East","Go South","Go West","Look around","Take object","Unlock door","Shows help","Climb","Eat food","Check Inventory","Clear display box","Listen to radio (if applicable)"];

//Player Object containing player related variables/parameters such as inventory:
var Player = {//Inventory names
			  inventory:["food", "lock pick(s)"],
			  //Inventory quantity
		  	  inventory_q:[0,0]};
	
			
//GENERAL USE FUNCTIONS			
	//Changes the page background image, will be used for different game modes
	function changeBGImage(whichImage) {
		document.getElementById("page_body").className = "bg" + whichImage;
	}
	
	//Capitalizes the first letter of a string
	function capitaliseFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	
	//Populates the command textbox datalist
	function populate_CmdList() {
		var txtCommand_list = document.getElementById("txtCommand_list");
		for (i = 0, len = Gameplay.cmd.length; i < len; i++) {
			var txtCommand_item = document.createElement("option");	
			var cmd_name = capitaliseFirstLetter(Gameplay.cmd[i]);
			
			txtCommand_item.value = cmd_name;
			txtCommand_item.text = cmd_name;
			
			txtCommand_list.appendChild(txtCommand_item);
		}
	}
	
	//Checks if enter key is pressed in the command text box
	function enterKey_check(e) {
		var txtCommand = document.getElementById("txtCommand");
		if ((e.keyCode === 13) && (txtCommand.value != "")) {
			btnEnter_click();
		}
	}

//BUTTON ENABLE/DISABLE:
	//Disables indicated direction buttons
	function btn_disable(button_d) {
		var btn_ = ""
		if (button_d === "all") {
			for (i = 0; i < 4; i++) {
				btn_ = document.getElementById("btn" + i);
				if (btn_.disabled === false) {
					btn_.disabled = true;
				}
			}
		}
		else {
			for (i = 0, len = arguments.length; i < len; i++) {
				btn_ = document.getElementById(arguments[i]);
				if (btn_.disabled === false) {
					btn_.disabled = true;
				}
			}
		}
	}
	
	//Enables indicated direction buttons
	function btn_enable(button_e) {
		var btn_ = ""
		if (button_e === "all") {
			for (i = 0; i < 4; i++) {
				btn_ = document.getElementById("btn" + i);
				if (btn_.disabled === true) {
					btn_.disabled = false;
				}
			}
		}
		else {
			for (i = 0, len = arguments.length; i < len; i++) {
				btn_ = document.getElementById(arguments[i]);
				if (btn_.disabled === true) {
					btn_.disabled = false;
				}
			}
		}
	}
	
	//Enable/disable direction buttons according to current location	
	function btn_set() {
		switch (current_loc) {
			case 0:
				if (loc[current_loc].loc_locked === true) {
					btn_disable("all");
				}
				else {
					btn_enable("btn0");
					btn_disable("btn1","btn2","btn3");
				}
				break;
			case 1:
				btn_enable("btn0","btn1");
				btn_disable("btn2","btn3");
				break;
			case 2:
				btn_enable("all");
				break;
			case 3:
				btn_enable("btn0","btn3");
				btn_disable("btn1","btn2");
				break;
			case 4:
				btn_enable("btn1","btn2");
				btn_disable("btn0","btn3");
				break;
			case 5:
				btn_enable("all");
				break;
			case 6:
				btn_enable("btn2","btn3");
				btn_disable("btn0","btn1");
				break;
			case 7:
				if ((loc[current_loc].loc_visited > 1) && (loc[8].loc_locked === true)) {
					btn_enable("btn2");
					btn_disable("btn0","btn1","btn3");
				}
				else {
					btn_enable("btn0","btn2");
					btn_disable("btn1","btn3");
				}
				break;
			case 8:
				btn_enable("btn1","btn2");
				btn_disable("btn0","btn3");
				break;
			case 9:
				btn_enable("btn0","btn1","btn3");
				btn_disable("btn2");
				break;
			case 10:
				btn_enable("btn3");
				btn_disable("btn1","btn2","btn3");
				break;
			case 11:
				btn_enable("btn2");
				btn_disable("btn0","btn1","btn3");
				break;
		}
	}

//LOCATION/MAP/POINTS/TEXTAREA UPDATING:
	
	//Update textarea
	function update_Display(num, type) {
		var msg_box = document.getElementById("ta_Main");
		var message = [];
		switch (type) {
			case 0:
				message = ["You move to the ",
						   "Welcome to Escape Plan!\n\nFor every time you visit a new location, you will receive 5 points. You must escape the prison to win the game!\n\nYou are currently in the prison cell.",
					       "You take the lock pick.",
					       "You have taken the food!",
					       "You have unlocked the cell door!",
					       "Warden's office unlocked!",
					       "You have eaten food from your inventory!",
					       "You eat the food from the dining tables.",
					       "'ALERT! ALERT! The fence in the courtyard has been breached!'",
					       "Congratulations! You have escaped!"];
				break;
			case 1:
				message = ["You cannot go that way!",
						   "Navigation Error!"];
				break;
			case 2:
				message = ["There is nothing to take!",
 					       "There is nothing to unlock!",
  					       "There is nothing to climb!",
					       "You cannot unlock the Warden's office. You do not have a lock pick!",
					       "There is no food available to eat!",
					       "Please enter a valid command! (Type help for details)",
					       "You cannot unlock the cell door. You do not have a lock pick!",
					       "The Warden's office is locked!",
					       "There is nothing to listen to!",
					       "Gameplay Error!"];
				break;
		}
		if (type === 0) {
			if (num === 0) {
				msg_box.value = message[num] + loc[current_loc].loc_name + "\n\n" + loc[current_loc].loc_desc() + "\n\n\n" + msg_box.value;
			}
			else if (num === 1) {
				msg_box.value = message[num];
			}
			else if (num === 9) {
				msg_box.value = message[num];
			}
			else {
				msg_box.value = message[num] + "\n\n\n" + msg_box.value;
			}
		}
		else if ((type === 1) || (type === 2)) {
			if (num != undefined) {
				msg_box.value = message[num] + "\n\n\n" + msg_box.value;
			}
			else {
				msg_box.value = message[(message.length - 1)] + "\n\n\n" + msg_box.value;
			}	
		}
	}
	
	function update_display_msg(msg) {
		update_Display(msg, 0);
	}
	
	//Experimenting with map drawing using tiling
	/*Location.draw_Map = function() {
		var mapContainer = document.getElementById("container");
		
		Location.mapArray = [
			[1,1,1,1,1,1,1,1],
			[7,7,7,7,7,7,7,7],
			[4,4,4,5,5,5,6,6],
			[4,4,4,5,5,5,6,6],
			[1,1,1,2,2,2,2,3],
			[1,1,1,2,2,2,2,3],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0]
			];

		for (var i=0; i < Location.mapArray.length; i++){
			for (var j=0; j < Location.mapArray[i].length; j++){
				var tile = document.createElement("div");
				switch (parseInt(Location.mapArray[i][j])){
				case 0:
					tile.className = "cell";
					mapContainer.appendChild(tile);
					break;
				case 1:
					tile.className = "dining";
					mapContainer.appendChild(tile);
					break;
				case 2:
					tile.className = "multi_room";
					mapContainer.appendChild(tile);
					break;
				case 3:
					tile.className = "courtyard";
					mapContainer.appendChild(tile);
					break
				case 4:
					tile.className = "infirmary";
					mapContainer.appendChild(tile);
					break;
				case 5:
					tile.className = "visiting_room";
					mapContainer.appendChild(tile);
					break;
				case 6:
					tile.className = "gymnasium";
					mapContainer.appendChild(tile);
					break;
				case 7:
					tile.className = "warden_office";
					mapContainer.appendChild(tile);
					break;
				}
			}
		}
	}*/

	//Updates location value in location box
	function update_Loc() {
		var loc_box = document.getElementById("txtLocation");
		loc_box.value = loc[current_loc].loc_name;
	}

	//Updates points value if location has not been visited before
	function update_Points() {
		var txt_points = document.getElementById("txtPoints");
		if (loc[current_loc].loc_visited === 0) {
			Gameplay.points += 5;
			txt_points.value = Gameplay.points;
		}
	}

	//Changes current map location color
	function update_Map(x) {
		var map_loc_id = "loc" + current_loc.toString();
		var map_loc = document.getElementById(map_loc_id);
		switch (x) {
			case 0:
				map_loc.style.background = "";
				break;
			case 1:
				map_loc.style.background = "#E80000";
				break;
		}
	}

	//Edits the description for a location when alternate location required
	function edit_desc(locx) {
		switch (locx) {
			case 0:
				loc[locx].loc_desc0 = loc[locx].loc_desc_alt;
				break;
			case 1:
				loc[locx].loc_desc0 = loc[locx].loc_desc_alt;
				loc[locx].loc_desc1 = loc[locx].loc_desc_alt;
				loc[locx].loc_desc2 = loc[locx].loc_desc_alt;
				break;
			case 3:
				loc[locx].loc_desc2 = loc[locx].loc_desc_alt;
				break;
			case 5:
				loc[locx].loc_desc2 = loc[locx].loc_desc_alt;
				break;
			case 6:
				loc[locx].loc_desc2 = loc[locx].loc_desc_alt;
				break;
			case 7:
				loc[locx].loc_desc2 = loc[locx].loc_desc_alt;
			case 8:
				loc[locx].loc_desc0 = loc[locx].loc_desc_alt;
				loc[locx].loc_desc1 = loc[locx].loc_desc_alt;
				break;
			case 10:
				loc[locx].loc_desc1 = loc[locx].loc_desc_alt;
				loc[locx].loc_desc2 = loc[locx].loc_desc_alt;
				break;
		}
	}
	
	//Function that breaches courtyard fence, from where the player can then escape from.
	function breach_c_Fence() {
		edit_desc(3);
	}
	
//Executed when the player achieves the game objective
function player_Win() {
	var txtCommand = document.getElementById("txtCommand");
	var btn_Enter = document.getElementById("btn_Enter");
	btn_disable("all");
	update_display_msg(9);
	txtCommand.disabled = true;
	btn_Enter.disabled = true;
}
	
//Executed on page load
function initialize_page() {
	populate_CmdList();
	//Location.draw_Map();
	current_loc = 0;
	changeBGImage(0);
	btn_set();
	update_display_msg(1);
}

//ERROR HANDLING
	//Navigation error handler
	function navigationError(err) {
		update_Display(err, 1);
	}

	//Gameplay error handler
	function gameplayError(err) {
		update_Display(err, 2);
	}

//COMMAND FUNCTIONS:

	//Executes on look command
	function cmd_Look() {
		var msg_box = document.getElementById("ta_Main");
		msg_box.value = loc[current_loc].loc_desc() + "\n\n" + msg_box.value;
	}

	//Executes on take command
	function cmd_Take() {
		var msg_box = document.getElementById("ta_Main");
		switch (current_loc) {
			case 0:
				if (loc[current_loc].loc_visited === 0) {
					update_display_msg(2);
					edit_desc(current_loc);
					Player.inventory_q[1]++;
					break;
				}
			case 1:
				if (loc[current_loc].loc_desc() != loc[current_loc].loc_desc_alt) {
					update_display_msg(3);
					edit_desc(current_loc);
					Player.inventory_q[0]++;
					break;
				}
			case 6:
				if ((loc[current_loc].loc_visited > 1) && (loc[current_loc].loc_desc() != loc[current_loc].loc_desc_alt)) {
					update_display_msg(2);
					edit_desc(current_loc);
					Player.inventory_q[1]++;
					break;
				}
			case 10:
				if (loc[current_loc].loc_desc() != loc[current_loc].loc_desc_alt) {
					update_display_msg(2);
					edit_desc(current_loc);
					Player.inventory_q[1]++
				}
				break;
			default:
				gameplayError(0);
		}
	}

	//Executes on unlock command
	function cmd_Unlock() {
		var msg_box = document.getElementById("ta_Main");
		switch (current_loc) {
			case 0:
				//If location is the prison cell, and the player has lock pick(s) in inventory, unlock door
				if ((loc[current_loc].loc_locked === true) && (Player.inventory_q[1] != 0)) {
					update_display_msg(4);
					loc[current_loc].loc_locked = false;
					loc[current_loc].loc_visited++;
					Player.inventory_q[1]--;
					break;
				}
				else if ((loc[current_loc].loc_locked === true) && (Player.inventory_q[1] === 0)) {
					cmd_Look();
					gameplayError(6);
					break;
				}
			case 7:
				//If location is visiting room, and the player has lock pick(s) in inventory, unlocks door to Warden's office
				if ((loc[current_loc].loc_visited > 1) && (Player.inventory_q[1] != 0)) {
					loc[8].loc_locked = false;
					if (loc[8].loc_visited < 2) {
						edit_desc(8);
					}
					update_display_msg(5);
					edit_desc(current_loc);
					Player.inventory_q[1]--;
					break;
				}
				else if ((loc[current_loc].loc_visited > 1) && (Player.inventory_q[1] === 0)) {
					gameplayError(3);
					break;
				}
			default:
				gameplayError(1);
		}
		btn_set();
	}

	//Executes on help command
	function cmd_Help() {
		var cmd_list = "";
		var msg_box = document.getElementById("ta_Main");
		var txt_Command = document.getElementById("txtCommand");
		//Loop to search and display all available commands and their descriptions.
		for (i = (Gameplay.cmd.length - 1); i >= 0; i--) {
			cmd_list = Gameplay.cmd[i] + " - " + Gameplay.cmd_desc[i] + "\n" + cmd_list;
		}
		msg_box.value = "HELP: \n" + cmd_list + "\n" + loc[current_loc].loc_desc() + "\n\n" + msg_box.value;
		txtCommand.value = "";
	}

	//Executes on eat command
	function cmd_Eat() {
		var msg_box = document.getElementById("ta_Main");
		//If inventory already contains food, eat from there
		if (Player.inventory_q[0] != 0) {
			update_display_msg(6);
			Player.inventory_q[0]--;
		}
		//Otherwise if player is currently in the dining room and does not have any food in inventory, eat directly
		else if ((current_loc === 1) && (loc[current_loc].loc_desc() != loc[current_loc].loc_desc_alt) && (Player.inventory_q[0] == 0)) {
			update_display_msg(8);
			edit_desc(current_loc);
		}
		else {
			gameplayError(4);
		}
	}

	//Executed on inventory command
	function cmd_Inventory_check() {
		var inv_list = "";
		var msg_box = document.getElementById("ta_Main");
		for (i = 0, len = Player.inventory.length; i < len; i++) {
			if (Player.inventory_q[i] != 0) {
				inv_list = capitaliseFirstLetter(Player.inventory[i]).toString() + " = " + Player.inventory_q[i].toString() + "\n" + inv_list;
			}
		}
		if (inv_list != "") {
			msg_box.value = "INVENTORY: \n" + inv_list + "\n\n" + msg_box.value;
		}
		else {
			msg_box.value = "INVENTORY: \n" + "You have no items in your inventory \n\n" + msg_box.value;
		}
	}

	//Executed on climb command
	function cmd_Climb() {
		if ((current_loc === 3) && (loc[current_loc].loc_desc() === loc[current_loc].loc_desc_alt)) {
			player_Win();
		}
		else {
			gameplayError(2);
		}
	}

	//Executed on clear command, clears text area
	function cmd_Clear() {
		var msg_box = document.getElementById("ta_Main");
		if (msg_box.value != "") {
			msg_box.value = "";
		}
	}
	
	//Executed on listen command
	function cmd_Listen() {
		if ((loc[current_loc].loc_visited > 1) && (current_loc === 4)) {
			update_display_msg(8);
			breach_c_Fence();
		}
		else {
			gameplayError(8);
		}
	}

//Combines all functions that run when location changes/location button(s) used
function param_change() {
	update_Loc();
	update_Map(1);
	update_Points();
	update_display_msg(0);
	loc[current_loc].loc_visited++;
	btn_set();
	
	if ((loc[current_loc].loc_visited > 1) && (current_loc === 7) && (loc[current_loc].loc_desc2 != loc[current_loc].loc_desc_alt)) {
		loc[8].loc_locked = true;
		breach_c_Fence();
	}
}

//BUTTON FUNCTIONS:
	//Direction button functions
	function btnNorth_Click() {
		var msg_box = document.getElementById("ta_Main");
		switch(current_loc) {
			case 0:
				if (loc[current_loc].loc_locked === true) {
					cmd_Look();
					navigationError(0);
				}
				else {
					update_Map(0);
					current_loc = 2;
					param_change();
				}
				break;
			case 1:
				update_Map(0);
				current_loc = 4;
				param_change();
				break;
			case 2:
				update_Map(0);
				current_loc = 5;
				param_change();
				break;
			case 3:
				update_Map(0);
				current_loc = 6;
				param_change();
				break;
			case 5:
				update_Map(0);
				current_loc = 7;
				param_change();
				break;
			case 7:
				if (loc[8].loc_locked === true) {
					navigationError(0);
					gameplayError(7);
				}
				else {
					update_Map(0);
					current_loc = 8;
					param_change();
				}
				break;
			case 9:
				update_Map(0);
				current_loc = 11;
				param_change();
				break;
			default:
				navigationError(0);
		}
	}

	function btnEast_Click() {
		switch(current_loc) {
			case 1:
				update_Map(0);
				current_loc = 2;
				param_change();
				break;
			case 2:
				update_Map(0);
				current_loc = 3;
				param_change();
				break;
			case 4:
				update_Map(0);
				current_loc = 5;
				param_change();
				break;
			case 5:
				update_Map(0);
				current_loc = 6;
				param_change();
				break;
			case 8:
				update_Map(0);
				current_loc = 9;
				param_change();
				break;
			case 9:
				update_Map(0);
				current_loc = 10;
				param_change();
				break;
			default:
				navigationError(0);
		}
	}

	function btnSouth_Click() {
		switch(current_loc) {
			case 2:
				update_Map(0);
				current_loc = 0;
				param_change();
				break;
			case 4:
				update_Map(0);
				current_loc = 1;
				param_change();
				break;
			case 5:
				update_Map(0);
				current_loc = 2;
				param_change();
				break;
			case 6:
				update_Map(0);
				current_loc = 3;
				param_change();
				break;
			case 7:
				update_Map(0);
				current_loc = 5;
				param_change();
				break;
			case 8:
				update_Map(0);
				current_loc = 7;
				param_change();
				break;
			case 11:
				update_Map(0);
				current_loc = 9;
				param_change();
				break;
			default:
				navigationError(0);
		}
	}

	function btnWest_Click() {
		switch(current_loc) {
			case 2:
				update_Map(0);
				current_loc = 1;
				param_change();
				break;
			case 3:
				update_Map(0);
				current_loc = 2;
				param_change();
				break;
			case 5:
				update_Map(0);
				current_loc = 4;
				param_change();
				break;
			case 6:
				update_Map(0);
				current_loc = 5;
				param_change();
				break;
			case 9:
				update_Map(0);
				current_loc = 8;
				param_change();
				break;
			case 10:
				update_Map(0);
				current_loc = 9;
				param_change();
				break;
			default:
				navigationError(0);
		}
	}

	//Implementing new gamemodes, not yet complete
	function cmd_Cheatmode() {
		Gameplay.cheatmode = 1;
	}
	
	//Sarcasm game mode, WIP
	function cmd_Sarcasm() {
	}
	
	//Wman game mode, WIP
	function cmd_wman() {
	}
	
	//James Bond game mode, WIP
	function cmd_007() {
	}
	
	//Enter button function
	function btnEnter_click() {
		var msg_box = document.getElementById("ta_Main");
		var txtCommand = document.getElementById("txtCommand");
		var usrCommand = (txtCommand.value.toLowerCase());
		
		if (usrCommand === "north") {
			usrCommand = "n";
		}
		else if (usrCommand === "east") {
			usrCommand = "e";
		}
		else if (usrCommand === "south") {
			usrCommand = "s";
		}
		else if (usrCommand === "west") {
			usrCommand = "w";
		}
		
		var cmd_number = Gameplay.cmd.indexOf(usrCommand);
		switch(cmd_number) {
			case 0:
				btnNorth_Click();
				break;
			case 1:
				btnEast_Click();
				break;
			case 2:
				btnSouth_Click();
				break;
			case 3:
				btnWest_Click();
				break;
			case 4:
				cmd_Look();
				break;
			case 5:
				cmd_Take();
				break;
			case 6:
				cmd_Unlock();
				break;
			case 7:
				cmd_Help();
				break;
			case 8:
				cmd_Climb();
				break;
			case 9:
				cmd_Eat();
				break;
			case 10:
				cmd_Inventory_check();
				break;
			case 11:
				cmd_Clear();
				break;
			case 12:
				cmd_Listen();
				break;
			case 13:
				cmd_Cheatmode();
				break;
			case 14:
				cmd_Sarcasm();
				break;
			case 15:
				cmd_wman();
				break;
			case 16:
				cmd_007();
				break;
			default:
				gameplayError(5);
		}
		txtCommand.value = "";
	}