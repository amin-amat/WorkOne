var mainElement = document.getElementById("stoplight");
var one = mainElement.childNodes[1];
var two = mainElement.childNodes[3];
var three = mainElement.childNodes[5];

mainElement.onclick = function run() {
    if (one.classList.contains('active')) {
        classReplace(one);
        classAssign(three);
    } else if (three.classList.contains('active')) {
        classReplace(three);
        classAssign(two);
    } else if (two.classList.contains('active')) {
        classReplace(two);
        classAssign(one);
    }
}

function classReplace(target) {
    target.className = target.className.replace(/(?:^|\s)active(?!\S)/, '');
    return target.className;
}

function classAssign(target) {
    target.className += " active";
    return target.className;
}