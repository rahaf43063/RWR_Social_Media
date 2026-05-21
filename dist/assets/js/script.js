document.addEventListener('DOMContentLoaded', function () {
    // Add smooth scroll behavior
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

    // Add floating animation to logo
    const logo = document.querySelector('.fa-globe-americas')?.parentElement;
    if (logo) {
        logo.classList.add('float-animation');
    }

    // Add gradient animation to main title
    const mainTitle = document.querySelector('h1');
    if (mainTitle) {
        mainTitle.classList.add('gradient-animation');
    }

    // Add hover effects for social media links
    const socialLinks = document.querySelectorAll('a[target="_blank"]');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Add ripple effect on click
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('absolute', 'bg-white', 'rounded-full', 'opacity-30', 'animate-ping');
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            
            const rect = this.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left - 10}px`;
            ripple.style.top = `${e.clientY - rect.top - 10}px`;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add typing effect to subtitle
    const subtitle = document.querySelector('.text-gray-300.text-sm.mt-2');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let index = 0;
        
        const typeWriter = () => {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Add parallax effect to hero section on mouse move
    const heroSection = document.querySelector('.hidden.lg\\:flex');
    if (heroSection) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth - 0.5) * 20;
            const yPos = (clientY / innerHeight - 0.5) * 20;
            
            heroSection.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    }

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe social media links for animation
    document.querySelectorAll('.space-y-4 > a').forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        link.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(link);
    });

    // Add contact info animation
    const contactInfo = document.querySelector('.bg-white\\/10.backdrop-blur-md.rounded-xl.p-6');
    if (contactInfo) {
        contactInfo.style.opacity = '0';
        contactInfo.style.transform = 'translateY(20px)';
        contactInfo.style.transition = 'all 0.5s ease 0.5s';
        observer.observe(contactInfo);
    }

    // Add current year to footer
    const footer = document.querySelector('.text-gray-400.text-sm');
    if (footer && footer.textContent.includes('2024')) {
        const currentYear = new Date().getFullYear();
        footer.textContent = footer.textContent.replace('2024', currentYear);
    }

    // Add copy to clipboard functionality for contact info
    const contactItems = document.querySelectorAll('.space-y-2 p');
    contactItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check text-green-400"></i> <span>تم النسخ!</span>';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Add some utility functions
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('تم النسخ إلى الحافظة!');
    }).catch(() => {
        showNotification('فشل النسخ، يرجى المحاولة مرة أخرى', 'error');
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white font-medium z-50 transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    notification.textContent = message;
    notification.style.opacity = '0';
    notification.style.transform = 'translate(-50%, -20px)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translate(-50%, 0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translate(-50%, -20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}