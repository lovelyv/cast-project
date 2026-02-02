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
        $mail->Subject = "Thank you $fullName for wanting to be showcased";
        $mail->isHTML(true);
        $name = htmlspecialchars($data['fullName'] ?? '', ENT_QUOTES, 'UTF-8');
        
        $mail->Body = '
            <img src="https://nristories.com/images/greeting.png" width="100" >
            <p><b>Thank you ' . $fullName . ' for sharing a few details.</b></p>
            <p>Our team will soon get in touch<br/>
                to explore fit, filming <strong><em>and</em></strong> collaboration.<br/><br/>
                Your first hand narration can enrich our and our viewers’ lives.</p>
                <p>Acting as an eye opener while also being emulation worthy.<br/>
                Do let us know of a convenient time to connect with you.<br/>
                </p>
            <p><b>Thanks yet again.</b><br/>
                Team NRI stories®.<br/>
            </p>
            <img src="https://nristories.com/images/logo.png" width="200">';
        $mail->send();

    echo json_encode(["success" => true]);


} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $mail->ErrorInfo]);
}
