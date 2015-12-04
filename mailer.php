<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = strip_tags(trim($_POST["name_input"]));
        $email = filter_var(trim($_POST["email_input"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["contact_message"]);

        //ensure that we have good data
        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }

        $recipient = "dev@zachis.it,zach@zachis.it";
        $subject = "New contact from $name";
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Message:\n$message\n";
        $email_headers = "From: $name <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            echo "Thank You! Your message has been sent.";
        } else {
            echo "Oops! Something went wrong and we couldn't send your message.";
        }

    } else {
        echo "There was a problem with your submission, please try again.";
    }

?>