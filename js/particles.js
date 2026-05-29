const canvas = document.getElementById('particle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  const colors = ['#38BDF8', '#1A8FE3', '#BAE6FD', '#FFFFFF'];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speed = Math.random() * 0.9 + 0.3;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = Math.random() * 0.7 + 0.3;
      this.drift = Math.random() * 100;
    }

    update(frame) {
      this.y -= this.speed;
      this.x += Math.sin((frame + this.drift) * 0.05) * 0.2;

      if (this.y < -10) {
        this.y = canvas.height + 10;
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle());
    }
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.update(frame);
      p.draw();
    });
    
    frame++;
    requestAnimationFrame(animate);
  }

  init();
  animate();
}
