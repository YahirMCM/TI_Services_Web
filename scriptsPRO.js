// Experimentación y pruebas con .js (sujeto a cambios en el futuro)
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona todos los botones "Ver más detalles"
    const botones = document.querySelectorAll(".ver-mas");

    botones.forEach(boton => {
        boton.addEventListener("click", function() {
            // Selecciona la descripción adicional asociada al botón
            const descripcion = boton.previousElementSibling;  // Selecciona el párrafo antes del botón

            if (descripcion.style.display === "block") {
                descripcion.style.opacity = "0";
                setTimeout(() => {
                    descripcion.style.display = "none";
                }, 300);  // Añade un retraso para ocultar después de la animación
                boton.textContent = "Ver más detalles";  // Cambia el texto del botón
            } else {
                descripcion.style.display = "block";
                setTimeout(() => {
                    descripcion.style.opacity = "1";
                }, 10);  // Permite que la animación suceda
                boton.textContent = "Ocultar detalles";  // Cambia el texto del botón
            }
        });

        // Oculta las descripciones inicialmente
        const descripcion = boton.previousElementSibling;
        descripcion.style.display = "none";
        descripcion.style.transition = "opacity 0.3s ease";  // Añade una animación suave
        descripcion.style.opacity = "0";
    });
});