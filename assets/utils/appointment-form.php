<?php
// TODO: Refactor this and contact-form.php into one "email" php file

if($_POST['name'] != '' && $_POST['email'] != '' && $_POST['phone'] != '' && $_POST['address'] != '' 
&& $_POST['residence-type'] != '' && $_POST['project-type'] != '' && $_POST['description'] != '') {

$to = 'jrrobinson@hydroresolutions.com'; // email sent to Avenga
$email = str_replace(array("\r", "\n", "%0a", "%0d"), '', substr($_POST['email'],0,80)); // email sent to customer
$email = filter_var($email, FILTER_VALIDATE_EMAIL);
$reply_email = 'jrrobinson@hydroresolutions.com'; // Reply-to email from Avenga
$from = $_POST['email']; // Shows as 'Avenga info@avengawws.com' to Avenga and customer
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
  text-align: center;
 }
 #avenga-logo {
  width: 300px;
  height: auto;
  margin: 0 auto;
 }
 .avenga-logo {
  width: 300px;
  height: auto;
  margin: 0 auto;
 }
 h1 {
  color: #4a6b74;
  text-align: center;
  margin: 0 auto;
 }
 main {
  text-align: center;
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
 }
 .service-title {
  margin: 0 auto;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #4a6b74;
 }
 .service-p {
  margin: 0 auto;
  font-size: 14px;
  color: #000;
  font-weight: bold;
 }
</style>
</head>
<body>
<div id="avenga-logo">
<img src="https://avengawws.com/assets/img/avenga-logo.png" alt="Avenga Logo" class="avenga-logo">
</div>
<h1 style="color:#4a6b74;">Thank you for choosing Avenga! Your service request has been sent to 
management for final approval. We will be in touch shortly.</h1>
<h2 style="color:#000;">Here is a copy of your request:</h2>
<hr>
<p class="service-title">Name:</p><p class="service-p"> ' . $name . '</p>
';
$message_customer .= '
<p class="service-title">Email:</p><p class="service-p"> ' . $email . '</p>
<p class="service-title">Phone:</p><p class="service-p"> ' . $phone . '</p>
<p class="service-title">Address:</p><p class="service-p"> ' . $address . '</p>
<p class="service-title">Service:</p><p class="service-p"> ' . $_POST['service-type'] . '</p>
<p class="service-title">Appointment Length:</p><p class="service-p"> ' . $_POST['service-length'] . '</p>
<p class="service-title">Appointment Date:</p><p class="service-p"> ' . $_POST['service-date'] . '</p>
<p class="service-title">Appointment Time:</p><p class="service-p"> ' . $_POST['service-time'] . '</p>
<p class="service-title">Residence Type:</p><p class="service-p"> ' . $_POST['residence-type'] . '</p>
<p class="service-title">Project Type:</p><p class="service-p"> ' . $_POST['project-type'] . '</p>
<p class="service-title">Message:</p><p class="service-p"> ' . htmlspecialchars(substr($_POST['description'],0,3000)) . '</p>
';
$message_customer .= '<hr></body></html>';

$headers_avenga = ['From' => 'Avenga <info@avengawws.com>', 'Reply-To' => $email, 'Content-type' => 'text/html; charset=iso-8859-1', 'MIME-Version' => 1.0];
$headers_customer = ['From' => 'Avenga <info@avengawws.com>', 'Reply-To' => $reply_email, 'Content-type' => 'text/html; charset=iso-8859-1', 'MIME-Version' => 1.0];

$avenga_email = mail($to, 'New Service Request', $message_avenga, $headers_avenga);
$customer_email = mail($from, 'We received your service request!', $message_customer, $headers_customer);

// True if email sent successfully
if ($avenga_email) {
    header( 'refresh:10;url=https://avengawws.com/index.html' );
    echo '
    <div style="font-family:Arial,Helvetica,sans-serif;text-align:center;color:#4a6b74";font-weight:"bold;">
    <h2 style="color:#4a6b74;">Service request sent successfully! We will be in touch shortly.</h2>
    <br>
    <p>Redirecting to home page in 10 seconds...</p><br>
    <p>You can also click here <strong><a href="http://avengawws.com">click here</a></strong>, or you can close this window.</p>
    </div>
';
  die();

} else {
  header( 'refresh:10;url=https://avengawws.com/index.html' );
  echo '
  <div style="font-family:Arial,Helvetica,sans-serif;text-align:center;color:#4a6b74";font-weight:"bold;">
  <h2 style="color:#4a6b74;">Sorry, an error occurred while sending the message. Please try again.</h2>
  <p>Redirecting back to Avenga site in 10 seconds...</p>
  <p>You can also click here <strong><a href="http://avengawws.com/index.html">click here</a></strong>.</p>
  </div> 
';
  die();
}
}
?>