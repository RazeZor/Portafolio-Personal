// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // ===== INICIALIZACIÓN DE COMPONENTES =====
  initTypingEffect()
  initMobileMenu()
  initSmoothScroll()
  initParticlesEffect()
  initProjectsFilter()
  initContactForm()
  initScrollEffects()
  addSVGGradient();
  initSkillsSection();
  
    // Añadir atributo data-text al h1 para el efecto glitch
    const h1 = document.querySelector(".glitch-text");
    if (h1) {
      h1.setAttribute("data-text", h1.textContent);
    }

})


// Función para inicializar la sección de habilidades interactiva
function initSkillsSection() {
  // Tabs de categorías
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Desactivar todos los tabs
          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));
          
          // Activar el tab seleccionado
          button.classList.add('active');
          const tabId = button.getAttribute('data-tab');
          document.getElementById(`${tabId}-content`).classList.add('active');
      });
  });
  
  // Inicializar los círculos de progreso
  const circles = document.querySelectorAll('.progress-ring-circle');
  
  circles.forEach(circle => {
      // Calcular el perímetro del círculo
      const radius = circle.getAttribute('r');
      const circumference = 2 * Math.PI * radius;
      
      // Establecer el perímetro como el dash array
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = circumference;
      
      // Obtener el porcentaje y calcular el offset
      const percent = circle.getAttribute('data-percent');
      const offset = circumference - (percent / 100 * circumference);
      
      // Animar el círculo cuando sea visible
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  setTimeout(() => {
                      circle.style.strokeDashoffset = offset;
                  }, 300);
                  observer.unobserve(entry.target);
              }
          });
      }, { threshold: 0.5 });
      
      observer.observe(circle);
  });
  
  // Toggle para los detalles de habilidades
  const detailsToggles = document.querySelectorAll('.skill-details-toggle');
  
  detailsToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
          toggle.classList.toggle('active');
          const content = toggle.nextElementSibling;
          content.classList.toggle('active');
      });
  });
}

// Agregar el SVG gradient para los círculos de progreso
function addSVGGradient() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  svg.style.position = "absolute";
  svg.style.visibility = "hidden";
  
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  
  const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
  gradient.setAttribute("id", "gradient");
  gradient.setAttribute("x1", "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "100%");
  gradient.setAttribute("y2", "0%");
  
  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "#f42d75");
  
  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "#8627ff");
  
  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);
  svg.appendChild(defs);
  
  document.body.appendChild(svg);
}


// ===== EFECTO DE TYPING =====
function initTypingEffect() {
  const typingText = document.querySelector(".typing-text")
  if (!typingText) return

  const texts = [
    "Desarrollador Backend",
    "Creador de Experiencias Web",
    "Aprendiz Constante",
    "Desarrollador de Python & Django",
  ]

  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 100 // Velocidad base de escritura

  function typeEffect() {
    const currentText = texts[textIndex]

    // Calcular velocidad dinámica
    if (isDeleting) {
      // Borrar más rápido que escribir
      typingSpeed = 50
    } else {
      // Velocidad aleatoria para efecto más natural
      typingSpeed = Math.random() * 50 + 80
    }

    // Efecto de typing
    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    // Lógica para cambiar entre escribir y borrar
    if (!isDeleting && charIndex === currentText.length) {
      // Pausa al final de escribir
      isDeleting = true
      typingSpeed = 1500 // Pausa antes de borrar
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typingSpeed = 500 // Pausa antes de escribir nuevo texto
    }

    setTimeout(typeEffect, typingSpeed)
  }

  // Iniciar efecto
  typeEffect()
}

// ===== MENÚ MÓVIL =====
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle")
  const sidebar = document.querySelector(".sidebar")
  const navLinks = document.querySelectorAll(".nav-link")

  if (!menuToggle || !sidebar) return

  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active")
    menuToggle.classList.toggle("active")
    menuToggle.setAttribute("aria-expanded", menuToggle.getAttribute("aria-expanded") === "true" ? "false" : "true")
  })

  // Cerrar menú al hacer clic en un enlace
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("active")
      menuToggle.classList.remove("active")
      menuToggle.setAttribute("aria-expanded", "false")
    })
  })

  // Cerrar menú al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (sidebar.classList.contains("active") && !sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
      sidebar.classList.remove("active")
      menuToggle.classList.remove("active")
      menuToggle.setAttribute("aria-expanded", "false")
    }
  })
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const target = document.querySelector(targetId)

      if (target) {
        // Scroll suave con efecto de aceleración
        window.scrollTo({
          top: target.offsetTop - 80, // Ajustar por la altura del header
          behavior: "smooth",
        })
      }
    })
  })

  // Resaltar enlace de navegación activo según la sección visible
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  function highlightNavLink() {
    let current = ""
    const scrollPosition = window.scrollY

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", highlightNavLink)
  highlightNavLink() // Ejecutar al cargar la página
}

