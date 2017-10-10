/*
Using the check array as your base, determine if the values array has the correct number of brace pairs.
*/
	var values =["{}[](){}","{[}]}"];
	var check = ['{}','[]','()'];
	var arr1 = [];
	var hit = 0;
	var saved ='';

	Braces(values);

	function Braces(entry) {
		for(a of check){
			//console.log(a);
			for(b of a) {
				//console.log(b); //prints out sole char
				for(c of entry) {
					//console.log(c);
					for(d of c) {
						//console.log(d);
						if (d == b) {
							hit++;
							saved =  hit;
						}
					}
				}
				arr1.push(saved);
				hit = 0;
				//reset hit counter
			}
		}
		console.log(arr1);
		//print to console to verify
		var lengthTest = arr1.length;

		for(i=0;i<lengthTest;i=i+1){
			testA = arr1[i];
			testB = arr1[i=i+1];
				if(testA != testB){
					console.log('No Match ' + testA + ':' + testB);
					//prints out error message and the values not matching
				}
		}
	}