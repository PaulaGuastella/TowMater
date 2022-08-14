

export function actualizarCarrito (carrito){
    const ctd = document.getElementById('contador-carrito');
    ctd.innerText = carrito.reduce((acc, producto) => acc +producto.cantidad, 0);
    const totalProductos = document.getElementById('total-productos');
    totalProductos.innerText = `Total Compra: $ ${carrito.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0).toFixed()};`
}

export function renderCarrito (carrito){
    const seleccionProductos = document.querySelector(".seleccionProductos");

    seleccionProductos.innerHTML = "";

    for (const item of carrito) {
        let li = document.createElement("li");
        li.setAttribute("class", "card-carrito");
        li.innerHTML=
        ` 
                <img src="${item.imagen}" alt="${item.descripcion}">
                <h3>Producto: ${item.nombre}</h3>
                <h4>Pr.Unit.: $${item.precio}</h4>
                <h4> Cantidad: <input type="number" name="cantidad" class='button cantidad' value = ${item.cantidad}></h4>
                <h4>Total: $${(item.precio*item.cantidad).toFixed()}</h4>
                <btn  id="${item.id}" class="eliminar-producto">Eliminar Producto</btn>
        `;
        seleccionProductos.appendChild(li);
    };
}