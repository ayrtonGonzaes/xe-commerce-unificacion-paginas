document.addEventListener("DOMContentLoaded", function() {
    const listaCheckout = document.getElementById("listaCheckout");
    const totalCheckout = document.getElementById("totalCheckout");
    const confirmarCompraBtn = document.getElementById("confirmarCompraBtn");
    const mensajeCompra = document.getElementById("mensajeCompra");
    const mostrarMensajeBtn = document.getElementById("mostrarMensajeBtn");
    const mensajeExito = document.getElementById("mensajeExito");

    // Obtener los productos del carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para mostrar los productos en el checkout
    function mostrarProductosEnCheckout() {
        listaCheckout.innerHTML = ""; // Limpiar la lista antes de agregar productos
        let total = 0;

        carrito.forEach(function(producto) {
            const item = document.createElement("div");
            item.textContent = `${producto.nombre} - $${producto.precio}`;
            listaCheckout.appendChild(item);

            // Sumar el precio del producto al total
            total += producto.precio;
        });

        // Mostrar el total
        totalCheckout.textContent = `Total: $${total}`;
    }

    // Función para confirmar la compra y redirigir a la página anterior
    function confirmarCompra() {
        // Mostrar el mensaje de compra realizada exitosamente
        mensajeExito.style.display = "block";

        // Esperar 3 segundos y luego redirigir
        setTimeout(function() {
            // Limpiar el carrito (eliminar productos de localStorage)
            localStorage.removeItem("carrito");

           // Redirigir a "index.html"
           window.location.href = "../prueba.html";
        }, 3000);
    }

    // Función para mostrar el mensaje de éxito y luego ocultarlo después de un tiempo
    function mostrarMensajeExito() {
        mensajeExito.style.display = "block";

        // Ocultar el mensaje después de 3 segundos (3000 milisegundos)
        setTimeout(function() {
            mensajeExito.style.display = "none";
        }, 1000);
    }

    // Mostrar los productos al cargar la página
    mostrarProductosEnCheckout();

    // Agregar evento al botón de confirmar compra
    confirmarCompraBtn.addEventListener("click", function() {
        confirmarCompra();
        mostrarMensajeExito();
    });

    // Agregar evento al botón de mostrar mensaje
    mostrarMensajeBtn.addEventListener("click", mostrarMensajeExito);
});