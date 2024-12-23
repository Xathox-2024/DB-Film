// Ajouter un écouteur d'événement pour gérer la soumission du formulaire
document
  .getElementById("userForm")
  .addEventListener("submit", async function (event) {
    // Empêcher le comportement par défaut du formulaire (rechargement de la page)
    event.preventDefault();

    try {
      // Récupérer les données saisies dans le formulaire
      const formData = {
        titre: document.getElementById("titre").value, // Titre du film
        realisateur: document.getElementById("realisateur").value, // Réalisateur du film
        annee: document.getElementById("annee").value, // Année de sortie
        genre: document.getElementById("genre").value, // Genre du film
        synopsis: document.getElementById("synopsis").value, // Synopsis du film
        affiche: document.getElementById("affiche").value, // URL de l'affiche du film
        duree: document.getElementById("duree").value, // Durée du film
      };

      // Envoi des données au serveur via une requête HTTP POST
      const response = await fetch("http://localhost:3000/films", {
        method: "POST", // Méthode utilisée pour l'envoi
        headers: {
          "Content-Type": "application/json", // Type de contenu envoyé
        },
        body: JSON.stringify(formData), // Conversion des données en format JSON
      });

      // Vérification de la réponse du serveur
      if (response.ok) {
        alert("Données envoyées avec succès !"); // Message en cas de succès
      } else {
        alert(
          "Erreur lors de l'envoi des données. Code statut : " + response.status
        ); // Message en cas d'échec avec le code statut
      }
    } catch (error) {
      // Gestion des erreurs en cas de problème réseau ou autre
      console.error("Erreur :", error); // Log détaillé dans la console
      alert(
        "Une erreur est survenue lors de la communication avec le serveur."
      ); // Message d'erreur pour l'utilisateur
    }
  });
