// Inicialización de AOS con configuración mejorada
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: false,
  mirror: true
});

// Barra de progreso de scroll
const createScrollProgress = () => {
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  const bar = document.createElement('div');
  bar.className = 'scroll-progress-bar';
  progress.appendChild(bar);
  document.body.appendChild(progress);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    bar.style.width = scrolled + '%';
  });
};

// Efecto Parallax para la sección hero
const initParallax = () => {
  const welcomeSection = document.querySelector('.welcome-section');
  if (!welcomeSection) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    welcomeSection.style.backgroundPositionY = rate + 'px';
  });
};

// Lazy loading de imágenes
const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

// Animaciones suaves para el scroll
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      
      // Si el href es solo '#', no hacer nada
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
};

// Micro-interacciones para botones
const initButtonEffects = () => {
  const buttons = document.querySelectorAll('.pricing-button, .form-submit');
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      button.style.setProperty('--x', x + 'px');
      button.style.setProperty('--y', y + 'px');
    });
  });
};

// Chatbot mejorado con respuestas predefinidas
const initChatbot = () => {
  const responses = {
    'hola': '¡Hola! ¿En qué puedo ayudarte hoy?',
    'precio': 'Nuestros precios varían según el proyecto. ¿Te gustaría que te contactemos para discutir tu proyecto específico?',
    'contacto': 'Puedes contactarnos a través del formulario en nuestra web o llamando al +34 XXX XXX XXX',
    'servicios': 'Ofrecemos servicios de diseño web, desarrollo, SEO y marketing digital. ¿Sobre cuál te gustaría saber más?'
  };

  const chatInput = document.querySelector('.chat-bot-input input');
  const chatMessages = document.querySelector('.chat-bot-messages');
  const sendButton = document.querySelector('.chat-bot-input button');

  const addMessage = (message, isBot = false) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const handleMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    let response = 'Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?';
    
    for (const [key, value] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        response = value;
        break;
      }
    }
    
    setTimeout(() => addMessage(response, true), 500);
  };

  sendButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (!message) return;
    
    addMessage(message);
    chatInput.value = '';
    handleMessage(message);
  });

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendButton.click();
    }
  });
};

// Testimonials Slider
let currentTestimonial = 0;
let testimonials;
let totalTestimonials;

document.addEventListener('DOMContentLoaded', () => {
    testimonials = document.querySelectorAll('.testimonial');
    totalTestimonials = testimonials.length;

    if (totalTestimonials === 0) {
        console.error("No se encontraron testimonios.");
    } else {
        // Initialize first testimonial
        showTestimonial(0);

        // Auto slide testimonials
        setInterval(nextTestimonial, 5000);
    }
});

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.style.display = 'none');
    testimonials[index].style.display = 'block';
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

function previousTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

// Manejo del FAQ
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Cerrar todas las respuestas
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Abrir la respuesta seleccionada si no estaba activa
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});

// Blog Card Image Loading
document.querySelectorAll('.blog-image img').forEach(img => {
  img.addEventListener('load', function() {
    this.style.opacity = '1';
  });
});

// Lazy Loading for Blog Images
const blogImageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '50px'
});

document.querySelectorAll('.blog-image img[data-src]').forEach(img => {
  blogImageObserver.observe(img);
});

