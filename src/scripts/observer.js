// observer.js
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('.cv-section');
  
    const observerOptions = {
      threshold: 0.1,
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    sections.forEach(section => {
      observer.observe(section);
    });
  });
  