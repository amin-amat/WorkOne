$(document).ready(function() {
    checkURL();
    var answersArr = [];

    initQuestion(document.querySelector('.quiz__block'), answersArr);

    // start
    $('.start .cta').on('click tap', function() {
        // find parent, then sibling, hide it
        $('.start .cta')[0].parentElement.parentElement.parentElement.nextElementSibling.classList.remove('hide');
        $('.start').toggleClass('hide');
    });
    // selection
    $('.quiz--selection').on('click tap', function() {
        if ($('.quiz--selection.selected')) {
            $('.quiz--selection.selected').removeClass('selected');
            $(this).addClass('selected');
        } else {
            $(this).addClass('selected');
        }
    });
    // next button
    $('.quiz__button').on('click tap', function() {
        // primary parent element
        var parentElem = $(this)[0].parentElement.parentElement;
        // last quiz question
        var lastQuestion = $('.quiz__block').last()[0].className;
        // data value of selected choice
        var selectedChoice = $('.quiz--selection.selected').attr('data-key');
        if (parentElem.classList.value === lastQuestion) {
            // if above is last question
            // answersArr.push(selectedChoice);
            parentElem.classList.add('hide');
            console.log(answersArr);
            showResults(answersArr);
        } else {
            // answersArr.push(selectedChoice);
            // sibling to primary element
            // $(this)[0].parentElement.parentElement.nextElementSibling.classList.remove('hide');
            // initQuestion($(this)[0].parentElement.parentElement.nextElementSibling, answersArr);
            // parentElem.classList.add('hide');
        }
    });
});

function initQuestion (parent, answersArr) {
    var form = parent.querySelector('.quiz-form');
    var button = form.querySelector('button');
    var formRatingText = form.querySelector('.quiz__select-rating-text');
    var formRatings = form.querySelector('.quiz__select');
    var ratingSelected = false;
    var ratingSelectedInput = null;
    var allLabels = form.querySelectorAll('label');

    button.setAttribute('disabled','disabled');

    form.addEventListener('change', (e) => {
        e.preventDefault();
        
        if (e.target.value === '-2') {
            formRatingText.textContent = 'Strongly disagree';
        } else if (e.target.value === '-1') {
            formRatingText.textContent = 'Disagree';
        } else if (e.target.value === '1') {
            formRatingText.textContent = 'Agree';
        } else if (e.target.value === '2') {
            formRatingText.textContent = 'Strongly agree';
        }

        ratingSelected = true;
        ratingSelectedInput = e.target;

        button.removeAttribute('disabled');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        answersArr.push(form.elements.rating.value);
        
        if (parent.nextElementSibling.classList.contains('quiz__block')) {
            parent.nextElementSibling.classList.remove('hide');
            parent.classList.add('hide');
            initQuestion(parent.nextElementSibling, answersArr);
        } else {
            parent.classList.add('hide');
            showResults(answersArr);
        }
    });

    formRatings.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'LABEL') {
            formRatingText.textContent = e.target.textContent;
            formRatingText.classList = 'color--' + e.target.dataset.valueText + ' quiz__select-rating-text';

            if (ratingSelected) {
                // find all labels after the selected one and when hovering one of those, add class to the hovered one and all between hovered and checked
                var labels = document.querySelectorAll('.quiz__select input:checked ~ label');
                for (var i = 0; i < labels.length; i++) {
                    if (labels[i] != e.target) {
                        labels[i].classList.add('hovering');
                    } else {
                        labels[i].classList.add('hovering');
                        break;
                    }
                }
            }
        } else {
            formRatingText.textContent = 'Select one';
            formRatingText.classList = 'quiz__select-rating-text';
        }
    });

    formRatings.addEventListener('mouseout', (e) => {
        formRatings.classList.remove('hovering');
        
        if (!ratingSelected) {
            formRatingText.textContent = 'Select one';
            formRatingText.classList = 'quiz__select-rating-text';
        } else {
            for (var i = 0; i < allLabels.length; i++) {
                allLabels[i].classList.remove('hovering');
                formRatingText.textContent = ratingSelectedInput.dataset.valueText;
                formRatingText.classList = 'quiz__select-rating-text color--' + ratingSelectedInput.dataset.valueText.replace(/ /g, "-");;
            }
        }
    });
}

