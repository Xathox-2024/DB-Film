document
  .getElementById("userForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    const formData = {
      titre: document.getElementById("titre").value,
      realisateur: document.getElementById("realisateur").value,
      annee: document.getElementById("annee").value,
      genre: document.getElementById("genre").value,
      synopsis: document.getElementById("synopsis").value,
      affiche: document.getElementById("affiche").value,
      duree: document.getElementById("duree").value,
    };

    // Fonction asynchrone pour envoyer les données
    const envoyerDonnees = async (data) => {
      try {
        const response = await fetch("http://localhost:3000/films", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert("Données envoyées avec succès !");
        } else {
          alert("Erreur lors de l'envoi des données.");
        }
      } catch (error) {
        console.error("Erreur :", error);
        alert("Une erreur est survenue lors de la communication avec le serveur.");
      }
    };

    // Appeler la fonction pour envoyer les données
    await envoyerDonnees(formData);
  });
