<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars(strip_tags(trim($_POST['name'])));
    $email = htmlspecialchars(strip_tags(trim($_POST['email'])));
    $message = htmlspecialchars(strip_tags(trim($_POST['message'])));

    // Email parameters
    $to = 'ismailawmohamed1@gmail.com'; // Replace with your email
    $subject = 'New Contact Form Submission';
    $body = "Name: $name\nEmail: $email\nMessage: $message";
    $headers = "From: $email";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo 'Your message has been sent successfully!';
    } else {
        echo 'There was a problem sending your message. Please try again later.';
    }
} else {
    echo 'Invalid request method.';
}
?>
