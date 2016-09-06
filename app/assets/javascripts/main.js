/*
	This is the scroll wheel code
*/
$('body').prepend('<a href="#" class="back-to-top">Back to Top</a>');

$('a.back-to-top').click(function() {
	$('html, body').animate({
		scrollTop: 0
	}, 700);
	return false;
});

var amountScrolled = 300;

$(window).scroll(function() {
	if ( $(window).scrollTop() > amountScrolled ) {
		$('a.back-to-top').slideDown('slow');
	} else {
		$('a.back-to-top').slideUp('slow');
	}
});


