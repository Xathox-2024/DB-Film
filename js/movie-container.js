/**
 * Fonction pour créer une carte de film
 * @param {Object} movie - L'objet contenant les informations du film
 */
export default function movieCard(movie) {
  // Sélectionner le conteneur des films
  const movieContainer = document.getElementById("movies");

  // Créer la carte pour le film
  const contenuDiv = document.createElement("div");
  contenuDiv.className = "movie-card"; // Ajouter une classe CSS pour la carte

  // Remplir la carte avec des informations sur le film
  contenuDiv.innerHTML = `
    <h2>${movie.titre}</h2>
    <p>Genre : ${movie.genre}</p>
    <p>Durée : ${movie.duree} minutes</p>
  `;

  // Ajouter la carte au conteneur principal des films
  movieContainer.appendChild(contenuDiv);
}