// Contenido de los artículos del blog
const articulos = {
    'tendencias-2025': {
        titulo: 'Tendencias en diseño web 2025',
        contenido: `
            <h2>Tendencias en diseño web 2025</h2>
            <p>El mundo del diseño web está en constante evolución, y 2025 no es una excepción. Estas son las tendencias más destacadas que veremos este año:</p>
            
            <h3>1. Diseño Minimalista y Funcional</h3>
            <p>La simplicidad sigue siendo clave. Los sitios web modernos priorizan la experiencia del usuario con diseños limpios y navegación intuitiva.</p>
            
            <h3>2. Modo Oscuro Adaptativo</h3>
            <p>La implementación del modo oscuro ya no es opcional. Los usuarios esperan poder cambiar entre modos claro y oscuro según sus preferencias.</p>
            
            <h3>3. Micro-interacciones Significativas</h3>
            <p>Pequeñas animaciones y efectos que mejoran la experiencia del usuario y proporcionan retroalimentación visual inmediata.</p>
            
            <h3>4. Diseño Responsivo Avanzado</h3>
            <p>Con la diversidad de dispositivos en aumento, el diseño responsivo debe ser más sofisticado que nunca.</p>
        `
    },
    'seo-local': {
        titulo: 'SEO Local en San Sebastián',
        contenido: `
            <h2>SEO Local en San Sebastián</h2>
            <p>Optimizar tu presencia online para búsquedas locales es crucial para los negocios en Donostia. Aquí te explicamos cómo:</p>
            
            <h3>1. Google My Business</h3>
            <p>Mantén actualizada tu ficha de Google My Business con información precisa, fotos recientes y reseñas de clientes.</p>
            
            <h3>2. Contenido Local Relevante</h3>
            <p>Crea contenido específico para tu audiencia local, incluyendo eventos, noticias y referencias a lugares conocidos de la ciudad.</p>
            
            <h3>3. Optimización de Palabras Clave Locales</h3>
            <p>Utiliza términos específicos de la región como "Donostia", "San Sebastián" y barrios específicos en tu contenido.</p>
            
            <h3>4. Enlaces Locales de Calidad</h3>
            <p>Establece relaciones con otros negocios locales y medios de comunicación para obtener enlaces relevantes.</p>
        `
    },
    'wordpress-vs-alternativas': {
        titulo: 'WordPress vs Alternativas',
        contenido: `
            <h2>WordPress vs Alternativas</h2>
            <p>¿Es WordPress la mejor opción para tu sitio web? Analizamos las principales alternativas:</p>
            
            <h3>1. WordPress</h3>
            <p>Ventajas: Gran comunidad, muchos plugins, fácil de usar.<br>
            Desventajas: Puede ser lento si no se optimiza, requiere mantenimiento regular.</p>
            
            <h3>2. Wix</h3>
            <p>Ventajas: Fácil de usar, hosting incluido, buenos templates.<br>
            Desventajas: Menos flexible, costos mensuales, SEO limitado.</p>
            
            <h3>3. Shopify</h3>
            <p>Ventajas: Excelente para e-commerce, seguridad robusta.<br>
            Desventajas: Costos más altos, menos personalizable.</p>
            
            <h3>4. Desarrollo a Medida</h3>
            <p>Ventajas: Control total, mejor rendimiento.<br>
            Desventajas: Mayor costo inicial, requiere conocimientos técnicos.</p>
        `
    }
};

// Función para mostrar artículos
function mostrarArticulo(id) {
    const modal = document.getElementById('blogModal');
    const modalContent = document.getElementById('modalContent');
    const articulo = articulos[id];
    
    if (articulo) {
        modalContent.innerHTML = articulo.contenido;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }
}

// Cerrar modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('blogModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restaurar scroll
        }
    }
    
    // Cerrar modal al hacer clic fuera del contenido
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing components...');

  createScrollProgress();
  initParallax();
  lazyLoadImages();
  initSmoothScroll();
  initButtonEffects();
  initChatbot();

  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    mirror: true
  });

  // Chatbot functionality
