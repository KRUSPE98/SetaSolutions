<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido."]);
    exit;
}

$email = filter_var($_POST["email"] ?? '', FILTER_SANITIZE_EMAIL);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Correo inválido."]);
    exit;
}

$mail = new PHPMailer(true);

try {
    // Configuración del servidor SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'profesionalizacion.cgf@gmail.com';
    $mail->Password   = 'drowkrvakgfdlbxs'; // App password
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Remitente y destinatario
    $mail->setFrom('profesionalizacion.cgf@gmail.com', 'Formulario Web');
    $mail->addAddress('silva.fausto.08@gmail.com');
    $mail->addReplyTo($email);

    // Contenido
    $mail->isHTML(false);
    $mail->Subject = "Dev Innovate Lab Newsletter";
    $mail->Body    = "Se ha recibido un nuevo contacto. Correo: $email";

    $mail->send();

    echo json_encode(["success" => "Correo enviado correctamente."]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "No se pudo enviar el correo. Error: {$mail->ErrorInfo}"
    ]);
}


