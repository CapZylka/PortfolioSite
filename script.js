document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contact-form');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const header = document.querySelector('header');

    // Ustaw domyślny motyw na ciemny
    body.classList.add('dark-theme');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(contactForm);
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
                contactForm.reset();
            } else {
                alert('Ups! Coś poszło nie tak, spróbuj ponownie.');
            }
        }).catch(error => {
            alert('Ups! Coś poszło nie tak, spróbuj ponownie.');
        });
    });
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    // Intersection Observer API dla efektu pojawiania się/znikania
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.25,
        rootMargin: "0px 0px -100px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, appearOptions);
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
        }
        updateIcons();
    });
    // Update icons on load
    updateIcons();
    function updateIcons() {
        if (body.classList.contains('dark-theme')) {
            document.querySelector('.fa-moon').style.display = 'inline';
            document.querySelector('.fa-sun').style.display = 'none';
        } else {
            document.querySelector('.fa-moon').style.display = 'none';
            document.querySelector('.fa-sun').style.display = 'inline';
        }
    }

    // Show/hide header on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Scroll down
            header.classList.add('hidden');
        } else {
            // Scroll up
            header.classList.remove('hidden');
        }
        lastScrollTop = scrollTop;
    });
});