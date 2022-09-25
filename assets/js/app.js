document.body.onscroll = function myFunction() {
	let scrolltotop = document.scrollingElement.scrollTop;
	let target = document.getElementById('about-2');
	let xvalue = 'bottom';
	let factor = 0.5;
	let yvalue = scrolltotop * factor;
	target.style.backgroundPosition = xvalue + ' ' + yvalue + 'px';
};

// TODO: BUSINESS HOURS IN FOOTER
