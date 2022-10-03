
<?php

if($_POST["name"] != '' && $_POST["email"] != '' && $_POST["message"] != '' && $_POST["phone"] != '' && $_POST["address"] != '') {

$to = 'eliroberts9@gmail.com';
$email = $_POST["email"];
$name = $_POST["name"];
$phone = $_POST["phone"];
$address = $_POST["address"];
$message = $_POST["message"];
$subject = 'New message from ' . $name;

mail($to, "New Contact Form Submission", $message, "From:" . $email);

}

?>