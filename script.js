import { SUPABASE_CREDENTIALS } from './credentials.js';

// Initialisation du client Supabase
const supabase = window.supabase.createClient(
    SUPABASE_CREDENTIALS.url,
    SUPABASE_CREDENTIALS.key
)

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('hajjOmraForm');
    const sections = document.querySelectorAll('.form-section');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');

    // Afficher la première section au chargement
    sections[0].classList.add('active');

    // Gestion des boutons "Suivant"
    nextButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const currentSection = this.closest('.form-section');
            const nextSection = currentSection.nextElementSibling;
            
            // Vérification des champs de la section courante
            const inputs = currentSection.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            if (isValid && nextSection) {
                currentSection.classList.remove('active');
                nextSection.classList.add('active');
                window.scrollTo(0, 0);
            }
        });
    });

    // Gestion des boutons "Précédent"
    prevButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const currentSection = this.closest('.form-section');
            const prevSection = currentSection.previousElementSibling;
            
            if (prevSection) {
                currentSection.classList.remove('active');
                prevSection.classList.add('active');
                window.scrollTo(0, 0);
            }
        });
    });

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Vérification de tous les champs requis
        const inputs = form.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
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
                // Retour à la première section
                sections.forEach(section => section.classList.remove('active'));
                sections[0].classList.add('active');
            } catch (error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue lors de l\'enregistrement : ' + error.message);
            }
        }
    });
});
