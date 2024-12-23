/**
 * Fonction pour créer une carte de film dynamique
 * @param {Object} movie - L'objet contenant les informations du film
 */
export default function movieCard(movie) {
  // Créer un conteneur principal pour la carte
  const card = document.createElement("div");
  card.className = "card";

  // Créer une section pour l'affiche du film
  const logoDiv = document.createElement("div");
  logoDiv.className = "photo";
  const photoImg = document.createElement("img");
  photoImg.src = movie.affiche;
  photoImg.alt = "Affiche du film"; // Description de l'image

  // Créer une section pour le contenu textuel du film
  const contenuDiv = document.createElement("div");
  contenuDiv.className = "contenu";
  contenuDiv.innerHTML = `
        <p>Nom : ${movie.titre}</p>
        <p>Réalisateur : ${movie.realisateur}</p>
        <p>Année : ${movie.annee}</p>
        <p>Durée : ${movie.duree}</p>
        <p>Genre : ${movie.genre}</p>
    `;

  // Créer un bouton pour sélectionner le film
  const boutonSelectionner = document.createElement("button");
  boutonSelectionner.textContent = "Sélectionner";

  // Créer un bouton pour modifier le film (affiché seulement pour les administrateurs)
  const boutonModifier = document.createElement("button");
  boutonModifier.textContent = "Modifier";

  // Créer un bouton pour supprimer le film (affiché seulement pour les administrateurs)
  const boutonSupprimer = document.createElement("button");
  boutonSupprimer.textContent = "Supprimer";

  // Ajouter l'image et le contenu à la carte
  logoDiv.appendChild(photoImg);
  card.appendChild(logoDiv);
  card.appendChild(contenuDiv);
  card.appendChild(boutonSelectionner);

  // Si l'utilisateur est un administrateur, afficher les boutons Modifier et Supprimer
  if (localStorage.getItem("role") === "admin") {
    card.appendChild(boutonModifier);
    card.appendChild(boutonSupprimer);
  } else {
    console.log("L'utilisateur n'est pas un administrateur.");
  }

  // Ajouter la carte au conteneur principal (ici, un élément <main>)
  const main = document.querySelector("main");
  main.appendChild(card);

  // Gestionnaire d'événement pour le bouton "Sélectionner"
  boutonSelectionner.addEventListener("click", function () {
    // Rediriger vers la page de détails du film
    window.location.href = `detail.html?id=${movie.id}`;
  });

  // Gestionnaire d'événement pour le bouton "Modifier"
  boutonModifier.addEventListener("click", function () {
    // Rediriger vers la page de modification du film
    window.location.href = `modif.html?id=${movie.id}`;
  });

  // Fonction asynchrone pour supprimer un film via l'API
  async function supprimerCarte(movieId) {
    try {
      const response = await fetch(`http://localhost:3000/films/${movieId}`, {
        method: "DELETE", // Requête de suppression
      });

      if (!response.ok) {
        throw new Error(
          `Erreur lors de la suppression, statut : ${response.status}`
        );
      }

      const result = await response.json();
      console.log("Film supprimé :", result);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  }

  // Gestionnaire d'événement pour le bouton "Supprimer"
  boutonSupprimer.addEventListener("click", function () {
    // Demander confirmation à l'utilisateur avant de supprimer
    const supprime = confirm("Voulez-vous supprimer cette carte ?");
    if (supprime) {
      supprimerCarte(movie.id); // Appeler la fonction pour supprimer le film
    }
  });

  // Fonction pour rechercher les films par nom
  function searchMovies() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase(); // Convertir la recherche en minuscules

    // Récupérer toutes les cartes de films
    const movieCards = document.querySelectorAll(".card");

    // Parcourir chaque carte et filtrer par nom de film
    movieCards.forEach((card) => {
      const movieTitle = card
        .querySelector(".contenu p")
        .textContent.toLowerCase(); // Récupérer le titre du film en minuscules

      // Afficher la carte si le titre du film correspond à la recherche
      if (movieTitle.includes(searchTerm)) {
        card.style.display = "block"; // Afficher
      } else {
        card.style.display = "none"; // Cacher
      }
    });
  }

  // Ajouter un écouteur d'événements pour la recherche
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", searchMovies);
}