function tallyUp(answers) {
    return answers.reduce(function(accumulator, currentValue) {
        return parseInt(accumulator) + parseInt(currentValue);
    });
}

function posNeg(tarNum) {
    if (Math.sign(tarNum) < 1) {
        return 'negative';
    } else {
        return 'positive';
    }
}

function showResults(results) {
    var positive = "positive";
    var negative = "negative";
    var mx1_One = posNeg(results[0]);
    var mx1_Two = posNeg(results[1]);
    var resultsTally = [];
    var matrix2Results = [];
    // for building email share link
    var baseURL = 'ADD URL HERE';
    /*
    Matrix 1 Logic take first two items 0,1 in array, put under matrix 1 logic (results-one one, results-one two, results-one three, results-one four)
    */
    if (mx1_One === positive && mx1_Two === positive) {
        $('.results-one.one').removeClass('hide');
        var resultsOne = '_results-one_one';
    } else if (mx1_One === negative && mx1_Two === positive) {
        $('.results-one.two').removeClass('hide');
        var resultsOne = '_results-one_two';
    } else if (mx1_One === positive && mx1_Two === negative) {
        $('.results-one.three').removeClass('hide');
        var resultsOne = '_results-one_three';
    } else if (mx1_One === negative && mx1_Two === negative) {
        $('.results-one.four').removeClass('hide');
        var resultsOne = '_results-one_four';
    }
    // fair process 3
    resultsTally.push(results[2], results[3], results[4]);
    mx2Prep(resultsTally);
    // aligned goals 2
    resultsTally.push(results[5], results[6]);
    mx2Prep(resultsTally);
    // feedback dev 3
    resultsTally.push(results[7], results[8], results[9]);
    mx2Prep(resultsTally);
    // accountrecog 2
    resultsTally.push(results[10], results[11]);
    mx2Prep(resultsTally);

    function mx2Prep(target) {
        matrix2Results.push(posNeg(tallyUp(target)));
        resultsTally.length = 0;
    }
    var mx2_One = matrix2Results[0];
    var mx2_Two = matrix2Results[1];
    var mx2_Three = matrix2Results[2];
    var mx2_Four = matrix2Results[3];
    console.log(matrix2Results);
    /*
    Matrix 2 Logic
      .results-two.one : all negative
      .results-two.two : positive negative x 3
      .results-two.three : positive x2 negative x2
      .results-two.four : positive x3 negative
      .results-two.five : all positive
      .results-two.six : negative positive x3
      .results-two.seven : negative x2 positive x2
      .results-two.eight : negative x3 positive
      .results-two.nine : negative positive x2 negative
      .results-two.ten : positive negative x2 positive
      .results-two.eleven : positive negative positive x2
      .results-two.twelve : positive x2 negative positive
      .results-two.thirteen : negative positive negative x2
      .results-two.fourteen : negative x2 positive negative
      .results-two.fifteen : negative positive negative positive
      .results-two.sixteen : positive negative positive negative
    */
    if (mx2_One === negative && mx2_Two === negative && mx2_Three === negative && mx2_Four === negative) {
        $('.results-two.one').removeClass('hide');
        var resultsTwo = '_results-two_one';
    } else if (mx2_One === positive && mx2_Two === negative && mx2_Three === negative && mx2_Four === negative) {
        $('.results-two.two').removeClass('hide');
        var resultsTwo = '_results-two_two';
    } else if (mx2_One === positive && mx2_Two === positive && mx2_Three === negative && mx2_Four === negative) {
        $('.results-two.three').removeClass('hide');
        var resultsTwo = '_results-two_three';
    } else if (mx2_One === positive && mx2_Two === positive && mx2_Three === positive && mx2_Four === negative) {
        $('.results-two.four').removeClass('hide');
        var resultsTwo = '_results-two_four';
    } else if (mx2_One === positive && mx2_Two === positive && mx2_Three === positive && mx2_Four === positive) {
        $('.results-two.five').removeClass('hide');
        var resultsTwo = '_results-two_five';
    } else if (mx2_One === negative && mx2_Two === positive && mx2_Three === positive && mx2_Four === positive) {
        $('.results-two.six').removeClass('hide');
        var resultsTwo = '_results-two_six';
    } else if (mx2_One === negative && mx2_Two === negative && mx2_Three === positive && mx2_Four === positive) {
        $('.results-two.seven').removeClass('hide');
        var resultsTwo = '_results-two_seven';
    } else if (mx2_One === negative && mx2_Two === negative && mx2_Three === negative && mx2_Four === positive) {
        $('.results-two.eight').removeClass('hide');
        var resultsTwo = '_results-two_eight';
    } else if (mx2_One === negative && mx2_Two === positive && mx2_Three === positive && mx2_Four === negative) {
        $('.results-two.nine').removeClass('hide');
        var resultsTwo = '_results-two_nine';
    } else if (mx2_One === positive && mx2_Two === negative && mx2_Three === negative && mx2_Four === positive) {
        $('.results-two.ten').removeClass('hide');
        var resultsTwo = '_results-two_ten';
    } else if (mx2_One === positive && mx2_Two === negative && mx2_Three === positive && mx2_Four === positive) {
        $('.results-two.eleven').removeClass('hide');
        var resultsTwo = '_results-two_eleven';
    } else if (mx2_One === positive && mx2_Two === positive && mx2_Three === negative && mx2_Four === positive) {
        $('.results-two.twelve').removeClass('hide');
        var resultsTwo = '_results-two_twelve';
    } else if (mx2_One === negative && mx2_Two === positive && mx2_Three === negative && mx2_Four === negative) {
        $('.results-two.thirteen').removeClass('hide');
        var resultsTwo = '_results-two_thirteen';
    } else if (mx2_One === negative && mx2_Two === negative && mx2_Three === positive && mx2_Four === negative) {
        $('.results-two.fourteen').removeClass('hide');
        var resultsTwo = '_results-two_fourteen';
    } else if (mx2_One === negative && mx2_Two === positive && mx2_Three === negative && mx2_Four === positive) {
        $('.results-two.fifteen').removeClass('hide');
        var resultsTwo = '_results-two_fifteen';
    } else if (mx2_One === positive && mx2_Two === negative && mx2_Three === positive && mx2_Four === negative) {
        $('.results-two.sixteen').removeClass('hide');
        var resultsTwo = '_results-two_sixteen';
    }
    // build URL for email sharing
    var shareURL = baseURL + '?one=' + resultsOne + '&two=' + resultsTwo;
    console.log(shareURL);
    // target it and store in hubspot form field
    /* 
      $('.hs-input[name="web_email_opt_in"]').val(shareURL).change();

      the above is an example on how to add and change value of a field in hubspot. Target the element and add in the shareURL variable value, make sure you keep the .change() at the end.
    */
}

function checkURL() {
    console.log('checking url');
    // check for query strings, if present, match up and show/hide the Results.
    if (decodeURIComponent(getUrlParameter('one')) && decodeURIComponent(getUrlParameter('two'))) {
        console.log('we have queries in url, let\'s setup the page!');
        // check results one
        var setOne = decodeURIComponent(getUrlParameter('one')).replace(/_/g, '.');
        // check results two
        var setTwo = decodeURIComponent(getUrlParameter('two')).replace(/_/g, '.');
        $('.start').toggleClass('hide');
        $(setOne + ',' + setTwo).removeClass('hide');
    }
    console.log('all clear');
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
