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

// Creacion del carrito de compras (a falta de mas ajustes)
let carrito = [];
let total = 0;

function agregarAlCarrito(paquete, precio) {
    let itemEnCarrito = carrito.find(item => item.nombre === paquete);

    if (itemEnCarrito) {
        if (itemEnCarrito.cantidad < 3) {
            itemEnCarrito.cantidad++;
        } else {
            alert("Solo puedes agregar un máximo de 3 unidades por paquete.");
        }
    } else {
        if (carrito.length < 3) {
            carrito.push({ nombre: paquete, cantidad: 1, precio: precio });
        } else {
            alert("No puedes agregar más de 3 paquetes diferentes.");
        }
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    let carritoElemento = document.getElementById("carrito");
    carritoElemento.innerHTML = "";

    total = 0;
    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        carritoElemento.innerHTML += `
            <div>
                <p>${item.nombre} (x${item.cantidad}) - $${item.precio * item.cantidad} MXN</p>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </div>
        `;
    });

    document.getElementById("total-carrito").innerText = `Total: $${total} MXN`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function eliminarTodoCarrito() {
    carrito = [];
    total = 0;
    actualizarCarrito();
}