document.write(arrCombo(["a", "b", "c", "d", "e", "f"]));

function arrCombo(arrC) {

    var emptyArr = [];

    var filterArr = function(prefix, arrC) {
        for (var i = 0; i < arrC.length; i++) {
            emptyArr.push(prefix + arrC[i]);
            filterArr(prefix + arrC[i], arrC.slice(i + 1));
        }

    }
    filterArr(' ', arrC);
    return emptyArr;
}