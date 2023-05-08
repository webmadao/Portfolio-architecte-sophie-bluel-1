"use strict";

const btnLogin = document.querySelector('.login-btn');
const btnLogout = document.querySelector('.logout-btn');



/**
 * 
 * @param {*} event 
 */
function handleLogin(event) {
    event.preventDefault(); // Empêche le formulaire de recharger la page

    // Récupération des valeurs des champs email et password
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Récupération du formulaire "myForm"
    /*const myForm = document.getElementById('myForm');*/

    // Envoi d'une requête POST à l'API "http://localhost:5678/api/login" avec les valeurs des champs email et password
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(response => {
            // Vérification que la réponse est valide (code de statut HTTP 200 à 299)

            if (response.status === 401) {
                throw new Error("L'adresse e-mail ou le mot de passe est incorrect.");
            }
            if (response.status !== 200) {
                throw new Error("Une erreur s'est produite lors de la connexion.");
            }
            // Extraction des données JSON de la réponse
            return response.json();
        })
        .then(data => {
            // Stockage du token et de l'userId dans le stockage local
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("token", data.token);
            // Redirection vers la page d'accueil si les informations d'identification sont correctes
            window.location.href = 'index.html';
            // Affichage du bouton de déconnexion et masquage du bouton de connexion
        })
        .catch(error => {
            // Affichage d'un message d'erreur si les informations d'identification sont incorrectes ou si une erreur inattendue s'est produite
            alert("Les informations d\'identification sont incorrectes");
        });
}

/*
function logout() {

    localStorage.clear();
    location.reload();

}*/


// Ajout d'un événement d'écouteur pour le bouton de connexion

btnLogin.addEventListener('click', handleLogin);
btnLogout.addEventListener('click', logout);













/*
// Constantes
const API_URL = "http://localhost:5678/api/users/login";
const EMAIL_FIELD_NAME = "email";
const PASSWORD_FIELD_NAME = "password";
/*const MIN_PASSWORD_LENGTH = 5;

// Fonction de validation de l'e-mail
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fonction de validation du mot de passe
function validatePassword(password) {
    return password.length >= MIN_PASSWORD_LENGTH;

}
// Fonction de gestion de la soumission du formulaire de connexion
function handleLogin(event) {
    event.preventDefault(); // Empêche le formulaire de recharger la page

    // Récupération des valeurs des champs email et password
    const email = document.getElementById(EMAIL_FIELD_NAME).value;
    const password = document.getElementById(PASSWORD_FIELD_NAME).value;

    // Validation des champs
    if (!validateEmail(email)) {
        alert("Veuillez saisir une adresse e-mail valide.");
        return;
    }
    if (!validatePassword(password)) {
        alert('Le mot de passe doit contenir au moins ${ MIN_PASSWORD_LENGTH } caractères.');
        return;
    }*/

// Envoi d'une requête POST à l'API avec les valeurs des champs email et password
/*fetch(API_URL, {
    method: "POST",
    headers: {
        accept: "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: email,
        password: password
    })
})
    .then(response => {
        // Vérification du code de statut HTTP
        if (response.status === 401) {
            throw new Error("L'adresse e-mail ou le mot de passe est incorrect.");
        }
        if (response.status !== 200) {
            throw new Error("Une erreur s'est produite lors de la connexion.");
        }
        // Extraction des données JSON de la réponse
        return response.json();
    })
    .then(data => {
        // Stockage du token et de l'userId dans le stockage local
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("token", data.token);
        // Redirection vers la page d'accueil
        window.location.href = "index.html";
    })
    .catch(error => {
        // Affichage d'un message d'erreur
        alert(error.message);
    });


// Ajout d'un événement d'écouteur pour le bouton de connexion
const loginButton = document.querySelector("#login-button");
loginButton.addEventListener("click", handleLogin);*/