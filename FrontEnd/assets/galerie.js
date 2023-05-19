"use strict"
let works = getWorks();
const ajouterPhotoBtn = document.querySelector('.ajouter-photo');
let token = localStorage.getItem('token');
//gestion les éléments du login/logout -----------
const btnLogin = document.querySelector('.login-btn');
const btnLogout = document.querySelector('.logout-btn');
const modifierImageBtn = document.querySelector('.modifier-image');
const modeEditionBtns = document.querySelectorAll('.mode-edition');
const modal1Btn = document.querySelector('.js-modal');
const exitBtns = document.querySelectorAll('.exit');
let logoutBtn = document.getElementById('logout-btn');

//Gestion modal1-----------------------
const modal1 = document.querySelector('#modal1');
const modalWrapper = document.querySelectorAll('.modal-wrapper');

// Gestion modal2-----------------------
const backToModal1 = document.querySelector('.back');
const ajouterPhoto = document.querySelector(".ajouter-photo a");
const exitModal2 = document.querySelector(".exit2");
const modal2 = document.querySelector('#modal2');
const jpgPngSize = document.querySelector(".limit-size");

//Gestion modal 1 et 2  ---------------------
const topEdition = document.querySelector('.top-edition');

//Afficher galerie dans modal1--------------
const modal1Works = document.querySelector('.images-works');

// Recupération image dans dossier--------
const photoInput = document.getElementById("photo-input");
const newImage = document.getElementById("new-image");
const validationButton = document.querySelector(".validation");
const titreInput = document.querySelector("#modal2 input[type=text]");
const categorieSelect = document.querySelector("#modal2 select");
const iconePlus = document.querySelector('.fa-plus');
const iconAddImage = document.querySelector('.fa-image')

//Vérifiez si l'utilisateur est connecté-------
const handleLogin = true;

// Faire appel à mon API avec fetch---------------

 /*function getWorks() {
  return fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
    /* getGallery(data);
    addFilterListeners(data);
    addWorkToGallery(data);*/
   /* return data;
    })
    .catch(error => {
    console.error(error);
    throw error;
    });
  }*/
  async function getWorks() {
    try {
      const response = await fetch('http://localhost:5678/api/works');
      const data = await response.json();
      
      /* getGallery(data);
      addFilterListeners(data);
      addWorkToGallery(data);*/
      
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  

// ----------------Création de la galerie via le DOM---------------------

function getGallery(works){ 

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
  // Mettre à jour le tableau works avec les nouvelles données

}

//----------------- Création des filtres------------

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
    }
 //--------------gestion les éléments du login/logout -----------

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
  } else{
    document.querySelector('.logout-btn').style.display = 'none';
    document.querySelector('.login-btn').style.display = 'block';
}

  console.log(btnLogout);

  logoutBtn.addEventListener('click', handleLogout);

  // Fonction pour masquer ou afficher la section "top-edition"
  function toggleTopEdition() {
    const topEdition = document.querySelector('.top-edition');
    const loggedIn = !!localStorage.getItem('token');
    topEdition.style.display = loggedIn ? 'block' : 'none';
        }



  // -----------------Événement pour ouvrir les modal&-2-------------

  function addAllEventListeners() {
    ajouterPhoto.addEventListener("click", openFormToAddProject);
    backToModal1.addEventListener('click', goBackToProjectManager);
    exitModal2.addEventListener('click',toExiFromtModal2 );
    modal1Btn.addEventListener('click', openModalByButton);
    modal1.addEventListener('click', toHideModal1);
      
    // Appel de la fonction addExitButtonClickHandler()
  addExitButtonClickHandler();
  }

// ---------Affichez la modal1 lorsque le bouton modal est cliqué---------
function openModalByButton(event) {
  event.preventDefault();
    modal1.style.display = 'block';
    }

function toHideModal1(event) {
  if (event.target === modalWrapper[0]) {
    toHideModal1();
  }
}
 // ------------Evénemen pour ouvrir à la modal2--------------
  function openFormToAddProject(event) {
    event.preventDefault();
    modal1.style.display = "none";
    modal2.style.display = "block";
  }
 // ------------Evénemen pour retourner à la modal1--------------
  function goBackToProjectManager(event) {
    event.preventDefault();
    modal2.style.display = "none";
    modal1.style.display = "block";
  }
// -------------Événement pour masquer la modal2---------------
  function toExiFromtModal2(event) {
    event.preventDefault()
    modal2.style.display = "none";
        }

  function addExitButtonClickHandler() {
    exitBtns.forEach(btn => {
      btn.addEventListener('click', function (event) {
        event.preventDefault();
        modal1.style.display = 'none';
    });
    });
  }

  // Appel de la fonction addExitButtonClickHandler() pour ajouter les gestionnaires de clic sur les boutons de sortie
  addExitButtonClickHandler();
  addAllEventListeners();

