document.getElementById("registerForm").addEventListener("submit", function (event){
    event.preventDefault();
    register();
});

function register(){
    console.log("hola, en la funcion");
    const data= {
        nombre_usuario: document.getElementById("nombre_usuario").value,
        email: document.getElementById("email").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        fecha_nac: document.getElementById("fecha_nac").value,
        contrasena: document.getElementById("contrasena").value,
        };
        console.log(email);
    fetch("http://127.0.0.1:5000/user",{
        method: 'POST', 
        //headers: {
        //    'Content-Type': 'application/json',
        //},
        //body: JSON.stringify(data),
        credentials: 'include'
    })
    console.log("data");
    console.log(data);
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data =>{
                window.location.href = "main.html";
            });
        } else{
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error ocurred.";
    });
    }