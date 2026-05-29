document.addEventListener('DOMContentLoaded', () => {
  // Navigation scroll effect
  const navbar = document.getElementById('navbar');
  
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
  
  // Set active nav link based on current URL
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  if (mobileBtn && navbar) {
    mobileBtn.addEventListener('click', () => {
      navbar.classList.toggle('nav-open');
    });
  }

  // Product Filtering Logic
  const filterPills = document.querySelectorAll('.filter-pill');
  const productCards = document.querySelectorAll('.product-card');

  if (filterPills.length > 0 && productCards.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        // Remove active class from all pills
        filterPills.forEach(p => p.classList.remove('active'));
        // Add active class to clicked pill
        pill.classList.add('active');

        const filterValue = pill.textContent.trim();

        // Filter products
        productCards.forEach(card => {
          const categoryTag = card.querySelector('.category-tag');
          if (!categoryTag) return;
          
          const category = categoryTag.textContent.trim();
          
          if (filterValue === 'All' || category === filterValue) {
            card.style.display = 'block';
            // Optional: add a subtle fade-in animation
            card.style.animation = 'fadeIn 0.5s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
