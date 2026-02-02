<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$data = json_decode(file_get_contents("php://input"), true);
$fullName = isset($data['fullName']) ? $data['fullName'] : '';
$to = isset($data['to']) ? $data['to'] : '';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "PHPMailer/src/Exception.php";
require "PHPMailer/src/PHPMailer.php";
require "PHPMailer/src/SMTP.php";

$mail = new PHPMailer(true);

try {
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
        $mail->Subject = "Thank you $fullName for wanting to be showcased.";
        $mail->isHTML(true);
        $name = htmlspecialchars($data['fullName'] ?? '', ENT_QUOTES, 'UTF-8');
        
        $mail->Body = '
            <img src="https://nristories.com/images/greeting.png" width="100" >
            <p><b>Thanks ' . $fullName . ' for jumping right in!</b></p>
            <p>Every deserving story needs to be showcased.<br/>
            We are glad that you want to share yours.<br/>
            You definitely have made the right call.<br/><br/>
            Our mission<br/>is to feature authentic stories<br/>from the global Indian diaspora.<br/><br/>
            We will be traversing all over the world<br/>to film the lives of the everyday working Indian diaspora.<br/>    
            </p>
            <p>Our team<br/>will connect with you soon<br/>
            to explore fit, filming and collaboration.<br/><br/>
            To<br/>showcase and immortalize you<br/>
            across the entire digital landscape.
            </p>
            <p>Your involvement means a lot to us.<br/>
            <b>Thanks yet again.</b><br/>
                Team NRI stories®.<br/>
            </p>
            <img src="https://nristories.com/images/logo.png" width="200">';
        $mail->send();

    echo json_encode(["success" => true]);


} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $mail->ErrorInfo]);
}
