<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = $_POST["name"] ?? '';
    $email   = $_POST["email"] ?? '';
    $phone   = $_POST["phone"] ?? '';
    $message = $_POST["message"] ?? '';

    $to      = "silva.fausto.08@gmail.com";
    $subject = "New message from " . $name;
    $body    = "You have received a new message from $name ($email, $phone):\n\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode([
            "status" => "success",
            "message" => "Mensaje enviado exitosamente!"
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Error al enviar el mensaje."
        ]);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        "status" => "error",
        "message" => "Método no permitido"
    ]);
}
