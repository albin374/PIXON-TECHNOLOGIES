document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Reveal
  const reveals = document.querySelectorAll('.reveal');
  const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  reveals.forEach(reveal => revealObserver.observe(reveal));

  // 2. 3D Card Tilt
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(10px) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0) translateY(0)';
    });
  });

  // 3. Scroll Counter
  const counters = document.querySelectorAll('.stat-number');
  const counterOptions = { threshold: 0.5 };
  
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const duration = 1500;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          // easeOutCubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          
          entry.target.innerText = Math.floor(easeProgress * target) + (target > 400 ? '+' : '');
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.innerText = target + '+';
          }
        }
        
        requestAnimationFrame(updateCounter);
        observer.unobserve(entry.target);
      }
    });
  }, counterOptions);

  counters.forEach(counter => counterObserver.observe(counter));

  // 4. Typewriter Hero
  const title = document.getElementById('typewriter');
  if (title) {
    const text = "Illuminate Every Dimension";
    let i = 0;
    title.innerHTML = '';
    
    function typeWriter() {
      if (i < text.length) {
        title.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    setTimeout(typeWriter, 500);
  }

  // 5. LED Grid Art
  const ledGrid = document.getElementById('led-grid');
  if (ledGrid) {
    for (let i = 0; i < 100; i++) {
      const pixel = document.createElement('div');
      pixel.className = 'led-pixel';
      // Randomly light up some pixels initially
      if (Math.random() > 0.8) {
        pixel.style.background = 'var(--blue-light)';
        pixel.style.boxShadow = 'var(--glow-sm)';
      }
      ledGrid.appendChild(pixel);
    }
    
    // Animate grid periodically
    setInterval(() => {
      const pixels = document.querySelectorAll('.led-pixel');
      const randomPixel = pixels[Math.floor(Math.random() * pixels.length)];
      
      const currentBg = randomPixel.style.background;
      if (currentBg.includes('var(--blue-light)')) {
        randomPixel.style.background = 'rgba(56, 189, 248, 0.1)';
        randomPixel.style.boxShadow = 'none';
      } else {
        randomPixel.style.background = 'var(--blue-light)';
        randomPixel.style.boxShadow = 'var(--glow-sm)';
      }
    }, 200);
  }
});
