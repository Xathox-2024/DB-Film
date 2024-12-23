const form = document.getElementById('event-form');

// Lors de la soumission du formulaire
form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Empêche l'envoi par défaut du formulaire

    try {
        // Récupérer les données du formulaire
        const formData = new FormData(form);
        const photo = formData.get('photo'); // Récupérer la photo
        const title = formData.get('title');
        const city = formData.get('city');
        const date = formData.get('date');
        const description = formData.get('description');
        const placesDisponibles = formData.get('places_disponibles'); // Notez l'utilisation de `get`

        // Créer l'objet événement
        const newEvent = {
            photo: photo,
            title: title,
            city: city,
            date: date,
            description: description,
            placesDisponibles: placesDisponibles ? parseInt(placesDisponibles) : 0, // Convertir si nécessaire
        };

        // Envoyer les données au serveur JSON-server
        const response = await fetch('http://localhost:3000/event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent), // Convertir l'objet en JSON
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout de l\'événement');
        }

        const data = await response.json();
        console.log('Événement ajouté :', data);
        alert('Événement ajouté avec succès !');
        // Réinitialiser le formulaire après soumission
        form.reset();
    } catch (error) {
        console.error('Erreur :', error);
        alert('Une erreur est survenue lors de l\'ajout de l\'événement.');
    }
});
