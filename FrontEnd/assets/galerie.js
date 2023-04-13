// Faire appel à mon API avec fetch
function getWorks() {
  fetch('http://localhost:5678/api/works')
    .then(response => response.json()) // Récupérer les données au format JSON
    .then((data) => {
      section(data); // Appeler la fonction section() pour afficher les données
      addFilterListeners(data); // Ajouter les listeners pour les filtres
    });
}

// Création de la galerie via le DOM
function section(works) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = ''; // Effacer le contenu de la galerie précédente

  works.forEach(work => {
    const workItem = document.createElement('div');
    workItem.classList.add('gallery-item');

    const workImage = document.createElement('img');
    workImage.src = work.imageUrl;
    workImage.alt = work.title;

    const workTitle = document.createElement('h3');
    workTitle.innerText = work.title;

    workItem.appendChild(workImage);
    workItem.appendChild(workTitle);

    gallery.appendChild(workItem); // Ajouter chaque élément à la galerie
  });
}

// Création des filtres
function addFilterListeners(works) {
  const boutonTous = document.querySelector(".filter-tous");

  boutonTous.addEventListener("click", function () {
    section(works); // Afficher tous les éléments
  });

  const boutonObjets = document.querySelector(".filter-objets");

  boutonObjets.addEventListener("click", function () {
    const filterObjects = works.filter(function (work) {
      return work.category.id === 1; // Filtrer les éléments par catégorie
    });
    section(filterObjects); // Afficher les éléments filtrés
  });

  const boutonAppartement = document.querySelector(".filter-appartements");

  boutonAppartement.addEventListener("click", function () {
    const filterAppartement = works.filter(function (work) {
      return work.category.id === 2;
    });
    section(filterAppartement);
  });

  const boutonHotelRestaurants = document.querySelector(".filter-hotel-restaurants");

  boutonHotelRestaurants.addEventListener("click", function () {
    const filterHotelRestaurants = works.filter(function (work) {
      return work.category.id === 3;
    });
    section(filterHotelRestaurants);
  });
}

getWorks(); // Appeler la fonction getWorks() pour afficher la galerie et les filtres


