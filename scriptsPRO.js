// Experimentación y pruebas con .js (sujeto a cambios en el futuro)
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona todos los artículos de productos
    const productos = document.querySelectorAll("article");

    // Agrega un evento de mouseover para cambiar el fondo
    productos.forEach(producto => {
        producto.addEventListener("mouseover", function() {
            producto.style.backgroundColor = "#e0f7fa"; // Cambia el color de fondo al pasar el mouse
        });

        producto.addEventListener("mouseout", function() {
            producto.style.backgroundColor = ""; // Vuelve al color original
        });

        // Agrega un evento de clic para mostrar más información
        producto.addEventListener("click", function() {
            const descripcion = producto.querySelector(".descripcion-adicional");
            const isVisible = descripcion.style.display === "block";

            // Muestra u oculta la descripción adicional
            if (isVisible) {
                descripcion.style.display = "none"; // Oculta si ya está visible
            } else {
                descripcion.style.display = "block"; // Muestra la descripción
            }
        });

        // Inicialmente oculta la descripción adicional
        producto.querySelector(".descripcion-adicional").style.display = "none";
    });
});