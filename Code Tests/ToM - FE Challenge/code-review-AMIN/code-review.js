"use strict";
$(function() {

    var carouselItems = [{
        src: "images/image01.jpg",
        title: "Sample 01"
    }, {
        src: "images/image02.jpg",
        title: "Sample 02"
    }, {
        src: "images/image03.jpg",
        title: "Sample 03"
    }, {
        src: "images/image04.jpg",
        title: "Sample 04"
    }, {
        src: "images/image05.jpg",
        title: "Sample 05"
    }];

    carouselBuild(carouselItems, 'carousel');

    function carouselBuild(targetCarousel, destID) {
        // keep track of the current position
        var position = 0;
        var targetID = destID;

        // build carousel based on items in the carouselItems array
        $(targetCarousel).each(function(index, value) {
            var li = $('<li/>').addClass('carousel-item').css('width', 100 / targetCarousel.length + '%').appendTo($('#' + targetID + ''));
            var img = $('<img/>').attr('src', value.src).appendTo(li);
            var liDot = $('<li/>').addClass('carousel-dots-nav-item dot').html('o').attr('id', index).appendTo($('#' + targetID + '-dots-nav'));
        });
        // increase width of the carousel
        $('#' + targetID + '').css('width', targetCarousel.length * 100 + '%');

        // show the title of the image when hovering the associated dot
        $('.dot').hover(function() {
            var target = $(this).attr('id');
            $('#title').text(targetCarousel[target].title);
        }, function() {
            $('#title').text('');
        });

        // move to the appropriate slide when a dot is clicked
        $('.dot').click(function() {
            position = $(this).attr('id');
            animateCarousel(position);
        });

        // add click event to next button
        $("#next").click(function() {
            if (position == targetCarousel.length - 1) {
                return;
            }
            position++;
            animateCarousel(position);
        });

        // add click event to previous button
        $("#previous").click(function() {
            if (position == 0) {
                return;
            }
            position--;
            animateCarousel(position);
        });

        function animateCarousel(targetPos) {
            $('#' + targetID + '').animate({
                left: -targetPos * 100 + '%'
            }, 500);
        }

    };

});