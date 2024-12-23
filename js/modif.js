// Récupérer l'ID depuis l'URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id"); // Obtenir l'ID depuis la query string

// Variable pour stocker le film sélectionné
let movie;

/**
 * Fonction asynchrone pour récupérer les données d'un film via son ID
 * @param {string} id - L'identifiant du film
 * @returns {Object|null} - Les données du film ou null en cas d'erreur
 */
const fetchMovie = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/films"); // Requête pour récupérer tous les films
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des films : ${response.status}`
      );
    }

    const data = await response.json();

    // Trouver le film correspondant à l'ID
    const selectedMovie = data.find((item) => item.id == id);
    if (!selectedMovie) {
      throw new Error("Film non trouvé");
    }

    return selectedMovie;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error); // Afficher l'erreur dans la console
    document.body.innerHTML = `<h1>${error.message}</h1>`; // Afficher l'erreur sur la page
    return null;
  }
};

/**
 * Fonction asynchrone pour mettre à jour un film
 * @param {string} id - L'identifiant du film
 * @param {Object} updatedMovie - Les nouvelles données du film
 */
const updateMovie = async (id, updatedMovie) => {
  try {
    const response = await fetch(`http://localhost:3000/films/${id}`, {
      method: "PUT", // Utiliser PUT pour remplacer entièrement les données
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie), // Convertir les données en JSON
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour du film.");
    }

    alert("Film mis à jour avec succès !");
  } catch (error) {
    console.error("Erreur :", error); // Afficher l'erreur dans la console
    alert("Une erreur est survenue lors de la mise à jour du film."); // Alerte pour l'utilisateur
  }
};

/**
 * Initialisation de la page : récupération et pré-remplissage des données du film
 */
const init = async () => {
  movie = await fetchMovie(id); // Récupérer les données du film

  if (movie) {
    // Pré-remplir le formulaire avec les données du film
    document.getElementById("titre").value = movie.titre;
    document.getElementById("realisateur").value = movie.realisateur;
    document.getElementById("annee").value = movie.annee;
    document.getElementById("synopsis").value = movie.synopsis;
    document.getElementById("genres").value = movie.genre.join(", "); // Convertir les genres en chaîne
    document.getElementById("affiche").value = movie.affiche;
    document.getElementById("duree").value = movie.duree;
  }
};

// Gestionnaire d'événement pour la soumission du formulaire
document
  .getElementById("userForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page lors de la soumission

    if (!movie) {
      alert("Aucun film chargé pour mise à jour."); // Message si le film n'est pas chargé
      return;
    }

    // Récupérer les nouvelles données du formulaire ou conserver les anciennes si elles ne sont pas modifiées
    const updatedMovie = {
      titre: document.getElementById("titre").value || movie.titre,
      realisateur:
        document.getElementById("realisateur").value || movie.realisateur,
      annee: document.getElementById("annee").value || movie.annee,
      genre:
        document
          .getElementById("genres")
          .value.split(",")
          .map((g) => g.trim()) || movie.genre, // Convertir en tableau
      synopsis: document.getElementById("synopsis").value || movie.synopsis,
      affiche: document.getElementById("affiche").value || movie.affiche,
      duree: document.getElementById("duree").value || movie.duree,
    };

    // Appeler la fonction pour mettre à jour le film
    await updateMovie(id, updatedMovie);
  });

// Appeler l'initialisation pour charger les données au chargement de la page
init();
