"use strict";

let totalWatt = 0;
let totalWatt2 = 0;
let count = 0;
let count2 = 0;

for(let i=1; i < 20; i++) {
   if(i % 2 == 0){

      if(i<5) {
        totalWatt = 62;
        count++;
        let totalWatt2 = totalWatt * count;

        document.write('Generator '+ i +' is on, adding 62MW, for a total of ' + totalWatt2 +' MW.<br>');

      } else {
        totalWatt = 124;
        count2++;
        totalWatt2 = totalWatt * count2 + 124;
        
        document.write('Generator '+ i +' is on, adding 124MW, for a total of ' + totalWatt2 +' MW.<br>');

      }

   } else {
    document.write('Generator '+ i +' is off.<br>');
  }

}

