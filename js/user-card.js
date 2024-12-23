export default function userCard(user) {
  // Vérifier s'il y a un élément <main> ou le créer
  let main = document.querySelector("main");
  if (!main) {
    main = document.createElement("main"); // Si <main> n'existe pas, on le crée
    document.body.appendChild(main);
  }

  // Créer la carte utilisateur
  const card = document.createElement("div");
  card.className = "user-card";

  // Création de l'élément contenant l'image (avatar utilisateur)
  const logoDiv = document.createElement("div");
  logoDiv.className = "photo-card";
  const userPhotoImg = document.createElement("img");
  userPhotoImg.src = user.avatar || "default-avatar.jpg"; // Utiliser une image par défaut si pas d'avatar
  userPhotoImg.alt = "Avatar utilisateur";
  userPhotoImg.className = "user-avatar";

  logoDiv.appendChild(userPhotoImg);

  // Création du contenu utilisateur
  const contenuDiv = document.createElement("div");
  contenuDiv.className = "user-contenu";
  contenuDiv.innerHTML = `
        <h2>${user.username}</h2>
        <p>Email : ${user.email}</p>
        <p>Rôle : ${user.type}</p>
    `;

  // Ajouter les éléments à la carte
  card.appendChild(logoDiv);
  card.appendChild(contenuDiv);

  // Ajouter la carte au <main>
  main.appendChild(card);
}
