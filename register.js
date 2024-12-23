document.getElementById("registerForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // Empêcher le rechargement de la page

  // Récupérer les valeurs des champs du formulaire
  const username = document.getElementById("newUsername").value.trim();
  const userpassword = document.getElementById("newPassword").value.trim();

  // Validation des champs
  if (!username || !userpassword) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  // Préparer les données pour l'envoi
  const formData = {
    username: username,
    userpassword: userpassword,
    type: "user", // Type par défaut
  };

  // Fonction asynchrone pour enregistrer l'utilisateur
  const registerUser = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement de l'utilisateur.");
      }

      alert("Utilisateur enregistré avec succès !");
      // Réinitialiser le formulaire
      document.getElementById("registerForm").reset();
    } catch (error) {
      console.error("Erreur :", error);
      alert("Une erreur est survenue lors de la requête.");
    }
  };

  // Appeler la fonction pour enregistrer l'utilisateur
  await registerUser(formData);
});
