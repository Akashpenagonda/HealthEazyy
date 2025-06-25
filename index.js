  // Preloader
  window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
let darkMode = localStorage.getItem('darkMode');

// Check for saved user preference
if (darkMode === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.classList.add('shake');
        setTimeout(() => {
            darkModeToggle.classList.remove('shake');
        }, 500);
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.classList.add('bounce');
        setTimeout(() => {
            darkModeToggle.classList.remove('bounce');
        }, 1000);
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Testimonial Slider
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Auto slide change
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// FAQ Accordion with crazy animations
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it was closed
        if (!isActive) {
            item.classList.add('active');
            
            // Add crazy animation class temporarily
            item.classList.add('glow');
            setTimeout(() => {
                item.classList.remove('glow');
            }, 1000);
        }
    });
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('active', window.scrollY > 300);
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Video Player Functionality
const videoContainer = document.querySelector('.video-container');
const video = videoContainer.querySelector('video');
const playButton = videoContainer.querySelector('.play-button');
const playPauseBtn = videoContainer.querySelector('.play-pause');
const back10Btn = videoContainer.querySelector('.back-10');
const forward10Btn = videoContainer.querySelector('.forward-10');

// Toggle play/pause
function togglePlayPause() {
    if (video.paused) {
        video.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playButton.style.opacity = '0';
    } else {
        video.pause();
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        playButton.style.opacity = '1';
    }
}

// Play button in center
playButton.addEventListener('click', togglePlayPause);

// Play/pause button in controls
playPauseBtn.addEventListener('click', togglePlayPause);

// Skip backward 10 seconds
back10Btn.addEventListener('click', () => {
    video.currentTime -= 10;
    back10Btn.classList.add('bounce');
    setTimeout(() => back10Btn.classList.remove('bounce'), 500);
});

// Skip forward 10 seconds
forward10Btn.addEventListener('click', () => {
    video.currentTime += 10;
    forward10Btn.classList.add('bounce');
    setTimeout(() => forward10Btn.classList.remove('bounce'), 500);
});

// Hide center play button when video is playing
video.addEventListener('play', () => {
    playButton.style.opacity = '0';
});

// Show center play button when video is paused
video.addEventListener('pause', () => {
    playButton.style.opacity = '1';
});

// Click on video to toggle play/pause
video.addEventListener('click', togglePlayPause);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .section-title, .video-container, .testimonial-slider, .faq-item, .before-after-row');
    
    elements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            
            // Add special animations for comparison containers
            if (element.classList.contains('before-after-row')) {
                element.style.animationDelay = `${index * 0.1}s`;
                element.classList.add('slide-up');
            }
        }
    });
}

// Set initial state for animated elements
document.querySelectorAll('.service-card, .section-title, .video-container, .testimonial-slider, .faq-item, .before-after-row').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Crazy animations on hover for service icons
document.querySelectorAll('.service-icon i').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.classList.add('float');
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.classList.remove('float');
    });
});

// Add hover effects to before-after rows
document.querySelectorAll('.before-after-row').forEach(row => {
    row.addEventListener('mouseenter', () => {
        const rating = row.querySelector('.rating');
        if (rating) {
            rating.classList.add('rubber-band');
        }
        
        const stats = row.querySelectorAll('.stat-item');
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.classList.add('rotate-in');
            }, index * 100);
        });
    });
    
    row.addEventListener('mouseleave', () => {
        const rating = row.querySelector('.rating');
        if (rating) {
            rating.classList.remove('rubber-band');
        }
        
        const stats = row.querySelectorAll('.stat-item');
        stats.forEach(stat => {
            stat.classList.remove('rotate-in');
        });
    });
});

// Add crazy animations to FAQ questions
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('mouseenter', () => {
        question.classList.add('shake');
    });
    
    question.addEventListener('mouseleave', () => {
        question.classList.remove('shake');
    });
});

// Add rainbow effect to FAQ title
const faqTitle = document.querySelector('.faq .section-title h2 span');
setInterval(() => {
    faqTitle.classList.toggle('rainbow-text');
}, 3000);

// Add hover effect to stat items
document.querySelectorAll('.stat-item').forEach(stat => {
    stat.addEventListener('mouseenter', () => {
        stat.classList.add('bounce');
    });
    
    stat.addEventListener('mouseleave', () => {
        stat.classList.remove('bounce');
    });
});