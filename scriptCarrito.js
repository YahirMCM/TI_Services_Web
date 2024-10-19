document.addEventListener("DOMContentLoaded", function () {
    const botones = document.querySelectorAll(".ver-mas");

    botones.forEach(boton => {
        boton.addEventListener("click", function () {
            const descripcion = boton.previousElementSibling;
            const articulo = boton.closest("article");

            if (descripcion.style.display === "block") {
                descripcion.style.opacity = "0";
                setTimeout(() => {
                    descripcion.style.display = "none";
                }, 300);
                boton.textContent = "Ver más detalles";
                articulo.classList.remove("resaltado");
            } else {
                descripcion.style.display = "block";
                setTimeout(() => {
                    descripcion.style.opacity = "1";
                }, 10);
                boton.textContent = "Ocultar detalles";
                articulo.classList.add("resaltado");
            }
        });

        const descripcion = boton.previousElementSibling;
        descripcion.style.display = "none";
        descripcion.style.transition = "opacity 0.3s ease";
        descripcion.style.opacity = "0";
    });

    // Selección de elementos clave
    const carritoIcono = document.getElementById('emoji_carrito');
    const barraCarro = document.getElementById('barrita');
    const cerrarCarro = document.getElementById('cerrar_carro');
    const carritoOverlay = document.getElementById('capa_carro');

    // Abrir la barra del carrito al hacer clic en el ícono
    carritoIcono.addEventListener('click', () => {
        barraCarro.classList.add('open');
        carritoOverlay.classList.add('open');
    });

    // Cerrar la barra al hacer clic en el botón de cerrar
    cerrarCarro.addEventListener('click', () => {
        barraCarro.classList.remove('open');
        carritoOverlay.classList.remove('open');
    });

    // Cerrar la barra al hacer clic fuera del carrito (overlay)
    carritoOverlay.addEventListener('click', () => {
        barraCarro.classList.remove('open');
        carritoOverlay.classList.remove('open');
    });

    // Cargar el carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    actualizarCarrito();

    function agregarAlCarrito(producto, precio) {
        let itemEnCarrito = carrito.find(item => item.producto === producto);

        if (itemEnCarrito) {
            if (itemEnCarrito.cantidad < 3) {
                itemEnCarrito.cantidad++;
            } else {
                alert("Solo puedes agregar un máximo de 3 unidades por producto.");
            }
        } else {
            if (carrito.length < 9) {
                carrito.push({ producto, precio, cantidad: 1 });
            } else {
                alert("No puedes agregar más de 9 productos diferentes en total.");
            }
        }
        actualizarCarrito();
        guardarCarrito();
    }

    function actualizarCarrito() {
        let carritoContenido = document.getElementById("carrito-contenido");
        carritoContenido.innerHTML = "";

        carrito.forEach((item, index) => {
            let carritoItem = document.createElement("div");
            carritoItem.innerHTML = `${item.producto} (x${item.cantidad}) - $${item.precio * item.cantidad} MXN 
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
            carritoContenido.appendChild(carritoItem);
        });

        let total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        document.getElementById("total-carrito").innerText = `Total: $${total} MXN`;
    }

    function eliminarDelCarrito(index) {
        let item = carrito[index];
        item.cantidad--;
        if (item.cantidad <= 0) {
            carrito.splice(index, 1);
        }
        actualizarCarrito();
        guardarCarrito();
    }

    function eliminarTodoCarrito() {
        carrito = [];
        actualizarCarrito();
        guardarCarrito();
    }

    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Exponer las funciones necesarias globalmente para poder acceder desde el HTML
    window.agregarAlCarrito = agregarAlCarrito;
    window.eliminarDelCarrito = eliminarDelCarrito;
    window.eliminarTodoCarrito = eliminarTodoCarrito;
});
