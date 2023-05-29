// USING JQUERY FOR THE FADE EFFECT
$(document).ready(function() {

    $(".search__select").change(function(e) {
        e.preventDeafult;
        $("article").show();
        var selected = $(".search__select").val();
        if(selected === '') {
            $("article").removeClass('hide');
        } else {
            var target = 'article:not([data-locale~="'+ selected + '"])';
            $(target).fadeOut();
        }
    })

    $("#searchsubmit").on('click',function(e) {
        var inTar = $('.search__txt').val(); 
		inTar = inTar.charAt(0).toUpperCase() + inTar.slice(1);

        if(inTar === '' || !$('[data-locale~="'+ inTar + '"]')) {
            $("article").removeClass('hide');
        } else {
            $("article").show();
            var target = 'article:not([data-locale~="'+ inTar + '"])';
            $(target).fadeOut();
            $(this).fadeOut();
            $("#clear").show();
        }

    })

    $("#clear").on('click', function() {
        $('.search__txt').val("");
        $(this).fadeOut();
        $("article, #searchsubmit").show();
    })
   
});