const responses = {
  default: [
    "¿En qué puedo ayudarte?",
    "No estoy seguro de entender. ¿Podrías reformular tu pregunta?",
    "¿Necesitas más información sobre algún servicio específico?"
  ],
  greeting: {
    keywords: ["hola", "buenos días", "buenas", "hey", "saludos"],
    responses: [
      "¡Hola! ¿En qué puedo ayudarte hoy?",
      "¡Bienvenido! ¿Qué te gustaría saber sobre nuestros servicios?",
      "¡Hola! Estoy aquí para resolver tus dudas"
    ]
  },
  services: {
    keywords: ["servicios", "diseño", "web", "seo", "marketing"],
    responses: [
      "Ofrecemos servicios de diseño web, SEO y marketing digital. ¿Sobre cuál te gustaría saber más?",
      "Nuestros servicios principales son diseño web, optimización SEO y estrategias de marketing. ¿Te gustaría más información?",
      "¿Te interesa algún servicio en particular? Puedo darte más detalles sobre diseño web, SEO o marketing digital"
    ]
  },
  contact: {
    keywords: ["contacto", "email", "teléfono", "llamar", "contactar"],
    responses: [
      "Puedes contactarnos a través del formulario en nuestra web o llamando al número que aparece en la sección de contacto",
      "¿Te gustaría que te contactemos? Déjanos tus datos en el formulario de contacto",
      "Estamos disponibles por teléfono y email. ¿Qué método prefieres?"
    ]
  },
  price: {
    keywords: ["precio", "costo", "presupuesto", "tarifa", "cuánto"],
    responses: [
      "Los precios varían según las necesidades específicas de cada proyecto. ¿Te gustaría que te preparemos un presupuesto?",
      "Podemos prepararte un presupuesto personalizado. ¿Nos cuentas más sobre tu proyecto?",
      "Cada proyecto es único, ¿te gustaría que hablemos sobre los detalles para darte un presupuesto exacto?"
    ]
  }
};

