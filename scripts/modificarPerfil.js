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
                    document.getElementById("nombre_usuario").value = data.nombre_usuario;
                    document.getElementById("email").value = data.email;
                    document.getElementById("nombre").value = data.nombre;
                    document.getElementById("apellido").value = data.apellido;
                    document.getElementById("imagen_perfil").value = data.imagen_perfil;
                    document.getElementById("contrasena").value = data.contrasena;
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
//agregar ruta correcta
//var rutaImagen="../Api_Flask/img/perfil".concat(data.imagen_perfil)
//var imagenElement = document.getElementById("imagen");


document.getElementById("saveChanges").addEventListener("submit", function (event) {
    event.preventDefault();
    updateProfile();
});

function updateProfile() {
    let data = {
        nombre_usuario: document.getElementById("nombre_usuario").value,
        email: document.getElementById("email").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        contrasena: document.getElementById("contrasena").value,
        imagen_perfil: document.getElementById("imagen_perfil").value,
    };
    fetch("http://127.0.0.1:5000/user/", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    console.log(data)
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                window.location.href = "modificarPerfil.html";
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