document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Scroll Reveal Animations
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

        revealEls.forEach(el => observer.observe(el));
    }

    // 3. Email Copy Functionality with Toast
    const copyButtons = document.querySelectorAll('[data-copy-email]');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = 'emrebusiness@atomicmail.io';
            navigator.clipboard.writeText(email).then(() => {
                showToast('Copied emrebusiness@atomicmail.io to clipboard!');
            }).catch(err => {
                showToast('Email: emrebusiness@atomicmail.io');
            });
        });
    });

    // 4. Project Category Filtering (Monochrome Theme)
    const filterBtns = document.querySelectorAll('[data-filter]');
    const projectCards = document.querySelectorAll('[data-category]');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Toggle active state on monochrome buttons
            filterBtns.forEach(b => {
                b.classList.remove('bg-white', 'text-black', 'border-white', 'font-bold');
                b.classList.add('bg-white/5', 'text-neutral-400', 'border-white/10');
            });
            btn.classList.remove('bg-white/5', 'text-neutral-400', 'border-white/10');
            btn.classList.add('bg-white', 'text-black', 'border-white', 'font-bold');

            // Filter project cards
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px) scale(0.98)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 5. Interactive Contact Form Submission Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const nameInput = document.getElementById('form-name');
            const emailInput = document.getElementById('form-email');
            const messageInput = document.getElementById('form-message');

            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                showToast('Please fill out all fields before sending.');
                return;
            }

            // Simulated send state
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin inline mr-2"></i> Sending...`;
            if (window.lucide) lucide.createIcons();

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<i data-lucide="check" class="w-4 h-4 inline mr-2"></i> Message Sent!`;
                if (window.lucide) lucide.createIcons();
                showToast('Thank you! Your message has been sent to Emre.');

                // Reset form
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    if (window.lucide) lucide.createIcons();
                }, 4000);
            }, 1200);
        });
    }
});

// Toast Helper - Monochrome
function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'glass-card px-5 py-3 rounded-xl border border-white/30 text-xs font-mono tracking-wider flex items-center gap-3 text-white shadow-2xl';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `<i data-lucide="info" class="w-4 h-4 text-white"></i> ${message}`;
    if (window.lucide) lucide.createIcons();

    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}
