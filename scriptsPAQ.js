// Experimentación y pruebas con .js (sujeto a cambios en el futuro)
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona todos los artículos de paquetes
    const paquetes = document.querySelectorAll("article");

    // Agrega un evento de mouseover para cambiar el fondo
    paquetes.forEach(paquete => {
        paquete.addEventListener("mouseover", function() {
            paquete.style.backgroundColor = "#e0f7fa"; // Cambia el color de fondo al pasar el mouse
        });

        paquete.addEventListener("mouseout", function() {
            paquete.style.backgroundColor = ""; // Vuelve al color original
        });

        // Agrega un evento de clic para mostrar más información
        paquete.addEventListener("click", function() {
            const descripcion = paquete.querySelector(".descripcion-adicional");
            const isVisible = descripcion.style.display === "block";

            // Muestra u oculta la descripción adicional
            if (isVisible) {
                descripcion.style.display = "none"; // Oculta si ya está visible
            } else {
                descripcion.style.display = "block"; // Muestra la descripción
            }
        });

        // Inicialmente oculta la descripción adicional
        paquete.querySelector(".descripcion-adicional").style.display = "none";
    });
});