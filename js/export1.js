// Gestion de la déconnexion
const deco = document.getElementById("deconnexion");
deco.addEventListener("click", function (e) {
  localStorage.clear();
  window.location.href = "login.html";
  console.log("Déconnexion réussie");
});

// Vérification du rôle utilisateur et affichage du bouton pour l'administrateur
const role = localStorage.getItem("role");
if (role === "admin") {
  const adminControls = document.getElementById("adminControls");
  const addButton = document.createElement("a");
  addButton.href = "ajout.html";

  const addIcon = document.createElement("img");
  addIcon.src = "icone/plus.png";
  addIcon.alt = "Ajouter un film";
  addIcon.style.width = "60px";
  addIcon.style.height = "60px";

  addButton.appendChild(addIcon);
  adminControls.appendChild(addButton);
} else {
  console.log("L'utilisateur n'est pas un administrateur.");
}

// Récupération des films et génération des cartes
import movieCard from "./movie-card.js";

fetch("http://localhost:3000/films")
  .then((response) => response.json())
  .then((movies) => {
    movies.forEach((movie) => {
      movieCard(movie);
    });
  })
  .catch((err) => {
    console.error("Erreur lors de la récupération des films :", err);
  });
