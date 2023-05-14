async function getData() {
    let datosApi
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => datosApi = json)

    eventos = datosApi.eventos
    let id = location.search.split("?id=").filter(Number)
    console.log(id)
    let selectId = id[0]
    let eventoDetalle = eventos.filter(evento => evento.id == selectId)
    console.log(eventoDetalle)
    content(eventoDetalle)

for (var i = 0; i < eventos.length; i++) {

   if (eventos[i].id == selectId) {
     eventoDetalle.push(eventos[i])
   }
}

}
//let eventos = dataAmazing.eventos;
getData()

//console.log(eventoDetalle[0])

function content(eventoDetalle) {
    var content = `
<div class="col-md-7">
<div class="card-body">
    <h5 class="card-title">${eventoDetalle[0].name}</h5>
    <div claas="description">
        <p class="card-text">${eventoDetalle[0].description}</p>
    </div>  
    <div class="datos">
        <p class="card-text"><small class="text-muted">Fecha:${eventoDetalle[0].date}</small></p>
        <p class="card-text"><small class="text-muted">Categoria:${eventoDetalle[0].category}</small></p>
        <p class="card-text"><small class="text-muted">Lugar:${eventoDetalle[0].place}</small></p>
        <p class="card-text"><small class="text-muted">Capacidad:${eventoDetalle[0].capacity}</small></p>
        <p class="card-text"><small class="text-muted">Asistencia:${eventoDetalle[0].assistance}</small></p>   
    </div>
</div>
</div>
<div class="col-md-5">
<img src="${eventoDetalle[0].image}" class="img-fluid" alt="Imagen de${eventoDetalle[0].name}">
<div class="date">
    <div class="value">
        <p class="text-one">Entredas desde:<i class="fa-solid fa-dollar-sing"></i></p>
        <p class="text-two">$${eventoDetalle[0].price}</p>
    </div>
</div>
</div>
`
    console.log(content)

    document.getElementById("detailsEvents").innerHTML = content



}
