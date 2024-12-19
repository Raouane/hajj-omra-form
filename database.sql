CREATE DATABASE IF NOT EXISTS hajj_omra_db;
USE hajj_omra_db;

CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE NOT NULL,
    nationalite VARCHAR(100) NOT NULL,
    num_passeport VARCHAR(50) NOT NULL,
    date_expiration_passeport DATE NOT NULL,
    type_voyage ENUM('hajj', 'omra') NOT NULL,
    date_depart DATE NOT NULL,
    duree_voyage INT NOT NULL,
    type_hebergement VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    adresse TEXT NOT NULL,
    ville VARCHAR(100) NOT NULL,
    code_postal VARCHAR(20) NOT NULL,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
);
