export default function userCard(movie) {
  // Vérifier s'il y a un élément <main> ou le créer
  let main = document.querySelector("main");
  document.body.appendChild(main);

  // Créer la carte utilisateur
  const card = document.createElement("div");
  card.className = "user-card";

  // Création de l'élément contenant l'image
  const logoDiv = document.createElement("div");
  logoDiv.className = "photo-card";
  const userPhotoImg = document.createElement("img");
  userPhotoImg.src = movie.affiche;
  userPhotoImg.alt = "logo-affiche";
  userPhotoImg.className = "logo-affiche";

  logoDiv.appendChild(userPhotoImg);

  // Création du contenu utilisateur
  const contenuDiv = document.createElement("div");
  contenuDiv.className = "user-contenu";
  contenuDiv.innerHTML = `
        <h2>${movie.titre}</h2>
        <p>Synopsis : ${movie.synopsis}</p>

    `;

  // Ajouter les éléments à la carte
  card.appendChild(logoDiv);
  card.appendChild(contenuDiv);

  // Ajouter la carte au <main>
  main.appendChild(card);
}
