$(function() {
    $(".hasDropdown a").on('click tap', function() {
        $(this).parent().toggleClass('open');
        $(this).parent().find('ul.submenu').toggleClass('hide');
        console.log($(this).parent());
    })

    $(".submenu:not(hide)").on('mouseleave', function() {
        $(this).toggleClass('hide');
        $(this).parent().toggleClass('open');
    })

    $("#submit").on('click tap', function(event) {
        event.preventDefault();
        var emailVal = $("#email").val();
        console.log(emailVal);
        // emailVal.find @ if match go ahead with rest
        if (emailVal.match('@')) {
            $('#content').html('Your email has been submitted! It is' + emailVal);
            $('#banner').toggleClass('hide');
            $("#email").val('');
        } else {
            $('form').prepend('ERROR! EMAIL NEEDS CORRECTING!');
        }
        // $('header').prepend(emailVal);
    })
});