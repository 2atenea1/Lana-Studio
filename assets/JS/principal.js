// Menu hamburguesa
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer click en un link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Carrusel de productos - Infinito sin saltos
let currentSlide = 0;
const carousel = document.getElementById('productCarousel');
const cards = document.querySelectorAll('.product-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const realSlides = 6; // Solo 6 productos reales
let isTransitioning = false;

function updateCarousel(smooth = true) {
    const cardWidth = cards[0].offsetWidth;
    const gap = 32; // 2rem = 32px
    const offset = (cardWidth + gap) * currentSlide;

    if (smooth) {
        carousel.style.transition = 'transform 0.5s ease';
    } else {
        carousel.style.transition = 'none';
    }

    carousel.style.transform = `translateX(-${offset}px)`;

    // Actualizar dots (solo para los 6 reales)
    const realIndex = currentSlide % realSlides;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === realIndex);
    });
}

function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentSlide++;
    updateCarousel(true);

    // Si llegamos al final (slide 6), resetear al inicio sin animación
    if (currentSlide === realSlides) {
        setTimeout(() => {
            currentSlide = 0;
            updateCarousel(false);
            setTimeout(() => {
                isTransitioning = false;
            }, 50);
        }, 500);
    } else {
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
}

function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    // Si estamos en el inicio, saltar al final sin animación
    if (currentSlide === 0) {
        currentSlide = realSlides;
        updateCarousel(false);
        setTimeout(() => {
            currentSlide--;
            updateCarousel(true);
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }, 50);
    } else {
        currentSlide--;
        updateCarousel(true);
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
}

// Event listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        if (isTransitioning) return;
        currentSlide = parseInt(e.target.dataset.slide);
        updateCarousel(true);
    });
});

// Auto-play cada 5 segundos
let autoplayInterval = setInterval(nextSlide, 5000);

// Pausar autoplay al hacer hover
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

carousel.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 5000);
});

// Inicializar y recalcular en resize
updateCarousel(false);
window.addEventListener('resize', () => updateCarousel(false));