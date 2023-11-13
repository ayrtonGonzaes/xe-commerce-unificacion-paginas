document.addEventListener("DOMContentLoaded", function() {
    const carritoBtn = document.getElementById("carritoBtn");
    const carritoMenu = document.getElementById("carritoMenu");
    const listaCarrito = document.getElementById("listaCarrito");
    const comprarAhoraBtn = document.getElementById("comprarAhoraBtn");
    const cerrarCarritoBtn = document.getElementById("cerrarCarritoBtn");
    const confirmacionCompra = document.getElementById("confirmacionCompra");
    const siBtn = document.getElementById("siBtn");
    const noBtn = document.getElementById("noBtn");
    const totalElement = document.getElementById("total");
    const mensajeAgregado = document.getElementById("mensajeAgregado");

    let total = 0;

    carritoBtn.addEventListener("click", function() {
        carritoMenu.style.display = "block";
    });

    cerrarCarritoBtn.addEventListener("click", function() {
        carritoMenu.style.display = "none";
    });

    comprarAhoraBtn.addEventListener("click", function() {
        if (total === 0) {
            mostrarMensaje("Usted no tiene ningún producto, por favor agregue uno.");
        } else {
            confirmacionCompra.style.display = "block";
        }
    });

    siBtn.addEventListener("click", function() {
        confirmacionCompra.style.display = "none";
        carritoMenu.style.display = "none";
        mostrarMensaje("Compra realizada exitosamente. Total: $" + total);
        vaciarCarrito();
        resetearTotal();

        // Redirigir a checkout.html al hacer clic en el botón "SI"
        window.location.href = "./pages/checkout.html";
    });

    noBtn.addEventListener("click", function() {
        confirmacionCompra.style.display = "none";
    });

    function mostrarMensaje(mensaje) {
        mensajeAgregado.textContent = mensaje;
        mensajeAgregado.style.display = "block";

        setTimeout(function() {
            mensajeAgregado.style.display = "none";
        }, 800);
    }

    function vaciarCarrito() {
        while (listaCarrito.firstChild) {
            listaCarrito.removeChild(listaCarrito.firstChild);
        }
    }

    function resetearTotal() {
        total = 0;
        actualizarTotal();
    }

    function actualizarTotal() {
        totalElement.textContent = "Total: $" + total;
    }

    const productos = document.querySelectorAll(".producto");
    productos.forEach(function(producto) {
        const agregarBtn = producto.querySelector(".agregarBtn");
        const nombre = producto.querySelector("h2").textContent;
        const precio = parseFloat(producto.querySelector("p").textContent.replace("$", ""));//("Precio $, ...")
        
        agregarBtn.addEventListener("click", function() {
            const nuevoItem = document.createElement("li");
            nuevoItem.textContent = `${nombre} - $${precio}`;

            // Agregar botón para eliminar producto
            const eliminarBtn = document.createElement("button");
            eliminarBtn.textContent = "Eliminar Producto";
            eliminarBtn.addEventListener("click", function() {
                listaCarrito.removeChild(nuevoItem);
                // Restar el precio del producto al total
                total -= precio;
                actualizarTotal();
            });
            nuevoItem.appendChild(eliminarBtn);

            listaCarrito.appendChild(nuevoItem);

            // Sumar el precio del producto al total
            total += precio;
            actualizarTotal();

            mostrarMensaje("Producto agregado al carrito");
        });
    });
});
