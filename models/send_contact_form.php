
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
    echo json_encode([
        "status" => "error",
        "message" => "Método no permitido"
    ]);
    exit;
}

// Captura datos del formulario
$name    = $_POST["name"] ?? '';
$email   = $_POST["email"] ?? '';
$phone   = $_POST["phone"] ?? '';
$message = $_POST["message"] ?? '';

$mail = new PHPMailer(true);

try {
    // Configuración del servidor
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'profesionalizacion.cgf@gmail.com';
    $mail->Password   = 'drowkrvakgfdlbxs'; // App Password, no tu contraseña de Gmail
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Remitente y destinatario
    $mail->setFrom('profesionalizacion.cgf@gmail.com', 'Formulario Web');
    $mail->addAddress('silva.fausto.08@gmail.com');

    // Contenido
    $mail->isHTML(false);
    $mail->Subject = "Dev Innovate Lab";
    $mail->Body    = "You have received a new message from $name ($email, $phone):\n\n$message";

    $mail->send();

    echo json_encode([
        "status" => "success",
        "message" => "Mensaje enviado exitosamente!"
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "No se pudo enviar el mensaje. Error: {$mail->ErrorInfo}"
    ]);
}

