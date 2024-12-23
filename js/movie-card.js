export default function movieCard(movie) {
  const card = document.createElement("div");
  card.className = "card";
  const logoDiv = document.createElement("div");
  logoDiv.className = "photo";
  const photoImg = document.createElement("img");
  photoImg.src = movie.affiche;
  photoImg.alt = "Avatar";

  const contenuDiv = document.createElement("div");
  contenuDiv.className = "contenu";
  contenuDiv.innerHTML = `
        <p>Nom : ${movie.titre}</p>
        <p>Réalisateur : ${movie.realisateur}</p>
        <p>Année : ${movie.annee}</p>
        <p>Durée : ${movie.duree}</p>
        <p>Genre : ${movie.genre}</p>
        `
    ;

  // Créer un bouton Sélectionner
  const boutonSelectionner = document.createElement("button");
  boutonSelectionner.textContent = "Sélectionner";

  // Créer un bouton Sélectionner
  const boutonModifier = document.createElement("button");
  boutonModifier.textContent = "Modifier";

  // Créer un bouton Supprimer
  const boutonSupprimer = document.createElement("button");
  boutonSupprimer.textContent = "Supprimer";

  // Ajouter le contenu et les boutons à la carte
  logoDiv.appendChild(photoImg);
  card.appendChild(logoDiv);
  card.appendChild(contenuDiv);
  card.appendChild(boutonSelectionner);
  if (localStorage.getItem("role") === "admin") {
    card.appendChild(boutonModifier);
    card.appendChild(boutonSupprimer);
  } else {
    console.log("L'utilisateur n'est pas un administrateur.");
  }
  // Ajouter la carte au conteneur principal
  const main = document.querySelector("main");
  main.appendChild(card);

  // Gestionnaire d'événement pour Sélectionner
  boutonSelectionner.addEventListener("click", function () {
    // Rediriger vers une page de détails
    window.location.href = `detail.html?id=${movie.id}`;
  });

  // Gestionnaire d'événement pour Sélectionner
  boutonModifier.addEventListener("click", function () {
    // Rediriger vers une page de détails
    window.location.href = `modif.html?id=${movie.id}`;
  });

// Fonction asynchrone pour gérer la suppression
async function supprimerCarte(movieId) {
  try {
    // Requête DELETE à l'API
    const response = await fetch(`http://localhost:3000/films/${movieId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression, statut : ${response.status}`);
    }

    const result = await response.json();
    console.log("Film supprimé :", result);
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
  }
}

// Gestionnaire d'événement pour Supprimer
boutonSupprimer.addEventListener("click", function () {
  const supprime = confirm("Voulez-vous supprimer cette carte ?");
  if (supprime) {
    supprimerCarte(movie.id); // Appel de la fonction asynchrone
  }
});


// Fonction de recherche par nom de film
function searchMovies() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.toLowerCase(); // Récupérer la valeur de recherche en minuscules

  // Récupérer toutes les cartes de films
  const movieCards = document.querySelectorAll(".card");

  movieCards.forEach((card) => {
    // Récupérer le nom du film à partir de la carte
    const movieTitle = card
      .querySelector(".contenu p")
      .textContent.toLowerCase();

    // Si le nom du film contient le texte recherché, on l'affiche, sinon on le cache
    if (movieTitle.includes(searchTerm)) {
      card.style.display = "block"; // Afficher la carte
    } else {
      card.style.display = "none"; // Cacher la carte
    }
  });
}

// Ajouter un écouteur d'événements pour la barre de recherche
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", searchMovies);}
