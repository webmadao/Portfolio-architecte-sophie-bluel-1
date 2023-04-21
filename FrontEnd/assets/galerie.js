"use strict"
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



// Sélectionnez les éléments à masquer
const topEdition = document.querySelector('.top-edition');
const modifierImageBtn = document.querySelector('.modifier-image');
const modeEditionBtns = document.querySelectorAll('.mode-edition');
const modal1Btn = document.querySelector('.js-modal');
const ajouterPhotoBtn = document.querySelector('.ajouter-photo');
const modal1 = document.querySelector('#modal1');
const modalWrapper = document.querySelectorAll('.modal-wrapper');
const exitBtns = document.querySelectorAll('.exit');
const backToModal1 = document.querySelector('.back');
const ajouterPhoto = document.querySelector(".ajouter-photo a");
const exitModal2 = document.querySelector(".exit2");
// Vérifiez si l'utilisateur est connecté
const handleLogin = true; // à remplacer par votre logique pour vérifier si l'utilisateur est connecté

// Masquez les éléments si l'utilisateur n'est pas connecté
if (handleLogin) {
  topEdition.style.display = 'block';
  modifierImageBtn.style.display = 'block';
  modeEditionBtns.forEach(btn => btn.style.display = 'block');
  modal1Btn.style.display = 'block';
}

// Affichez la modal1 lorsque le bouton modal est cliqué
modal1Btn.addEventListener('click', function (event) {
  event.preventDefault();
  modal1.style.display = 'block';
});

// Masquez la modal1 lorsque le bouton de sortie est cliqué ou lorsqu'on clique en dehors de la modal
exitBtns.forEach(btn => {
  btn.addEventListener('click', function (event) {
    event.preventDefault();
    modal1.style.display = 'none';
  });
});

modal1.addEventListener('click', function (event) {
  if (event.target === modalWrapper[0]) {
    hideModal1();
  }
});

// Événements pour supprimer une figure
const figures = document.querySelectorAll('.images figure');
figures.forEach(figure => {
  figure.addEventListener('click', event => {
    if (event.target.classList.contains('img')) {
      deleteFigure(figure);
    }
  });
});
// Événement pour ouvrir la modal2
ajouterPhoto.addEventListener("click", function (event) {
  event.preventDefault();
  modal1.style.display = "none";
  modal2.style.display = "block";
});
// Evénemen pour retourner à la modal1
backToModal1.addEventListener('click', function (event) {
  event.preventDefault();
  modal2.style.display = "none";
  modal1.style.display = "block";
})

// Événement pour masquer la modal2
exitModal2.addEventListener("click", function (event) {
  event.preventDefault
  modal2.style.display = "none";
})

/*window.addEventListener("click", function (event) {
  event.preventDefault();
  modal1.style.display = "none";
  modal2.style.display = "none";
})*/

const modal2 = document.querySelector('#modal2');
modal2.addEventListener('click', event => {
  if (event.target === modal2 || event.target.classList.contains('exit2')) {
    hideModal2();
  }
});

// Événement pour retourner à la modal1 depuis la modal2
const backToModal1Button = document.querySelector('.back');
backToModal1Button.addEventListener('click', showModal1);

// Appel de la fonction addEventListeners() une fois que le DOM est chargé
document.addEventListener('DOMContentLoaded', addEventListeners);

// Fonction pour masquer ou afficher la section "top-edition"
function toggleTopEdition() {
  const topEdition = document.querySelector('.top-edition');
  const loggedIn = handleLogin(); // Fonction isLoggedIn() à implémenter
  topEdition.style.display = loggedIn ? 'block' : 'none';
}






/*------------------Brouillon*-----------------------------------------------/

/*---------------------ouvrir/fermé modal1*
/*
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
});*/

/*---------------------ouvrir/fermé modal1*/


/*----------Ouvrir modal2 via modal1*/
/*
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");
const ajouterPhoto = document.querySelector(".ajouter-photo a");

ajouterPhoto.addEventListener("click", function (event) {
  event.preventDefault();
  modal1.style.display = "none";
  modal2.style.display = "block";
});

/*----------Ouvrir modal2 via modal1*/
/*
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");
const ajouterPhoto = document.querySelector(".ajouter-photo a");
const backToModal1 = document.querySelector(".back");

ajouterPhoto.addEventListener("click", function (event) {
  event.preventDefault();
  closeModal(event, modal1);
  openModal(event, modal2);
});

backToModal1.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("Clicked back to modal 1 button"); // Vérifier si l'événement est déclenché
  closeModal(event, modal2);
  openModal(event, modal1);
  console.log("Modal 1 opened"); // Vérifier si la modal1 est ouverte
});*/









