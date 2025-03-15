<?php
// Permitir solicitudes desde cualquier origen (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["error" => "Correo inválido"]);
        exit;
    }

    $para = "silva.fausto.08@gmail.com"; // Cambia esto por tu correo
    $asunto = "Nuevo contacto desde la web";
    $mensaje = "Se ha recibido un nuevo contacto. Correo: " . $email;
    $cabeceras = "From: noreply@tudominio.com" . "\r\n" .
                 "Reply-To: " . $email . "\r\n" .
                 "Content-Type: text/plain; charset=UTF-8";

    if (mail($para, $asunto, $mensaje, $cabeceras)) {
        echo json_encode(["success" => "Correo enviado correctamente."]);
    } else {
        echo json_encode(["error" => "No se pudo enviar el correo."]);
    }
} else {
    echo json_encode(["error" => "Método no permitido."]);
}
?>