//----------Afficher galerie dans modal1--------------

  modal1Works.innerHTML = '';

  function fetchData() {
    return fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Afficher la réponse de l'API dans la console
        return data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
  async function fetchData() {
    try {
      const response = await fetch('http://localhost:5678/api/works');
      const data = await response.json();
      console.log(data); // Afficher la réponse de l'API dans la console
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  // Fonction pour créer la galerie à partir des données récupérées
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
  
      // Vérifier si nous sommes en train de créer le premier élément de la galerie
      if (index === 0) {
        const arrowsIcon = document.createElement('i');
        arrowsIcon.classList.add('fa-solid', 'fa-arrows-up-down-left-right');
        image.parentNode.insertBefore(arrowsIcon, image);
        workDiv.style.height = '191px';
      }
  
      workDiv.appendChild(deleteIcon);
      modal1Works.appendChild(workDiv);
  
      // Supprimer work au clic sur l'icône de suppression
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
              // Mettre à jour la galerie après la suppression
              const works = Array.from(document.querySelectorAll('.gallery-works')).map(workDiv => ({
                _id: workDiv.dataset.id,
                imageUrl: workDiv.querySelector('img').src,
                title: workDiv.querySelector('h4').innerText
              }));
              getGallery(works);
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    });
  }
  
  // Appeler les fonctions fetchData() et createGallery() pour récupérer les données et créer la galerie
  fetchData()
    .then(data => {
      createGallery(data);
    });



// ----------------------Recupération image dans dossier--------

