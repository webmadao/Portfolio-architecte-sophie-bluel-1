"use strict"

// ******************** CONSTANTES ********************
// ****************************************************
const modal1Btn = document.querySelector('.js-modal');
const modal1 = document.querySelector('#modal1');
const ajouterPhoto = document.querySelector(".ajouter-photo a");
const modal2 = document.querySelector('#modal2');
const topEdition = document.querySelector('.top-edition');
const modal1Works = document.querySelector('.images-works');
const photoInput = document.getElementById("photo-input");
const newImage = document.getElementById("new-image");
const titreInput = document.querySelector("#modal2 input[type=text]");
const categorieSelect = document.querySelector("#modal2 select");

//Vérifiez si l'utilisateur est connecté
/*const handleLogin = true;*/

// ******************** VARIABLES ********************
// ***************************************************

let works = getWorks();
let token = localStorage.getItem('token');


// ******************** FONCTIONS ********************
//**************************************************** 

// Faire appel à mon API avec fetch
async function getWorks() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


// Création de la galerie via le DOM
// Refactorisation de la fonction pour utiliser DocumentFragment au lieu de mettre à jour le DOM à plusieurs reprises
function getGallery(works) {
  const gallery = document.querySelector('.gallery');
  const fragment = document.createDocumentFragment();

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

    fragment.appendChild(workItem);
  });

  gallery.innerHTML = '';
  gallery.appendChild(fragment);
}


//Création des filtres
function addFilterListeners(works) {
  // Création d'une fonction galerie qui filtre les oeuvres par catégorie
  const galerie = (filtre) => {
    const oeuvresFiltrees = works.filter((oeuvre) => oeuvre.category.id === filtre);
    getGallery(oeuvresFiltrees);
  };

  // Ajout des écouteurs d'événements aux boutons de filtres
  document.querySelector(".filter-tous").addEventListener("click", () => getGallery(works));
  document.querySelector(".filter-objets").addEventListener("click", () => galerie(1));
  document.querySelector(".filter-appartements").addEventListener("click", () => galerie(2));
  document.querySelector(".filter-hotel-restaurants").addEventListener("click", () => galerie(3));
}


//Événement pour ouvrir les modal&-2
function addAllEventListeners() {
  const backToModal1 = document.querySelector('.back');
  const exitModal2 = document.querySelector(".exit2");

  ajouterPhoto.addEventListener("click", openFormToAddProject);
  backToModal1.addEventListener('click', goBackToProjectManager);
  exitModal2.addEventListener('click', toExiFromtModal2);
  modal1Btn.addEventListener('click', openModalByButton);
  modal1.addEventListener('click', toHideModal1);

  // Appel de la fonction addExitButtonClickHandler()
  addExitButtonClickHandler();
}

/*Affichez la modal1 lorsque le bouton modal est cliqué*/
function openModalByButton(event) {
  event.preventDefault();
  modal1.style.display = 'block';
}
/*Evénement pour chaché la modal1*/
function toHideModal1(event) {
  const modalWrapper = document.querySelectorAll('.modal-wrapper');
  if (event.target === modalWrapper[0]) {
    toHideModal1();
  }
}
/*Evénement pour ouvrir à la modal2*/
function openFormToAddProject(event) {
  event.preventDefault();
  modal1.style.display = "none";
  modal2.style.display = "block";
}
/*Evénemen pour retourner à la modal1*/
function goBackToProjectManager(event) {
  event.preventDefault();
  modal2.style.display = "none";
  modal1.style.display = "block";
}
/*Événement pour masquer la modal2*/
function toExiFromtModal2(event) {
  event.preventDefault()
  modal2.style.display = "none";
}

function addExitButtonClickHandler() {
  const exitBtns = document.querySelectorAll('.exit');
  exitBtns.forEach(btn => {
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      modal1.style.display = 'none';
    });
  });
}
addExitButtonClickHandler();
addAllEventListeners();

//Gestion de la galerie de la Modal1
//********************************** 

