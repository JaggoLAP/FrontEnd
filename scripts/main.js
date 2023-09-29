
function cargarServidores() {
    console.log('Dentro de la funcion.');
    const url = "http://127.0.0.1:5000/servidor/user"
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            const selectServidores = document.getElementById("frmsrvcont");
            selectServidores.innerHTML = "";
            
            const frmchcont = document.getElementById("frmchcont");
            frmchcont.innerHTML = "";

            const contmjes = document.getElementById("contmjes");
            contmjes.innerHTML = "";
            
            console.log('selectServidores.');
            console.log('data servidores: ', data);
            data.forEach(servidor => {

                const DivContSrv = document.createElement("div");
                DivContSrv.className = "contsrv";
                selectServidores.appendChild(DivContSrv);

                const ImgContSrv = document.createElement("img");
                ImgContSrv.className = "contsrv_imgsrv";
                const DirImg = "../assets/" + servidor.imagen_servidor
                ImgContSrv.src = DirImg;
                console.log("servidor.imagen_servidor");
                console.log(DirImg);
                DivContSrv.appendChild(ImgContSrv);

                const NameContSrv = document.createElement("div");
                NameContSrv.className = "contsrv_namesrv";
                NameContSrv.textContent = servidor.nombre_servidor;
                DivContSrv.appendChild(NameContSrv);
                
                const IdSrvCont = document.createElement("div");
                IdSrvCont.className = "contsrv_idsrv";
                IdSrvCont.textContent = servidor.id_servidor;
                DivContSrv.appendChild(IdSrvCont);
 
                DivContSrv.addEventListener("click", function () {
                    const servidorId = servidor.id_servidor;
                    cargarCanales(servidorId, servidor.usuario_id);
                
                console.log('servidor.usuario_id: ',servidor.usuario_id)
                });
               
            });
        });

}

function cargarCanales(servidorId, usuarioId) {
    const canalesUrl = `http://127.0.0.1:5000/canal/servidor/${servidorId}`;

    fetch(canalesUrl, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        console.log('data canales: ',data)
        const frmchcont = document.getElementById("frmchcont");
        frmchcont.innerHTML = "";

        data.forEach(canal => {
            const contch4 = document.createElement("div");
            contch4.className = "contch4";
            frmchcont.appendChild(contch4);

            const contch_dot = document.createElement("div");
            contch_dot.className = "contch_dot";
            contch4.appendChild(contch_dot);

            const dot_circle_line = document.createElement("img");
            dot_circle_line.className = "dot-circle-line";
            dot_circle_line.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEVSURBVHgBtVSBjcIwDDyYgBG8wY/w3eB/hI7wG9ARssFnA8QEwATABHQDYILiqAcUNyFBgpNOrZzrOXFcA2/G5MlapfzmUxhrlXul43sRZsqF8qj8V9Y0DfxVemXHNcmZBcGBhrOMzlMrObMG5Wj4TTS5R3+MV7EgHyDo6yImHjI77mKLeN2CJtS7GgYdxrsTGnWGsSN6mFKtlD8RUZegM9qaHpgOdnM2oi+kYZO39LgZxvCsbU6phanNMMASaewwTt4OAw3GlxJEqUsRo/Uwda3QX709plC8pZFLaGItF2/QAngkfojrEecoxxyF/3Nuklwn0gGFE8fjPqLCyKrImrEjEhNpkjH+Q9/gwlir3CjX5OdxAcrfUazjFh4JAAAAAElFTkSuQmCC";
            contch_dot.appendChild(dot_circle_line);

            const contch_idchnl = document.createElement("div");
            contch_idchnl.className = "contch_idchnl";
            contch_idchnl.textContent = canal.id_canal;
            contch_dot.appendChild(contch_idchnl);

            const contch_name = document.createElement("div");
            contch_name.className = "contch_name";
            contch4.appendChild(contch_name);
            
            const nombredelcanal = document.createElement("div");
            nombredelcanal.className = "nombredelcanal";
            nombredelcanal.textContent = canal.nombre_canal;
            contch_name.appendChild(nombredelcanal);

            contch4.addEventListener("click", function () {
                const Canalid = canal.id_canal;
                cargarMensajesDesdeCanales(Canalid, usuarioId);

            console.log('Canal id: ',canal.id_canal)
            console.log('usuarioId id: ',usuarioId)
            });
        });
    });
}

function cargarMensajesDesdeCanales(Canalid, usuarioId) {
    const canalesUrl = `http://127.0.0.1:5000/mensaje/canal/${Canalid}`;
    console.log('usuarioId id en mjes: ',usuarioId)
    fetch(canalesUrl, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        console.log('data mjes: ',data)
        const contmjes = document.getElementById("contmjes");
        contmjes.innerHTML = ""; 
        
        data.forEach(mnsje => {
            const contmje2 = document.createElement("div");
            contmje2.className = "contmje2";
            contmjes.appendChild(contmje2);

            const contmje_avat_3dots = document.createElement("div");
            contmje_avat_3dots.className = "contmje_avat_3dots";
            contmje2.appendChild(contmje_avat_3dots);

            console.log('usuarioId mjes: ',usuarioId)
            console.log('data.usuario_id mjes: ',mnsje.usuario_id)
            if (usuarioId === mnsje.usuario_id) {
                const btn_3dots = document.createElement("div");
                btn_3dots.className = "btn_3dots";
                contmje_avat_3dots.appendChild(btn_3dots);

                const dots_vertical = document.createElement("img");
                dots_vertical.className = "dots_vertical";
                dots_vertical.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABaSURBVHgB7dTLCYAwEEXRi42bDtQSrHBK8AOCELJJIJMP78BssnmbcEE6tz5n3204eYeu6AIOLDFsZFpopGT4SLydONn5P1dAZqSAKCDVKCDzU0AUkGoUkHHcD6E14PoHWFMAAAAASUVORK5CYII=";
                btn_3dots.appendChild(dots_vertical);
            }
            
            const avatar_mje = document.createElement("img");
            avatar_mje.className = "avatar_mje";
            avatar_mje.src = "../assets/default.jpg";
            contmje_avat_3dots.appendChild(avatar_mje);

            const contmje_tex_fech = document.createElement("div");
            contmje_tex_fech.className = "contmje_tex_fech";
            contmje2.appendChild(contmje_tex_fech);
            
            const contmje_tex2 = document.createElement("div");
            contmje_tex2.className = "contmje_tex2";
            contmje_tex_fech.appendChild(contmje_tex2);

            const mensaje = document.createElement("div");
            mensaje.className = "mensaje";
            mensaje.textContent = mnsje.contenido;
            contmje_tex2.appendChild(mensaje);

            const contmje_fech = document.createElement("div");
            contmje_fech.className = "contmje_fech";
            contmje_tex_fech.appendChild(contmje_fech);

            const MjsId = document.createElement("div");
            MjsId.className = "MjsId";
            MjsId.textContent = mnsje.id_mensaje;
            contmje_fech.appendChild(MjsId);

            const F09_2023_20_05 = document.createElement("div");
            F09_2023_20_05.className = "F09_2023_20_05";
            F09_2023_20_05.textContent = mnsje.fecha_envio;
            contmje_fech.appendChild(F09_2023_20_05);

            console.log('vueltas')
        });
    });
}

function fncLogout() {
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

function abrirPerfil() {
    window.location.href = 'profile.html';
}

window.onload = cargarServidores;