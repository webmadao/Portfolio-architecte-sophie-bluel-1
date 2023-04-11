
/*function handleLogin(event) {
    event.preventDefault(); // Empêche le formulaire de recharger la page

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const myForm = document.getElementById('myForm');

    fetch('http://localhost:5678/api/login', {
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
            if (!response.ok) {
                throw new Error('Les informations d\'identification sont incorrectes.');
            }
            return response.json();
        })
        .then(data => {
            window.location.href = 'index.html'; // Redirige vers la page d'accueil
        })
        .catch(error => {
            const errorSpan = document.getElementById('error');
            errorSpan.innerText = error.message;
        });
}

// Ajouter un événement d'écouteur pour le bouton de connexion
const loginButton = document.querySelector('#login-button');

loginButton.addEventListener('click', handleLogin);*/

/*
function handleLogin(event) {
    event.preventDefault(); // Empêche le formulaire de recharger la page

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const myForm = document.getElementById('myForm');

    fetch('http://localhost:5678/api/login', {
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
            if (!response.ok) {
                throw new Error('Les informations d\'identification sont incorrectes.');
            }
            return response.json();
        })
        .then(data => {
            // Redirige vers la page d'accueil après une connexion réussie
            window.location.href = 'index.html';
        })
        .catch(error => {
            // Affiche l'erreur dans un élément HTML dédié
            const errorSpan = document.getElementById('error');
            errorSpan.textContent = error.message;
        });
}

// Ajouter un événement d'écouteur pour le bouton de connexion
const loginButton = document.querySelector('login-button');
if (loginButton) { // Vérifie si l'élément est présent dans la page
    loginButton.addEventListener('click', handleLogin);
}*/


/*
const loginForm = document.querySelector('#myForm');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const email = formData.get('email');
  const password = formData.get('password');

  const response = await fetch('http://localhost:5678/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const result = await response.json();

  if (response.ok) {
    // Rediriger vers la page d'accueil
    window.location.href = 'index.html';
  } else {
    // Afficher un message d'erreur
    const errorElement = document.querySelector('#error');
    errorElement.textContent = result.message;
  }
});*/
/*
document.getElementById("myFrom").addEventListener("submit", function (e) {
    e.preventDefault();
    alert('Formulaire envoyé!')
})*/

/*
const loginForm = document.querySelector('#login');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const username = formData.get('email');
    const password = formData.get('password');

    const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();

    if (response.ok) {
        // Rediriger vers la page d'accueil
        window.location.href = 'index.html';
    } else {
        // Afficher un message d'erreur
        const errorElement = document.querySelector('#error-message');
        errorElement.textContent = result.message;
    }
});*/

async function getLogin(user) {
    let response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });
}
getLogin()

