
// Faire appel à mon API avec fetch
function getWorks() {
  fetch('http://localhost:5678/api/works')
    .then(response => response.json()) // Récupérer les données au format JSON
    .then((data) => {
      getGallery(data); // Appeler la fonction section() pour afficher les données
      addFilterListeners(data); // Ajouter les listeners pour les filtres

    });
}

// Création de la galerie via le DOM
function getGallery(works) {
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
    getGallery(works); // Afficher tous les éléments
  });

  const boutonObjets = document.querySelector(".filter-objets");

  boutonObjets.addEventListener("click", function () {
    const filterObjects = works.filter(function (work) {
      return work.category.id === 1; // Filtrer les éléments par catégorie
    });
    getGallery(filterObjects); // Afficher les éléments filtrés
  });

  const boutonAppartement = document.querySelector(".filter-appartements");

  boutonAppartement.addEventListener("click", function () {
    const filterAppartement = works.filter(function (work) {
      return work.category.id === 2;
    });
    getGallery(filterAppartement);
  });

  const boutonHotelRestaurants = document.querySelector(".filter-hotel-restaurants");

  boutonHotelRestaurants.addEventListener("click", function () {
    const filterHotelRestaurants = works.filter(function (work) {
      return work.category.id === 3;
    });
    getGallery(filterHotelRestaurants);
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


/*---------------------ouvrir/fermé modal1*/
let modal = null;

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href'));
  target.style.display = '';
  target.removeAttribute('aria-hidden');
  target.setAttribute('aria-modal', 'true');
  modal = target;
  modal.querySelector('.exit').addEventListener('click', closeModal);
  modal.querySelector('.exit').addEventListener('click', stopPropagation);

};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');
  modal.removeEventListener('click', closeModal);
  modal.querySelector('.exit').removeEventListener('click', closeModal);
  modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
  modal = null;
  window.addEventListener('click', function (event) {
    if (modal !== null && event.target === modal) {
      closeModal(event);
    }
  });
};

const stopPropagation = function (e) {
  e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
  a.addEventListener('click', openModal);
});

/*---------------------ouvrir/fermé modal1*/


/*----------Ouvrir modal2 via modal1*/
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");
const ajouterPhoto = document.querySelector(".ajouter-photo a");

ajouterPhoto.addEventListener("click", function (event) {
  event.preventDefault();
  modal1.style.display = "none";
  modal2.style.display = "block";
});
/*----------Ouvrir modal2 via modal1*/






















