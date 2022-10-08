<?php
// TODO: Refactor this and contact-form.php into one "email" php file

if($_POST['name'] != '' && $_POST['email'] != '' && $_POST['phone'] != '' && $_POST['address'] != '' 
&& $_POST['residence-type'] != '' && $_POST['project-type'] != '' && $_POST['description'] != '') {

$to = 'erobertsdev@gmail.com'; // email sent to Avenga
$email = str_replace(array("\r", "\n", "%0a", "%0d"), '', substr($_POST['email'],0,80)); // email sent to customer
$email = filter_var($email, FILTER_VALIDATE_EMAIL);
$reply_email = 'jrrobinson@hydroresolutions.com'; // Reply-to email from Avenga
$from = $_POST['email']; // Shows as 'Avenga-Contact@avengawaterwell.com to Avenga and customer
$name = filter_var(substr($_POST['name'],0,50), FILTER_SANITIZE_FULL_SPECIAL_CHARS); // Customer name
$phone = filter_var(substr($_POST['phone'],0,12), FILTER_SANITIZE_FULL_SPECIAL_CHARS); // Customer phone number
$address = filter_var(substr($_POST['address'],0,100), FILTER_SANITIZE_FULL_SPECIAL_CHARS); // Customer address

// **** EMAIL BODIES ****
// Message body sent to Avenga
$message_avenga = '
<!DOCTYPE html>
<html>
<head>
<style>
body { 
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  background-color: #bababc;
 }
</style>
</head>
<body>
<h1 style="color:#4a6b74;">New service request:</h1>
<hr>
<p><b>Name:</b> ' . $name . '</p>
';

// Message trimmed to 3000 characters and any html removed from message for security
$message_avenga .= '
<p><b>Email:</b> ' . $email . '</p>
<p><b>Phone:</b> ' . $phone . '</p>
<p><b>Address:</b> ' . $address . '</p>
<p><b>Service:</b> ' . $_POST['service-type'] . '</p>
<p><b>Appointment Length:</b> ' . $_POST['service-length'] . '</p>
<p><b>Appointment Date:</b> ' . $_POST['service-date'] . '</p>
<p><b>Appointment Time:</b> ' . $_POST['service-time'] . '</p>
<p><b>Residence Type:</b> ' . $_POST['residence-type'] . '</p>
<p><b>Project Type:</b> ' . $_POST['project-type'] . '</p>
<p><b>Message:</b> ' . htmlspecialchars(substr($_POST['description'],0,3000)) . '</p>
';
$message_avenga .= '<hr></body></html>';

// Message body sent to customer
$message_customer = '
<!DOCTYPE html>
<html>
<head>
<style>
body { 
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  background-color: #bababc;
 }
 #avenga-logo {
  width: 300px;
  height: auto;
  margin: 0 auto;
 }
</style>
</head>
<body>
<img src="https://eroberts.dev/avenga/assets/img/avenga-logo.png" alt="Avenga Logo" id="avenga-logo">
<h1 style="color:#4a6b74;">Thank you for choosing Avenga! We received your request and will be in touch shortly.</h1>
<h2 style="color:#000;">Here is a copy of your request:</h2>
<hr>
<p><b>Name:</b> ' . $name . '</p>
';
$message_customer .= '
<p><b>Email:</b> ' . $email . '</p>
<p><b>Phone:</b> ' . $phone . '</p>
<p><b>Address:</b> ' . $address . '</p>
<p><b>Service:</b> ' . $_POST['service-type'] . '</p>
<p><b>Appointment Length:</b> ' . $_POST['service-length'] . '</p>
<p><b>Appointment Date:</b> ' . $_POST['service-date'] . '</p>
<p><b>Appointment Time:</b> ' . $_POST['service-time'] . '</p>
<p><b>Residence Type:</b> ' . $_POST['residence-type'] . '</p>
<p><b>Project Type:</b> ' . $_POST['project-type'] . '</p>
<p><b>Message:</b> ' . htmlspecialchars(substr($_POST['description'],0,3000)) . '</p>
';
$message_customer .= '<hr></body></html>';

$headers_avenga = ['From' => 'Avenga-Service', 'Reply-To' => $email, 'Content-type' => 'text/html; charset=iso-8859-1', 'MIME-Version' => 1.0];
$headers_customer = ['From' => 'Avenga-Service', 'Reply-To' => $reply_email, 'Content-type' => 'text/html; charset=iso-8859-1', 'MIME-Version' => 1.0];

$avenga_email = mail($to, 'New Service Request', $message_avenga, $headers_avenga);
$customer_email = mail($from, 'We received your service request!', $message_customer, $headers_customer);

// True if email sent successfully
if ($avenga_email) {
    // Redirect back to index.html after 3 seconds
  header( 'refresh:8;url=https://eroberts.dev/avenga/index.html' );
  echo '
  <div style="font-family:Arial,Helvetica,sans-serif;text-align:center;>
  <div>
  <h2 style="color:green;">Appointment request sent successfully!</h2>
  <h2 style="color:green;">You will also receive a confirmation email. We will be in touch shortly!</h2>
  <br>
  <h3>Redirecting to home page in 8 seconds...<br></h3>
  <p>If you are not redirected, please <strong><a href="http://eroberts.dev/avenga">click here</a><strong>. Or you can close this window.</p>
  </div>
  </div>
';
  die();

} else {
    // Redirect back to contact.html after 3 seconds
  header( 'refresh:8;url=https://eroberts.dev/avenga/contact.html' );
  echo '
  <div style="font-family:Arial,Helvetica,sans-serif;text-align:center;>
  </div>
  <h2 style="color:red;">Sorry, an error occurred while sending the request. Please try again.</h2>
  <br><h2>Redirecting to contact form in 8 seconds...</h2><br>
  <p>If you are not redirected, please <strong><a href="http://eroberts.dev/avenga/contact.html">click here</a></strong>
  . Or you can close this window.</p></div>
';
  die();
}
}
?>