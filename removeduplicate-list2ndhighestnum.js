/*
Find duplicate values in points array, sort the values and print out the 2nd highest value.
*/
var points = [40, 100, 1, 5, 25, 10,100,4,12,50];
document.getElementById("demo").innerHTML = points;

function removeTwin(array) {
	for(var i = array.length; i--;){
		if (array[i] == array[i+1]) array.splice(i, 1);
	}
}

function myFunction() {
    points.sort(function(a, b){return a-b});
	console.log(points);
    removeTwin(points);
	console.log(points);
	numFind = (points.length) - 2;
    document.getElementById("demo").innerHTML = points[numFind];
}