var datosEventos // contener el array con todos los eventos 
let fechaBase //= dataAmazing.fechaActual // Es la fecha establecida en el archivo JSON
let eventos = [] //= dataAmazing.eventos
let modalComentario = document.getElementById("modalComentario")
const eventosPasados = []
const eventosFuturos = []
let arrayAFiltrar = []
let search = ""
let formulario = document.getElementById("form")
var containerFiltros = document.getElementById("containerFiltros")
var inputSearch = document.getElementById("inputSearch")
var stats = document.getElementById("stats")
var containerCard = document.getElementById("containerCard")
var btn = []
let checkedCheckboxes = []


async function getData() {
    let datosApi
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => datosApi = json)

    eventos = datosApi.eventos
    fechaBase = datosApi.fechaActual



    for (var i = 0; i < eventos.length; i++) {

        if (eventos[i].date > fechaBase) {
            eventosFuturos.push(eventos[i])
        } else {
            eventosPasados.push(eventos[i])
        }
    }


    var time = location.search.split("?time=")

//console.log(time)

switch (time[1]) {
    case "PastEvents": imprimir("PastEvents")
        document.getElementById("pagina").innerHTML = "Past Events"
        break;

    case "UpcomingEvents": imprimir("UpcomingEvents")
        document.getElementById("pagina").innerHTML = "Upcoming Events"
        break;

    case "Contact": imprimir("Contact")
        document.getElementById("pagina").innerHTML = "Contact"
       
        break;

    case "Stats": imprimir("Stats")
        document.getElementById("pagina").innerHTML = "Stats"
        break;

    default: imprimir("Home")
    document.getElementById("pagina").innerHTML = "Home"
    break;
}

    

}

getData()


// botones de navbar
var button = document.getElementsByClassName("button");
for (var i = 0; i < button.length; i++) {
    const element = button[i];
    btn.push(button[i].innerText)
    element.addEventListener("click", function (e) {
        document.getElementById("pagina").innerText = e.target.innerText
        imprimir(e.target.id)
    })
}

//console.log(btn)

function imprimir(id) {

    switch (id) {
        case "PastEvents":
            arrayAFiltrar = eventosPasados
            inputSearch.value = ""
            checkedCheckboxes = []
            form.style.display = "none"
            containerFiltros.style.display = "flex"
            stats.style.display = "none"
            containerCard.style.display = "flex"
            display(eventosPasados)
            eventsCategories(eventosPasados)
            break;
        case "UpcomingEvents":
            arrayAFiltrar = eventosFuturos
            inputSearch.value = ""
            checkedCheckboxes = []
            form.style.display = "none"
            containerCard.style.display = "flex"
            containerFiltros.style.display = "flex"
            stats.style.display = "none"
            display(eventosFuturos)
            eventsCategories(eventosFuturos)
            break;
        case "Contact":
            imprimirForm()
            form.style.display = "flex"
            containerFiltros.style.display = "none"
            containerCard.style.display = "none"
            stats.style.display = "none"
            break;
        case "Stats":
            form.style.display = "none"
            containerCard.style.display = "none"
            containerFiltros.style.display = "none"
            stats.style.display = "flex"
            initStats()
            statsTemple()
            break;
        default:
            arrayAFiltrar = eventos
            inputSearch.value = ""
            checkedCheckboxes = []
            containerCard.style.display = "flex"
            containerFiltros.style.display = "flex"
            stats.style.display = "none"
            form.style.display = "none"
            display(eventos)
            eventsCategories(eventos)
    }

}



function display(array) {

    var html = "";

    for (var i = 0; i < array.length; i++) {
        html += `
    <div class="card" style="width: 18rem;">
                    <img src="${array[i].image}" class="card-img-top" alt=${array[i].name}>
                    <div class="card-body">
                        <h5 class="card-title">${array[i].name}</h5>
                        <p class="card-text">${array[i].description}</p>
                        <p class="precio">Precio:$${array[i].price}</p>
                        <a href="./Pages/details.html?id=${array[i].id}" class="btn btn-primary">Ver Más</a>
                    </div>
                </div>

    `
    }
    // console.log(html)
    document.getElementById("containerCard").innerHTML = html;
}

