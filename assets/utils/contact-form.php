
<?php

if($_POST['name'] != '' && $_POST['email'] != '' && $_POST['message'] != '' && $_POST['phone'] != '' && $_POST['address'] != '') {

// All inputs trimmed for security
$to = 'erobertsdev@gmail.com';
$email = substr($_POST['email'],0,80);
$from = $_POST['email'];
$name = substr($_POST['name'],0,50);
$business_name = substr($_POST['business-name'],0,100);
$phone = substr($_POST['phone'],0,20);
$address = substr($_POST['address'],0,100);
$message = '
<!DOCTYPE html>
<html>
<head>
<title>New message from $name</title>
</head>
<body>
<h1>New contact form submission:</h1>
<hr>
<p><b>Name:</b> ' . $name . '</p>
';
// Check if business name is empty
if($business_name != '') {
    $message .= '<p><b>Business Name:</b> ' . $business_name . '</p>';
} else {
    $message .= '<p><b>Business Name:</b> Not Applicable / Not Provided</p>';
}
// Message trimmed to 3000 characters and any html removed from message for security
$message .= '
<p><b>Email:</b> ' . $email . '</p>
<p><b>Phone:</b> ' . $phone . '</p>
<p><b>Address:</b> ' . $address . '</p>
<p><b>Message:</b> ' . htmlspecialchars(substr($_POST['message'],0,3000)) . '</p>
';
$message .= '<hr></body></html>';
$headers = ['From' => $email, 'Reply-To' => $email, 'Content-type' => 'text/html; charset=iso-8859-1', 'MIME-Version' => 1.0];
// $headers = 'MIME-Version: 1.0' . '\r\n'; 
// $headers .= 'Content-type:text/html;charset=UTF-8' . '\r\n'; 
// $headers .= 'From' => $email . '\r\n';


$retval = mail($to, 'New Contact Form Submission', $message, $headers);

if( $retval == true ) {
  echo '<h1 style="color:green;">Message sent successfully!</h1><br> Redirecting to home page...';
  echo 'If you are not redirected, please <strong><a href="http://eroberts.dev/avenga">click here</a><strong>.';
  // Redirect back to index.html after 3 seconds
  header( 'refresh:3;url=https://eroberts.dev/avenga/index.html' );
  die();
}else {
  echo '<h1 style="color:red;">Sorry, an error occurred while sending the message. Please try again.</h1><br> Redirecting to contact form...';
  echo 'If you are not redirected, please <strong><a href="http://eroberts.dev/avenga/contact.html">click here</a></strong>.';
  // Redirect back to contact.html after 3 seconds
  header( 'refresh:3;url=https://eroberts.dev/avenga/contact.html' );
  die();
}

}

?>