/*
Using two arrays find the values that match and print to console.
*/
var arrayOne = [2, 8, 45, 20, 9, 35];
var arrayTwo = [9, 5, 8, 1, 2, 2, 15];

arraySort = [];

for (i = 0; i < arrayOne.length; i++) {
    var sortArr = arrayOne[i];

    for (j = 0; j < arrayTwo.length; j++) {
        if (sortArr === arrayTwo[j]) {
            console.log('We have a match ' + arrayTwo[j]);
            break;
        }
    }

}