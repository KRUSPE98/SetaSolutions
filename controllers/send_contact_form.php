
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

$name    = $_POST["name"] ?? '';
$email   = $_POST["email"] ?? '';
$phone   = $_POST["phone"] ?? '';
$message = $_POST["message"] ?? '';

// ========== 1. Enviar correo a tu bandeja (admin/dev) ==========
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'companyit2504@gmail.com';
    $mail->Password   = 'ygtzrmotaqdmfcru';
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom('companyit2504@gmail.com', 'Formulario Web');
    $mail->addAddress('silva.fausto.08@gmail.com');
    $mail->addAddress('companyit2504@gmail.com');

    $mail->isHTML(true);
    $mail->Subject = "Nuevo mensaje de Dev Innovate Lab";
    $mail->Body = <<<HTML
                    <!DOCTYPE html>
                    <html>
                    <head>
                    <meta charset="UTF-8">
                    <title>Nuevo mensaje desde el formulario</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; background-color: rgba(52, 152, 219, 0.1); padding: 20px; color: #333;">

                    <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 30px;">
                        
                        <div style="text-align: center; margin-bottom: 20px;">
                        <img src="http://82.25.85.85:8081/assets/img/global/logo-with-name-bg.png" alt="Dev Innovate Lab" style="max-width: 200px;">
                        </div>

                        <h2 style="color: #f4623a;">Nuevo mensaje recibido</h2>

                        <p><strong>Nombre:</strong> $name</p>
                        <p><strong>Email:</strong> $email</p>
                        <p><strong>Teléfono:</strong> $phone</p>
                        <p><strong>Mensaje:</strong></p>
                        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #087990; border-radius: 4px; margin-top: 10px;">
                        <p style="margin: 0;">$message</p>
                        </div>

                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

                        <p style="font-size: 13px; color: #888;">
                        Este mensaje fue enviado desde el formulario de contacto de <strong>Dev Innovate Lab</strong>.
                        </p>

                    </div>

                    </body>
                    </html>
                    HTML;

    $mail->send();

    // ========== 2. Enviar correo de respuesta automática ==========
    $reply = new PHPMailer(true);
    $reply->isSMTP();
    $reply->Host       = 'smtp.gmail.com';
    $reply->SMTPAuth   = true;
    $reply->Username   = 'companyit2504@gmail.com';
    $reply->Password   = 'ygtzrmotaqdmfcru';
    $reply->SMTPSecure = 'tls';
    $reply->Port       = 587;

    $reply->setFrom('companyit2504@gmail.com', 'Dev Innovate Lab');
    $reply->addAddress($email, $name); // Enviar al cliente

    $reply->isHTML(true);
    $reply->CharSet = 'UTF-8';
    $reply->Subject = "!Gracias por contactarnos!";
    $reply->Body = <<<HTML
                <!DOCTYPE html>
                <html>
                <head>
                <meta charset="UTF-8">
                <title>Gracias por contactarnos</title>
                </head>
                <body style="font-family: Arial, sans-serif; background-color: rgba(52, 152, 219, 0.1); padding: 20px; color: #333;">

                <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 30px;">
                    
                    <div style="text-align: center; margin-bottom: 20px;">
                    <img src="https://devinnovatelab.com/assets/img/global/logo-with-name-bg.png" alt="Dev Innovate Lab" style="max-width: 200px;">
                    </div>

                    <h2 style="color: #087990;">Hola $name,</h2>

                    <p style="font-size: 16px; line-height: 1.5;">
                    Gracias por escribirnos a <strong style="color: #f4623a;">Dev Innovate Lab</strong>.
                    </p>

                    <p style="font-size: 16px; line-height: 1.5;">
                    Hemos recibido tu mensaje y uno de nuestros especialistas se pondrá en contacto contigo lo antes posible. 
                    Apreciamos que confíes en nosotros para tus necesidades tecnológicas.
                    </p>

                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

                    <p style="font-size: 14px; color: #555;">
                    Si necesitas contactarnos con urgencia, puedes responder directamente a este correo o visitar nuestro sitio web.
                    </p>

                    <div style="margin-top: 30px; text-align: center;">
                    <p style="font-size: 14px; color: #888;">
                        — El equipo de <strong style="color: #087990;">Dev Innovate Lab</strong>
                    </p>
                    </div>
                </div>

                </body>
                </html>
                HTML;

    $reply->send();

    echo json_encode([
        "status" => "success",
        "message" => "Mensaje enviado exitosamente."
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Error al enviar el mensaje o la respuesta automática: {$mail->ErrorInfo}"
    ]);
}
