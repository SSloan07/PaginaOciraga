// Animaciones para la página de Ociraga - Medellín
document.addEventListener('DOMContentLoaded', function() {
    // Animación de aparición suave para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elementos a animar
    const animatedElements = document.querySelectorAll('.servicio-card, .proyecto-card, .testimonio-card, .map-region');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Interactividad para el mapa de cobertura
    const mapRegions = document.querySelectorAll('.map-region');
    mapRegions.forEach(region => {
        region.addEventListener('click', function() {
            // Remover clase active de todas las regiones
            mapRegions.forEach(r => r.classList.remove('active'));
            // Agregar clase active a la región clickeada
            this.classList.add('active');
            
            // Aquí puedes agregar más lógica para cambiar el mapa visualmente
            const regionType = this.getAttribute('data-region');
            console.log('Región seleccionada:', regionType);
        });
    });

    // Contador animado para estadísticas
    const stats = document.querySelectorAll('.stat-number');
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.textContent);
                if (!target.classList.contains('animated')) {
                    animateValue(target, 0, value, 2000);
                    target.classList.add('animated');
                }
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statObserver.observe(stat));

    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            if (element.textContent.includes('km')) {
                element.textContent = value + 'km';
            } else if (element.textContent.includes('%')) {
                element.textContent = value + '%';
            } else if (element.textContent.includes('+')) {
                element.textContent = value + '+';
            } else {
                element.textContent = value;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Efecto parallax para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-background');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // Header con efecto de blur al hacer scroll
        const header = document.querySelector('.header');
        if (scrolled > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Smooth scroll para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto hover mejorado para tarjetas de proyecto
    const proyectoCards = document.querySelectorAll('.proyecto-card');
    proyectoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });

    // Crear partículas doradas para el footer
    createGoldenParticles();

    function createGoldenParticles() {
        const particlesContainer = document.getElementById('goldParticles');
        if (!particlesContainer) return;

        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Tamaño aleatorio entre 2px y 6px
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Posición aleatoria
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Retraso de animación aleatorio
            particle.style.animationDelay = `${Math.random() * 6}s`;
            
            particlesContainer.appendChild(particle);
        }
    }

    console.log('Ociraga Medellín - Animaciones cargadas correctamente');
});