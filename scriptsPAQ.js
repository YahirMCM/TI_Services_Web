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

function agregarAlCarrito(paquete) {
    let itemEnCarrito = carrito.find(item => item.nombre === paquete);

    if(itemEnCarrito) {
        if (itemEnCarrito.cantidad < 3) {
            itemEnCarrito.cantidad++;
        } else {
            alert("Solo puedes agregar un máximo de 3 unidades por paquete.");
        }
    } else {
        if (carrito.length < 3) {
            carrito.push({ nombre: paquete, cantidad: 1 });
        } else {
            alert("No puedes agregar más de 3 paquetes diferentes.");
        }
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    let carritoElemento = document.getElementById("carrito");
    carritoElemento.innerHTML = "";

    carrito.forEach(item => {
        carritoElemento.innerHTML += `<p>${item.nombre} (x${item.cantidad})</p>`;
    });

    let total = carrito.reduce((sum, item) => sum + item.cantidad * getPrecio(item.nombre), 0);
    document.getElementById("total-carrito").innerText = `Total: $${total} MXN`;
}

function eliminarTodoCarrito() {
    carrito = [];
    actualizarCarrito();
}

function getPrecio(nombrePaquete) {
    if (nombrePaquete === 'Paquete Básico') return 4500;
    if (nombrePaquete === 'Paquete Empresa') return 10500;
    if (nombrePaquete === 'Paquete Premium') return 18000;
    return 0;
}
