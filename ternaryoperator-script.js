/*
Inside the function, you need to return an anonymous function based on the number that the user selected. Each of your three anonymous functions should contain a boarding alert message:
If the user selects 1:
You selected the Vines of Doom!
If the user selects 2:
Looks like you want the Lake of Despair!
If the user selects 3:
The Caves of Catastrophe!
Assume the user’s choice has already been stored as 1, 2, or 3, and is passed in as the userChoice parameter. Make sure that you return all message functions as anonymous functions, instead of stored in variables. You do not need to call the function at the end.
 
Code:
*/
userChoice = prompt('Select 1, 2 or 3');

adventureSelector(userChoice);

function adventureSelector(userChoice) {
	var a = userChoice;
	var check =  a > 2 ? "The Caves of Catastrophe!" : a > 1 ? "Looks like you want the Lake of Despair!" : "You selected the Vines of Doom!";
	return alert(check);
}