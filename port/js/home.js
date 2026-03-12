// home.js
document.addEventListener('DOMContentLoaded', () => {

  // ========== THREE.JS PARTICLE BACKGROUND ==========
  const canvas = document.getElementById('heroCanvas');
  if (canvas && typeof THREE !== 'undefined') {
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Particle system
    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      const t = Math.random();
      colors[i * 3] = t < 0.5 ? 0 : 0;
      colors[i * 3 + 1] = t < 0.5 ? 0.96 : 0.83;
      colors[i * 3 + 2] = t < 0.5 ? 0.63 : 1;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.7 });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Lines connecting nearby particles
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00f5a0, transparent: true, opacity: 0.05 });
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = [];
    for (let i = 0; i < 80; i++) {
      const a = Math.floor(Math.random() * count);
      const b = Math.floor(Math.random() * count);
      linePositions.push(positions[a*3], positions[a*3+1], positions[a*3+2]);
      linePositions.push(positions[b*3], positions[b*3+1], positions[b*3+2]);
    }
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.02;
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
  }

  // ========== TYPING ANIMATION ==========
  const phrases = [
    'Software Developer',
    'Full Stack Engineer',
    'UI/UX Craftsman',
    'API Architect',
    'Open Source Dev',
    'Tech Innovator',
  ];
  const typed = document.getElementById('typedText');
  if (typed) {
    let pIndex = 0, cIndex = 0, deleting = false;
    const typeSpeed = 80, deleteSpeed = 40, pauseTime = 2000;

    function tick() {
      const current = phrases[pIndex];
      if (!deleting) {
        typed.textContent = current.slice(0, ++cIndex);
        if (cIndex === current.length) {
          deleting = true;
          setTimeout(tick, pauseTime);
          return;
        }
        setTimeout(tick, typeSpeed);
      } else {
        typed.textContent = current.slice(0, --cIndex);
        if (cIndex === 0) {
          deleting = false;
          pIndex = (pIndex + 1) % phrases.length;
        }
        setTimeout(tick, deleteSpeed);
      }
    }
    setTimeout(tick, 800);
  }

  // ========== COUNTER ANIMATION ==========
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current);
          if (current >= target) clearInterval(timer);
        }, 16);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));

  // ========== SCROLL REVEAL ==========
  const revealEls = document.querySelectorAll('.service-card, .preview-card');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });

  // ========== PROFILE IMAGE UPLOAD ==========
  const container = document.querySelector('.profile-image-container');
  const placeholder = document.querySelector('.profile-placeholder');
  const profileImg = document.getElementById('profileImg');
  if (container && placeholder) {
    container.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          profileImg.src = ev.target.result;
          profileImg.style.display = 'block';
          placeholder.style.display = 'none';
        };
        reader.readAsDataURL(file);
      };
      input.click();
    });
  }
});