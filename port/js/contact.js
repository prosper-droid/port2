// contact.js
document.addEventListener('DOMContentLoaded', () => {

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Character counter
  const messageField = document.getElementById('message');
  const charCount = document.getElementById('charCount');
  if (messageField) {
    messageField.addEventListener('input', () => {
      const len = messageField.value.length;
      charCount.textContent = len;
      charCount.style.color = len > 450 ? '#ff5f57' : '';
      if (len > 500) messageField.value = messageField.value.slice(0, 500);
    });
  }

  // Form submission (simulated)
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('successMsg');
  const submitBtn = document.getElementById('submitBtn');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const firstName = document.getElementById('firstName');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      if (!firstName.value.trim()) {
        valid = false;
        firstName.style.borderColor = '#ff5f57';
      } else {
        firstName.style.borderColor = '';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        valid = false;
        email.style.borderColor = '#ff5f57';
      } else {
        email.style.borderColor = '';
      }

      if (!message.value.trim()) {
        valid = false;
        message.style.borderColor = '#ff5f57';
      } else {
        message.style.borderColor = '';
      }

      if (!valid) return;

      // Simulate sending
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').style.display = 'none';
      submitBtn.querySelector('.btn-icon').style.display = 'none';
      submitBtn.querySelector('.btn-loader').style.display = 'flex';

      setTimeout(() => {
        form.style.display = 'none';
        successMsg.style.display = 'block';
        document.querySelector('.form-header').style.display = 'none';
      }, 2000);
    });
  }
});