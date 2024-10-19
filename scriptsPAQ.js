// Experimentación y pruebas con .js (sujeto a cambios en el futuro)
document.addEventListener("DOMContentLoaded", function() {
    const botones = document.querySelectorAll(".ver-mas");

    botones.forEach(boton => {
        boton.addEventListener("click", function() {
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
});

// Creacion del carrito de compras (sujeto a cambios en el futuro)
let carrito = [];

function agregarAlCarrito(paquete, precio) {
    let itemEnCarrito = carrito.find(item => item.paquete === paquete);

    if (itemEnCarrito) {
        if (itemEnCarrito.cantidad < 3) {
            itemEnCarrito.cantidad++;
        } else {
            alert("Solo puedes agregar un máximo de 3 unidades por paquete.");
        }
    } else {
        if (carrito.length < 3) {
            carrito.push({ paquete, precio, cantidad: 1 });
        } else {
            alert("No puedes agregar más de 3 paquetes diferentes.");
        }
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    let carritoContenido = document.getElementById("carrito-contenido");
    carritoContenido.innerHTML = "";

    carrito.forEach((item, index) => {
        let carritoItem = document.createElement("div");
        carritoItem.innerHTML = `${item.paquete} (x${item.cantidad}) - $${item.precio * item.cantidad} MXN <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
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
}

function eliminarTodoCarrito() {
    carrito = [];
    actualizarCarrito();
}