function initChatbot() {
  console.log('Initializing chatbot...');

    // Get elements
    const toggle = document.querySelector('.chat-bot-toggle');
    const content = document.querySelector('.chat-bot-content');
    
    console.log('Toggle element:', toggle);
    console.log('Content element:', content);

    if (!toggle || !content) {
      console.error('Critical chatbot elements not found!');
      return;
    }

    // Load chat history from localStorage
    let chatHistory = [];
    try {
      const savedHistory = localStorage.getItem('chatHistory');
      if (savedHistory) {
        chatHistory = JSON.parse(savedHistory);
      }
    } catch (e) {
      console.error('Error loading chat history:', e);
    }

    // Initialize chat state
    content.style.display = 'none';
    let isOpen = false;

    // Add ARIA attributes for accessibility
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('aria-label', 'Abrir chat de ayuda');
    toggle.setAttribute('tabindex', '0');
    
    // Toggle chat with animation
    function toggleChat() {
      isOpen = !isOpen;
      content.style.display = 'block';
      content.style.opacity = '0';
      content.style.transform = isOpen ? 'translateY(20px)' : 'translateY(0)';
      
      requestAnimationFrame(() => {
        content.style.transition = 'all 0.3s ease';
        content.style.opacity = isOpen ? '1' : '0';
        content.style.transform = isOpen ? 'translateY(0)' : 'translateY(20px)';
        
        if (!isOpen) {
          setTimeout(() => {
            content.style.display = 'none';
          }, 300);
        }
      });

      // Update ARIA attributes
      toggle.setAttribute('aria-expanded', isOpen.toString());
      content.setAttribute('aria-hidden', (!isOpen).toString());
    }

    // Toggle chat
    toggle.addEventListener('click', toggleChat);
    // Keyboard accessibility
    toggle.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        toggleChat();
      }
    });

    // Close chat
    const closeBtn = document.querySelector('.close-chat');
    if (closeBtn) {
      closeBtn.setAttribute('aria-label', 'Cerrar chat');
      closeBtn.addEventListener('click', toggleChat);
    }

    // Message handling
    const input = document.querySelector('.chat-bot-input input');
    const sendBtn = document.querySelector('.chat-bot-input button');
    const messages = document.querySelector('.chat-bot-messages');

    // Load previous messages
    if (chatHistory.length > 0) {
      chatHistory.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${msg.type}-message`;
        msgDiv.textContent = msg.text;
        messages.appendChild(msgDiv);
      });
      messages.scrollTop = messages.scrollHeight;
    }

    function getResponse(message) {
      message = message.toLowerCase();
      
      // Check each category for matching keywords
      for (const category in responses) {
        if (category === 'default') continue;
        
        const keywords = responses[category].keywords;
        if (keywords && keywords.some(keyword => message.includes(keyword))) {
          const categoryResponses = responses[category].responses;
          return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
        }
      }
      
      // If no matching keywords, return default response
      return responses.default[Math.floor(Math.random() * responses.default.length)];
    }

    function addMessage(text, type) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `message ${type}-message`;
      msgDiv.textContent = text;
      messages.appendChild(msgDiv);
      messages.scrollTop = messages.scrollHeight;

      // Save to history
      chatHistory.push({ text, type });
      try {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
      } catch (e) {
        console.error('Error saving chat history:', e);
      }
    }

    function sendMessage() {
      if (!input || !messages) return;
      
      const text = input.value.trim();
      if (!text) return;

      console.log('Sending message:', text);

      // Add user message
      addMessage(text, 'user');

      // Clear input
      input.value = '';

      // Get and add bot response
      setTimeout(() => {
        const response = getResponse(text);
        addMessage(response, 'bot');
      }, 500);
    }

    // Send button click
    if (sendBtn) {
      sendBtn.addEventListener('click', sendMessage);
    }

    // Enter key press
    if (input) {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          sendMessage();
        }
      });
    }

    console.log('Chatbot initialization complete');
  }

  // Initialize chatbot
  initChatbot();

  // Mobile Navigation
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li a');

  // Toggle menu
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Handle navigation clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get the target section
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      // Close menu
      nav.classList.remove('nav-active');
      burger.classList.remove('active');
      document.body.classList.remove('no-scroll');
      
      // Smooth scroll to section if it exists
      if (targetSection) {
        setTimeout(() => {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 300); // Pequeño retraso para que la animación del menú termine
      } else {
        console.warn(`Sección ${targetId} no encontrada`);
      }
    });
  });

  // Statistics counter functionality
  function initStatistics() {
    console.log('Initializing statistics...');
    const statsSection = document.querySelector('.stats-section');
    
    if (!statsSection) {
      console.log('Stats section not found, skipping...');
      return;
    }

    const counters = document.querySelectorAll('.stat-number');
    
    function startCounting(counter) {
      const target = parseInt(counter.getAttribute('data-target'));
      const count = +counter.innerText;
      const increment = target / 100;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => startCounting(counter), 20);
      } else {
        counter.innerText = target;
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(counter => startCounting(counter));
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(statsSection);
  }

  // Initialize statistics
  initStatistics();

  // Formulario de Contacto Mejorado
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.querySelector('.form-feedback');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const re = /^[0-9+ -]{9,}$/;
    return re.test(phone);
  }

  function showFeedback(message, type) {
    formFeedback.textContent = message;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.style.display = 'block';
    
    setTimeout(() => {
      formFeedback.style.display = 'none';
    }, 5000);
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const empresa = document.getElementById('empresa').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    
    // Validación
    if (!nombre || !email || !mensaje) {
      showFeedback('Por favor, complete todos los campos requeridos.', 'error');
      return;
    }
    
    if (!validateEmail(email)) {
      showFeedback('Por favor, ingrese un email válido.', 'error');
      return;
    }
    
    if (telefono && !validatePhone(telefono)) {
      showFeedback('Por favor, ingrese un número de teléfono válido.', 'error');
      return;
    }
    
    // Aquí iría la lógica para enviar el formulario
    try {
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showFeedback('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
      contactForm.reset();
    } catch (error) {
      showFeedback('Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo.', 'error');
    }
  });

  // Validación en tiempo real
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.required && !input.value.trim()) {
        input.style.borderColor = '#dc3545';
      } else {
        input.style.borderColor = '#e9ecef';
      }
      
      if (input.type === 'email' && input.value) {
        input.style.borderColor = validateEmail(input.value) ? '#e9ecef' : '#dc3545';
      }
      
      if (input.type === 'tel' && input.value) {
        input.style.borderColor = validatePhone(input.value) ? '#e9ecef' : '#dc3545';
      }
    });
  });

  // Botón Volver Arriba
  const backToTopButton = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  console.log('All components initialized');
});
