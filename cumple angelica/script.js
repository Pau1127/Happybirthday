let currentIndex = 0;

// Seleccionar elementos una vez al inicio
const carruselInner = document.querySelector('.carrusel-inner');
const carruselItems = document.querySelectorAll('.carrusel-item');
const totalItems = carruselItems.length;
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const audioPlayer = document.getElementById('miAudio');

function showSlide(index) {
  if (index >= totalItems) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = totalItems - 1;
  } else {
    currentIndex = index;
  }

  const offset = -currentIndex * 100;
  carruselInner.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

// Cambia de slide automáticamente cada 5 segundos (opcional)
let intervalId = setInterval(nextSlide, 5000);

// Funcionalidad del reproductor de audio
function playSong(song) {
  if (audioPlayer) {
    audioPlayer.src = song;
    audioPlayer.play().catch(error => {
      console.error("Error al reproducir la canción:", error);
    });
  } else {
    console.error("El reproductor de audio no se encontró en el DOM.");
  }
}

// Agregar accesibilidad a los botones de navegación
if (prevButton) {
  prevButton.setAttribute('aria-label', 'Slide anterior');
  prevButton.addEventListener('click', prevSlide);
}

if (nextButton) {
  nextButton.setAttribute('aria-label', 'Slide siguiente');
  nextButton.addEventListener('click', nextSlide);
}

// Agregar accesibilidad al carrusel
carruselInner.setAttribute('aria-live', 'polite');

// Controladores de eventos para los botones de audio
document.querySelectorAll('.audio-controls button').forEach(button => {
  button.addEventListener('click', function () {
    const song = this.getAttribute('data-song');
    if (song) {
      playSong(song);
    } else {
      console.error("No se encontró la canción en el atributo data-song.");
    }
  });
});

// Limpiar intervalo si es necesario (por ejemplo, al salir de la página)
window.addEventListener('beforeunload', () => {
  clearInterval(intervalId);
});