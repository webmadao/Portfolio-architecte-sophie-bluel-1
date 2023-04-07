fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(works => {
    // Sélection de l'élément de la galerie
    const gallery = document.querySelector('.gallery');

    // Suppression des travaux présents dans la galerie
    gallery.innerHTML = '';

    // Ajout des nouveaux travaux récupérés depuis l'API
    works.forEach(work => {
      const workItem = document.createElement('div');
      workItem.classList.add('gallery-item');

      const workImage = document.createElement('img');
      workImage.src = work.imageUrl;
      workImage.alt = work.title;

      const workTitle = document.createElement('h3');
      workTitle.innerText = work.title;

      /*const workDescription = document.createElement('p');
      workDescription.textContent = work.description;*/

      workItem.appendChild(workImage);
      workItem.appendChild(workTitle);
      /*workItem.appendChild(workDescription);*/

      gallery.appendChild(workItem);
    });
  })

  .catch(error => {
    console.error('Error fetching works:', error);
  })

/*------------------------------------------------------------*/

/*const url = fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {

    // Sélection bouton filter-tous
    const boutonTous = document.querySelector(".filter-tous");

    boutonTous.addEventListener("click", function () {
      const filterAll = data.filter(function (work) {
        return url;
      });

      console.log(filterAll);
    });
    // Sélection bouton filter-objets
    const boutonObjets = document.querySelector(".filter-objets");

    boutonObjets.addEventListener("click", function () {
      const filterObjects = data.filter(function (work) {
        return work.category.id === 1;
      });

      console.log(filterObjects);
    });
    // Sélection bouton filter-appartements
    const boutonAppartement = document.querySelector(".filter-appartements");

    boutonAppartement.addEventListener("click", function () {
      const filterAppartement = data.filter(function (work) {
        return work.category.id === 2;
      });

      console.log(filterAppartement);
    });
    // Sélection bouton filter-hotel-restaurants
    const boutonHotelRestaurants = document.querySelector(".filter-hotel-restaurants");

    boutonHotelRestaurants.addEventListener("click", function () {
      const filterHotelRestaurants = data.filter(function (work) {
        return work.category.id === 3;
      });

      console.log(filterHotelRestaurants);
    });

  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });*/

/*-----------------------------------------*/


// Récupération des données avec fetch
const url = 'http://localhost:5678/api/works';
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Stockage des données dans une variable
    const works = data;

    // Sélection bouton filter-tous
    const boutonTous = document.querySelector(".filter-tous");

    boutonTous.addEventListener("click", function () {
      console.log(works);
    });

    // Sélection bouton filter-objets
    const boutonObjets = document.querySelector(".filter-objets");

    boutonObjets.addEventListener("click", function () {
      const filterObjects = works.filter(function (work) {
        return work.category.id === 1;
      });

      console.log(filterObjects);
    });

    // Sélection bouton filter-appartements
    const boutonAppartement = document.querySelector(".filter-appartements");

    boutonAppartement.addEventListener("click", function () {
      const filterAppartement = works.filter(function (work) {
        return work.category.id === 2;
      });

      console.log(filterAppartement);
    });

    // Sélection bouton filter-hotel-restaurants
    const boutonHotelRestaurants = document.querySelector(".filter-hotel-restaurants");

    boutonHotelRestaurants.addEventListener("click", function () {
      const filterHotelRestaurants = works.filter(function (work) {
        return work.category.id === 3;
      });

      console.log(filterHotelRestaurants);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });










