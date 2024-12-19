<?php
$servername = "localhost";
$username = "root";  // Changez selon vos paramètres
$password = "";      // Changez selon vos paramètres
$dbname = "hajj_omra_db";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}
?>