// ===== EFECTO DE PARTÍCULAS =====
function initParticlesEffect() {
  const container = document.querySelector(".particles-container")
  if (!container) return

  const canvas = document.createElement("canvas")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  container.appendChild(canvas)

  const ctx = canvas.getContext("2d")
  const particles = []
  const particleCount = Math.min(window.innerWidth / 10, 100) // Ajustar según el ancho de la pantalla

  // Crear partículas
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? "#f42d75" : "#8627ff", // Nuevos colores
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    })
  }

  // Función para dibujar partículas
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Actualizar y dibujar partículas
    particles.forEach((particle) => {
      // Mover partícula
      particle.x += particle.speedX
      particle.y += particle.speedY

      // Rebotar en los bordes
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX *= -1
      }

      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY *= -1
      }

      // Dibujar partícula
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.globalAlpha = particle.opacity
      ctx.fill()
    })

    // Conectar partículas cercanas
    ctx.globalAlpha = 0.2
    ctx.strokeStyle = "#f42d75" // Nuevo color para las líneas
    ctx.lineWidth = 0.5

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    requestAnimationFrame(drawParticles)
  }

  // Iniciar animación
  drawParticles()

  // Ajustar canvas al redimensionar ventana
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

// ===== FILTRO DE PROYECTOS =====
function initProjectsFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  if (!filterButtons.length || !projectCards.length) return

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Actualizar botones activos
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      const filter = button.getAttribute("data-filter")

      // Filtrar proyectos
      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 50)
        } else {
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  })
}

// ===== FORMULARIO DE CONTACTO =====
function initContactForm() {
  const contactForm = document.getElementById("contact-form")
  if (!contactForm) return

  // Inicializar EmailJS
  const emailjs = window.emailjs
  if (typeof emailjs !== "undefined") {
    emailjs.init("6oXr4eD44kSYTdiis")
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault()

    // Validar formulario
    const inputs = contactForm.querySelectorAll("input, textarea")
    let isValid = true

    inputs.forEach((input) => {
      if (input.hasAttribute("required") && input.value.trim() === "") {
        input.classList.add("error")
        isValid = false
      } else {
        input.classList.remove("error")
      }
    })

    if (!isValid) {
      showAlert("Por favor, completa todos los campos requeridos.", "error")
      return
    }

    // Añadir efecto de feedback visual al botón
    const submitBtn = contactForm.querySelector(".submit-btn")
    if (submitBtn) {
      submitBtn.classList.add("submitting")
      submitBtn.innerHTML = '<span class="spinner"></span> Enviando...'
    }

    // Enviar el correo usando EmailJS
    if (typeof emailjs !== "undefined") {
      emailjs.sendForm("service_fykkqvy", "template_hilk0es", contactForm).then(
        () => {
          // Mostrar alerta de éxito
          showAlert("¡Mensaje enviado con éxito!", "success")

          // Resetear formulario
          contactForm.reset()

          // Restaurar botón
          if (submitBtn) {
            submitBtn.classList.remove("submitting")
            submitBtn.innerHTML =
              '<span class="btn-text">Enviar mensaje</span><span class="btn-icon"><i class="fas fa-paper-plane"></i></span>'
          }
        },
        (error) => {
          // Mostrar alerta de error
          showAlert("Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.", "error")

          // Restaurar botón
          if (submitBtn) {
            submitBtn.classList.remove("submitting")
            submitBtn.innerHTML =
              '<span class="btn-text">Enviar mensaje</span><span class="btn-icon"><i class="fas fa-paper-plane"></i></span>'
          }
        },
      )
    } else {
      // Simulación de envío para desarrollo
      setTimeout(() => {
        showAlert("Simulación: ¡Mensaje enviado con éxito!", "success")
        contactForm.reset()

        if (submitBtn) {
          submitBtn.classList.remove("submitting")
          submitBtn.innerHTML =
            '<span class="btn-text">Enviar mensaje</span><span class="btn-icon"><i class="fas fa-paper-plane"></i></span>'
        }
      }, 2000)
    }
  })

  // Validación en tiempo real
  const inputs = contactForm.querySelectorAll("input, textarea")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && this.value.trim() === "") {
        this.classList.add("error")
      } else {
        this.classList.remove("error")
      }
    })

    input.addEventListener("focus", function () {
      this.classList.remove("error")
    })
  })
}

// ===== EFECTOS DE SCROLL =====
function initScrollEffects() {
  // Animar elementos cuando son visibles
  function animateOnScroll() {
    const elements = document.querySelectorAll("[data-aos]")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight * 0.85) {
        element.classList.add("aos-animate")
      }
    })
  }

  window.addEventListener("scroll", animateOnScroll)

  // Ejecutar al cargar la página
  animateOnScroll()
}

// ===== FUNCIÓN PARA MOSTRAR ALERTAS =====
function showAlert(message, type = "success") {
  // Crear el elemento de alerta
  const alert = document.createElement("div")
  alert.classList.add("alert", type)

  // Añadir icono según el tipo
  const icon = document.createElement("i")
  icon.className = type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle"
  alert.appendChild(icon)

  // Añadir mensaje
  const messageText = document.createElement("span")
  messageText.textContent = message
  alert.appendChild(messageText)

  // Agregar la alerta al contenedor
  const alertContainer = document.getElementById("alert-container")
  if (alertContainer) {
    alertContainer.appendChild(alert)

    // Mostrar la alerta con animación
    setTimeout(() => {
      alert.classList.add("show")
    }, 10)

    // Ocultar la alerta después de 4 segundos
    setTimeout(() => {
      alert.classList.remove("show")
      alert.classList.add("hide")

      setTimeout(() => alert.remove(), 500)
    }, 4000)
  }
}
