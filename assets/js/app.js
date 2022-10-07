// Contact Widget
// -----------------------------------
let contactWidget = document.getElementById('contact-widget'),
	contactWidgetOpen = document.getElementById('contact-widget--open'),
	contactWidgetClose = document.getElementById('contact-widget--close'),
	appointmentMaker = document.getElementById('appointment-maker'),
	appointmentMakerModal = document.getElementById('appointment-maker--modal'),
	appointmentModalBody = document.getElementById('appointment-maker--modal-body'),
	appointmentMakerModalCloseButton = document.getElementById('appointment-maker--modal-close'),
	serviceBookingButton = document.querySelectorAll('.service-button'),
	serviceBoreholeButton = document.getElementById('borehole-button'),
	serviceWellInspectionButton = document.getElementById('well-inspection-button'),
	servicePressureTankButton = document.getElementById('pressure-tank-button'),
	serviceWindmillButton = document.getElementById('windmill-button'),
	serviceAppointmentButton = document.getElementById('service-appointment-button'),
	availableTimes,
	appointmentTime,
	appointmentDate,
	appointmentButton;

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

const compareDates = () => {
	// Get current date Mountain Time
	let currentDate = new Date();
	// Convert to MST
	currentDate.setHours(currentDate.getHours() - 7);
	// convert to YYYY/MM/DD format
	let currentDateString = currentDate.toISOString().slice(0, 10);
	let myDate = document.getElementById('date-picker--calendar--date').value;
	let myDateDay = new Date(myDate).getDay();
	if (myDateDay === 5 || myDateDay === 6) {
		return 'weekend';
	} else if (myDate < currentDateString) {
		return 'past';
	} else if (myDate > currentDateString) {
		return 'future';
	} else {
		return 'today';
	}
};