photoInput.addEventListener("change", (event) => {
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

//------------------------Envoi à l'API----------------

// Fonction pour rafraîchir la galerie
/*function refreshGallery() {
  fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
      works = data;
    getGallery(works);
    })
    .catch(error => {
      console.error(error);
    });
  }*/

  async function refreshGallery(works) {
    try {
      const response = await fetch('http://localhost:5678/api/works');
      const data = await response.json();
      
      works = data;
      getGallery(works);
    } catch (error) {
      console.error(error);
    }
  }
  
//Définition de works.push(works)
const newWork = {
  id: 0,
  imageUrl: photoInput.files[0],
  title: titreInput.value,
  categoryId: categorieSelect.value,
  userId: 0
};

// Fonction pour ajouter un travail à la galerie
function addWorkToGallery(works) {
  getGallery(works);
  refreshGallery(works);
}

validationButton.addEventListener("click", () => {
  const formData = new FormData();
  formData.append("titre", titreInput.value);
  formData.append("categorie", categorieSelect.value);
  formData.append("photo", photoInput.files[0]);

  if (titreInput.value === '' || categorieSelect.value === '' || photoInput.files.length === 0) {
    // Afficher un message d'erreur
    alert('Veuillez remplir tous les champs obligatoires');
    return;
  }

  fetch("http://localhost:5678/api-docs/#/default/post_works", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then(response => {
      if (response.ok) {
        console.log(titreInput.value);
        console.log(categorieSelect.value);
        console.log(photoInput.files);
        refreshGallery(works); // Mettre à jour la galerie après l'ajout d'un nouveau travail
      } else {
        // Afficher un message d'erreur approprié
        throw new Error("Erreur lors de l'ajout du travail");
      }
    })
    .catch(error => {
      console.error(error);
    });
});

// --------------------------------------------------------------------
getWorks()
  .then(data => {
    works = data;
    getGallery(works);
    addFilterListeners(works);
    createGallery(data);
    refreshGallery(works);
    addWorkToGallery(works);
});








/*getWorks();// Appeler la fonction getWorks() pour afficher la galerie et les filtres





 
      




/*
validationButton.addEventListener('click', addPhotoToGallery);

function addPhotoToGallery() {
  const newTitle = titreInput.value;
  const newCategory = categorieSelect.value;
  const newImageFile = photoInput.files[0];

  if (newTitle && newCategory && newImageFile) {
    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('category', newCategory);
    formData.append('image', newImageFile);

    fetch("http://localhost:5678/api-docs/#/default/post_works", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData
    })
    .then(response => {
      if (response.ok) {
        // traiter la réussite
        console.log(titreInput.value);
        console.log(categorieSelect.value);
        console.log(photoInput.files);
        /*return response.json();*/
    /*  } else {
        throw new Error("La réponse du réseau n'était pas correcte");
      }
    })
    
      /*.then(response => response.json())*/
    /*  .then(data => {
        // Ajouter la nouvelle photo à la galerie existante
        works.push(data);
        getGallery(works);
        
        // Réinitialiser les champs de la modal2
       /* titreInput.value = '';
        categorieSelect.value = 'objets';
        photoInput.value = '';
        newImage.src = '';
        newImage.style.width = '0';
        photoInput.style.display = 'block';
        iconAddImage.style.display = 'block';*/

        // Fermer la modal2
        /*modal2.style.display = 'none';
        modal1.style.display = 'block';*/
     /* })
      .catch(error => {
        console.error(error);
        alert('Erreur lors de l\'ajout de la photo');
      });
  } else {
    alert('Veuillez remplir tous les champs');
  }
}*/
























//------------- Fermer la modale lorsqu'on clique à l'extérieur de celle-ci------
   /* window.addEventListener("click", function(event) {
      if (event.target !== modal1) {
        modal1.style.display = 'none';
      }
      });*/



/*
  const modal1Works = document.querySelector('.images-works');
  modal1Works.innerHTML = '';

  fetch("http://localhost:5678/api/works")
  .then(function (response) {
      if (response.ok) {
          return response.json();
      }
      else {
          throw new Error('Erreur lors de la récupération des travaux :');
      }
  })
  .then(function (data) {
      const gallery = document.createElement("div");
      gallery.classList.add("gallery");

      data.forEach((work, index) => {
          let figure = document.createElement("figure");

          let img = document.createElement("img");
          img.src = work.imageUrl;
          img.crossOrigin = "anonymous";
          figure.appendChild(img);

          // Ajouter une légende avec le mot "éditer"
          let figcaption = document.createElement("figcaption");
          let editLink = document.createTextNode("éditer");
          figcaption.appendChild(editLink);
          figure.appendChild(figcaption);

          // Ajouter un bouton de suppression avec une icône trash
          let deleteButton = document.createElement("button");
          deleteButton.classList.add("delete-button");
          deleteButton.innerHTML = '<i class="fa fa-trash-can"></i>';
          deleteButton.addEventListener("click", () => {
              // Récupérer l'id du travail à supprimer
              const workId = work.id;

              // Envoyer la requête DELETE au serveur afin de supprimer un travail
              fetch(`http://localhost:5678/api/works/${workId}`, {
                  method: "DELETE",
                  headers: {
                      "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                  }
              })
                  .then(response => {
                      if (response.ok) {
                          // Supprimer l'élément de la page une fois la suppression réussie
                          figure.remove();
                          console.log(`Le travail avec l'id ${workId} a été supprimé.`);
                      } else {
                          throw new Error("Erreur lors de la suppression du travail.");
                      }
                  })
                  .catch(error => {
                      console.error(error);
                  });
          });

          figcaption.appendChild(deleteButton);

        }); // Ajout du point-virgule ici
      });




*/












/*window.addEventListener("click", function (event) {
    event.preventDefault();
    modal1.style.display = "none";
    modal2.style.display = "none";
  })*/


/*function openModal() {
    const modaleGallery = document.getElementById("modale-gallery");
    modaleGallery.style.display = "block";
    const travaux = document.querySelector(".travaux");
    travaux.classList.add("open");
    travaux.addEventListener("click", function () {
      console.log("top");
    });
  }*/



























  /*
    // Suppression de travaux
    modal1Works.addEventListener('click', function (event) {
      if (event.target.tagName === 'img') {
        const workDiv = event.target.parentElement;
        const workId = workDiv.dataset.id;
   
        fetch(`http://localhost:5678/api/works/${workId}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (response.ok) {
              workDiv.remove(); // Supprime le travail de la galerie
            } else {
              throw new Error('Erreur de suppression');
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    });*/



/*

  // Événements pour supprimer une figure
  const figures = document.querySelectorAll('.images figure');
  figures.forEach(figure => {
    figure.addEventListener('click', event => {
      if (event.target.classList.contains('img')) {
        deleteFigure(figure);
      }
    });
  });*/








// Sélectionnez les éléments à masquer
/*------------------galerie modal--------*/
/*function getWorks() {
  fetch('http://localhost:5678/api/works')
    .then(response => response.json()) // Récupérer les données au format JSON
    .then((data) => {

      addModal(data)
    });
}

function addModal(works) {
  const modal1Works = document.querySelector('#images-works');
  modal1Works.innerHTML = ''; // Effacer le contenu de la galerie précédente

  works.forEach(work => {
    const workModal = document.createElement('div');
    workModal.classList.add('gallery-item');

    const modal1Image = document.createElement('img');
    modal1Image.src = work.imageUrl;
    modal1Image.alt = work.title;

    const modalTitle = document.createElement('h3');
    modalTitle.innerText = work.title;

    workModal.appendChild(modal1Image);
    workModal.appendChild(modalTitle);

    modal1Works.appendChild(workModal); // Ajouter chaque élément à la galerie
  });
}



// Masquez les éléments si l'utilisateur n'est pas connecté











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

