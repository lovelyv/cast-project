<?php
// In production, keep error display off to avoid leaking details
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require "PHPMailer/src/Exception.php";
require "PHPMailer/src/PHPMailer.php";
require "PHPMailer/src/SMTP.php";

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$fullName = isset($data['fullName']) ? $data['fullName'] : '';
$to = isset($data['to']) ? $data['to'] : '';
$pdfBase64 = isset($data['pdfBase64']) ? $data['pdfBase64'] : '';

$errors = [];
$attachmentAttached = false;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = "localhost";
    $mail->SMTPAuth = false;
    $mail->Username = "";
    $mail->Password = "";
    $mail->SMTPSecure = "None";
    $mail->Port = 25;
    // Disable verbose SMTP debug in production; set to SMTP::DEBUG_SERVER when troubleshooting
    $mail->SMTPDebug = 0;

    $mail->setFrom("contact@nristories.com", "NRI Stories");
    $mail->addBCC('contact@nristories.com');  
    $mail->addAddress($to, $fullName);
    $mail->Subject = "Thank you $fullName for wanting to be showcased.";
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $safeFullName  = htmlspecialchars($data['fullName'] ?? '', ENT_QUOTES, 'UTF-8');

    // Attach signed consent PDF if provided
    if (!empty($pdfBase64)) {
        $cleanBase64 = preg_replace('/^data:application\/pdf;base64,/', '', $pdfBase64);
        $pdfData = base64_decode($cleanBase64, true);
        if ($pdfData === false) {
            $errors[] = 'invalid_pdf_base64';
            error_log('send-email: failed to decode pdfBase64');
        } else {
            $mail->addStringAttachment($pdfData, 'signed-consent.pdf', 'base64', 'application/pdf');
            $attachmentAttached = true;
        }
    }
    
    $mail->Body = '
        <img src="https://nristories.com/images/greeting.png" width="100" >
        <p><b>Thanks ' . $safeFullName . ' for jumping right in!</b></p>
        <p>Every deserving story needs to be showcased.<br />
        We are glad that you want to share yours.<br />
        You definitely have made the right call.<br /><br />
        Our mission<br />is to feature authentic stories<br />from the global Indian diaspora.<br /><br />
        We will be traversing all over the world<br />to film the lives of the everyday working Indian diaspora.<br />    
        </p>
        <p><b>Our team<br />will connect with you soon<br />
        to explore fit, filming and collaboration.</b><br /><br />
        To<br />showcase and immortalize you<br />
        across the entire digital landscape.
        </p>
        <p><b>Your involvement means a lot to us.</b><br /><br />
        <b>Thanks yet again.</b><br />
            Team <b>NRI stories&reg;</b>.<br />
        </p>
        <img src="https://nristories.com/images/logo.png" width="200">';

    if (!$mail->send()) {
        throw new Exception($mail->ErrorInfo);
    }

    echo json_encode([
        "success" => true,
        "attachmentAttached" => $attachmentAttached,
        "errors" => $errors
    ]);

} catch (Exception $e) {
    $errors[] = $mail->ErrorInfo ?: $e->getMessage();
    echo json_encode(["success" => false, "errors" => $errors]);
}
