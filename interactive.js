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



// Modificar la función DOMContentLoaded para incluir las nuevas funciones
document.addEventListener("DOMContentLoaded", () => {
    addSVGGradient();
    initSkillsSection();
  
    // Añadir atributo data-text al h1 para el efecto glitch
    const h1 = document.querySelector(".glitch-text");
    if (h1) {
      h1.setAttribute("data-text", h1.textContent);
    }
});