modal1Works.innerHTML = '';
/*Fonction pour créer la galerie à partir des données récupérées*/
function createGallery(data) {
  const modal1Works = document.querySelector('.images-works');
  modal1Works.innerHTML = '';

  data.forEach((work, index) => {
    const workDiv = document.createElement('div');
    workDiv.classList.add('gallery-works');
    

    workDiv.dataset.id = work.id;

    const image = document.createElement('img');
    image.src = work.imageUrl;
    image.alt = work.title;

    const title = document.createElement('h4');
    title.innerText = "éditer";

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash-can');

    workDiv.appendChild(image);
    workDiv.appendChild(title);

    if (index === 0) {
      const arrowsIcon = document.createElement('i');
      arrowsIcon.classList.add('fa-solid', 'fa-arrows-up-down-left-right');
      image.before(arrowsIcon);
      workDiv.style.height = '191px';
    }

    workDiv.appendChild(deleteIcon);
    modal1Works.appendChild(workDiv);

    deleteIcon.addEventListener('click', function (event) {
      if (event.target === deleteIcon) {
        const workDiv = event.target.closest('.gallery-works');
        const workId = workDiv.dataset.id;
        console.log(workDiv);
        console.log(workDiv.dataset);
        fetch(`http://localhost:5678/api/works/${workId}`, {
          method: 'DELETE',
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          if (response.ok) {
            workDiv.remove();
            /* Mise à jour de la galerie après la suppression */
            const worksOfModal1 = Array.from(document.querySelectorAll('.gallery-works')).map(workDiv => ({
              _id: workDiv.dataset.id,
              imageUrl: workDiv.querySelector('img').src,
              title: workDiv.querySelector('h4').innerText
            }));
            getGallery(worksOfModal1);
          } else {
            throw new Error('Erreur de suppression');
          }
        })
        .catch(error => {
          console.error(error);
        });
      }
    });
  });
}


getWorks()
  .then(data => {
    createGallery(data);
  });

//Envoi à l'API / fetch post
/***************************/
const importPhotoDiv = document.querySelector('.import-photo');
const ajoutPhotoLabel = document.querySelector('.ajout-photo');
const limitSizeSmall = document.querySelector('.limit-size');
const selectionPhotoDiv = document.querySelector('.selection-photo');
const choixSelect = document.querySelector('#choix');
const validationPhotoDiv = document.querySelector('.validation-photo');

const validationButton = document.querySelector('.validation');

validationButton.addEventListener('click', async () => {
  // Récupérer les entrées du formulaire
  const titreInput = document.querySelector('.titre');
  const categorieSelect = document.querySelector('#choix');
  const photoInput = document.querySelector('#photo-input');

  console.log('Titre input:', titreInput.value);
  console.log('Categorie select:', categorieSelect.value);
  console.log('Photo input files:', photoInput.files);

  // Créer un objet FormData avec les données du formulaire
  const formData = new FormData();
  formData.append('image', photoInput.files[0]);
  formData.append('title', titreInput.value);
  formData.append('category', categorieSelect.value);
  console.log('Form data:', formData);

  // Envoyer une requête POST à l'API
  const response = await fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  console.log('Response:', response);

  // Traiter la réponse de l'API
  if (response.ok) {
    const newElement = await response.json();
    console.log('New element:', newElement);
    // Ajouter le nouvel élément à la galerie
    // ...
  } else {
    // Afficher un message d'erreur
    console.error('Erreur lors de l\'ajout du nouvel élément');
  }
});




getWorks()
  .then(data => {
    works = data;
    getGallery(works);
    addFilterListeners(works);
    createGallery(data);
    /*refreshGallery();*/
    /*addWorkToGallery(works);*/
  });


// ******************** CODE PRINCIPAL ********************
//********************************************************* 

//Gestion les éléments du login/logout 
const modifierImageBtn = document.querySelector('.modifier-image');
const modeEditionBtns = document.querySelectorAll('.mode-edition');
const filtersDiv = document.querySelector('.filters');
function handleLogout() {
  localStorage.clear();
  location.reload();
  toggleTopEdition();
}

if (localStorage.getItem("token")) {
  topEdition.style.visibility = 'visible';
  modifierImageBtn.style.display = 'block';
  modeEditionBtns.forEach(btn => btn.style.display = 'block');
  modal1Btn.style.display = 'block';
  document.querySelector('.logout-btn').style.display = 'block';
  document.querySelector('.login-btn').style.display = 'none';
  filtersDiv.style.display = 'none';
} else {
  document.querySelector('.logout-btn').style.display = 'none';
  document.querySelector('.login-btn').style.display = 'block';
}

let logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', handleLogout);

// Fonction pour masquer ou afficher la section "top-edition"
function toggleTopEdition() {
  const topEdition = document.querySelector('.top-edition');
  const loggedIn = !!localStorage.getItem('token');
  topEdition.style.display = loggedIn ? 'block' : 'none';
}

// ********************************************************
// Recupération image dans dossier

photoInput.addEventListener("change", (event) => {
  /*const iconePlus = document.querySelector('.fa-plus');*/
  const iconAddImage = document.querySelector('.fa-image')
  const jpgPngSize = document.querySelector(".limit-size");
  const ajouterPhotoBtn = document.querySelector('.ajouter-photo');
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      newImage.src = reader.result;
      newImage.style.width = '200px';
      photoInput.style.display = 'none';
      /*iconePlus.style.visibility = 'hidden';*/
      iconAddImage.style.display = 'none';
      jpgPngSize.style.display = 'none';
      ajouterPhotoBtn.style.display = 'none';
    };
  }
});
//**********************************************************


