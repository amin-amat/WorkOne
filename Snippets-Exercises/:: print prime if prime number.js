// print prime if prime number
// add sum of all of non-prime numbers


var catchAll = 0;

for (i = 2; i < 21; i++) {

    for (j = 2; j < i; j++) {
        if ((i % 1 == 0) && (i % j == 1)) {
            console.log('prime');
        }

    }
    catchAll += i;

}

console.log(catchAll);

var catchAll = "";
for (i = 2; i < 21; i++) {

    if (i % i === 0 && i % 1 === 0) {
        console.log('Prime: ' + i);
    } else {
        catchAll += i;
    }

    console.log(catchAll);
}