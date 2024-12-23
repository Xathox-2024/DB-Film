const validUsernameEnter = document.getElementById("username");
const validPasswordEnter = document.getElementById("password");

// Fonction pour récupérer les utilisateurs depuis l'API
const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:3000/users");

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des utilisateurs. Statut : " + response.status);
    }

    return await response.json();
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs :", err);
    alert("Une erreur est survenue lors de la récupération des données. Veuillez réessayer plus tard.");
    return null; // Retourner `null` en cas d'échec
  }
};

// Ajouter un écouteur d'événement pour la soumission du formulaire
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // Empêcher le rechargement de la page

  const username = validUsernameEnter.value;
  const password = validPasswordEnter.value;

  // Récupérer les utilisateurs
  const users = await fetchUsers();

  if (!users) {
    // Si la récupération des utilisateurs a échoué, on arrête l'exécution
    return;
  }

  // Vérifier si un utilisateur correspond aux identifiants saisis
  const user = users.find(
    (utilisateur) => utilisateur.username === username && utilisateur.userpassword === password
  );

  if (user) {
    // Stocker le type d'utilisateur dans le localStorage
    localStorage.setItem("role", user.type);

    alert("Connexion réussie !");

    // Rediriger vers la même page pour tous les types d'utilisateurs
    window.location.href = "index.html";
  } else {
    alert("Identifiant ou mot de passe incorrect !");
  }
});
