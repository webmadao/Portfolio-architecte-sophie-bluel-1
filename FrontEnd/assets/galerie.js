
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

  function openModal() {
    const modaleGallery = document.getElementById("modale-gallery");
    modaleGallery.style.display = "block";
    const travaux = document.querySelector(".travaux");
    travaux.classList.add("open");
    travaux.addEventListener("click", function () {
      console.log("top");
    });
  }

}

getWorks();// Appeler la fonction getWorks() pour afficher la galerie et les filtres

const openModal = function (e) {
  e.preventDefault()
  const target = document.querySelector(e.target.getAttribute('href'))
  target.style.display = null
  target.removeAttribute('aria-hidden')
  target.setAttribute('aria-modal', 'true')
}

document.querySelectorAll('.js-modal').forEach(a => {
  a.addEventListener('click', openModal)

})






/*
const openModal = function (e) {
  if (e && e.target) {
    e.preventDefault()
    const target = e.target.getAttribute('href')
    if (target) {
      target.style.display = null
      target.removeAttribute('aria-hidden')
      target.setAttribute('aria-modal', 'true')
    }
  }
}

document.querySelectorAll('.js-modal').forEach(a => {
  a.addEventListener('click', openModal)
})*/




/*


function galerieModale() {
  const modale = document.getElementById('modale-gallery');

  // Récupération des éléments déclencheurs de la modale
  const editBtns = document.querySelectorAll('.images figure figcaption');
  const ajouterPhotoBtn = document.querySelector('.ajouter-photo a');
  const supprimerGalerieBtn = document.querySelector('.supprimer-galerie a');

  // Fonction pour ouvrir la modale
  function openModal() {
    modale.style.display = 'block';
  }

  // Fonction pour fermer la modale
  function closeModal() {
    modale.style.display = 'none';
  }

  // Ajout des événements pour ouvrir et fermer la modale
  editBtns.forEach(editBtn => {
    editBtn.addEventListener('click', openModal);
  });
  ajouterPhotoBtn.addEventListener('click', openModal);
  supprimerGalerieBtn.addEventListener('click', openModal);
  modale.addEventListener('click', (event) => {
    // Si l'utilisateur clique à l'extérieur de la modale
    if (event.target === modale) {
      closeModal();
    }
  });
}
galerieModale();*/
/*
function openModal() {
  document.getElementById("modale-gallery").style.display = "block";
}

function closeModal() {
  document.getElementById("modale-gallery").style.display = "none";
}*/


