//import { eliminarProductoCarrito } from "./carritoIndex.js";

const modalContenedor = document.querySelector('.modal-contenedor')
const abrirCarrito = document.getElementById('boton-carrito');
const cerrarCarrito = document.getElementById('boton-cerrar-carrito');
const modalCarrito = document.querySelector('.modal-carrito')

abrirCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});

cerrarCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});

modalContenedor.addEventListener('click', () => {
    cerrarCarrito.click()
});

modalCarrito.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.classList.contains("boton-eliminar")) {
        eliminarProductoCarrito(e.target.value)
    }
}) 

