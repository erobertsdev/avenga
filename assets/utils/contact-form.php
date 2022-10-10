<?php

if($_POST['name'] != '' && $_POST['email'] != '' && $_POST['message'] != '' && $_POST['phone'] != '' && $_POST['address'] != '') {

// All inputs trimmed/filtered for security
$to = 'erobertsdev@gmail.com'; // Email sent to Avenga
$email = str_replace(array("\r", "\n", "%0a", "%0d"), '', substr($_POST['email'],0,80));
$email = filter_var($email, FILTER_VALIDATE_EMAIL);
$reply_email = 'jrrobinson@hydroresolutions.com';
$from = $_POST['email']; // Customer email
$name = filter_var(substr($_POST['name'],0,50), FILTER_SANITIZE_FULL_SPECIAL_CHARS); // Customer name
$business_name = filter_var(substr($_POST['business-name'],0,100), FILTER_SANITIZE_FULL_SPECIAL_CHARS); // Customer business name
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
<h1 style="color:#4a6b74;">New contact form submission:</h1>
<hr>
<p><b>Name:</b> ' . $name . '</p>
';
// Check if business name is empty
if($business_name != '') {
    $message_avenga .= '<p><b>Business Name:</b> ' . $business_name . '</p>';
} else {
    $message_avenga .= '<p><b>Business Name:</b> Not Applicable / Not Provided</p>';
}
// Message trimmed to 3000 characters and any html removed from message for security
$message_avenga .= '
<p><b>Email:</b> ' . $email . '</p>
<p><b>Phone:</b> ' . $phone . '</p>
<p><b>Address:</b> ' . $address . '</p>
<p><b>Message:</b> ' . htmlspecialchars(substr($_POST['message'],0,3000)) . '</p>
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
<img src="https://eroberts.dev/avenga/assets/img/avenga-logo.png" alt="Avenga Logo" id="avenga-logo">
</div>
<main>
<h1 style="color:#4a6b74;">Thank you for contacting us! We\'ve received your message and will be in touch shortly!</h1>
<hr>
<p class="service-title">Name:</p><p class="service-p"> ' . $name . '</p>
';
// Check if business name is empty
if($business_name != '') {
  $message_customer .= '<p class="service-title">Business Name:</p><p class="service-p"> ' . $business_name . '</p>';
} else {
  $message_customer .= '<p class="service-title">Business Name:</p><p class="service-p"> Not Applicable / Not Provided</p>';
}
// Message trimmed to 3000 characters and any html removed from message for security
$message_customer .= '
<p class="service-title">Email:</p><p class="service-p"> ' . $email . '</p>
<p class="service-title">Phone:</p><p class="service-p"> ' . $phone . '</p>
<p class="service-title">Address:</p><p class="service-p"> ' . $address . '</p>
<p class="service-title">Message:</p><p class="service-p"> ' . htmlspecialchars(substr($_POST['message'],0,3000)) . '</p>
';
$message_customer .= '<hr></main></body></html>';

$headers_avenga = ['From' => 'Avenga <info@avengawaterwell.com>', 'Reply-To' => $reply_email, 'Content-type' => 'text/html; charset=iso-8859-1', 'MIME-Version' => 1.0];
$headers_customer = ['From' => 'Avenga <info@avengawaterwell.com>', 'Reply-To' => $reply_email, 'Content-type' => 'text/html; charset=iso-8859-1', 'MIME-Version' => 1.0];

$avenga_email = mail($to, 'New Contact Form Submission', $message_avenga, $headers_avenga);
$customer_email = mail($from, 'Thank you for contacting Avenga!', $message_customer, $headers_customer);

// True if email sent successfully
if ($avenga_email) {
    // Redirect back to index.html after 3 seconds
  header( 'refresh:10;url=https://eroberts.dev/avenga/index.html' );
  echo '
  <div style="font-family:Arial,Helvetica,sans-serif;text-align:center;color:#4a6b74";font-weight:"bold;">
  <h2 style="color:#4a6b74;">Message sent successfully!</h2>
  <br>
  <p>Redirecting to home page in 10 seconds...</p><br>
  <p>You can also click here <strong><a href="http://eroberts.dev/avenga">click here</a></strong>, or you can close this window.</p>
  </div>
';
  die();

} else {
    // Redirect back to contact.html after 3 seconds
  header( 'refresh:10;url=https://eroberts.dev/avenga/contact.html' );
  echo '
  <div style="font-family:Arial,Helvetica,sans-serif;text-align:center;color:#4a6b74";font-weight:"bold;">
  <h2 style="color:#4a6b74;">Sorry, an error occurred while sending the message. Please try again.</h2>
  <p>Redirecting to contact form in 10 seconds...</p>
  <p>You can also click here <strong><a href="http://eroberts.dev/avenga/contact.html">click here</a></strong>.</p>
  </div> 
';
  die();
}
}
?>