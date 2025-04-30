// JavaScript for interactivity (e.g., menu toggle, search)

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init();
    
    // Update copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.overlay');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', function() {
            nav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.querySelector('.sidebar').classList.remove('active');
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                nav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Testimonial carousel
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.control-prev');
    const nextBtn = document.querySelector('.control-next');
    
    if (testimonialCarousel && testimonials.length > 0) {
        let currentIndex = 0;
        const testimonialCount = testimonials.length;
        const cardsToShow = window.innerWidth < 768 ? 1 : 3;
        const cardWidth = testimonials[0].offsetWidth + 32; // Adding gap
        
        // Hide all testimonials except first few
        for (let i = cardsToShow; i < testimonialCount; i++) {
            testimonials[i].style.display = 'none';
        }
        
        const showTestimonials = (startIndex) => {
            // Hide all testimonials
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
                testimonial.style.opacity = 0;
            });
            
            // Show current set of testimonials
            for (let i = startIndex; i < startIndex + cardsToShow; i++) {
                if (i < testimonialCount) {
                    const index = i % testimonialCount; // Loop back to beginning
                    testimonials[index].style.display = 'block';
                    testimonials[index].style.opacity = 0;
                    
                    // Fade in animation
                    let opacity = 0;
                    const fadeIn = setInterval(() => {
                        if (opacity >= 1) {
                            clearInterval(fadeIn);
                        }
                        testimonials[index].style.opacity = opacity;
                        opacity += 0.1;
                    }, 30);
                }
            }
        };
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - cardsToShow + testimonialCount) % testimonialCount;
                showTestimonials(currentIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + cardsToShow) % testimonialCount;
                showTestimonials(currentIndex);
            });
        }
        
        // Auto rotate testimonials
        const autoRotateInterval = 8000; // 8 seconds
        setInterval(() => {
            currentIndex = (currentIndex + cardsToShow) % testimonialCount;
            showTestimonials(currentIndex);
        }, autoRotateInterval);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            const newCardsToShow = window.innerWidth < 768 ? 1 : 3;
            if (newCardsToShow !== cardsToShow) {
                cardsToShow = newCardsToShow;
                showTestimonials(currentIndex);
            }
        });
    }
    
    // Sidebar toggle
    const hireBtn = document.querySelector('.btn-signup');
    const sidebar = document.querySelector('.sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    
    if (hireBtn && sidebar) {
        hireBtn.addEventListener('click', () => {
            // Scroll to contact form instead of opening sidebar
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    if (sidebarClose) {
        sidebarClose.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const subject = this.querySelector('#subject').value.trim();
            const message = this.querySelector('#message').value.trim();
            
            // Validate form
            if (!name || !email || !subject || !message) {
                alert('Please fill out all fields');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Create email body with form information
            const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
            
            // Open email client with pre-filled data
            window.location.href = `mailto:kingsifatbd27@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
            
            // Reset form and show success message after a delay
            setTimeout(() => {
                // Clear form fields
                this.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Email client opened! If it didn\'t open, please email us directly.';
                this.appendChild(successMessage);
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Remove success message after a delay
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1000);
        });
    }
    
    // Scroll reveal animation for stats
    const revealStats = () => {
        const stats = document.querySelectorAll('.stat-item h4');
        if (!stats.length) return;
        
        const isInViewport = (el) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };
        
        const countUp = (el, target) => {
            const duration = 2000; // 2 seconds
            const frameRate = 50; // 50 frames per second
            const totalFrames = duration / (1000 / frameRate);
            let frame = 0;
            
            const counter = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                const currentCount = Math.round(progress * target);
                
                if (progress >= 1) {
                    clearInterval(counter);
                    el.textContent = target;
                } else {
                    el.textContent = currentCount;
                }
            }, 1000 / frameRate);
        };
        
        let animated = false;
        
        window.addEventListener('scroll', () => {
            if (animated) return;
            if (isInViewport(stats[0])) {
                animated = true;
                stats.forEach(stat => {
                    const targetValue = parseInt(stat.textContent.replace(/\+/g, ''), 10);
                    stat.textContent = '0';
                    countUp(stat, targetValue);
                });
            }
        });
    };
    
    revealStats();
    
    // Update active menu item on scroll
    const updateActiveMenuItem = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
                
                // Home link is active when no section is active
                if (!current && link.getAttribute('href') === '#') {
                    link.classList.add('active');
                }
            });
        });
    };
    
    updateActiveMenuItem();
    
    // Add scroll behavior for the header
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 80) {
            // Scrolling down - hide header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show header
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}); 