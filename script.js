import { SUPABASE_CREDENTIALS } from './credentials.js';

// Initialisation du client Supabase
const supabase = window.supabase.createClient(
    SUPABASE_CREDENTIALS.url,
    SUPABASE_CREDENTIALS.key
);

document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const sections = document.querySelectorAll('.form-section');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const form = document.getElementById('hajjOmraForm');

    // Afficher la première section
    sections[0].classList.add('active');

    // Fonction pour passer à la section suivante
    function nextSection(button) {
        const currentSection = button.closest('.form-section');
        const nextSection = currentSection.nextElementSibling;
        
        if (nextSection) {
            currentSection.classList.remove('active');
            nextSection.classList.add('active');
        }
    }

    // Fonction pour revenir à la section précédente
    function prevSection(button) {
        const currentSection = button.closest('.form-section');
        const prevSection = currentSection.previousElementSibling;
        
        if (prevSection) {
            currentSection.classList.remove('active');
            prevSection.classList.add('active');
        }
    }

    // Ajouter les écouteurs d'événements aux boutons
    nextButtons.forEach(button => {
        button.addEventListener('click', () => nextSection(button));
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => prevSection(button));
    });

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        try {
            const formData = {
                nom: document.getElementById('nom').value,
                prenom: document.getElementById('prenom').value,
                nationalite: document.getElementById('nationalite').value,
                type_voyage: document.getElementById('typeVoyage').value,
                type_hebergement: document.getElementById('typeHebergement').value,
                email: document.getElementById('email').value,
                telephone: document.getElementById('telephone').value,
                adresse: document.getElementById('adresse').value,
                ville: document.getElementById('ville').value,
                code_postal: document.getElementById('codePostal').value,
                date_creation: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('reservations')
                .insert([formData]);

            if (error) throw error;

            alert('Votre réservation a été enregistrée avec succès !');
            form.reset();
            
            // Retour à la première section
            sections.forEach(section => section.classList.remove('active'));
            sections[0].classList.add('active');
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue lors de l\'enregistrement : ' + error.message);
        }
    });
});