const generateServiceTimes = (service) => {
	if (compareDates() === 'past') {
		availableTimes.innerHTML = `<p>Please Choose a Future Date</p>`;
		//disable appointment button
		appointmentButton.disabled = true;
	} else if (compareDates() === 'weekend') {
		availableTimes.innerHTML = `<p>Closed on Weekends</p>`;
		//disable appointment button
		appointmentButton.disabled = true;
	} else {
		const hoursArray = [ 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
		// Check if date is today and if so, remove times that have already passed
		if (compareDates() === 'today') {
			let currentHour = new Date().getHours() + 1;
			if (
				service === 'Borehole Video' ||
				service === 'Water Well Inspection' ||
				service === 'Service Appointment'
			) {
				// Filter out hours that have already passed
				let filteredHours = hoursArray.filter((hour) => hour >= currentHour);
				if (filteredHours.length === 0) {
					availableTimes.innerHTML = `<p>No Times Available</p>`;
					appointmentButton.disabled = true;
				} else {
					availableTimes.innerHTML = `
				<label for="date-picker--times--time">Time:</label>
				<select id="date-picker--times--time" name="date-picker-time">
				</select>
			`;
					appointmentTime = document.getElementById('date-picker--times--time');
					appointmentButton.disabled = false;
					filteredHours.forEach((hour) => {
						// Determine AM or PM
						let amPm = hour >= 12 ? 'PM' : 'AM';
						// convert hours to 12 hour format
						let hour12 = hour > 12 ? hour - 12 : hour;
						appointmentTime.innerHTML += `<option value="${hour12}">${hour12}:00 ${amPm}</option>`;
					});
				}
			} else {
				// Remove all items except 8, 11, 14
				let filteredHours = hoursArray.filter((hour) => hour === 8 || hour === 11 || hour === 14);
				// Filter out hours that have already passed
				filteredHours = filteredHours.filter((hour) => hour >= currentHour);
				if (filteredHours.length === 0) {
					availableTimes.innerHTML = `<p>No Times Available</p>`;
					appointmentButton.disabled = true;
				} else {
					availableTimes.innerHTML = `
				<label for="date-picker--times--time">Time:</label>
				<select id="date-picker--times--time" name="date-picker-time">
				</select>
			`;
					appointmentTime = document.getElementById('date-picker--times--time');
					appointmentButton.disabled = false;
					filteredHours.forEach((hour) => {
						// Determine AM or PM
						let amPm = hour >= 12 ? 'PM' : 'AM';
						// convert hours to 12 hour format
						let hour12 = hour > 12 ? hour - 12 : hour;
						appointmentTime.innerHTML += `<option value="${hour12}">${hour12}:00 ${amPm}</option>`;
					});
				}
			}
		} else if (compareDates() === 'future') {
			// Add all times
			availableTimes.innerHTML = `
			<label for="date-picker--times--time">Time:</label>
			<select id="date-picker--times--time" name="date-picker-time">
			</select>
		`;
			appointmentTime = document.getElementById('date-picker--times--time');
			appointmentButton.disabled = false;
			if (
				service === 'Borehole Video' ||
				service === 'Water Well Inspection' ||
				service === 'Service Appointment'
			) {
				hoursArray.forEach((hour) => {
					// Determine AM or PM
					let amPm = hour >= 12 ? 'PM' : 'AM';
					// convert hours to 12 hour format
					let hour12 = hour > 12 ? hour - 12 : hour;
					appointmentTime.innerHTML += `<option value="${hour12}">${hour12}:00 ${amPm}</option>`;
				});
			} else {
				// Remove all items except 8, 11, 14
				let filteredHours = hoursArray.filter((hour) => hour === 8 || hour === 11 || hour === 14);
				filteredHours.forEach((hour) => {
					// Determine AM or PM
					let amPm = hour >= 12 ? 'PM' : 'AM';
					// convert hours to 12 hour format
					let hour12 = hour > 12 ? hour - 12 : hour;
					appointmentTime.innerHTML += `<option value="${hour12}">${hour12}:00 ${amPm}</option>`;
				});
			}
		}
	}
};

// Restore eventlisteners for service cards that get removed when booking screen is opened
const restoreEventListeners = () => {
	// Borehole
	serviceBoreholeButton = document.getElementById('borehole-button');
	serviceBoreholeButton.addEventListener('click', () => {
		bookingScreen(
			'Borehole Video',
			'1 hour',
			'https://eroberts.dev/avenga/assets/img/service-borehole.jpg',
			'Jesika Robinson'
		);
	});

	//Well Inspection
	serviceWellInspectionButton = document.getElementById('well-inspection-button');
	serviceWellInspectionButton.addEventListener('click', () => {
		bookingScreen(
			'Water Well Inspection',
			'1 hour',
			'https://eroberts.dev/avenga/assets/img/service-water-well-inspection.jpg',
			'Jesika Robinson'
		);
	});

	// Pressure Tank
	servicePressureTankButton = document.getElementById('pressure-tank-button');
	servicePressureTankButton.addEventListener('click', () => {
		bookingScreen(
			'Service Call - Pressure Tank',
			'3 hours',
			'https://eroberts.dev/avenga/assets/img/service-pressure-tank.jpg',
			'Jesika Robinson'
		);
	});

	// Windmill
	serviceWindmillButton = document.getElementById('windmill-button');
	serviceWindmillButton.addEventListener('click', () => {
		bookingScreen(
			'Service Call - Windmill',
			'3 hours',
			'https://eroberts.dev/avenga/assets/img/service-windmill.jpg',
			'Jesika Robinson'
		);
	});

	// Appointment
	serviceAppointmentButton = document.getElementById('service-appointment-button');
	serviceAppointmentButton.addEventListener('click', () => {
		bookingScreen(
			'Service Appointment',
			'1 hour',
			'https://eroberts.dev/avenga/assets/img/service-appointment.png',
			'Jesika Robinson'
		);
	});
};

const restoreServiceModal = () => {
	appointmentModalBody.innerHTML = `
	<h4 id="appointment-maker--modal-title">Please select service:</h4>
            <div id="appointment-maker--modal-body-services">
              <div class="appointment-maker--modal-body-service">
                <div class="appointment-maker--modal-body-service--left" id="service-borehole-img">
                </div>
                <div class="appointment-maker--modal-body-service--right">
                  <h5 class="appointment-maker--modal-body-service-title">Borehole Video</h5>
                  <p class="appointment-maker--modal-body-service-time">1 hour | For a fee</p>
                  <p class="appointment-maker--modal-body-service-description">
                    Down-hole video of your well that includes a DVD copy to view at your convenience.
                  </p>
                </div>
                <div class="overlay">
                  <div class="text"><button class="service-button" id="borehole-button">Book This Service</button></div>
                </div>
              </div>

              <div class="appointment-maker--modal-body-service">
                <div class="appointment-maker--modal-body-service--left" id="service-water-well-img">
                </div>
                <div class="appointment-maker--modal-body-service--right">
                  <h5 class="appointment-maker--modal-body-service-title">Water Well Inspection</h5>
                  <p class="appointment-maker--modal-body-service-time">1 hour | For a fee</p>
                  <p class="appointment-maker--modal-body-service-description">
                    
                  </p>
                </div>
                <div class="overlay">
                  <div class="text"><button class="service-button" id="well-inspection-button">Book This Service</button></div>
                </div>
              </div>

              <div class="appointment-maker--modal-body-service">
                <div class="appointment-maker--modal-body-service--left" id="service-pressure-tank-img">
                </div>
                <div class="appointment-maker--modal-body-service--right">
                  <h5 class="appointment-maker--modal-body-service-title">Service Call - Pressure Tank</h5>
                  <p class="appointment-maker--modal-body-service-time">3 hours | For a fee</p>
                  <p class="appointment-maker--modal-body-service-description">
                    Issues with your pressure tank/switch? Let us help.
                  </p>
                </div>
                <div class="overlay">
                  <div class="text"><button class="service-button" id="pressure-tank-button">Book This Service</button></div>
                </div>
              </div>

              <div class="appointment-maker--modal-body-service">
                <div class="appointment-maker--modal-body-service--left" id="service-windmill-img">
                </div>
                <div class="appointment-maker--modal-body-service--right">
                  <h5 class="appointment-maker--modal-body-service-title">Service Call - Windmill</h5>
                  <p class="appointment-maker--modal-body-service-time">3 hours | For a fee</p>
                  <p class="appointment-maker--modal-body-service-description">
                    Need your windmill repaired or new parts to replace? Give us a call!
                  </p>
                </div>
                <div class="overlay">
                  <div class="text"><button class="service-button" id="windmill-button">Book This Service</button></div>
                </div>
              </div>

              <div class="appointment-maker--modal-body-service">
                <div class="appointment-maker--modal-body-service--left" id="service-appointment-img">
                </div>
                <div class="appointment-maker--modal-body-service--right">
                  <h5 class="appointment-maker--modal-body-service-title">Service Appointment</h5>
                  <p class="appointment-maker--modal-body-service-time">1 hour | For a fee</p>
                  <p class="appointment-maker--modal-body-service-description">
                    Out of water? Not sure why? Let us come figure it out
                    </p>
                </div>
                <div class="overlay">
                  <div class="text"><button class="service-button" id="service-appointment-button">Book This Service</button></div>
                </div>
              </div>
          </div>`;
	restoreEventListeners();
};

// Opens the calendar/booking summary screen
const bookingScreen = (service, time, imageURL, contact) => {
	appointmentModalBody.innerHTML = `
	<div id="date-picker">
	<div id="back-container">
		<img id="back-button" src="https://eroberts.dev/avenga/assets/img/back-arrow.png" alt="back arrow" />
		<p id="back-button-text">Go Back</p>
	</div>
	<div id="date-picker--left">
		<h4 id="appointment-maker--modal-title">Select date & time:</h4>
		<div id="date-picker--calendar">
		<form id="date-picker--calendar--form">
		<label for="date-picker--calendar--date">Date:</label>
			<input type="date" id="date-picker--calendar--date" name="date-picker" />
		</div>
		<div id="date-picker--times">
			<label for="date-picker--times--time">Time:</label>
			<select id="date-picker--times--time" name="date-picker-time">
			</select>
		</div>
		<div id="date-picker--submit">
			<button id="date-picker--submit-button">Submit</button>
		</div>
		</form>
		</div>
		<div id="date-picker--right">
		<div id="appointment-maker--modal-summary">
			<h4 class="booking-title">Booking Summary</h4>
			<img src="${imageURL}" alt="Service Image" class="service-image" />
			<div id="appointment-maker--modal-body-summary">
			<h5 class="booking-service-name" id="booking-service">${service}</h5>
			<hr class="summary-hr" />
			<p class="booking-service-time">${time}</p>
			<hr class="summary-hr" />
			<p class="booking-service-fee">For a fee</p>
			<hr class="summary-hr" />
			<a href="mailto:jrrobinson@hydroresolutions.com">Contact:<p class="booking-service-contact"> ${contact}</p></a>
		</div>
		</div>
		</div>
	</div>
	`;
	availableTimes = document.getElementById('date-picker--times');
	appointmentDate = document.getElementById('date-picker--calendar--date');
	appointmentButton = document.getElementById('date-picker--submit-button');
	document.getElementById('back-container').addEventListener('click', () => {
		restoreServiceModal();
	});
	appointmentDate.addEventListener('change', () => {
		// Change availableTimes visibility
		availableTimes.style.visibility = 'visible';
		let serviceName = document.getElementById('booking-service').innerHTML;
		generateServiceTimes(serviceName);
	});
};

/******* INITIAL EVENT LISTENERS  *********/

// Borehole
serviceBoreholeButton.addEventListener('click', () => {
	bookingScreen(
		'Borehole Video',
		'1 hour',
		'https://eroberts.dev/avenga/assets/img/service-borehole.jpg',
		'Jesika Robinson'
	);
});

// Water Well
serviceWellInspectionButton.addEventListener('click', () => {
	bookingScreen(
		'Water Well Inspection',
		'1 hour',
		'https://eroberts.dev/avenga/assets/img/service-water-well-inspection.jpg',
		'Jesika Robinson'
	);
});

// Pressure Tank
servicePressureTankButton.addEventListener('click', () => {
	bookingScreen(
		'Service Call - Pressure Tank',
		'3 hours',
		'https://eroberts.dev/avenga/assets/img/service-pressure-tank.jpg',
		'Jesika Robinson'
	);
});

// Windmill
serviceWindmillButton.addEventListener('click', () => {
	bookingScreen(
		'Service Call - Windmill',
		'3 hours',
		'https://eroberts.dev/avenga/assets/img/service-windmill.jpg',
		'Jesika Robinson'
	);
});

// Service Appointment
serviceAppointmentButton.addEventListener('click', () => {
	bookingScreen(
		'Service Appointment',
		'1 hour',
		'https://eroberts.dev/avenga/assets/img/service-appointment.png',
		'Jesika Robinson'
	);
});
