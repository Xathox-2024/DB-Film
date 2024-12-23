// Gestionnaire de l'événement "submit" du formulaire d'inscription
document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupération des valeurs des champs du formulaire
    const username = document.getElementById("newUsername").value.trim();
    const userpassword = document.getElementById("newPassword").value.trim();

    // Validation des champs : Vérifie si les champs sont remplis
    if (!username || !userpassword) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    // Validation du mot de passe : critères requis
    const hasUppercase = /[A-Z]/.test(userpassword); // Contient au moins une majuscule
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(userpassword); // Contient un caractère spécial
    const hasNumber = /\d/.test(userpassword); // Contient un chiffre
    const hasMinLength = userpassword.length >= 8; // Longueur minimale de 8 caractères

    if (!hasMinLength || !hasUppercase || !hasSpecialChar || !hasNumber) {
      alert(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial."
      );
      return;
    }

    // Vérification si l'utilisateur existe déjà
    const users = await fetchUsers();
    if (!users) {
      return; // Arrêter en cas d'erreur lors de la récupération des utilisateurs
    }

    const userExists = users.some((user) => user.username === username); // Vérifie si l'utilisateur existe
    if (userExists) {
      alert("Cet identifiant est déjà utilisé. Veuillez en choisir un autre.");
      return;
    }

    // Préparation des données à envoyer au serveur
    const formData = {
      username: username,
      userpassword: userpassword,
      type: "user", // Type utilisateur par défaut
    };

    // Enregistrement de l'utilisateur
    await registerUser(formData);
  });

// Vérification en temps réel de l'identifiant utilisateur
document.getElementById("newUsername").addEventListener("keyup", async () => {
  const username = document.getElementById("newUsername").value.trim();
  const feedback = document.getElementById("username-feedback"); // Élément pour afficher les messages

  // Vérifie que l'identifiant contient uniquement des lettres et des chiffres
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    feedback.textContent = "Seuls les lettres et chiffres sont autorisés.";
    feedback.style.color = "red";
    return;
  }

  // Vérifie si l'identifiant existe déjà dans la base de données
  const users = await fetchUsers();
  if (!users) {
    feedback.textContent = "Impossible de vérifier l'identifiant.";
    feedback.style.color = "red";
    return;
  }

  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    feedback.textContent = "Cet identifiant est déjà utilisé.";
    feedback.style.color = "red";
  } else {
    feedback.textContent = "Identifiant disponible.";
    feedback.style.color = "green";
  }
});

// Vérification en temps réel du mot de passe
document.getElementById("newPassword").addEventListener("keyup", () => {
  const password = document.getElementById("newPassword").value;
  const feedback = document.getElementById("password-feedback"); // Élément pour afficher les messages

  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasMinLength = password.length >= 8;

  // Conditions pour le mot de passe
  if (!hasMinLength) {
    feedback.textContent =
      "Le mot de passe doit contenir au moins 8 caractères.";
    feedback.style.color = "red";
  } else if (!hasUppercase) {
    feedback.textContent =
      "Le mot de passe doit contenir au moins une majuscule.";
    feedback.style.color = "red";
  } else if (!hasSpecialChar) {
    feedback.textContent =
      "Le mot de passe doit contenir au moins un caractère spécial.";
    feedback.style.color = "red";
  } else if (!hasNumber) {
    feedback.textContent = "Le mot de passe doit contenir au moins un chiffre.";
    feedback.style.color = "red";
  } else {
    feedback.textContent = "Mot de passe valide.";
    feedback.style.color = "green";
  }
});

// Fonction pour récupérer les utilisateurs depuis une API
const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:3000/users");

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des utilisateurs.");
    }

    return await response.json(); // Renvoie les utilisateurs au format JSON
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs :", err);
    return null;
  }
};

// Fonction pour enregistrer un nouvel utilisateur dans la base de données
const registerUser = async (data) => {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convertit les données en JSON pour l'envoi
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'enregistrement de l'utilisateur.");
    }

    alert("Utilisateur enregistré avec succès !");
    document.getElementById("registerForm").reset(); // Réinitialise le formulaire
  } catch (error) {
    console.error("Erreur :", error);
    alert("Une erreur est survenue lors de la requête.");
  }
};
