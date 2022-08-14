import{actualizarCarrito,renderCarrito} from "./actualizarCarrito.js";

export function cargarEventos() {
    let botones = document.getElementsByClassName('eliminar-producto');
    for (const boton of botones) {
        boton.addEventListener('click', () => {
            eliminarProducto(boton.id);
            console.log("toma el evento click");
        })
    }
};
//Renderiza el carrito
export const mostrarCarrito = (storage) => {
    let seleccionProductos = document.querySelector(".seleccionProductos");
    for (const item of storage) {
        let li = document.createElement("li");
        li.setAttribute("class", "card-carrito");
        li.innerHTML=
        ` 
                <img src="${item.imagen}" alt="${item.descripcion}">
                <h3>Producto: ${item.nombre}</h3>
                <h4>Pr.Unit.: $${item.precio}</h4>
                <h4 id=cantidad${item.id}>Cantidad: ${item.cantidad}</h4>
                <h4>Total: $${(item.precio*item.cantidad).toFixed()}</h4>
                <btn  id="${item.id}" class="eliminar-producto">Eliminar Producto</btn>
        `;
        seleccionProductos.appendChild(li);
        }
    cargarEventos(storage);
    actualizarCarrito(storage);
    };

// busco el carrito en local storage

export const obtenerCarritoStorage = () => {
const carritoStorage = JSON.parse(localStorage.getItem("miCarrito"));
    //mostrarCarrito(carritoStorage);
    limpiarCarrito(carritoStorage);
};

export function limpiarCarrito(carrito) {
    const btnClearCard = document.getElementById('limpiar-carrito');
        btnClearCard.addEventListener('click', () => {
            if(carrito){
                swal({
                    title: '¿Está seguro que desea vaciar el carrito?',
                    icon:'warning',
                    buttons: true,
                    dangerMode: true
                }).then(result => {
                    if(result) {
                        swal({
                            title: 'Carrito vacío',
                            icon: 'success',
                            text: 'Se ha vaciado el carrito con éxito!',
                            })
                    location.reload();
                    localStorage.clear();
                    actualizarCarrito(carrito);
                    renderCarrito(carrito);
                    }
            })}else {
                btnClearCard.setAttribute('class','disabled')
            }
        })
    };

function eliminarProducto(id) {
        swal({
            title: '¿Está seguro que desea eliminar el producto del carrito?',
            icon:'warning',
            buttons: true,
            dangerMode: true
        }).then(result => {
            if(result) {
                swal({
                    title: 'Producto eliminado.',
                    icon: 'success',
                    text: 'Se ha eliminado el producto con éxito!'
                })
            let carrito = JSON.parse(localStorage.getItem("miCarrito"));
            let nuevoCarrito = carrito.filter(element => element.id != id)
            localStorage.setItem("miCarrito", JSON.stringify(nuevoCarrito));
            renderCarrito(nuevoCarrito);
            actualizarCarrito(nuevoCarrito);
            }        
        })  
};
