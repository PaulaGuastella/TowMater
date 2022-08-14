import {actualizarCarrito, renderCarrito } from "./actualizarCarrito.js";
import {agregarAlCarrito, busqueda, loadProducts} from "./app.js";
import { limpiarCarrito, obtenerCarritoStorage } from "./carritoIndex.js";
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    agregarAlCarrito();
    busqueda();
    const carritoStorage = JSON.parse(localStorage.getItem("miCarrito"));
    obtenerCarritoStorage(carritoStorage);
    if(localStorage.getItem("miCarrito")) {
        renderCarrito(carritoStorage);
        actualizarCarrito(carritoStorage);
        limpiarCarrito(carritoStorage);
    }
}); 
