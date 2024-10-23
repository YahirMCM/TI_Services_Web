document.addEventListener('DOMContentLoaded', function () {
    const iframes = document.querySelectorAll('.youtube-video');

    const observerOptions = {
        root: null, // Usa el viewport del navegador
        threshold: 0.5 // Al menos el 50% del video debe ser visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const iframe = entry.target;

            if (entry.isIntersecting) {
                // Cargar el video solo cuando esté visible
                const videoSrc = iframe.getAttribute('data-src');
                if (!iframe.src) {
                    iframe.src = videoSrc; // Asignar src para que se reproduzca
                }
            } else {
                // Detener el video cuando salga de la pantalla
                iframe.src = ''; // Limpiar src para detener la reproducción
            }
        });
    }, observerOptions);

    iframes.forEach(iframe => observer.observe(iframe));
});