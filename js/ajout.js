// Ajouter un écouteur d'événement pour intercepter la soumission du formulaire
document
  .getElementById("userForm")
  .addEventListener("submit", async function (event) {
    // Empêcher le rechargement de la page lors de la soumission du formulaire
    event.preventDefault();

    // Récupération des données saisies dans le formulaire
    const formData = {
      titre: document.getElementById("titre").value, // Titre du film
      realisateur: document.getElementById("realisateur").value, // Réalisateur du film
      annee: document.getElementById("annee").value, // Année de sortie
      genre: document.getElementById("genre").value, // Genre du film
      synopsis: document.getElementById("synopsis").value, // Synopsis du film
      affiche: document.getElementById("affiche").value, // URL de l'affiche du film
      duree: document.getElementById("duree").value, // Durée du film
    };

    /**
     * Fonction asynchrone pour envoyer les données à l'API
     * @param {Object} data - Données du formulaire à envoyer
     */
    const envoyerDonnees = async (data) => {
      try {
        // Envoi de la requête POST au serveur
        const response = await fetch("http://localhost:3000/films", {
          method: "POST", // Méthode HTTP utilisée
          headers: {
            "Content-Type": "application/json", // Type de contenu envoyé
          },
          body: JSON.stringify(data), // Conversion des données en JSON
        });

        // Vérification de la réponse
        if (response.ok) {
          alert("Données envoyées avec succès !"); // Message de succès
        } else {
          alert("Erreur lors de l'envoi des données."); // Message en cas d'échec
        }
      } catch (error) {
        // Gestion des erreurs en cas de problème de communication avec le serveur
        console.error("Erreur :", error);
        alert(
          "Une erreur est survenue lors de la communication avec le serveur."
        );
      }
    };

    // Appel de la fonction pour envoyer les données récupérées du formulaire
    await envoyerDonnees(formData);
  });
