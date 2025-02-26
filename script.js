// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animate sections on scroll
document.querySelectorAll('section').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
        }
    });
});

// Animate skill bars
document.querySelectorAll('.progress').forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    gsap.to(bar, {
        width: progress + '%',
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: bar,
            start: "top 80%"
        }
    });
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize EmailJS with your User ID
emailjs.init('eQiSg4tj9cFcSEDxD');

// Contact form submission with EmailJS
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = {
        name: this.querySelector('input[name="name"]').value,
        email: this.querySelector('input[name="email"]').value,
        message: this.querySelector('textarea[name="message"]').value
    };
    emailjs.send('service_fqgog8e', 'template_oit7mjl', formData)
        .then(() => {
            const responseDiv = document.getElementById('formResponse');
            responseDiv.textContent = 'Message sent successfully!';
            responseDiv.style.color = '#28a745';
            this.reset();
            setTimeout(() => {
                responseDiv.textContent = '';
            }, 3000);
        }, (error) => {
            const responseDiv = document.getElementById('formResponse');
            responseDiv.textContent = 'Failed to send message. Try again.';
            responseDiv.style.color = '#dc3545';
            console.error('EmailJS error:', error);
        });
});

// Enhance hero glitch effect
const glitchText = document.querySelector('.glitch');
glitchText.addEventListener('mouseover', () => {
    gsap.to(glitchText, {
        x: 'random(-5, 5)',
        y: 'random(-5, 5)',
        duration: 0.1,
        repeat: 5,
        ease: 'power1.inOut'
    });
});

// Fetch Lambda response on page load
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://n7lxu4lwph.execute-api.us-east-1.amazonaws.com/prod/profile')
        .then(response => response.json())
        .then(data => {
            const bodyData = JSON.parse(data.body);
            document.getElementById('formResponse').innerHTML = `From Lambda: ${bodyData.message}`;
        })
        .catch(error => console.error('Error:', error));
});
