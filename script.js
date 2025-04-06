// Script for Johan Blandón's Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Crear un avatar simple para el perfil si no hay imagen
    createProfileAvatar();
    
    // Manejar el envío del formulario de recomendaciones
    setupRecommendationForm();
    
    // Añadir efectos de desplazamiento suave
    setupSmoothScrolling();
});

// Función para crear un avatar simple si no hay imagen de perfil
function createProfileAvatar() {
    const profileImage = document.getElementById('profile-image');
    
    // Si no hay imagen de perfil (src vacío o error), crear un avatar con iniciales
    profileImage.onerror = function() {
        const profilePic = document.querySelector('.profile-pic');
        profilePic.innerHTML = '<div class="avatar-initials">JD</div>';
        
        // Añadir estilos para el avatar con iniciales
        const style = document.createElement('style');
        style.textContent = `
            .avatar-initials {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #8e24aa;
                color: white;
                font-weight: bold;
                font-size: 1.5rem;
            }
        `;
        document.head.appendChild(style);
    };
    
    // Try to load the profile image
    profileImage.src = 'profile_pic.png';
}

// Función para manejar el formulario de recomendaciones
function setupRecommendationForm() {
    const form = document.getElementById('recommendationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validate the form
            if (!name || !email || !message) {
                alert('Please complete all fields.');
                return;
            }
            
            // En un caso real, aquí enviaríamos los datos a un servidor
            // Para este ejemplo, simplemente mostraremos la recomendación en la página
            addNewRecommendation(name, message);
            
            // Limpiar el formulario
            form.reset();
            
            // Show success message
            alert('Thank you for your recommendation!');
        });
    }
}

// Función para añadir una nueva recomendación a la página
function addNewRecommendation(name, message) {
    const container = document.querySelector('.recommendations-container');
    
    if (container) {
        // Crear una nueva tarjeta de recomendación
        const newCard = document.createElement('div');
        newCard.className = 'recommendation-card';
        newCard.innerHTML = `
            <p>"${message}"</p>
            <p class="author">- ${name}</p>
        `;
        
        // Añadir efectos de animación
        newCard.style.opacity = '0';
        newCard.style.transform = 'translateY(20px)';
        
        // Añadir la tarjeta al contenedor
        container.appendChild(newCard);
        
        // Activar la animación
        setTimeout(() => {
            newCard.style.transition = 'opacity 0.5s, transform 0.5s';
            newCard.style.opacity = '1';
            newCard.style.transform = 'translateY(0)';
        }, 10);
    }
}

// Función para configurar el desplazamiento suave
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Ajuste para el header
                    behavior: 'smooth'
                });
            }
        });
    });
}