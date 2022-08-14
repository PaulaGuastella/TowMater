import { actualizarCarrito, renderCarrito } from "./actualizarCarrito.js";
import { mostrarCarrito } from "./carritoIndex.js";
import getData from "./getData.js";


//Renderizar los productos
export const loadProducts = async () =>
{   
    let container = document.getElementsByClassName('container'); 
    const productos = await getData();
    for (const producto of productos)
    {   
        let div = document.createElement("div"); 
        div.setAttribute("class", "card-producto"); 
        div.innerHTML = 
        ` 
            <img src="${producto.imagen}" alt="${producto.descripcion}">
            <h3>$${producto.precio}</h3>
            <h4>${producto.nombre}</h4>
            <button id="${producto.id}" class='button add'>Agregar al carrito</button> 
        `;

        container[0].appendChild(div);
    }           
};


// esta funcion lo que hace es traer el producto desde el localstorage
const getCartProduct = (id) =>
{
    let cart = JSON.parse(localStorage.getItem('miCarrito'));
    if(cart)
    {
        return cart.find(producto => producto.id == id);
    }
    return cart;
}

// Agregar productos al carrito
export const agregarAlCarrito = async() =>
{
    const productos = await getData();
    let boton = document.getElementsByClassName('add');
    for (const element of boton) {
        element.addEventListener('click', () => {

            const buscarProducto = productos.find(producto => producto.id == element.id);
            const productoEnCarrito = getCartProduct(element.id);
        
            if(productoEnCarrito)
            {
                productoEnCarrito.cantidad++;
                guardarCarritoStorage(productoEnCarrito);
                document.getElementById(`cantidad${productoEnCarrito.id}`).innerHTML = `<h4 id=cantidad${productoEnCarrito.cantidad}>Cantidad: ${productoEnCarrito.cantidad}</h4>`;
            }
            else
            {   
                guardarCarritoStorage ({
                    id: buscarProducto.id,
                    imagen: `../${buscarProducto.imagen}`,
                    nombre: buscarProducto.nombre,
                    precio: buscarProducto.precio,
                    cantidad: 1
                });
            }
            Toastify({
                text: 'Se agregó un producto al carrito',
                duration: 2000
            }).showToast();
        })
    }
};
//UTILIZO LOCAL STORAGE PARA GUARDAR PRODUCTOS DEL CARRITO
const guardarCarritoStorage = (product) =>
{
    const cart = JSON.parse(localStorage.getItem('miCarrito'));
    
    if(!cart)
    {
        let newCart = [];
        newCart.push(product);
        localStorage.setItem("miCarrito",JSON.stringify(newCart));
        mostrarCarrito(newCart);
        actualizarCarrito(newCart);
        return;
    }
    const filterProducts = cart.filter(producto => producto.id !== product.id)
    filterProducts.push(product);
    localStorage.setItem("miCarrito", JSON.stringify(filterProducts));
    const carritoActualizado = JSON.parse(localStorage.getItem('miCarrito'));
    renderCarrito(carritoActualizado);
    actualizarCarrito(carritoActualizado);
};


//CREAR UN BUSCADOR CON EL INPUT
//Con evento input, guardo lo que pone el usuario en el buscador
let productoBuscado = "";

export const busqueda = () => {
    let buscador = document.getElementById('buscador')
    buscador.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('busqueda').value;
        productoBuscado.push = input;
        console.log(productoBuscado);

    })
}

// Filtrar productos por precio
function filtrarPrecios(precio) {
    let productosFiltrados = PRODUCTOS.filter(producto => productos.precio <= precio)

    return productosFiltrados;
}

