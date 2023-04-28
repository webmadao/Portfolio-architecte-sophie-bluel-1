"use strict"
function handleLogin(event) {
    event.preventDefault(); // Empêche le formulaire de recharger la page

    // Récupération des valeurs des champs email et password
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Récupération du formulaire "myForm"
    const myForm = document.getElementById('myForm');

    // Envoi d'une requête POST à l'API "http://localhost:5678/api/login" avec les valeurs des champs email et password
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(response => {
            // Vérification que la réponse est valide (code de statut HTTP 200 à 299)
            if (!response.ok) {
                throw new Error('Les informations d\'identification sont incorrectes.');
            }
            // Conversion de la réponse au format JSON
            return response.json();
        })
        .then(data => {
            // Redirection vers la page d'accueil si les informations d'identification sont correctes
            window.location.href = 'index.html';
            // Affichage du bouton de déconnexion et masquage du bouton de connexion

        })
        .catch(error => {
            // Affichage d'un message d'erreur si les informations d'identification sont incorrectes ou si une erreur inattendue s'est produite
            alert("Les informations d\'identification sont incorrectes");
        });
}


// Ajout d'un événement d'écouteur pour le bouton de connexion
const loginButton = document.querySelector('#login-button');
loginButton.addEventListener('click', handleLogin);
