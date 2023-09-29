
window.addEventListener('load', function () {
    getProfile();
});

document.getElementById("logout").addEventListener("click", logout);

/*document.addEventListener("DOMContentLoaded", function() {
    // Realiza una solicitud GET a la URL de Flask para obtener los datos del perfil.
    fetch("/auth/profile", {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("No se pudieron obtener los datos del perfil.");
            }
        })
        .then(data => {
            // Inserta los datos del perfil en los elementos HTML correspondientes.
            document.getElementById("nombre_usuario").innerText = data.nombre_usuario;
            document.getElementById("email").innerText = data.email;
            document.getElementById("nombre").innerText = data.nombre;
            document.getElementById("apellido").innerText = data.apellido;
        })
        .catch(error => {
            console.error(error);
        });
});*/


function getProfile() {
    const url = "http://127.0.0.1:5000/auth/profile";
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 200) {
                return response.json().then(data => {
                    document.getElementById("nombre_usuario").innerText = data.nombre_usuario;
                    document.getElementById("email").innerText = data.email;
                    document.getElementById("nombre").innerText = data.nombre;
                    document.getElementById("apellido").innerText = data.apellido;
                });
            } else {
                return response.json().then(data => {
                    document.getElementById("message").innerHTML = data.message;
                });
            }
        })
        .catch(error => {
            document.getElementById("message").innerHTML = "Ocurrió un error.";
        });
}

function logout() {
    const url = "http://127.0.0.1:5000/auth/logout";
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                window.location.href = "login.html";
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.
            getElementById("message").innerHTML = "Ocurrió un error.";
    });
}