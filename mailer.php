<?php 
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        $formtype = strip_tags(trim($_POST["formtype"]));

        //set default email response
        $subject = "error email";
        $email_content = "proof of email concept. Will bring submitted data soon";
        $email_headers = "From: anon";

        if ($formtype == 'contact_form'){
            $name = strip_tags(trim($_POST["name_input"]));
            $email = filter_var(trim($_POST["email_input"]), FILTER_SANITIZE_EMAIL);
            $reason = $_POST["contact_reason_dropdown"];
            $message = trim($_POST["contact_message"]);
            $subject = "New contact from $name";
            $email_content = "Name: $name\n";
            $email_content .= "Email: $email\n$reason\n";
            $email_content .= "Message:\n$message\n";
            $email_headers = "From: $name <$email>";
        } elseif ($formtype == 'suggestcontent_form') {
            $category = $_POST["suggestcontentdropdown"];
            $content = trim($_POST["sccommentbox"]);
            $subject = "New content suggestion";
            $email_content = "Category: $category\nContent Suggestion:\n$content";
        } elseif ($formtype == 'suggestjoke_form') {
            $intro = trim($_POST["sjcommentbox"]);
            $question = trim($_POST["sjquestionbox"]);
            $punchline = trim($_POST["sjpunchlinebox"]);
            $subject = "New Joke";
            $email_content = "Joke:\n$intro\n$question\n$punchline";
        } elseif ($formtype == 'suggestknockknock_form') {
            $intro = trim($_POST["kknamebox"]);
            $question = trim($_POST["kkwhobox"]);
            $punchline = trim($_POST["kkpunchlinebox"]);
            $subject = "New knock knock joke";
            $email_content = "Knock Knock\nWho is there?\n$intro\n$question who?\n$punchline";
        }

        $recipient = "zach@zachis.it,dev@zachis.it";
        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            echo "Thank You! Your message has been sent.$formtype";
        } else {
            echo "Oops! Something went wrong and we couldn't send your message.";
        }
        /*
    } else {
        echo "There was a problem with your submission, please try again.";
    }
    */
    }
?>