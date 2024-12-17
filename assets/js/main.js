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

function cuentaProductos(){
  let sumaCarro = document.getElementById("cantidadCarrito");

  sumaCarro.innerHTML = "";

  if(JSON.parse(localStorage.getItem("carrito")) == null) {
    sumaCarro.textContent = "0";
  }
  else{
    sumaCarro.textContent = JSON.parse(localStorage.getItem("carrito")).length.toString();
  }
}

function refreshCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let total = document.getElementById("total");

  cuentaProductos();

  total.innerHTML = "";

  carrito.forEach(producto => {
    let carro = document.createElement("li");

    carro.textContent = producto.id + " | " + producto.title + " | " + producto.description;
    total.appendChild(carro);
  });
}

function agregarCarrito(id, title, precio) {
  let producto = {
    id : id,
    title : title,
    precio : precio
    };

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let iconoCarrito = document.getElementById("iconCart");
  let sumaCarro = document.getElementById("cantidadCarrito");

  iconoCarrito.style.transition = "font-size 200ms linear";
  iconoCarrito.style.color = "white";
  iconoCarrito.style.fontSize = "2rem";
  sumaCarro.style.transition = "font-size 200ms linear";
  sumaCarro.style.color = "white";
  sumaCarro.style.fontSize = "2rem";

  setTimeout(() => {
    iconoCarrito.style.transition = "font-size 200ms linear";
    iconoCarrito.style.color = "black";
    iconoCarrito.style.fontSize = "1.5rem";
    sumaCarro.style.transition = "font-size 200ms linear";
    sumaCarro.style.color = "black";
    sumaCarro.style.fontSize = "1.5rem";
  }, 300);

  console.log(producto);

  
  carrito.push(producto);
  
  localStorage.setItem("carrito", JSON.stringify(carrito));
  
  refreshCarrito();
  
  cuentaProductos();
}

function conectarAPI() {
  fetch('https://dummyjson.com/products?limit=20')
    .then(res => res.json())
    .then(data => {
      const containerCards = document.getElementById("article");

      containerCards.innerHTML = "<h2>Productos</h2>";

      console.log(data);

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

  if(conectarAPI()) {
    conectarAPI();
  }

  cuentaProductos();
})