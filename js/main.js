/*
========================================================================
   AASTHA AYURVEDA - GLOBAL SCRIPTS
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Scroll Effect
  const header = document.querySelector('.header-nav');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  // Run on load in case the page is already scrolled
  handleScroll();

  // 2. Mobile Menu Toggle
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // 3. Scroll Reveal Animations (Intersection Observer)
  const reveals = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window && reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once animated, we don't need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    reveals.forEach(el => el.classList.add('active'));
  }

  // 4. FAQ Accordion Toggle
  const faqHeaders = document.querySelectorAll('.faq-header');
  
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const content = header.nextElementSibling;
      const isOpen = parent.classList.contains('active');
      
      // Close all other FAQs
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-content').style.maxHeight = null;
      });
      
      // Toggle current FAQ
      if (!isOpen) {
        parent.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // 5. Inquiry Forms Handling (Mock submission with visual alerts)
  const forms = document.querySelectorAll('.inquiry-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const alertSuccess = form.querySelector('.alert-success');
      const alertError = form.querySelector('.alert-error');
      
      // Basic validation check
      let isValid = true;
      const requiredInputs = form.querySelectorAll('[required]');
      
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#E53E3E'; // Red border
        } else {
          input.style.borderColor = ''; // Reset border
        }
      });
      
      if (isValid) {
        // Show success alert
        if (alertSuccess) {
          alertSuccess.style.display = 'block';
          if (alertError) alertError.style.display = 'none';
          
          // Clear inputs
          form.reset();
          
          // Hide alert after 5 seconds
          setTimeout(() => {
            alertSuccess.style.display = 'none';
          }, 5000);
        }
      } else {
        // Show error alert
        if (alertError) {
          alertError.style.display = 'block';
          if (alertSuccess) alertSuccess.style.display = 'none';
          
          // Hide alert after 5 seconds
          setTimeout(() => {
            alertError.style.display = 'none';
          }, 5000);
        }
      }
    });
  });

  // 6. Prefill Inquiry Type from URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const treatmentParam = urlParams.get('treatment');
  const inquiryParam = urlParams.get('inquiry');
  const inquiryTypeSelect = document.getElementById('inquiry-type');
  
  if (inquiryTypeSelect) {
    if (treatmentParam) {
      if (treatmentParam === 'panchakarma') {
        inquiryTypeSelect.value = 'panchakarma';
      } else {
        inquiryTypeSelect.value = 'consultation';
      }
    } else if (inquiryParam) {
      if (inquiryParam === 'academy' || inquiryParam === 'training') {
        inquiryTypeSelect.value = 'academy';
      }
    }
  }
});

