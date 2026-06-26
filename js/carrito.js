const cantidadCarrito = document.getElementById("cant-carrito");

let carrito = 0;

export function agregarCarrito(event) {
    if (!event.target.closest(".boton-descarga")) {
        return;
    }

    carrito++;
    cantidadCarrito.innerText = carrito;
}