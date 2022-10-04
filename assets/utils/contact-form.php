
<?php

if($_POST['name'] != '' && $_POST['email'] != '' && $_POST['message'] != '' && $_POST['phone'] != '' && $_POST['address'] != '') {

// All inputs trimmed for security
$to = 'erobertsdev@gmail.com';
$email = substr($_POST['email'],0,80);
$reply_email = 'jrrobinson@hydroresolutions.com';
$from = $_POST['email'];
$name = substr($_POST['name'],0,50);
$business_name = substr($_POST['business-name'],0,100);
$phone = substr($_POST['phone'],0,20);
$address = substr($_POST['address'],0,100);

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
  background-color: #bababc;
 }
 #avenga-logo {
  width: 200px;
  height: auto;
  margin: 0 auto;
  text-align: center;
 }
</style>
</head>
<body>
<img src="../img/logo-240w.jpg" alt="Avenga Logo" id="avenga-logo" style="width: 200px; ">
<h1 style="color:#4a6b74;">Thank you for contacting us! We received your message and will be in touch shortly!:</h1>
<hr>
<p><b>Name:</b> ' . $name . '</p>
';
// Check if business name is empty
if($business_name != '') {
  $message_customer .= '<p><b>Business Name:</b> ' . $business_name . '</p>';
} else {
  $message_customer .= '<p><b>Business Name:</b> Not Applicable / Not Provided</p>';
}
// Message trimmed to 3000 characters and any html removed from message for security
$message_customer .= '
<p><b>Email:</b> ' . $email . '</p>
<p><b>Phone:</b> ' . $phone . '</p>
<p><b>Address:</b> ' . $address . '</p>
<p><b>Message:</b> ' . htmlspecialchars(substr($_POST['message'],0,3000)) . '</p>
';
$message_customer .= '<hr></body></html>';

$headers_avenga = ['From' => 'Avenga-Contact@avengawaterwell.com', 'Reply-To' => $email, 'Content-type' => 'text/html; charset=iso-8859-1', 'MIME-Version' => 1.0];
$headers_customer = ['From' => 'Avenga-Contact@avengawaterwell.com', 'Reply-To' => $reply_email, 'Content-type' => 'text/html; charset=iso-8859-1', 'MIME-Version' => 1.0];

$avenga_email = mail($to, 'New Contact Form Submission', $message_avenga, $headers_avenga);
$customer_email = mail($from, 'Thank you for contacting Avenga!', $message_customer, $headers_customer);

// True if email sent successfully
if ($avenga_email) {
  echo '<div style="font-family:Arial,Helvetica,sans-serif;text-align:center;><h1 style="color:green;">Message sent successfully!</h1><br> Redirecting to home page in 3 seconds..';
  echo 'If you are not redirected, please <strong><a href="http://eroberts.dev/avenga">click here</a><strong>.</div>';
  // Redirect back to index.html after 3 seconds
  header( 'refresh:3;url=https://eroberts.dev/avenga/index.html' );
  die();
}else {
  echo '<div style="font-family:Arial,Helvetica,sans-serif;text-align:center;><h1 style="color:red;">Sorry, an error occurred while sending the message. Please try again.</h1><br> Redirecting to contact form in 3 seconds...';
  echo 'If you are not redirected, please <strong><a href="http://eroberts.dev/avenga/contact.html">click here</a></strong></div>.';
  // Redirect back to contact.html after 3 seconds
  header( 'refresh:3;url=https://eroberts.dev/avenga/contact.html' );
  die();
}

}

?>