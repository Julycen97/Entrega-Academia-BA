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