//console.log(location.search);



var buttonRight = document.getElementById("btnRight")
buttonRight.addEventListener("click", function (e) {
    var page = document.getElementById("pagina").innerText
    if (btn.indexOf(page) < 4) {
        changePage(btn.indexOf(page) + 1)
    } else {
        changePage(0)
    }

})




function changePage(i) {
    switch (i) {
        case 0: display(eventos)
            eventsCategories(eventos)
            arrayAFiltrar = eventos
            document.getElementById("pagina").innerHTML = btn[i]
            containerCard.style.display = "flex"
            containerFiltros.style.display = "flex"
            stats.style.display = "none"
            break;

        case 1: 
            display(eventosPasados)
            eventsCategories(eventosPasados)
            arrayAFiltrar = eventosPasados
            document.getElementById("pagina").innerHTML = btn[i]
            containerCard.style.display = "flex"
            containerFiltros.style.display = "flex"
            stats.style.display = "none"
            break;

        case 2:
            display(eventosFuturos)
            eventsCategories(eventosFuturos)
            arrayAFiltrar = eventosFuturos
            document.getElementById("pagina").innerHTML = btn[i]
            containerCard.style.display = "flex"
            containerFiltros.style.display = "flex"
            stats.style.display = "none"
            break;

        case 3: imprimirForm()
            form.style.display = "flex"
            containerFiltros.style.display = "none"
            containerCard.style.display = "none"
            document.getElementById("pagina").innerHTML = btn[i]
            stats.style.display = "none"
            break;


        default:
            stats.style.display = "flex"
            containerCard.style.display = "none"
            containerFiltros.style.display = "none"
            form.style.display = "none"
            
            document.getElementById("pagina").innerHTML = btn[i]
             statsTemple()
            initStats()
            break;
 

    }


}
//var buttonRight = document.getElementById("btnRight")

function imprimirForm() {
    document.getElementById("form").innerHTML = `
    
    <div class="formulario">       
                <form action="" name="contac">
                    <label for="nombre"><i class="fa-solid fa-user"></i></label>
                    <input type="text" name="nombre" placeholder="Your Name "><br>
                    
                    <label for="email"><i class="fa-solid fa-envelope"></i></label>
                    <input type="email" name="email" placeholder="Your Email"><br>

                    <label for="date"><i class="fa-solid fa-calendar"></i></label>
                    <input type="date" name="date"><br>

                    
                    <label for="type"><i class="fa-solid fa-qrcode"></i></label>
                    <select id="type" name="type">
                        <option value="Varios"selected>Varios</option>
                        <option value="Reclamo">Reclamo</option>
                        <option value="Sugerencia">Sugerencia</option>
                        <option value="Felicitaciones">Felicitaciones</option>
                    </select><br>
                    

                    <label for="mensaje"><i class="fa-solid fa-inbox"></i></label>
                    <input type="textarea" name="mensaje" placeholder="Your Message"><br>

                    <input type="submit" class="button_contact" value="Submit" data-bs-toggle="modal" data-bs-target="#exampleModal">
                </form>
            </div>
    `
    let form = document.querySelector("form")
    form.addEventListener("submit", function (event) { actionForm(event) })
}


