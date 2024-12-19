<?php
header('Content-Type: application/json');
require_once 'config.php';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Récupération des données du formulaire
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Préparation de la requête SQL
        $sql = "INSERT INTO reservations (
            nom, prenom, date_naissance, nationalite, 
            num_passeport, date_expiration_passeport,
            type_voyage, date_depart, duree_voyage, 
            type_hebergement, email, telephone,
            adresse, ville, code_postal,
            date_creation
        ) VALUES (
            :nom, :prenom, :date_naissance, :nationalite,
            :num_passeport, :date_expiration_passeport,
            :type_voyage, :date_depart, :duree_voyage,
            :type_hebergement, :email, :telephone,
            :adresse, :ville, :code_postal,
            NOW()
        )";

        $stmt = $conn->prepare($sql);
        
        // Liaison des paramètres
        $stmt->bindParam(':nom', $data['nom']);
        $stmt->bindParam(':prenom', $data['prenom']);
        $stmt->bindParam(':date_naissance', $data['dateNaissance']);
        $stmt->bindParam(':nationalite', $data['nationalite']);
        $stmt->bindParam(':num_passeport', $data['numPasseport']);
        $stmt->bindParam(':date_expiration_passeport', $data['dateExpiration']);
        $stmt->bindParam(':type_voyage', $data['typeVoyage']);
        $stmt->bindParam(':date_depart', $data['dateDepart']);
        $stmt->bindParam(':duree_voyage', $data['dureeVoyage']);
        $stmt->bindParam(':type_hebergement', $data['typeHebergement']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':telephone', $data['telephone']);
        $stmt->bindParam(':adresse', $data['adresse']);
        $stmt->bindParam(':ville', $data['ville']);
        $stmt->bindParam(':code_postal', $data['codePostal']);

        // Exécution de la requête
        $stmt->execute();
        
        echo json_encode(['success' => true, 'message' => 'Réservation enregistrée avec succès']);
    }
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur: ' . $e->getMessage()]);
}
?>
