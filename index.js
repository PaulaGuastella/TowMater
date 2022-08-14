import {actualizarCarrito, renderCarrito } from "./actualizarCarrito.js";
import {agregarAlCarrito, loadProducts} from "./app.js";
import { limpiarCarrito } from "./carritoIndex.js";
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    agregarAlCarrito();
    if(localStorage.getItem("miCarrito")) {
        const carritoStorage = JSON.parse(localStorage.getItem("miCarrito"));
        renderCarrito(carritoStorage);
        actualizarCarrito(carritoStorage);
        limpiarCarrito(carritoStorage);
    }
}); 
