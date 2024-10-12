// Experimentación y pruebas con .js (sujeto a cambios en el futuro)
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona todos los artículos (funciona para productos y paquetes)
    const items = document.querySelectorAll("article");

    items.forEach(item => {
        // Cambia el color de fondo al pasar el mouse
        item.addEventListener("mouseover", function() {
            item.style.backgroundColor = "#e0f7fa";
        });

        item.addEventListener("mouseout", function() {
            item.style.backgroundColor = "";
        });

        // Agrega animación para mostrar/ocultar descripciones adicionales
        item.addEventListener("click", function() {
            const descripcion = item.querySelector(".descripcion-adicional");
            if (descripcion.style.display === "block") {
                descripcion.style.opacity = "0";
                setTimeout(() => {
                    descripcion.style.display = "none";
                }, 300);  // Añade un retraso para ocultar después de la animación
            } else {
                descripcion.style.display = "block";
                setTimeout(() => {
                    descripcion.style.opacity = "1";
                }, 10);  // Permite que la animación suceda
            }
        });

        // Oculta las descripciones inicialmente
        const descripcion = item.querySelector(".descripcion-adicional");
        descripcion.style.display = "none";
        descripcion.style.transition = "opacity 0.3s ease";  // Añade una animación suave
        descripcion.style.opacity = "0";
    });
});