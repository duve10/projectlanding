<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'email/Exception.php';
require 'email/PHPMailer.php';
require 'email/SMTP.php';

$nombre = $_POST['nombre'];
$persona = $_POST['persona'];
$email = $_POST['email'];
$celular = $_POST['celular'];
$mensaje = $_POST['mensaje'];
$check = $_POST['check'];



$nombreE = '/^[a-zA-ZÀ-ÿ\s]{1,40}$/'; // Letras y espacios, con acentos
$personaE = '/^[a-zA-ZÀ-ÿ\s]{1,20}$/'; // Letras y espacios, con acentos
$mensajeE = '/^[a-zA-Z0-9\_\-\.\s]{1,400}$/'; // Letras y numeros, guion y guion bajo
$celularE = '/^\d{7,14}$/'; /** de 7 a 14 números */
$emailE = '/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/';


if (preg_match($nombreE,$nombre) && preg_match($personaE,$persona) && preg_match($emailE,$email) && preg_match($celularE,$celular) && $check == 'on' ) {
    enviarEmail($nombre,$persona,$mensaje,$celular,$email);
} else {
    echo json_encode(0);
}


/** correo */
//Instantiation and passing `true` enables exceptions


function enviarEmail($nombre,$persona,$mensaje,$celular,$email){
    $mail = new PHPMailer(true);

    try {

        $mail->SMTPOptions = array(
            'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
            )
        );
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'andersonromeroloarte@gmail.com';                     //SMTP username
        $mail->Password   = '201212524';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port       = 587;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

        //Recipients
        $mail->setFrom('andersonromeroloarte@gmail.com', 'Contacto');
        $mail->addAddress('anderssonbe8@gmail.com', 'Correo Destino');     //Add a recipient
        // $mail->addAddress('ellen@example.com');               //Name is optional
        // $mail->addReplyTo('info@example.com', 'Information');
        // $mail->addCC('cc@example.com');
        // $mail->addBCC('bcc@example.com');

        //Attachments
        // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
        // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Contacto '.$nombre;
        $mail->Body    = 
                        'Mensaje de '.$nombre .'<br>'
                        .'Cargo: '.$persona .'<br>'
                        .'Celular: '.$celular.'<br>'
                        .'Correo: '.$email.'<br>'
                        .$mensaje.'<br>';
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
        echo 'Mensaje enviado';
    } catch (Exception $e) {
        echo "Mensaje de error: {$mail->ErrorInfo}";
    }
}