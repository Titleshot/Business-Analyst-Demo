// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation active state on scroll
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
    observer.observe(el);
});

// Skills progress animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skills-grid').forEach(el => {
    skillObserver.observe(el);
});

// Navigation background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize EmailJS when the page loads
// IMPORTANT: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
// Get it from: https://dashboard.emailjs.com/admin/integration
document.addEventListener('DOMContentLoaded', function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init({
            publicKey: "YOUR_PUBLIC_KEY", // Replace with your EmailJS public key
        });
    }
});

// Form submission handler with EmailJS
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Prepare email template parameters
    const templateParams = {
        from_name: form.querySelector('#name').value,
        from_email: form.querySelector('#email').value,
        company: form.querySelector('#company').value || 'Not provided',
        message: form.querySelector('#message').value,
        to_email: 'ajitt742@gmail.com' // Recipient email address
    };
    
    // Send email using EmailJS
    // IMPORTANT: Replace these three values with your actual EmailJS credentials:
    // 1. YOUR_PUBLIC_KEY - from https://dashboard.emailjs.com/admin/integration
    // 2. YOUR_SERVICE_ID - from https://dashboard.emailjs.com/admin (Services tab)
    // 3. YOUR_TEMPLATE_ID - from https://dashboard.emailjs.com/admin (Email Templates tab)
    emailjs.send(
        'YOUR_SERVICE_ID',    // Replace with your EmailJS Service ID
        'YOUR_TEMPLATE_ID',    // Replace with your EmailJS Template ID
        templateParams,
        {
            publicKey: "YOUR_PUBLIC_KEY" // Replace with your EmailJS public key
        }
    )
    .then(function(response) {
        // Success
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#10b981';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            form.reset();
        }, 3000);
    }, function(error) {
        // Error
        console.error('EmailJS Error:', error);
        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send';
        submitBtn.style.background = '#ef4444';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
}

// Mobile menu functions
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn i');
    
    navMenu.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
        menuBtn.classList.remove('fa-bars');
        menuBtn.classList.add('fa-times');
    } else {
        menuBtn.classList.remove('fa-times');
        menuBtn.classList.add('fa-bars');
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn i');
    
    navMenu.classList.remove('active');
    menuBtn.classList.remove('fa-times');
    menuBtn.classList.add('fa-bars');
}

