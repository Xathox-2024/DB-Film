// Récupérer les champs de saisie pour le nom d'utilisateur et le mot de passe
const validUsernameEnter = document.getElementById("username");
const validPasswordEnter = document.getElementById("password");

// Fonction pour récupérer les utilisateurs depuis l'API
const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:3000/users"); // Requête pour récupérer les utilisateurs

    // Vérifier si la réponse est correcte
    if (!response.ok) {
      throw new Error(
        "Erreur lors de la récupération des utilisateurs. Statut : " +
          response.status
      );
    }

    return await response.json(); // Retourner les utilisateurs sous forme d'objet JSON
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs :", err); // Afficher l'erreur dans la console
    alert(
      "Une erreur est survenue lors de la récupération des données. Veuillez réessayer plus tard."
    );
    return null; // Retourner `null` en cas d'erreur
  }
};

// Ajouter un écouteur d'événement pour la soumission du formulaire
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Empêcher le rechargement de la page lors de la soumission

    // Récupérer les valeurs saisies par l'utilisateur
    const username = validUsernameEnter.value;
    const password = validPasswordEnter.value;

    // Récupérer les utilisateurs via l'API
    const users = await fetchUsers();

    if (!users) {
      // Si les utilisateurs n'ont pas pu être récupérés, arrêter l'exécution
      return;
    }

    // Vérifier si un utilisateur correspond aux identifiants saisis
    const user = users.find(
      (utilisateur) =>
        utilisateur.username === username &&
        utilisateur.userpassword === password
    );

    if (user) {
      // Si les identifiants sont corrects, stocker le type d'utilisateur dans le localStorage
      localStorage.setItem("role", user.type);

      alert("Connexion réussie !"); // Message de succès

      // Rediriger l'utilisateur vers la page principale
      window.location.href = "index.html";
    } else {
      // Si les identifiants sont incorrects, afficher une alerte
      alert("Identifiant ou mot de passe incorrect !");
    }
  });

// Ajouter un écouteur pour afficher/masquer le mot de passe
document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordField = document.getElementById("password");

    // Basculer entre les types "text" et "password" pour le champ mot de passe
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;

    // Changer l'icône ou le texte du bouton
    this.textContent = type === "password" ? "👁️" : "🙈";
  });
