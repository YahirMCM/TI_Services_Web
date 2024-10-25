document.addEventListener('DOMContentLoaded', function () {
    const iframes = document.querySelectorAll('.youtube-video');

    const observerOptions = {
        root: null, // Usar el viewport como referencia
        threshold: 0.5 // Al menos el 50% del iframe debe ser visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const iframe = entry.target;

            if (entry.isIntersecting) {
                // Asignar src para cargar el video solo si no está cargado
                const videoSrc = iframe.getAttribute('data-src');
                if (!iframe.src) {
                    iframe.src = videoSrc;
                }
            } else {
                // Pausar el video y limpiar src al salir de pantalla
                iframe.src = ''; 
            }
        });
    }, observerOptions);

    iframes.forEach(iframe => observer.observe(iframe));
});