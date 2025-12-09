// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        
        // Remove preloader from DOM after animation
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1200);
});

// Mobile Navigation Toggle dengan Animasi Smooth
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navItems = document.querySelectorAll('.nav-item');
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Set delay index untuk setiap nav item
navItems.forEach((item, index) => {
    item.style.setProperty('--i', index + 1);
});

// Function to close mobile menu dengan animasi
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Reset animasi nav items
    navItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
    });
    
    // Enable scroll
    document.body.style.overflow = 'auto';
}

// Function to open mobile menu dengan animasi
function openMobileMenu() {
    hamburger.classList.add('active');
    navMenu.classList.add('active');
    
    // Animate nav items dengan delay
    setTimeout(() => {
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        });
    }, 300);
    
    // Disable scroll saat menu terbuka
    document.body.style.overflow = 'hidden';
}

// Function to toggle mobile menu
function toggleMobileMenu() {
    if (hamburger.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

// Hamburger toggle functionality
hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Mencegah event bubbling
    toggleMobileMenu();
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            // Tambah sedikit delay untuk melihat animasi
            setTimeout(() => {
                closeMobileMenu();
            }, 300);
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    const isClickOnThemeToggle = themeToggle.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && !isClickOnThemeToggle && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close mobile menu when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close mobile menu when window is resized to desktop size
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Rest of your JavaScript code remains the same...
// [Keep all the other JavaScript code from previous version]

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    const isClickOnThemeToggle = themeToggle.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && !isClickOnThemeToggle && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close mobile menu when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Dark/Light Mode Toggle - DIPERBAIKI: HANYA SATU TOGGLE
// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Mencegah event bubbling
    body.classList.toggle('dark-mode');
    
    // Save theme preference
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});

// Scroll Animation for Sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Testimonials Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.testimonial-prev');
const nextButton = document.querySelector('.testimonial-next');
let autoSlideInterval;

function showSlide(n) {
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Calculate new slide index
    currentSlide = (n + slides.length) % slides.length;
    
    // Show current slide
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Initialize carousel
function initCarousel() {
    // Show first slide
    showSlide(0);
    
    // Add event listeners
    nextButton.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    prevButton.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });
    
    // Start auto sliding
    startAutoSlide();
    
    // Pause auto slide on hover
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }
}

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    // Check if form exists
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showFormMessage('Harap isi semua bidang yang wajib diisi.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Harap masukkan alamat email yang valid.', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('.submit-button');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            submitButton.disabled = true;
            
            // Check if EmailJS is initialized
            if (typeof emailjs !== 'undefined' && emailjs.init) {
                // Prepare email parameters
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    message: message,
                    to_email: 'rnbdmn311@gmail.com'
                };
                
                // Send email using EmailJS
                emailjs.send('service_rbtech', 'template_rbtech', templateParams)
                    .then(function(response) {
                        showFormMessage('Terima kasih! Pesan Anda telah berhasil dikirim.', 'success');
                        contactForm.reset();
                    }, function(error) {
                        console.error('EmailJS Error:', error);
                        // Fallback to WhatsApp
                        const whatsappMessage = `Halo RBTech, saya ${name} (${email}). Pesan saya: ${message}`;
                        const whatsappUrl = `https://wa.me/6287797937519?text=${encodeURIComponent(whatsappMessage)}`;
                        showFormMessage('Mengalihkan ke WhatsApp untuk mengirim pesan...', 'success');
                        setTimeout(() => {
                            window.open(whatsappUrl, '_blank');
                        }, 1500);
                    })
                    .finally(function() {
                        // Reset button state
                        submitButton.innerHTML = originalButtonText;
                        submitButton.disabled = false;
                    });
            } else {
                // Fallback to WhatsApp jika EmailJS tidak tersedia
                const whatsappMessage = `Halo RBTech, saya ${name} (${email}). Pesan saya: ${message}`;
                const whatsappUrl = `https://wa.me/6287797937519?text=${encodeURIComponent(whatsappMessage)}`;
                
                showFormMessage('Mengalihkan ke WhatsApp untuk mengirim pesan...', 'success');
                
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                
                // Open WhatsApp after a short delay
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                    contactForm.reset();
                }, 1000);
            }
        });
    }
    
    function showFormMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
});

// Set current year in footer
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '#!') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    
    // Fix untuk padding body berdasarkan tinggi navbar
    function updateBodyPadding() {
        const header = document.querySelector('.header');
        if (header) {
            const headerHeight = header.offsetHeight;
            document.body.style.paddingTop = headerHeight + 'px';
        }
    }
    
    // Update padding saat load dan resize
    updateBodyPadding();
    window.addEventListener('resize', updateBodyPadding);
    
    // Check if logo image exists, if not show placeholder
    const logoImg = document.querySelector('.logo-img');
    const logoPlaceholder = document.querySelector('.logo-placeholder');
    
    if (logoImg && logoPlaceholder) {
        logoImg.addEventListener('error', function() {
            // If logo image fails to load, show text logo
            this.style.display = 'none';
            logoPlaceholder.style.display = 'inline-block';
        });
        
        // Check if image loaded successfully
        if (logoImg.complete && logoImg.naturalHeight === 0) {
            // Image failed to load
            logoImg.style.display = 'none';
            logoPlaceholder.style.display = 'inline-block';
        }
    }
});

// Form fallback function if EmailJS is not configured
function handleFormSubmitFallback(formData) {
    // This is a fallback function in case EmailJS is not configured
    console.log('Form data:', formData);
    
    // For now, we'll simulate a successful submission
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ status: 200, text: 'OK' });
        }, 1000);
    });
}

// Add a simple hover effect for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add scroll effect for header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Fix untuk viewport height di mobile
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

// Fix untuk iOS Safari 100vh issue
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    document.body.style.minHeight = '-webkit-fill-available';
}

// Lazy loading untuk gambar
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Update body padding on window resize for responsive design
window.addEventListener('resize', function() {
    // Update mobile menu if needed
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});