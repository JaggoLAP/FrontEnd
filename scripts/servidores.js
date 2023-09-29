// Al cargar la pagina llama la funcion para cargar todos los servidores
function cargarServidores() {
    //console.log('Dentro de la funcion.');
    const url = "http://127.0.0.1:5000/servidor"
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            const selectServidores = document.getElementById("servidores");
            selectServidores.innerHTML = "";
            data.forEach(servidor => {
                const option = document.createElement("option");
                option.value = servidor.id_servidor;
                option.text = servidor.nombre_servidor;

                selectServidores.appendChild(option);
            });
        });
}

// Cargamos los canales del servidor seleccionado
function cargarCanales() {
    console.log('Entrando a cargar canales');
    const servidorSeleccionado = document.getElementById("servidores").value;
    console.log('servidorSeleccionado');
    console.log(servidorSeleccionado);
    fetch(`http://127.0.0.1:5000/canal/servidor/${servidorSeleccionado}`)
        .then(response => response.json())
        .then(data => {
            const divCanales = document.getElementById("canales");
            divCanales.innerHTML = "";
            data.forEach(canal => {
                const p = document.createElement("p");
                p.textContent = canal.nombre_canal;
                divCanales.appendChild(p);
            });
        });
}

window.onload = cargarServidores;
