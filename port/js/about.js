// about.js
        document.addEventListener('DOMContentLoaded', () => {
          // Scroll reveal
          const reveals = document.querySelectorAll('.reveal');
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.1 });
          reveals.forEach(el => observer.observe(el));
        
          // Skill bars animate on reveal
          const bars = document.querySelectorAll('.fill');
          const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('animated'), 200);
                barObserver.unobserve(entry.target);
              }
            });
          }, { threshold: 0.3 });
          bars.forEach(b => barObserver.observe(b));
        });