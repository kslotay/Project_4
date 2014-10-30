var Location = {};

//LOCATION VARIABLES:
	
	//All location variables/properties are stored in the Location object
	//Locations stored in array to provide central access
	Location.loc = ["Prison Cell",
					"Dining Room",
					"Multi-purpose Room",
					"Courtyard",
					"Infirmary",
					"Visiting Room",
					"Gymnasium",
					"Hallway",
					"Warden's Office",
					"Security Desk",
					"Solitary",
					"Parking Lot"];
	
	//Counter used to track how many times player has been to location
	Location.loc_visited = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	
	//Array containing boolean values indicating if location is locked/unlocked
	Location.loc_locked = [true, false, false, false, false, false , false, false, false, true, false, false];
	
	//Location descriptions stored in array for centralized access, the indexes correspond to matching locations in loc array
	Location.loc_desc0 = ["It is dark, damp and smelly. The cell door is locked. There is a lock pick on the floor.",
						  "There are a number of dining tables. There is food!",
						  "There is no one in the multi-purpose room. The TV is on.",
						  "The courtyard is empty except for the few guards on watch duty.",
						  "There is a doctor in the infirmary, he does not want you there. He calls the guards!",
						  "There is no one in the visiting room. Your family does not want to see you.",
						  "There is a basketball game between inmates currently taking place. They will not allow you to join!",
						  "The hallway is empty. You can hear noises from the gymnasium.",
						  "The Warden is currently on the phone, he ignores you.",
						  "There is a guard in on the security desk. He is eating a doughnut.",
						  "",
						  ""];

	Location.loc_desc1 = ["It is dark, damp and smelly. The cell door is open.",
						  "There are a number of dining tables. There is food!",
						  "There are a number of other prison inmates sitting around, they ignore you.",
					      "The courtyard is empty except for the few guards on watch duty.",
						  "There is no one in the infirmary.",
						  "There is no one in the visiting room. Your family does not want to see you.",
						  "There is a basketball game between inmates currently taking place, but they will not allow you to join! The situation is quickly turning into a riot!",
						  "The hallway is empty. You can hear the noises from the gymnasium",
						  "The Warden ignores you, he is talking on the phone.",
						  "There is no one at the security desk.",
						  "",
						  ""];
					
	Location.loc_desc2 = ["It is dark, damp and smelly. The cell door is open.",
						 "The dining room is empty. There is food!",
						 "There is no one in the multi-purpose room.",
						 "The courtyard is empty except for the few guards on watch duty.",
						 "The infirmary is empty. There is a radio relaying some news!",
						 "Some inmates have overpowered the guards and taken over the sitting room!",
						 "The gymnasium is dark and empty. There are some dead bodies on the basketball court. There is a lock pick on the floor.",
						 "There is a stand-off between the guards and inmates in the hallway! The Warden's office is locked.",
						 "There is a safe inside, but you cannot open it.",
						 "The security desk has been destroyed, and the rest of the room is empty.",
						 "",
						 ""];

	//Contains alternate descriptions that may be used for certain scenarios
	Location.loc_desc_alt = ["It is dark, damp and smelly. The cell door is locked. You have a lock pick!",
							 "The dining room is empty!",
							 "",
							 "The courtyard is empty. The electric fence has been breached! You have a chance to escape!",
							 "",
							 "The visiting room is deserted.",
						     "The gymnasium is dark and empty. There are some dead bodies on the basketball court.",
							 "The hallway is deserted.",
							 "There is a safe inside, but you cannot open it.",
							 "",
							 "",
							 ""];
							 
	//Defines loc_desc_used method of Location object
	Location.loc_desc_used = function() {switch (Location.loc_visited[Location.current_loc]) {
														case 0:
															return Location.loc_desc0;
															break;
														case 1:
															return Location.loc_desc1;
															break;
														default:
															return Location.loc_desc2;
													}};