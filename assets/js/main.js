const nav = document.querySelector("#nav");
const open = document.querySelector("#open");
const close = document.querySelector("#close");

const main = document.querySelector(".main");

const itemA = document.querySelector("#product");
const itemB = document.querySelector("#opinion");
const itemD = document.querySelector("#home");
const itemC = document.querySelector("#contact");

open.addEventListener("click", () => {
  nav.classList.add("visible");

  open.classList.add("hidden")
})

close.addEventListener("click", () => {
  nav.classList.remove("visible");

  open.classList.remove("hidden")
})

main.addEventListener("click", () => {
  nav.classList.remove("visible");

  open.classList.remove("hidden");
})

itemA.addEventListener("click", () => {
  nav.classList.remove("visible");
})

itemB.addEventListener("click", () => {
  nav.classList.remove("visible");
})

itemC.addEventListener("click", () => {
  nav.classList.remove("visible");
})

itemD.addEventListener("click", () => {
  nav.classList.remove("visible");
})

function agregarProducto(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.forEach((producto, indice) => {
    if (producto.id == id) {
      carrito[indice].cantidad += 1;
    }
  })

  localStorage.setItem("carrito", JSON.stringify(carrito));

  animacionCarrito();

  actualizarCarrito();
}

function quitarProducto(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.forEach((producto, indice) => {
    if (producto.id == id) {
      carrito[indice].cantidad -= 1;
    }
  })

  localStorage.setItem("carrito", JSON.stringify(carrito));

  animacionCarrito();

  actualizarCarrito();
}

function eliminarProducto(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let nuevoCarro = carrito.filter(producto => producto.id != id);

  localStorage.setItem("carrito", JSON.stringify(nuevoCarro));

  animacionCarrito();

  actualizarCarrito();
}

function vaciarCarrito(){
  if (JSON.parse(localStorage.getItem("carrito")).length != 0) {
    localStorage.removeItem("carrito");
  
    actualizarCarrito();
  
    animacionCarrito();
  
    alert("Carrito Vaciado");    
  }
  else{
    alert("No hay productos en el carrito");
  }
}

function finalizarCompra(){
  if (JSON.parse(localStorage.getItem("carrito")).length != 0) {
    localStorage.removeItem("carrito");
  
    actualizarCarrito();
  
    animacionCarrito();
    
    alert("Compra Finalizada");
  }
  else{
    alert("No hay productos en el carrito");
  }
}

function cuentaProductos() {
  let sumaCarro = document.querySelector(".list #cantidadCarrito");
  let totalCarro = document.querySelector("tfoot #total")

  sumaCarro.innerHTML = "";

  if (JSON.parse(localStorage.getItem("carrito")) == null) {
    sumaCarro.textContent = "0";
  }
  else {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let contador = 0;
    let total = 0;

    carrito.forEach((producto, indice) => {
      contador += carrito[indice].cantidad;
      total += carrito[indice].precio * carrito[indice].cantidad
    })

    sumaCarro.textContent = contador.toString();
    if (totalCarro != null) {
      totalCarro.textContent = "TOTAL: $" + total.toFixed(2).toString();
    }
  }
}

function tablaCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = document.querySelector("#tableCart tbody");

  cuentaProductos();

  if (total != null) {
    total.innerHTML = "";
  }

  carrito.forEach(producto => {
    let fila = document.createElement("tr");

    fila.innerHTML +=
      `<tr>
        <td>${producto.id}</td>
        <td>${producto.title}</td>
        <td>$${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>
            <button class="btnTableCart" onclick="agregarProducto(${producto.id})" id="btnAdd"><i class="bi bi-plus"></i></button>
            <button class="btnTableCart" onclick="quitarProducto(${producto.id})" id="btnRemove" "><i class="bi bi-dash"></i></button>
            <button class="btnTableCart" onclick="eliminarProducto(${producto.id})" id="btnDelete" "><i class="bi bi-trash"></i></button>
        </td>
      </tr>`

    if (total != null) {
      total.appendChild(fila);
    }
  });
}

function animacionCarrito() {
  let iconoCarrito = document.querySelector(".list #iconCart");
  let sumaCarro = document.querySelector(".list #cantidadCarrito");

  iconoCarrito.style.transition = "font-size 200ms linear";
  iconoCarrito.style.fontSize = "2rem";
  sumaCarro.style.transition = "font-size 200ms linear";
  sumaCarro.style.fontSize = "2rem";

  setTimeout(() => {
    iconoCarrito.style.transition = "font-size 200ms linear";
    iconoCarrito.style.fontSize = "1.3rem";
    sumaCarro.style.transition = "font-size 200ms linear";
    sumaCarro.style.fontSize = "1.3rem";
  }, 300);
}

function actualizarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let nuevoCarro = [];

  localStorage.removeItem("carrito");

  for (let i = 0; i < carrito.length; i++) {
    let contador = 0;
    let indice;

    if (nuevoCarro != null) {
      for (let e = 0; e < nuevoCarro.length; e++) {
        if (carrito[i].id == nuevoCarro[e].id) {
          contador ++;
          indice = e;
        }
      }

      if (contador == 0) {
        nuevoCarro.push(carrito[i]);
      }
      else{
        nuevoCarro[indice].cantidad += 1;
      }
    }
  }

  localStorage.setItem("carrito", JSON.stringify(nuevoCarro));

  tablaCarrito();
}

function agregarCarrito(id, title, precio) {
  animacionCarrito();

  let producto = {
    id: id,
    title: title,
    precio: precio,
    cantidad: 1
  };

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.push(producto);

  localStorage.setItem("carrito", JSON.stringify(carrito));

  actualizarCarrito();
}

function conectarAPI() {
  fetch('https://dummyjson.com/products?limit=30')
    .then(res => res.json())
    .then(data => {
      const containerCards = document.querySelector("#article");

      containerCards.innerHTML = "<h2>Productos</h2>";

      data.products.forEach(productos => {
        containerCards.innerHTML +=
          `<div class="card">
          <div class="imageProduct">
              <img src=${productos.thumbnail}>
            </div>

            <div class="tittleProduct">
                <h3>${productos.title}</h3>
            </div>

            <div class="descriptionProduct">
                <p>${productos.description}</p>
            </div>

            <div class="priceProduct">
                <p>$ ${productos.price}</p>
            </div>

            <div class="btnProduct">
                <button class="btnArticles" onclick= "agregarCarrito(${productos.id}, '${productos.title}', ${productos.price})">+ Carrito</button>
            </div>
        </div>`;
      });

    })
    .catch(() => {
      return false;
    })
}

document.addEventListener("DOMContentLoaded", () => {

  if (conectarAPI()) {
    conectarAPI();
  }

  cuentaProductos();
})

window.addEventListener("load", () => {
  tablaCarrito();
})
