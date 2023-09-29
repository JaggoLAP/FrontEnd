document.addEventListener('DOMContentLoaded', function () {
    // Agrega un event listener al evento 'submit' del formulario
    document.getElementById("registerForm").addEventListener('submit', function (event) {
        event.preventDefault(); // Previene el envío del formulario
        register();
    });
});

function register() {
    const data = {
        nombre_usuario: document.getElementById("nombre_usuario").value,
        email: document.getElementById("email").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        fecha_nac: document.getElementById("fecha_nac").value,
        contrasena: document.getElementById("contrasena").value,
    };

    fetch("http://127.0.0.1:5000/user", { // Utiliza una ruta relativa si la API Flask se encuentra en el mismo dominio
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 201) { // Cambié 200 a 201 para indicar una creación exitosa
                return response.json().then(data => {
                    window.location.href = "main.html";
                });
            } else {
                return response.json().then(data => {
                    document.getElementById("message").textContent = data.message;
                });
            }
        })
        .catch(error => {
            document.getElementById("message").textContent = "An error occurred.";
        });
}
