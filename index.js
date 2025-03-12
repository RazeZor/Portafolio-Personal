// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
  // ===== INICIALIZACIÓN DE COMPONENTES =====
  initTypingEffect();
  initSkillsAnimation();
  initMobileMenu();
  initSmoothScroll();
  initParallaxEffect();
  initProjectsAnimation();
  initContactForm();
  
  // Añadir efecto de scanlines para un toque retro
  addScanlinesEffect();
});

// ===== EFECTO DE TYPING =====
function initTypingEffect() {
  const typingText = document.querySelector(".typing-text");
  if (!typingText) return;
  
  const texts = [
    "Desarrollador Backend", 
    "Creador de Experiencias Web", 
    "Aprendiz Constante",
    "desarrollador de Python & Django"
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100; // Velocidad base de escritura
  
  function typeEffect() {
    const currentText = texts[textIndex];
    
    // Calcular velocidad dinámica
    if (isDeleting) {
      // Borrar más rápido que escribir
      typingSpeed = 50;
    } else {
      // Velocidad aleatoria para efecto más natural
      typingSpeed = Math.random() * 50 + 80;
    }
    
    // Efecto de typing
    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    // Añadir cursor parpadeante
    typingText.style.borderRight = "0.1em solid var(--color-primary)";
    
    // Lógica para cambiar entre escribir y borrar
    if (!isDeleting && charIndex === currentText.length) {
      // Pausa al final de escribir
      isDeleting = true;
      typingSpeed = 1500; // Pausa antes de borrar
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500; // Pausa antes de escribir nuevo texto
    }
    
    // Efecto de cursor parpadeante
    setTimeout(() => {
      typingText.style.borderRight = typingText.style.borderRight ? "" : "0.1em solid var(--color-primary)";
    }, 500);
    
    setTimeout(typeEffect, typingSpeed);
  }
  
  // Iniciar efecto
  typeEffect();
}

// ===== ANIMACIÓN DE BARRAS DE HABILIDADES =====
function initSkillsAnimation() {
  const skillsSection = document.querySelector(".skills");
  if (!skillsSection) return;
  
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");
    
    skillBars.forEach((bar) => {
      const progress = bar.getAttribute("data-progress");
      
      // Animación con retraso escalonado para cada barra
      setTimeout(() => {
        bar.style.width = `${progress}%`;
        
        // Añadir tooltip con porcentaje
        const tooltip = document.createElement("span");
        tooltip.className = "progress-tooltip";
        tooltip.textContent = `${progress}%`;
        bar.appendChild(tooltip);
        
        // Mostrar tooltip con retraso
        setTimeout(() => {
          tooltip.style.opacity = "1";
        }, 500);
      }, Math.random() * 300);
    });
  }
  
  // Usar Intersection Observer para detectar cuando la sección es visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
          
          // Añadir efecto de resaltado a las tarjetas de habilidades
          const skillCards = document.querySelectorAll(".skill-card");
          skillCards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 200 * index);
          });
        }
      });
    },
    { threshold: 0.2 }
  );
  
  observer.observe(skillsSection);
  
  // Preparar las tarjetas de habilidades para animación
  const skillCards = document.querySelectorAll(".skill-card");
  skillCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
  });
}

// ===== MENÚ MÓVIL =====
function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  
  if (!menuToggle || !navLinks) return;
  
  // Crear el botón de menú si no existe
  if (!menuToggle.querySelector("span")) {
    for (let i = 0; i < 3; i++) {
      const span = document.createElement("span");
      menuToggle.appendChild(span);
    }
  }
  
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
    
    // Añadir animación a los elementos del menú
    const navItems = navLinks.querySelectorAll("li");
    navItems.forEach((item, index) => {
      // Resetear animación
      item.style.animation = "none";
      item.offsetHeight; // Forzar reflow
      
      if (navLinks.classList.contains("active")) {
        item.style.animation = `fadeInRight 0.5s ease forwards ${index * 0.1 + 0.2}s`;
      } else {
        item.style.animation = "";
      }
    });
  });
  
  // Cerrar menú al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (
      navLinks.classList.contains("active") &&
      !navLinks.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      
      if (target) {
        // Cerrar menú móvil si está abierto
        const navLinks = document.querySelector(".nav-links");
        const menuToggle = document.querySelector(".menu-toggle");
        
        if (navLinks && navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          menuToggle.classList.remove("active");
        }
        
        // Scroll suave con efecto de aceleración
        const startPosition = window.pageYOffset;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const percentage = Math.min(progress / duration, 1);
          
          // Función de aceleración para scroll más natural
          const easeInOutQuad = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          
          window.scrollTo(0, startPosition + distance * easeInOutQuad(percentage));
          
          if (progress < duration) {
            window.requestAnimationFrame(step);
          }
        }
        
        window.requestAnimationFrame(step);
      }
    });
  });
  
  // Resaltar enlace de navegación activo según la sección visible
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");
  
  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.pageYOffset;
    
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });
    
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// ===== EFECTO PARALLAX =====
function initParallaxEffect() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    
    // Parallax suave para el fondo
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    
    // Efecto de desvanecimiento para el contenido del hero
    const heroContent = hero.querySelector(".container");
    if (heroContent) {
      heroContent.style.opacity = 1 - scrolled * 0.003;
      heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
  });
  
  // Añadir efecto de partículas al hero
  addParticlesEffect(hero);
}

