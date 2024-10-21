// Script encargado de gestionar la interactividad de la página al permitir mostrar u ocultar detalles de productos, controlar la apertura y cierre del carrito de compras con almacenamiento persistente, y generar una factura en PDF basada en los productos añadidos al carrito.

document.addEventListener("DOMContentLoaded", function () {
    // Selección de elementos
    const botones = document.querySelectorAll(".ver-mas");
    const carritoIcono = document.getElementById('emoji_carrito');
    const barraCarro = document.getElementById('barrita');
    const cerrarCarro = document.getElementById('cerrar_carro');
    const carritoOverlay = document.getElementById('capa_carro');
    const botonFactura = document.getElementById("generar-factura");

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    actualizarCarrito();

    // Funcionalidad de los botones "Ver más"
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

    // Abrir y cerrar carrito
    carritoIcono.addEventListener('click', () => {
        barraCarro.classList.add('open');
        carritoOverlay.classList.add('open');
    });

    cerrarCarro.addEventListener('click', () => {
        barraCarro.classList.remove('open');
        carritoOverlay.classList.remove('open');
    });

    carritoOverlay.addEventListener('click', () => {
        barraCarro.classList.remove('open');
        carritoOverlay.classList.remove('open');
    });

    // Funciones del carrito
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
        const carritoContenido = document.getElementById("carrito-contenido");
        carritoContenido.innerHTML = "";

        carrito.forEach((item, index) => {
            const carritoItem = document.createElement("div");
            carritoItem.innerHTML = `${item.producto} (x${item.cantidad}) - $${item.precio * item.cantidad} MXN 
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
            carritoContenido.appendChild(carritoItem);
        });

        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
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

    // Evento para generar factura
    if (botonFactura) {
        botonFactura.addEventListener("click", generarFactura);
    }

    function generarFactura() {
        if (!window.jspdf || !window.jspdf.jsPDF) {
            alert("Error: No se pudo cargar la librería jsPDF.");
            return;
        }

        if (carrito.length === 0) {
            alert("El carrito está vacío. No se puede generar factura.");
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        let y = 20;

        doc.setFontSize(22);
        doc.text("Factura de Compra", 105, y, { align: "center" });
        y += 10;

        const fecha = new Date().toLocaleDateString();
        doc.setFontSize(12);
        doc.text(`Fecha: ${fecha}`, 10, y);
        y += 10;

        doc.setFontSize(16);
        carrito.forEach((item, index) => {
            const texto = `${index + 1}. ${item.producto} - Cantidad: ${item.cantidad} - Precio: $${item.precio * item.cantidad} MXN`;
            doc.text(texto, 10, y);
            y += 10;
        });

        const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
        y += 10;
        doc.setFontSize(18);
        doc.text(`Total: $${total} MXN`, 10, y);

        doc.save("Factura_DTT.pdf");
    }

    // Exponer funciones globalmente
    window.agregarAlCarrito = agregarAlCarrito;
    window.eliminarDelCarrito = eliminarDelCarrito;
    window.eliminarTodoCarrito = eliminarTodoCarrito;
});