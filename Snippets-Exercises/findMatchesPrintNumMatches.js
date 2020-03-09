/*
Search string
find matches
Log number of matches in Object
*/

var copy = 'The editio princeps, based mainly on the transcript of D, was printed at Venice, 1472: the first the scientific text, based on B, C and D, was that of Camerarius, completed 1552, in whose steps followed Lambinus with a commentary which is still useful, 1576; Taubmann, 1605-1621; Pareus a meritorious edition, 1619 and 1623; Guyet, edited by Marolles, 1658; Gronovius the Vulgate, 1664-1684; then, after the lapse of more than a century, came the editions of Bothe, 1809-1811; Naudet, 1830; and Weise, 1837-1848.';

var newArr = copy.toLowerCase().split(' ');
var copyObj = {};

newArr.forEach(function (a) {
  copyObj[a] ? copyObj[a] += 1 : copyObj[a] = 1;
});

console.log(copyObj);