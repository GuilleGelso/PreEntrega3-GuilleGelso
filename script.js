function miProgramaPrincipal() {
  let productos = [
    { id: 2, nombre: "CPU I3", categoria: "COMPONENTES", stock: 6, precio: 35490, rutaImagen: "prod1.webp" },
    { id: 5, nombre: "DISCO SSD 240", categoria: "Almacenamiento", stock: 9, precio: 5250, rutaImagen: "prod2.webp" },
    { id: 7, nombre: "DISCO 2TB", categoria: "Almacenamiento", stock: 6, precio: 3200, rutaImagen: "prod3.webp" },
    { id: 9, nombre: "DISCO EXTERNO 1TB", categoria: "Almacenamiento", stock: 22, precio: 1700, rutaImagen: "prod4.webp" },
    { id: 12, nombre: "ROUTER TP-LINK", categoria: "CONECTIVIDAD", stock: 2, precio: 3600, rutaImagen: "prod5.webp" },
    { id: 15, nombre: "ROUTER MERCUSYS", categoria: "CONECTIVIDAD", stock: 5, precio: 7900, rutaImagen: "prod6.webp" },
    { id: 17, nombre: "MICRO SD", categoria: "Almacenamiento", stock: 6, precio: 6352, rutaImagen: "prod7.webp" },
  ]

  let carritoJSON = JSON.parse(localStorage.getItem("carrito"))
  let carrito = carritoJSON ? carritoJSON : []

  let contenedor = document.getElementById("contenedor")
  renderizar(productos, contenedor, carrito)
  renderizarCarrito(carrito)

  let botonFinalizarCompra = document.getElementById("finalizarCompra")
  botonFinalizarCompra.addEventListener("click", () => finalizarCompra(carrito))
}

miProgramaPrincipal()

function finalizarCompra(carrito) {
  let carritoFisico = document.getElementById("carrito")
  carritoFisico.innerHTML = ""
  localStorage.removeItem("carrito")
  carrito = []
  renderizarCarrito([])
}


function renderizar(arrayDeElementos, contenedor, carrito) {

  contenedor.innerHTML = ""

  arrayDeElementos.forEach(({ nombre, rutaImagen, stock, id }) => {
    let tarjetaProducto = document.createElement("div")

    tarjetaProducto.classList.add("tarjetaProducto")
    tarjetaProducto.innerHTML = `
      <h2 class="card-text">${nombre} </h2>
      <div class=imagen style="background-image: url(../multimedia/${rutaImagen})"></div>
      <p>Quedan ${stock} unidades</p>
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