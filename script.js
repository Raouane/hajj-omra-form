import { SUPABASE_CREDENTIALS } from './credentials.js';

// Initialisation du client Supabase
const supabase = window.supabase.createClient(
    SUPABASE_CREDENTIALS.url,
    SUPABASE_CREDENTIALS.key
);

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('hajjOmraForm');
    const sections = document.querySelectorAll('.form-section');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');

    // Fonction pour vérifier la validité des champs d'une section
    function isSectionValid(section) {
        const inputs = section.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });

        return isValid;
    }

    // Fonction pour afficher une section
    function showSection(sectionIndex) {
        sections.forEach((section, index) => {
            if (index === sectionIndex) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        window.scrollTo(0, 0);
    }

    // Gestion des boutons "Suivant"
    nextButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const currentSection = this.closest('.form-section');
            const currentIndex = Array.from(sections).indexOf(currentSection);
            
            if (isSectionValid(currentSection) && currentIndex < sections.length - 1) {
                showSection(currentIndex + 1);
            }
        });
    });

    // Gestion des boutons "Précédent"
    prevButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const currentSection = this.closest('.form-section');
            const currentIndex = Array.from(sections).indexOf(currentSection);
            
            if (currentIndex > 0) {
                showSection(currentIndex - 1);
            }
        });
    });

    // Ajout des événements de validation en temps réel
    const inputs = form.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
            }
        });
    });

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Vérification de tous les champs requis
        let isValid = true;
        sections.forEach(section => {
            if (!isSectionValid(section)) {
                isValid = false;
            }
        });

        if (isValid) {
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
                showSection(0); // Retour à la première section
            } catch (error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue lors de l\'enregistrement : ' + error.message);
            }
        }
    });

    // Afficher la première section au chargement
    showSection(0);
});
