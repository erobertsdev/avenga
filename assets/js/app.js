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
	appointmentDate = document.getElementById('date-picker--times--time');

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

const generateServiceTimes = (service) => {
	const hoursArray = [];
	// Get the current date
	let currentDate = new Date();
	// Get the current day
	let currentDay = currentDate.getDay();
	// Get the current time for Mountain Time
	let currentTime = currentDate.toLocaleString('en-US', { timeZone: 'America/Denver' });
	if (service === 'Borehole Video' || service === 'Water Well Inspection' || service === 'Service Appointment') {
	}
	return hoursArray;
};

// Restore eventlisteners for service cards that get removed when booking screen is opened
const restoreEventListeners = () => {
	// Borehole
	serviceBoreholeButton = document.getElementById('borehole-button');
	serviceBoreholeButton.addEventListener('click', () => {
		bookingScreen('Borehole Video', '1 hour', '../assets/img/service-borehole.jpg', 'Jesika Robinson');
	});

	//Well Inspection
	serviceWellInspectionButton = document.getElementById('well-inspection-button');
	serviceWellInspectionButton.addEventListener('click', () => {
		bookingScreen(
			'Water Well Inspection',
			'1 hour',
			'../assets/img/service-water-well-inspection.jpg',
			'Jesika Robinson'
		);
	});

	// Pressure Tank
	servicePressureTankButton = document.getElementById('pressure-tank-button');
	servicePressureTankButton.addEventListener('click', () => {
		bookingScreen(
			'Service Call - Pressure Tank',
			'3 hours',
			'../assets/img/service-pressure-tank.jpg',
			'Jesika Robinson'
		);
	});

	// Windmill
	serviceWindmillButton = document.getElementById('windmill-button');
	serviceWindmillButton.addEventListener('click', () => {
		bookingScreen('Service Call - Windmill', '3 hours', '../assets/img/service-windmill.jpg', 'Jesika Robinson');
	});

	// Appointment
	serviceAppointmentButton = document.getElementById('service-appointment-button');
	serviceAppointmentButton.addEventListener('click', () => {
		bookingScreen('Service Appointment', '1 hour', '../assets/img/service-appointment.png', 'Jesika Robinson');
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

/* <div id="back-button">
<h2>Go Back</h2>
</div> 
WHY DOES THIS BREAK EVERYTHING
*/

// Opens the calendar/booking summary screen
const bookingScreen = (service, time, imageURL, contact) => {
	appointmentModalBody.innerHTML = `
	<div id="date-picker">
	<div id="back-container">
		<img id="back-button" src="../assets/img/back-arrow.png" alt="back arrow" />
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
			<option value="9:00">9:00</option>
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
			<h5 class="booking-service-name">${service}</h5>
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
	document.getElementById('back-container').addEventListener('click', () => {
		restoreServiceModal();
	});
};

/******* INITIAL EVENT LISTENERS  *********/

// Borehole
serviceBoreholeButton.addEventListener('click', () => {
	bookingScreen('Borehole Video', '1 hour', '../assets/img/service-borehole.jpg', 'Jesika Robinson');
	console.log(generateServiceTimes('Borehole Video'));
});

// Water Well
serviceWellInspectionButton.addEventListener('click', () => {
	bookingScreen(
		'Water Well Inspection',
		'1 hour',
		'../assets/img/service-water-well-inspection.jpg',
		'Jesika Robinson'
	);
});

// Pressure Tank
servicePressureTankButton.addEventListener('click', () => {
	bookingScreen(
		'Service Call - Pressure Tank',
		'3 hours',
		'../assets/img/service-pressure-tank.jpg',
		'Jesika Robinson'
	);
});

// Windmill
serviceWindmillButton.addEventListener('click', () => {
	bookingScreen('Service Call - Windmill', '3 hours', '../assets/img/service-windmill.jpg', 'Jesika Robinson');
});

// Service Appointment
serviceAppointmentButton.addEventListener('click', () => {
	bookingScreen('Service Appointment', '1 hour', '../assets/img/service-appointment.png', 'Jesika Robinson');
});