// ===== ANIMACIÓN DE PROYECTOS =====
function initProjectsAnimation() {
  const projectCards = document.querySelectorAll(".project-card");
  if (projectCards.length === 0) return;
  
  // Preparar las tarjetas para animación
  projectCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
  });
  
  // Usar Intersection Observer para animar las tarjetas cuando son visibles
  const projectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          
          // Añadir efecto de brillo al borde
          setTimeout(() => {
            entry.target.classList.add("glow-effect");
          }, 500);
          
          projectObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  
  projectCards.forEach((card) => {
    projectObserver.observe(card);
  });
}

// ===== FORMULARIO DE CONTACTO =====
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;
  
  contactForm.addEventListener("submit", function(event) {
    // La lógica de envío ya está en el HTML con EmailJS
    
    // Añadir efecto de feedback visual al botón
    const submitBtn = contactForm.querySelector(".submit-btn");
    if (submitBtn) {
      submitBtn.classList.add("submitting");
      submitBtn.innerHTML = '<span class="spinner"></span> Enviando...';
      
      // Restaurar el botón después de un tiempo (en caso de error)
      setTimeout(() => {
        if (submitBtn.classList.contains("submitting")) {
          submitBtn.classList.remove("submitting");
          submitBtn.innerHTML = "Enviar mensaje";
        }
      }, 8000);
    }
  });
  
  // Validación en tiempo real
  const inputs = contactForm.querySelectorAll("input, textarea");
  inputs.forEach(input => {
    input.addEventListener("blur", function() {
      if (this.value.trim() === "" && this.hasAttribute("required")) {
        this.classList.add("error");
      } else {
        this.classList.remove("error");
      }
    });
    
    input.addEventListener("focus", function() {
      this.classList.remove("error");
    });
  });
}

// ===== EFECTOS VISUALES ADICIONALES =====

// Efecto de scanlines para aspecto retro
function addScanlinesEffect() {
  if (!document.querySelector(".scanlines")) {
    const scanlines = document.createElement("div");
    scanlines.className = "scanlines";
    document.body.appendChild(scanlines);
  }
}

// Efecto de partículas para el hero
function addParticlesEffect(container) {
  const canvas = document.createElement("canvas");
  canvas.className = "particles-canvas";
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "1";
  
  container.style.position = "relative";
  container.insertBefore(canvas, container.firstChild);
  
  const ctx = canvas.getContext("2d");
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  
  // Ajustar canvas al redimensionar ventana
  window.addEventListener("resize", () => {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  });
  
  // Crear partículas
  const particlesArray = [];
  const numberOfParticles = 50;
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.color = primaryColor || "#00ff9d";
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX;
      }
      
      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY;
      }
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function init() {
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    
    // Conectar partículas cercanas con líneas
    connectParticles();
    
    requestAnimationFrame(animate);
  }
  
  function connectParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
      for (let j = i; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = particlesArray[i].color;
          ctx.globalAlpha = 0.2 - (distance / 500);
          ctx.lineWidth = 1;
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  init();
  animate();
}


// Ejecutar al final para añadir estilos dinámicos
addDynamicStyles();

emailjs.init('U8kP4mwoYqzeuLrAN'); // Sustituye con tu ID de usuario

                // Manejar el formulario
                document.getElementById('contact-form').addEventListener('submit', function(event) {
                    event.preventDefault(); // Prevenir el comportamiento por defecto

                    // Recoge los datos del formulario
                    var formData = new FormData(this);

                    // Envía el correo usando EmailJS
                    emailjs.sendForm('service_1hgmyzr', 'template_cvw6e3y', this)
                        .then(function(response) {
                            // Muestra la alerta de éxito
                            showAlert('¡Mensaje enviado con éxito!', 'success');
                        }, function(error) {
                            // Muestra la alerta de error
                            showAlert('Hubo un error al enviar el mensaje, inténtalo de nuevo.', 'error');
                        });
                });

                // Función para mostrar alertas personalizadas
                function showAlert(message, type = 'success') {
                    // Crear el elemento de alerta
                    const alert = document.createElement('div');
                    alert.classList.add('alert', type);
                    alert.textContent = message;

                    // Agregar la alerta al contenedor
                    document.getElementById('alert-container').appendChild(alert);

                    // Mostrar la alerta con animación
                    setTimeout(() => {
                        alert.classList.add('show');
                    }, 10); // Pequeña demora para la animación

                    // Ocultar la alerta después de 4 segundos
                    setTimeout(() => {
                        alert.classList.remove('show');
                        alert.classList.add('hide'); // Añadir clase para ocultar

                        setTimeout(() => alert.remove(), 500); // Eliminar la alerta después de que desaparezca
                    }, 4000); // Tiempo de visibilidad (4 segundos)
                }
