// Récupérer l'ID depuis l'URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id"); // Obtenir l'ID de la query string

// Variable pour stocker le film sélectionné
let movie;

// Fonction asynchrone pour récupérer les données du film
const fetchMovie = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/films");
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des films : ${response.status}`);
    }

    const data = await response.json();

    // Trouver le film correspondant à l'ID
    const selectedMovie = data.find((item) => item.id == id);
    if (!selectedMovie) {
      throw new Error("Film non trouvé");
    }

    return selectedMovie;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    document.body.innerHTML = `<h1>${error.message}</h1>`;
    return null;
  }
};

// Fonction asynchrone pour mettre à jour le film
const updateMovie = async (id, updatedMovie) => {
  try {
    const response = await fetch(`http://localhost:3000/films/${id}`, {
      method: "PUT", // Utiliser PUT ou PATCH pour une mise à jour
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour du film.");
    }

    alert("Film mis à jour avec succès !");
  } catch (error) {
    console.error("Erreur :", error);
    alert("Une erreur est survenue lors de la mise à jour du film.");
  }
};

// Initialisation : récupérer les données et pré-remplir le formulaire
const init = async () => {
  movie = await fetchMovie(id);

  if (movie) {
    // Pré-remplir le formulaire avec les données du film
    document.getElementById("titre").value = movie.titre;
    document.getElementById("realisateur").value = movie.realisateur;
    document.getElementById("annee").value = movie.annee;
    document.getElementById("synopsis").value = movie.synopsis;
    document.getElementById("genres").value = movie.genre.join(", ");
    document.getElementById("affiche").value = movie.affiche;
    document.getElementById("duree").value = movie.duree;
  }
};

// Gestionnaire d'événement pour le formulaire
document.getElementById("userForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  // Vérifier que le film est chargé
  if (!movie) {
    alert("Aucun film chargé pour mise à jour.");
    return;
  }

  // Mettre à jour les données du film avec les valeurs du formulaire
  const updatedMovie = {
    titre: document.getElementById("titre").value || movie.titre,
    realisateur: document.getElementById("realisateur").value || movie.realisateur,
    annee: document.getElementById("annee").value || movie.annee,
    genre: document.getElementById("genres").value.split(",").map((g) => g.trim()) || movie.genre,
    synopsis: document.getElementById("synopsis").value || movie.synopsis,
    affiche: document.getElementById("affiche").value || movie.affiche,
    duree: document.getElementById("duree").value || movie.duree,
  };

  // Appeler la fonction pour mettre à jour le film
  await updateMovie(id, updatedMovie);
});

// Appeler l'initialisation
init();
