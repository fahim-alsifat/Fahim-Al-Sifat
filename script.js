// JavaScript for interactivity (e.g., menu toggle, search)

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const overlay = document.querySelector('.overlay');
    const sidebar = document.querySelector('.sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    const prevButton = document.querySelector('.control-prev');
    const nextButton = document.querySelector('.control-next');
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    
    // Create mobile navigation element and append to body
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
        <div class="mobile-nav-header">
            <h2>Portfolio</h2>
            <button class="mobile-nav-close"><i class="fas fa-times"></i></button>
        </div>
        <ul>
            <li><a href="#" class="active">Home</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <div class="mobile-nav-auth">
            <button class="btn-signup">Hire Me</button>
        </div>
    `;
    document.body.appendChild(mobileNav);
    
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    
    // Menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.add('active');
            overlay.classList.add('active');
        });
    }
    
    // Mobile navigation close
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
    
    // Overlay click to close sidebar and mobile nav
    if (overlay) {
        overlay.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            if (sidebar) sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
    
    // Testimonial carousel navigation
    if (testimonialCarousel && prevButton && nextButton) {
        nextButton.addEventListener('click', () => {
            testimonialCarousel.scrollBy({
                left: 370,
                behavior: 'smooth'
            });
        });
        
        prevButton.addEventListener('click', () => {
            testimonialCarousel.scrollBy({
                left: -370,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Account for header height
                    behavior: 'smooth'
                });
                
                // Close mobile nav if open
                mobileNav.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });
    
    // Filter projects (if we add filtering functionality)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter projects
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const nameInput = contactForm.querySelector('#name');
            const emailInput = contactForm.querySelector('#email');
            const messageInput = contactForm.querySelector('#message');
            
            if (nameInput && nameInput.value.trim() === '') {
                valid = false;
                nameInput.classList.add('error');
            } else if (nameInput) {
                nameInput.classList.remove('error');
            }
            
            if (emailInput) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value.trim())) {
                    valid = false;
                    emailInput.classList.add('error');
                } else {
                    emailInput.classList.remove('error');
                }
            }
            
            if (messageInput && messageInput.value.trim() === '') {
                valid = false;
                messageInput.classList.add('error');
            } else if (messageInput) {
                messageInput.classList.remove('error');
            }
            
            if (valid) {
                // In a real scenario, here you would send the form data to a server
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill out all required fields correctly.');
            }
        });
    }
    
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
    
    // Dynamic year for footer copyright
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    console.log('Portfolio script loaded successfully.');
}); 