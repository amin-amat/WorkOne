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
})