//LOCATION VARIABLES:
	function Location() {
		this.loc_name = "";
		this.loc_visited = 0;
		this.loc_locked = false;
		this.loc_desc0 = "";
		this.loc_desc1 = "";
		this.loc_desc2 = "";
		this.loc_desc_alt = "";
		this.loc_desc_used = function() {switch (this.loc_visited) {
														case 0:
															return this.loc_desc0;
															break;
														case 1:
															return this.loc_desc1;
															break;
														default:
															return this.loc_desc2;
														}
										};
	}
	//All location variables/properties are stored in the Location object
	//Locations stored in array to provide central access
	var prison_cell = new Location();
	prison_cell.loc_name = "Prison Cell";
	prison_cell.loc_locked = true;
	prison_cell.loc_desc0 = "It is dark, damp and smelly. The cell door is locked. There is a lock pick on the floor.";
	prison_cell.loc_desc1 = "It is dark, damp and smelly. The cell door is open.";
	prison_cell.loc_desc2 = "It is dark, damp and smelly. The cell door is open.";
	prison_cell.loc_desc_alt = "It is dark, damp and smelly. The cell door is locked. You have a lock pick!";
	
	var dining_room = new Location();
	dining_room.loc_name = "Dining Room";
	dining_room.loc_desc0 = "There are a number of dining tables. There is food!";
	dining_room.loc_desc1 = "There are a number of dining tables. There is food!";
	dining_room.loc_desc2 = "The dining room is empty!";
	dining_room.loc_desc_alt = "";
	
	var multi_room = new Location();
	multi_room.loc_name = "Multi-purpose Room";
	multi_room.loc_desc0 = "There is no one in the multi-purpose room. The TV is on.";
	multi_room.loc_desc1 = "There are a number of other prison inmates sitting around, they ignore you.";
	multi_room.loc_desc2 = "There is no one in the multi-purpose room.";
	multi_room.loc_desc_alt = "";
	
	var courtyard = new Location();
	courtyard.loc_name = "";
	courtyard.loc_desc0 = "The courtyard is empty except for the few guards on watch duty.";
	courtyard.loc_desc1 = "The courtyard is empty except for the few guards on watch duty.";
	courtyard.loc_desc2 = "The courtyard is empty except for the few guards on watch duty.";
	courtyard.loc_desc_alt = "The courtyard is empty. The electric fence has been breached! You have a chance to escape!";
	
	var infirmary = new Location();
	infirmary.loc_name = "Infirmary";
	infirmary.loc_desc0 = "There is a doctor in the infirmary, he does not want you there. He calls the guards!";
	infirmary.loc_desc1 = "There is no one in the infirmary.";
	infirmary.loc_desc2 = "The infirmary is empty. There is a radio relaying some news!";
	infirmary.loc_desc_alt = "";
	
	var visiting_room = new Location();
	visiting_room.loc_name = "Visiting Room";
	visiting_room.loc_desc0 = "There is no one in the visiting room. Your family does not want to see you.";
	visiting_room.loc_desc1 = "There is no one in the visiting room. Your family does not want to see you.";
	visiting_room.loc_desc2 = "Some inmates have overpowered the guards and taken over the visiting room!";
	visiting_room.loc_desc_alt = "The visiting room is deserted.";
	
	var gymnasium = new Location();
	gymnasium.loc_name = "Gymnasium";
	gymnasium.loc_desc0 = "There is a basketball game between inmates currently taking place. They will not allow you to join!";
	gymnasium.loc_desc1 = "There is a basketball game between inmates currently taking place, but they will not allow you to join! The situation is quickly turning into a riot!";
	gymnasium.loc_desc2 = "The gymnasium is dark and empty. There are some dead bodies on the basketball court. There is a lock pick on the floor.";
	gymnasium.loc_desc_alt = "The gymnasium is dark and empty. There are some dead bodies on the basketball court.";
	
	var hallway = new Location();
	hallway.loc_name = "Hallway";
	hallway.loc_desc0 = "The hallway is empty. You can hear noises from the gymnasium.";
	hallway.loc_desc1 = "The hallway is empty. You can hear noises from the gymnasium";
	hallway.loc_desc2 = "There is a stand-off between the guards and inmates in the hallway! The Warden's office is locked.";
	hallway.loc_desc_alt = "The hallway is deserted.";
	
	var warden_office = new Location();
	warden_office.loc_name = "Warden's Office";
	warden_office.loc_desc0 = "The Warden is currently on the phone, he ignores you.";
	warden_office.loc_desc1 = "The Warden ignores you, he is talking on the phone.";
	warden_office.loc_desc2 = "There is a safe inside, but you cannot open it.";
	warden_office.loc_desc_alt = "There is a safe inside, but you cannot open it.";
	
	var security_desk = new Location();
	security_desk.loc_name = "Security Desk";
	security_desk.loc_desc0 = "There is a guard sitting at the security desk. He is eating a doughnut.";
	security_desk.loc_desc1 = "There is no one at the security desk.";
	security_desk.loc_desc2 = "The security desk has been destroyed, and the rest of the room is empty.";
	security_desk.loc_desc_alt = "";
	
	var solitary = new Location();
	solitary.loc_name = "Solitary";
	solitary.loc_desc0 = "";
	solitary.loc_desc1 = "";
	solitary.loc_desc2 = "";
	solitary.loc_desc_alt = "";
	
	var parking_lot = new Location();
	parking_lot.loc_name = "Parking Lot";
	parking_lot.loc_desc0 = "";
	parking_lot.loc_desc1 = "";
	parking_lot.loc_desc2 = "";
	parking_lot.loc_desc_alt = "";
	
	var loc = [prison_cell, dining_room, multi_room, courtyard, infirmary, visiting_room, gymnasium, hallway, warden_office, security_desk, solitary, parking_lot];
	var current_loc;
	
	//Counter used to track how many times player has been to location
	
	//Array containing boolean values indicating if location is locked/unlocked
	
	//Location descriptions stored in array for centralized access, the indexes correspond to matching locations in loc array

	//Contains alternate descriptions that may be used for certain scenarios
							 
	//Defines loc_desc_used method of Location object