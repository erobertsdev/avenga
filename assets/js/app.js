// Contact Widget
// -----------------------------------
const contactWidget = document.getElementById('contact-widget'),
	contactWidgetOpen = document.getElementById('contact-widget--open'),
	contactWidgetClose = document.getElementById('contact-widget--close');

// Opens main widget when clicked
contactWidget.addEventListener('click', () => {
	// Hides small widget when clicked
	contactWidget.style.bottom = '-200px';
	// Shows full widget
	contactWidgetOpen.style.bottom = '0';
});

// Closes main widget when clicked and shows small widget
contactWidgetClose.addEventListener('click', () => {
	// Hides full widget
	contactWidgetOpen.style.bottom = '-380px';
	// Shows small widget
	contactWidget.style.bottom = '0';
});
