
function miProgramaPrincipal() {

  const urlLocal = '/db.json';
  let productos=[]
 fetch(urlLocal)
.then(response => response.json())
.then(data => {productos = data.productos
  console.log(productos)



  let carritoJSON = JSON.parse(localStorage.getItem("carrito"))
  let carrito = carritoJSON ? carritoJSON : []
  
  let contenedor = document.getElementById("contenedor")
  renderizar(productos, contenedor, carrito)
  renderizarCarrito(carrito)
}
)
  let botonFinalizarCompra = document.getElementById("finalizarCompra")
  botonFinalizarCompra.addEventListener("click", () => finalizarCompra(carrito))
  
  
}

miProgramaPrincipal()

function finalizarCompra() {
  let carritoFisico = document.getElementById("carrito")
  carritoFisico.innerHTML = ""
  localStorage.removeItem("carrito")
  carrito = []
  localStorage.clear()
  fincompra()
  
}


function renderizar(arrayDeElementos, contenedor, carrito) {

  contenedor.innerHTML = ""

  arrayDeElementos.forEach(({ nombre, rutaImagen,  id }) => {
    let tarjetaProducto = document.createElement("div")

    tarjetaProducto.classList.add("tarjetaProducto")
    tarjetaProducto.innerHTML = `
      <h2 class="card-text">${nombre} </h2>
      <div class=imagen style="background-image: url(../multimedia/${rutaImagen})"></div>
     
      <button id=${id} class="btn btn-primary mb-3">Agregar al carrito</button>
    `
    contenedor.appendChild(tarjetaProducto)
    let botonAgregarAlCarrito = document.getElementById(id)
    botonAgregarAlCarrito.addEventListener("click", () => agregarAlCarrito(arrayDeElementos, id, carrito))
  })
  
}

function agregarAlCarrito(arrayDeElementos, id, carrito) {
  let productoBuscado = arrayDeElementos.find(producto => producto.id === id)
  let posicionProductoEnCarrito = carrito.findIndex(producto => producto.id === id)

  if (posicionProductoEnCarrito !== -1) {
    carrito[posicionProductoEnCarrito].unidades++
    carrito[posicionProductoEnCarrito].subtotal = carrito[posicionProductoEnCarrito].unidades * carrito[posicionProductoEnCarrito].precioUnitario
  } else {
    carrito.push({
      id: productoBuscado.id,
      nombre: productoBuscado.nombre,
      precioUnitario: productoBuscado.precio,
      unidades: 1,
      subtotal: productoBuscado.precio
    })
  }
  compranotifi()
  localStorage.setItem("carrito", JSON.stringify(carrito))
  renderizarCarrito(carrito)
}

function renderizarCarrito(carritoJSON) {
  let carritoFisico = document.getElementById("carrito")
  carritoFisico.innerHTML = `
    <div id=encabezadoCarrito>
      <p>Nombre</p>
      <p>Precio Unitario</p>
      <p>Unidades</p>
      <p>Subtotal</p>
    </div>
  `

  carritoJSON.forEach(({ nombre, precioUnitario, unidades, subtotal }) => {
    let elementoDelCarrito = document.createElement("div")
    elementoDelCarrito.classList.add("elementoDelCarrito")
    elementoDelCarrito.innerHTML = `
      <p>${nombre}</p>
      <p>${precioUnitario}</p>
      <p>${unidades}</p>
      <p>${subtotal}</p>
    `
    carritoFisico.appendChild(elementoDelCarrito)
  })
}

let botonCarrito = document.getElementById("botonCarrito")
botonCarrito.addEventListener("click", mostrarOcultar)

function mostrarOcultar() {
  let padreContenedor = document.getElementById("productos")
  let carrito = document.getElementById("contenedorCarrito")
  padreContenedor.classList.toggle("oculto")
  carrito.classList.toggle("oculto")
}


function compranotifi(){
  Toastify({
    text: "Producto agregado correctamente",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", 
    position: "right", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} 
  }).showToast();
}

function fincompra(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Gracias por tu compra',
    showConfirmButton: false,
    timer: 1500
  })
}
