/*
Assign a random number to letter.
*/
var alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "V", "X", "Y", "Z"];

for (i = 0; i < alpha.length; i++) {
    randomizer = Math.round(Math.random() * alpha.length);
    if (randomizer === 23) {
        var randomizer = 22;
    }
    document.write("<b>" + randomizer + "</b> ")
    document.write(alpha[randomizer] + "<br>");
}