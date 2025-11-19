// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetId === 'shop') {
                // For shop links, redirect to BASE shop
                window.open('https://capilus.base.shop', '_blank');
                return;
            }
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gallery filtering functionality
    const galleryTabs = document.querySelectorAll('.tab-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-tab');
            
            // Update active tab
            galleryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || category === itemCategory) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(102, 126, 234, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollY = window.scrollY;
    });

    // Add loading animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.href && this.href.includes('capilus.base.shop')) {
                // Add loading effect for external shop links
                const originalText = this.textContent;
                this.textContent = '読み込み中...';
                this.style.opacity = '0.7';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.opacity = '1';
                }, 1000);
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.feature-card, .gallery-item, .pricing-card, .usage-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Mobile menu toggle (if needed for responsive design)
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav');
        const header = document.querySelector('.header .container');
        
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-toggle')) {
                const menuToggle = document.createElement('button');
                menuToggle.className = 'mobile-menu-toggle';
                menuToggle.innerHTML = '☰';
                menuToggle.style.cssText = `
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: block;
                `;
                
                header.appendChild(menuToggle);
                
                menuToggle.addEventListener('click', () => {
                    nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
                });
            }
        } else {
            const existingToggle = document.querySelector('.mobile-menu-toggle');
            if (existingToggle) {
                existingToggle.remove();
            }
            nav.style.display = 'flex';
        }
    };

    // Initial mobile menu setup
    createMobileMenu();
    
    // Handle window resize
    window.addEventListener('resize', createMobileMenu);

    // Price update animation
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        price.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        price.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Gallery item hover effects
    const galleryItemsHover = document.querySelectorAll('.gallery-item');
    galleryItemsHover.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const info = this.querySelector('.gallery-info');
            info.style.background = '#667eea';
            info.style.color = 'white';
            info.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const info = this.querySelector('.gallery-info');
            info.style.background = '';
            info.style.color = '';
        });
    });

    // Form validation and enhancement (if forms are added later)
    const enhanceForm = (form) => {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = '#667eea';
                this.style.boxShadow = '0 0 5px rgba(102, 126, 234, 0.3)';
            });
            
            input.addEventListener('blur', function() {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            });
        });
    };

    // Enhanced scroll to shop functionality
    const shopLinks = document.querySelectorAll('a[href="#shop"]');
    shopLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Redirect directly to BASE shop
            window.open('https://capilus.base.shop', '_blank');
        });
    });

    // Coming Soon Email Notification Form
    const notificationForm = document.querySelector('.notification-form');
    const emailInput = document.querySelector('.email-input');
    const notifyBtn = document.querySelector('.notify-btn');

    if (notificationForm && emailInput && notifyBtn) {
        // Email validation
        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        // Form submission handler
        const handleFormSubmission = (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (!email) {
                showNotification('メールアドレスを入力してください', 'error');
                emailInput.focus();
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('有効なメールアドレスを入力してください', 'error');
                emailInput.focus();
                return;
            }
            
            // Show loading state
            const originalText = notifyBtn.textContent;
            notifyBtn.textContent = '送信中...';
            notifyBtn.disabled = true;
            
            // Simulate API call (replace with actual endpoint)
            setTimeout(() => {
                // Store email in localStorage for now
                const subscribers = JSON.parse(localStorage.getItem('crineSubscribers') || '[]');
                
                if (subscribers.includes(email)) {
                    showNotification('このメールアドレスは既に登録されています', 'warning');
                } else {
                    subscribers.push(email);
                    localStorage.setItem('crineSubscribers', JSON.stringify(subscribers));
                    showNotification('ありがとうございます！リリース情報をお送りします', 'success');
                    emailInput.value = '';
                }
                
                notifyBtn.textContent = originalText;
                notifyBtn.disabled = false;
            }, 1500);
        };

        // Event listeners for form submission
        notifyBtn.addEventListener('click', handleFormSubmission);
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleFormSubmission(e);
            }
        });

        // Input enhancement
        emailInput.addEventListener('input', () => {
            const email = emailInput.value.trim();
            if (email && isValidEmail(email)) {
                emailInput.style.borderColor = '#28a745';
                emailInput.style.boxShadow = '0 0 5px rgba(40, 167, 69, 0.3)';
            } else if (email) {
                emailInput.style.borderColor = '#dc3545';
                emailInput.style.boxShadow = '0 0 5px rgba(220, 53, 69, 0.3)';
            } else {
                emailInput.style.borderColor = '';
                emailInput.style.boxShadow = '';
            }
        });
    }

    // Notification system
    const showNotification = (message, type = 'info') => {
        // Remove existing notifications
        const existingNotification = document.querySelector('.custom-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `custom-notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '1rem 2rem',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            minWidth: '300px',
            textAlign: 'center',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            fontSize: '0.95rem'
        });

        // Set background color based on type
        const colors = {
            success: 'linear-gradient(135deg, #28a745, #20c997)',
            error: 'linear-gradient(135deg, #dc3545, #e74c3c)',
            warning: 'linear-gradient(135deg, #ffc107, #fd7e14)',
            info: 'linear-gradient(135deg, #17a2b8, #007bff)'
        };
        notification.style.background = colors[type] || colors.info;
        notification.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    };

    // Ecosystem flow animation
    const ecosystemItems = document.querySelectorAll('.ecosystem-item');
    ecosystemItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
            item.style.transition = 'transform 0.3s ease';
            
            if (index < ecosystemItems.length - 1) {
                const arrow = item.nextElementSibling;
                if (arrow && arrow.classList.contains('ecosystem-arrow')) {
                    arrow.style.transform = 'scale(1.2)';
                    arrow.style.transition = 'transform 0.3s ease';
                }
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            
            if (index < ecosystemItems.length - 1) {
                const arrow = item.nextElementSibling;
                if (arrow && arrow.classList.contains('ecosystem-arrow')) {
                    arrow.style.transform = 'scale(1)';
                }
            }
        });
    });

    // Preview card hover enhancement
    const previewCard = document.querySelector('.preview-card');
    if (previewCard) {
        previewCard.addEventListener('mouseenter', () => {
            previewCard.style.transform = 'translateY(-10px)';
            previewCard.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
        });
        
        previewCard.addEventListener('mouseleave', () => {
            previewCard.style.transform = 'translateY(0)';
            previewCard.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
        });
    }

    // Status badge pulse animation control
    const statusBadge = document.querySelector('.status');
    if (statusBadge) {
        statusBadge.addEventListener('mouseenter', () => {
            statusBadge.style.animationPlayState = 'paused';
            statusBadge.style.transform = 'scale(1.1)';
        });
        
        statusBadge.addEventListener('mouseleave', () => {
            statusBadge.style.animationPlayState = 'running';
            statusBadge.style.transform = 'scale(1)';
        });
    }

    // Add parallax effect to coming soon section
    const comingSoonSection = document.querySelector('.coming-soon');
    if (comingSoonSection) {
        window.addEventListener('scroll', utils.debounce(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            const bgElement = comingSoonSection.querySelector('::before');
            if (bgElement) {
                comingSoonSection.style.backgroundPosition = `center ${rate}px`;
            }
        }, 10));
    }

    // Add subtle animations to benefits
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        }, 100);
    });

    // Add subtle parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Console message for developers
    console.log('%cCapilus Landing Page', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with ❤️ for the beauty industry', 'color: #f8c291; font-size: 14px;');
});

// Utility functions
const utils = {
    // Debounce function for scroll events
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Smooth counter animation
    animateCounter: function(element, target, duration = 1000) {
        let startTime = null;
        const startValue = 0;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const currentValue = Math.floor(progress * (target - startValue) + startValue);
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
};

// Export utils for potential use in other scripts
window.capilusUtils = utils;
