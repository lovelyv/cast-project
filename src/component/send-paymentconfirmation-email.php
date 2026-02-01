<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once __DIR__ . '/stripe-php/init.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

$endpoint_secret = 'whsec_027NPBZXgT8otugZxd2Oc8ZdwF99Mktk';

// Get raw body
$payload = @file_get_contents('php://input');
$sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '';

try {
    $event = \Stripe\Webhook::constructEvent(
        $payload,
        $sig_header,
        $endpoint_secret
    );
} catch (Exception $e) {
    http_response_code(400);
    echo 'Invalid webhook';
    exit;
}

if ($event->type === 'checkout.session.completed') 
{
    $session = $event->data->object; // This is the Checkout Session object

    // 1. Fetch the Customer's Name and Email
    $to = $session->customer_details->email;
    $fullName  = $session->customer_details->name;
    $mail = new PHPMailer(true);

    try 
    {
        $mail->isSMTP();
        $mail->Host = "localhost";
        $mail->SMTPAuth = false;
        $mail->Username = "";
        $mail->Password = "";
        $mail->SMTPSecure = "None";
        $mail->Port = 25;



        $mail->setFrom("contact@nristories.com", "NRI Stories");
        $mail->addBCC('contact@nristories.com');  
        $mail->addAddress($to, $fullName);
        $mail->Subject = "Thank you $fullName";
        $mail->isHTML(true);
        $name = htmlspecialchars($data['fullName'] ?? '', ENT_QUOTES, 'UTF-8');
        
        $mail->Body = '
            <img src="https://nristories.com/images/greeting.png" width="100" >
            <p>Thank you ' . $fullName . '.</b><br/>Your support means a lot to us here at NRI stories®.</p>
            <p>Un–hyphenated programming<br/>
            involves time, energy, effort and expense.<br/>
            </p>
            <p>We will be traversing all over the world<br/>
                to film the lives of the everyday working Indian diaspora.<br/>
            </p>
            <p>Do reach out to us<br/>
                if you or someone you know has a story to tell.<br/>
                Of a journey that resonates – that deserves to be showcased.<br/>
            </p>
            <p><b>Thanks yet again.</b><br/>
                Team NRI stories®.<br/>
            </p>
            <img src="https://nristories.com/images/logo.png" width="200">';

        $mail->send();

        echo json_encode(["success" => true]);


    } 
    catch (Exception $e) 
    {
        echo json_encode(["success" => false, "error" => $mail->ErrorInfo]);
    }
}