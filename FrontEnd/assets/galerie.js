"use strict"

// ******************** CONSTANTES ********************
// ****************************************************
// Utiliser axios sans la syntaxe require
const axiosInstance = axios.create();
const modal1Btn = document.querySelector('.js-modal');
const modal1 = document.querySelector('#modal1');
const ajouterPhoto = document.querySelector(".ajouter-photo a");
const modal2 = document.querySelector('#modal2');
const topEdition = document.querySelector('.top-edition');
const modal1Works = document.querySelector('.images-works');
const photoInput = document.getElementById("photo-input");
const image = document.getElementById("new-image");
const title = document.querySelector("#modal2 input[type=text]");
const category = document.querySelector("#modal2 select");

// ******************** VARIABLES ********************
// ***************************************************

let token = localStorage.getItem('token');

// ******************** FONCTIONS ********************
//**************************************************** 

// Faire appel à mon API avec fetch
async function getWorks() {
  try {
    const response = await axios.get('http://localhost:5678/api/works');
    const data = response.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
let works = getWorks();

// Création de la galerie via le DOM
function getGallery(works) {

  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = ''; 

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

    gallery.appendChild(workItem); 
  });
}

//Création des filtres
function addFilterListeners(works) {
  const boutonTous = document.querySelector(".filter-tous");

  boutonTous.addEventListener("click", function () {
    getGallery(works); 
  });

  const boutonObjets = document.querySelector(".filter-objets");

  boutonObjets.addEventListener("click", function () {
    const filterObjects = works.filter(function (work) {
      return work.category.id === 1; 
    });
    getGallery(filterObjects); 
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
}

//Événement pour ouvrir les modal&-2
function addAllEventListeners() {
  const backToModal1 = document.querySelector('.back');
  const exitModal2 = document.querySelector(".exit2");

  ajouterPhoto.addEventListener("click", openFormToAddProject);
  backToModal1.addEventListener('click', goBackToProjectManager);
  exitModal2.addEventListener('click', toExiFromtModal2);
  modal1Btn.addEventListener('click', openModalByButton);
  modal1.addEventListener('click', hideModal1);
  
  addExitButtonClickHandler();
}

/*Affichez la modal1 lorsque le bouton modal est cliqué*/
function openModalByButton(event) {
  event.preventDefault();
  modal1.style.display = 'block';
}

/*Evénement pour chaché la modal1*/
function hideModal1(event) {
  const modalWrapper = document.querySelectorAll('.modal-wrapper');
  if (event.target === modalWrapper[0]) {
    hideModal1();
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

//Gestion de la galerie de la Modal1 / Pour DELETE
//************************************************

modal1Works.innerHTML = '';

/*Fonction pour créer la galerie à partir des données récupérées*/
function createGallery(data) {
  const modal1Works = document.querySelector('.images-works');
  modal1Works.innerHTML = '';

  data.forEach((work, index) => {
    const workDiv = document.createElement('div');
    workDiv.classList.add('gallery-works');
    workDiv.dataset.id = work._id;

    const image = document.createElement('img');
    image.src = work.imageUrl;
    image.alt = work.title;

    const title = document.createElement('h4');
    title.innerText = "éditer";

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash-can');

    workDiv.appendChild(image);
    workDiv.appendChild(title);

    /*Vérifier si nous sommes en train de créer le premier élément de la galerie*/
    if (index === 0) {
      const arrowsIcon = document.createElement('i');
      arrowsIcon.classList.add('fa-solid', 'fa-arrows-up-down-left-right');
      image.parentNode.insertBefore(arrowsIcon, image);
      workDiv.style.height = '191px';
    }

    workDiv.appendChild(deleteIcon);
    modal1Works.appendChild(workDiv);

    /*Supprimer work au clic sur l'icône de suppression*/
    deleteIcon.addEventListener('click', function (event) {
      if (event.target === deleteIcon) {
        const workDiv = event.target.closest('.gallery-works');
        const workId = workDiv.dataset.id;

        fetch('http://localhost:5678/api/works/' + workId, {
          method: 'DELETE',
          headers: {
            Accept: "application/json",
            
            Authorization: `Bearer ${token}`,
          },
        })
          .then(response => {
            if (response.ok) {
              workDiv.remove();
            } else {
              throw new Error('Erreur de suppression');
            }
          })
          .then(() => {
            /* Mettre à jour la galerie après la suppression*/
            const worksOfModal1 = Array.from(document.querySelectorAll('.gallery-works')).map(workDiv => ({
              _id: workDiv.dataset.id,
              imageUrl: workDiv.querySelector('img').src,
              title: workDiv.querySelector('h4').innerText
            }));
            getGallery(worksOfModal1);
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


//Envoi à l'API / axios post
//***************************

const newPhotoInput = document.getElementById("photo-input");
const titleInput = document.querySelector(".titre");
const categorySelect = document.getElementById("choix");
let file;

/* Fonction pour rafraîchir la galerie */
async function refreshGallery() {
  try {
    const response = await axios.get("http://localhost:5678/api/works");
    const data = response.data;
    getGallery(data);
  } catch (error) {
    console.error(error);
  }
}

newPhotoInput.addEventListener("change", (event) => {
  file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const img = document.getElementById("new-image");
      img.src = reader.result;
    };
  }
});
const validationButton = document.querySelector(".validation")
validationButton.addEventListener("click", async () => {
  console.log("bouton validé");

  if (
    titleInput.value === "" ||
    categorySelect.value === "" ||
    newPhotoInput.files.length === 0
  ) {
    // Afficher un message d'erreur
    alert("Veuillez remplir tous les champs obligatoires");
    return;
  }

  let formData = new FormData();
  formData.append("titre", titleInput.value);
  formData.append("categorie", categorySelect.value);
  formData.append("photo", file);
  console.log(formData);
  console.log(token);

  formData = JSON.stringify(formData);
  console.log(formData);

  try {
    const response = await axios.post('http://localhost:5678/api/works', formData, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      refreshGallery(); // Mettre à jour la galerie après l'ajout d'un nouveau travail
    } else {
      // Afficher un message d'erreur approprié
      throw new Error("Erreur lors de l'ajout du travail");
    }
  } catch (error) {
    // Traitement de l'erreur
    console.error(error);
  }
});


getWorks()
  .then((data) => {
    works = data;
    getGallery(works);
    addFilterListeners(works);
    createGallery(data);
    refreshGallery();
    /*addWorkToGallery(works);*/
  });


  

// ******************** CODE PRINCIPAL ********************
//********************************************************* 

//Gestion les éléments du login/logout 
const modifierImageBtn = document.querySelector('.modifier-image');
const modeEditionBtns = document.querySelectorAll('.mode-edition');

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

newPhotoInput.addEventListener("change", (event) => {
  /*const iconePlus = document.querySelector('.fa-plus');*/
  const iconAddImage = document.querySelector('.fa-image')
  const jpgPngSize = document.querySelector(".limit-size");
  const ajouterPhotoBtn = document.querySelector('.ajouter-photo');
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      image.src = reader.result;
      image.style.width = '200px';
      newPhotoInput.style.display = 'none';
      /*iconePlus.style.visibility = 'hidden';*/
      iconAddImage.style.display = 'none';
      jpgPngSize.style.display = 'none';
      ajouterPhotoBtn.style.display = 'none';
    };
  }
});
//**********************************************************

