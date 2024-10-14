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