import { SUPABASE_CREDENTIALS } from './credentials.js';

// Initialisation du client Supabase
const supabase = window.supabase.createClient(
    SUPABASE_CREDENTIALS.url,
    SUPABASE_CREDENTIALS.key
);

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('hajjOmraForm');
    const sections = Array.from(document.querySelectorAll('.form-section'));
    let currentSection = 0;

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
    function showSection(index) {
        sections.forEach((section, i) => {
            if (i === index) {
                section.style.display = 'block';
                section.classList.add('active');
            } else {
                section.style.display = 'none';
                section.classList.remove('active');
            }
        });
        currentSection = index;
        window.scrollTo(0, 0);
    }

    // Gestion des boutons "Suivant"
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', function() {
            const section = sections[currentSection];
            if (isSectionValid(section) && currentSection < sections.length - 1) {
                showSection(currentSection + 1);
            }
        });
    });

    // Gestion des boutons "Précédent"
    document.querySelectorAll('.prev-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (currentSection > 0) {
                showSection(currentSection - 1);
            }
        });
    });

    // Validation en temps réel
    form.querySelectorAll('input[required], select[required]').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
            }
        });
    });

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Vérification finale de tous les champs
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
                showSection(0);
            } catch (error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue lors de l\'enregistrement : ' + error.message);
            }
        }
    });

    // Initialiser l'affichage
    showSection(0);
});