function statsTemple() {
    document.getElementById("stats").innerHTML = `
    <table>
                    <tr class="color">
                      <th colspan="3">Estadísticas de Eventos</th>
                    </tr>
                    <tr class="titulo">
                      <th>Evento con Mayor Porcentaje de Asistencia</th>
                      <th>Evento con Menor Porcentaje de Asistencia</th>
                      <th>Evento de Mayor Capacidad</th>
                    </tr>
                    <tr id="mayoresymenores">
                      <!-- <td>Metallica en Concierto</td>
                      <td>Fiesta de Disfraces</td>
                      <td>Metallica en Concierto</td> -->
                    </tr>
                  </table>  
                  <table id="statsFuturos">
                    <tr class="color">
                      <th colspan="3">Estadisticas de Eventos Futuros por Categoría</th>
                    </tr>
                    <tr class="titulo">
                      <th>Categorías</th>
                      <th>Estimacion de Ingresos</th>
                      <th>Asistencia Estimada</th>
                    </tr>
                    <!-- <tr >
                      <td>Metallica en Concierto</td>
                      <td>Concierto de Música</td>
                      <td>138.000</td>
                    </tr>
                    <tr>
                      <td>Noche de Halloween</td>
                      <td>Fiesta de Disfraces</td>
                      <td>9.000</td>
                    </tr>
                    <tr>
                      <td>Avengers</td>
                      <td>Vamos al Cine</td>
                      <td>9.000</td>
                    </tr> -->
                  </table>  
                  <table id="statsPasados">
                    <tr class="color">
                        <th colspan="3">Estadisticas de Eventos Pasados por Categoría</th>
                    </tr>
                    <tr class="titulo">
                      <th>Categorías</th>
                      <th>Ingresos</th>
                      <th>Asistencia</th>
                    </tr>
                    <!-- <tr>
                      <td>10K por la vida</td>
                      <td>Carrera</td>
                      <td>25.698</td>
                    </tr>
                    <tr>
                      <td>Feria del libro Escolar</td>
                      <td>Intercambio de Libros</td>
                      <td>123.286</td>
                    </tr>
                    <tr>
                      <td>Parque Jurásico</td>
                      <td>Salida al Museo</td>
                      <td>65.892</td>
                    </tr>
                    <tr>
                      <td>Fiesta de las Colectividades</td>
                      <td>Feria de Comida</td>
                      <td>42.756</td>
                    </tr> -->
                  </table> 
    `
    
}

// filtrado por input search

inputSearch.addEventListener("keyup", function (evento) {
    var datoInput = evento.target.value
    search = datoInput.trim().toLowerCase()
    filtrosCombinados()

})

function eventsCategories(array) {
    let categories = array.map(evento => evento.category)
    let unica = new Set(categories)
    let lastCategories = [...unica]

    console.log(lastCategories)

    let categoriasEventos = ""
    lastCategories.map(category =>
        categoriasEventos +=
        `
    <label><input type="checkbox" value="${category}"> ${category}</label>
    `

    )
    document.getElementById("check").innerHTML = categoriasEventos
    checkboxListener()
}


function checkboxListener() {
    var checkboxs = document.querySelectorAll('input[type=checkbox]')

    for (i = 0; i < checkboxs.length; i++) {
        checkboxs[i].addEventListener("change", function () {
            checkedCheckboxes = []

            for (i = 0; i < checkboxs.length; i++) {

                if (checkboxs[i].checked) {
                    checkedCheckboxes.push(checkboxs[i].value)
                }
            }
            filtrosCombinados()

        })

    }
}

function filtrosCombinados() {
    var filtrado = []

    if (search !== "" && checkedCheckboxes.length > 0) {

        checkedCheckboxes.map(category => filtrado.push(...arrayAFiltrar.filter(evento =>
            evento.name.toLowerCase().includes(search) && evento.category === category)
        ))

    }

    else if (search !== "" && checkedCheckboxes.length == 0) {
        filtrado = arrayAFiltrar.filter(evento => evento.name.toLowerCase().includes(search))

    }

    else if (search === "" && checkedCheckboxes.length > 0) {
        checkedCheckboxes.map(category =>
            filtrado.push(...arrayAFiltrar.filter(evento => evento.category === category))
        )

    }
    else {
        filtrado = arrayAFiltrar

    }

    filtrado.length > 0 ? display(filtrado) : document.getElementById("containerCard").innerHTML = `<h1 class="ceroResult"> No se encontraron resultados</h1>`

}


