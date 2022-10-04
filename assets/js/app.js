// Contact Widget
// -----------------------------------
const contactWidget = document.getElementById('contact-widget'),
	contactWidgetOpen = document.getElementById('contact-widget--open'),
	contactWidgetClose = document.getElementById('contact-widget--close'),
	appointmentMaker = document.getElementById('appointment-maker'),
	appointmentMakerModal = document.getElementById('appointment-maker--modal'),
	appointmentMakerModalCloseButton = document.getElementById('appointment-maker--modal-close'),
	serviceBooking = document.querySelectorAll('.appointment-maker--modal-body-service');

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

// Appointment Maker
// -----------------------------------
// Opens appointment maker when clicked
appointmentMaker.addEventListener('click', () => {
	// Hides main widget
	contactWidgetOpen.style.bottom = '-380px';
	// Shows appointment maker
	contactWidget.style.bottom = '0';

	// Remove display none from appointment maker
	appointmentMakerModal.style.display = 'block';
});

appointmentMakerModalCloseButton.addEventListener('click', () => {
	// Hides appointment maker
	appointmentMakerModal.style.display = 'none';

	// Show main widget
	contactWidgetOpen.style.bottom = '0';
});

// Service Booking
// -----------------------------------
// Opens service booking when clicked
serviceBooking.forEach((service) => {
	service.addEventListener('click', () => {
		//remove service-closed class
		service.classList.remove('service-closed');
		//add service-open class
		service.classList.add('service-open');
	});
});
