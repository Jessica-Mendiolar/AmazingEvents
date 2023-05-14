
function actionForm(event){
    event.preventDefault()

 let formData = {
    name: event.target[0].value,
    email: event.target[1].value,
    date: event.target[2].value,
    typecomment: event.target[3].value,
    mensaje: event.target[4].value
 }
 
 modalComentario.innerHTML = `
 
  
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">GRACIAS!!!!</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          ${formData.name} Gracias por dejarnos tu ${formData.typecomment}, nos pondremos en contacto en la fecha que nos indicaste el ${formData.date}
          </div>
          <div class="modal-footer">
            <button type="button" id="botonModal"class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  
  `
  let botonModal = document.getElementById("botonModal")
  botonModal.addEventListener("click", function(){backHome()})
 
 }
 function backHome(){   
  imprimir("Contact")
  
 }