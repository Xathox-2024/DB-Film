// Gestion de la déconnexion de l'utilisateur
const deco = document.getElementById("deconnexion"); // Bouton de déconnexion
deco.addEventListener("click", function (e) {
  // Supprimer toutes les données stockées localement
  localStorage.clear();

  // Rediriger l'utilisateur vers la page de connexion
  window.location.href = "login.html";

  // Message de confirmation dans la console
  console.log("Déconnexion réussie");
});

// Vérification du rôle de l'utilisateur et affichage des contrôles pour les administrateurs
const role = localStorage.getItem("role"); // Récupérer le rôle de l'utilisateur depuis le localStorage
if (role === "admin") {
  // Si l'utilisateur est administrateur, afficher le bouton d'ajout
  const adminControls = document.getElementById("adminControls"); // Conteneur pour les contrôles admin

  // Créer un lien pour ajouter un film
  const addButton = document.createElement("a");
  addButton.href = "ajout.html"; // Redirige vers la page d'ajout de film

  // Ajouter une icône pour le bouton
  const addIcon = document.createElement("img");
  addIcon.src = "icone/plus.png"; // Chemin vers l'image d'icône
  addIcon.alt = "Ajouter un film"; // Texte alternatif pour l'accessibilité
  addIcon.style.width = "60px"; // Largeur de l'icône
  addIcon.style.height = "60px"; // Hauteur de l'icône

  // Ajouter l'icône au lien
  addButton.appendChild(addIcon);

  // Ajouter le bouton d'ajout au conteneur admin
  adminControls.appendChild(addButton);
} else {
  // Si l'utilisateur n'est pas administrateur
  console.log("L'utilisateur n'est pas un administrateur.");
}

// Récupération de la liste des films et affichage sous forme de cartes
import movieCard from "./movie-card.js"; // Importer le module pour générer les cartes de films

fetch("http://localhost:3000/films") // Requête pour récupérer la liste des films
  .then((response) => response.json()) // Convertir la réponse en JSON
  .then((movies) => {
    // Parcourir chaque film et générer une carte
    movies.forEach((movie) => {
      movieCard(movie); // Appeler la fonction pour afficher la carte du film
    });
  })
  .catch((err) => {
    // Gérer les erreurs en cas de problème avec la requête
    console.error("Erreur lors de la récupération des films :", err);
  });
