
<?php

if($_POST["name"] != '' && $_POST["email"] != '' && $_POST["message"] != '' && $_POST["phone"] != '' && $_POST["address"] != '') {

$to = 'erobertsdev@gmail.com';
$subject = 'New message from ' . $name;
$email = $_POST["email"];
$name = $_POST["name"];
$business_name = $_POST["business-name"];
$phone = $_POST["phone"];
$address = $_POST["address"];
$message = "
<!DOCTYPE html>
<html>
<head>
<title>New message from $name</title>
</head>
<body>
<h1>New contact form submission:</h1>
<hr>
<p><b>Name:</b> " . $name . "</p>
";
// Check if business name is empty
if($business_name != '') {
    $message .= "<p><b>Business Name:</b> " . $business_name . "</p>";
}
$message .= "
<p><b>Email:</b> " . $email . "</p>
<p><b>Phone:</b> " . $phone . "</p>
<p><b>Address:</b> " . $address . "</p>
<p><b>Message:</b> " . $_POST["message"] . "</p>
";
$message .= "<hr></body></html>";
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= "From: " . $email . "\r\n";


$retval = mail($to, "New Contact Form Submission", $message, "From:" . $email);

if( $retval == true ) {
  echo 'Message sent successfully! Redirecting to home page...';
  echo 'If you are not redirected, please <a href="http://erobertsdev.com/avenga">click here</a>.';
  // Redirect back to index.html after 5 seconds
  header( "refresh:3;url=../index.html" );
}else {
  echo "Sorry, an error occurred while sending the message. Please try again. Redirecting to contact form...";
  echo 'If you are not redirected, please <a href="http://erobertsdev.com/avenga/contact.html">click here</a>.';
  // Redirect back to contact.html after 5 seconds
  header( "refresh:3;url=../contact.html" );
}

}

?>