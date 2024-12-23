// Récupérer le formulaire d'événement
const form = document.getElementById("event-form");

// Ajouter un écouteur d'événement pour gérer la soumission du formulaire
form.addEventListener("submit", async function (event) {
  // Empêcher le rechargement de la page lors de la soumission
  event.preventDefault();

  try {
    // Récupérer les données saisies dans le formulaire
    const formData = new FormData(form); // Utilisation de FormData pour faciliter la récupération des données
    const photo = formData.get("photo"); // Récupération de la photo
    const title = formData.get("title"); // Récupération du titre
    const city = formData.get("city"); // Récupération de la ville
    const date = formData.get("date"); // Récupération de la date
    const description = formData.get("description"); // Récupération de la description
    const placesDisponibles = formData.get("places_disponibles"); // Récupération des places disponibles

    // Création de l'objet événement à envoyer au serveur
    const newEvent = {
      photo: photo, // URL ou chemin de la photo
      title: title, // Titre de l'événement
      city: city, // Ville où se déroule l'événement
      date: date, // Date de l'événement
      description: description, // Description détaillée de l'événement
      placesDisponibles: placesDisponibles ? parseInt(placesDisponibles) : 0, // Conversion des places en nombre
    };

    // Envoi de l'événement au serveur via une requête POST
    const response = await fetch("http://localhost:3000/event", {
      method: "POST", // Méthode HTTP utilisée
      headers: {
        "Content-Type": "application/json", // Type de contenu envoyé
      },
      body: JSON.stringify(newEvent), // Conversion de l'objet événement en JSON
    });

    // Vérification de la réponse du serveur
    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout de l'événement"); // Lever une erreur en cas de problème
    }

    const data = await response.json(); // Extraire les données de la réponse
    console.log("Événement ajouté :", data); // Afficher les détails de l'événement ajouté dans la console
    alert("Événement ajouté avec succès !"); // Afficher un message de succès à l'utilisateur

    // Réinitialiser le formulaire après une soumission réussie
    form.reset();
  } catch (error) {
    // Gestion des erreurs
    console.error("Erreur :", error); // Afficher l'erreur dans la console pour diagnostic
    alert("Une erreur est survenue lors de l'ajout de l'événement."); // Alerter l'utilisateur en cas d'échec
  }
});
