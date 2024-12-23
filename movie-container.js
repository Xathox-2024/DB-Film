export default function movieCard(movie) {
    const movieContainer = document.getElementById("movies");
  
    const contenuDiv = document.createElement("div");
    contenuDiv.className = "movie-card";
    
    contenuDiv.innerHTML = `
      <h2>${movie.titre}</h2>
      <p>Genre : ${movie.genre}</p>
      <p>Durée : ${movie.duree} minutes</p>
    `;
  
    movieContainer.appendChild(card);
  }
  

