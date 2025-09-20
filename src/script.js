
const controller = new ScrollMagic.Controller();


document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
     
    });
});


const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) { 
            current = '#' + section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
});


gsap.from('#about h1, #about .subtitle, #about img, #about p, #about .btn', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out',
    delay: 0.3 // Added initial delay
});


document.querySelectorAll('.skill-item').forEach(skill => {
    const progressBar = skill.querySelector('.progress-bar div');
    const progressValue = progressBar.getAttribute('data-progress'); 
    new ScrollMagic.Scene({
        triggerElement: skill,
        triggerHook: 0.8, 
        reverse: false 
    })
    .setTween(gsap.to(progressBar, {
        width: `${progressValue}%`,
        duration: 1.2,
        ease: 'power2.out'
    }))
    .addTo(controller);
});

// --- Project data ---
const projects = [
    {
        title: 'VetPawtner',
        description: 'A petcare web app designed for pet lovers. It is a One-step solution for pet lovers, including pet products, salon, pet clinic, stray dog funding, events, pet selling, and payments, etc.',
        image: 'Images/project2.png',
        link: 'https://example.com', 
        github: 'https://github.com/nikki12g/VetPawTner.git'
    },
    {
        title: 'Uplifting Farmers from present eco-system',
        description: 'Android app that provides farmer door-step services including educating about fertilizers, machinery, soil testing, and planting. Farmers can sell their produce on our platform and benefit from it.',
        image: 'Images/project1.png',
        link: 'https://capstone-project-uplifting-farmers.vercel.app/', 
        github: 'https://github.com/sanjayverma1234/CAPSTONE-PROJECT--Uplifting-farmers-from-present-ecosystem'
    }
];
const projectsContainer = document.querySelector('.projects-container');
projects.forEach((project, index) => {
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <div class="project-card-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-links">
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" aria-label="Live Demo of ${project.title}">Live Demo <i class="fas fa-external-link-alt"></i></a>
                <a href="${project.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository for ${project.title}">GitHub <i class="fab fa-github"></i></a>
            </div>
        </div>
    `;
    projectsContainer.appendChild(card);

 
    new ScrollMagic.Scene({
        triggerElement: card,
        triggerHook: 0.8,
        reverse: false 
    })
    .setTween(gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power2.out',
        delay: index * 0.1 
    }))
    .addTo(controller);
});


new ScrollMagic.Scene({
    triggerElement: '#contact',
    triggerHook: 0.8,
    reverse: false 
})
.setTween(gsap.from('#contact form > *, #contact .social-links a', { // Include social links
    opacity: 0,
    x: -50,
    duration: 0.8,
    stagger: 0.15, 
    ease: 'power2.out'
}))
.addTo(controller);

// --- Contact form submission with EmailJS ---
// Ensure you have replaced 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID'
emailjs.init('XyWZcO4HyPqj4EjsV'); // Replace with your EmailJS Public Key (User ID)
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const sendButton = form.querySelector('button[type="submit"]');
    sendButton.textContent = 'Sending...';
    sendButton.disabled = true;

    emailjs.sendForm('service_u9nqdmu', 'template_f0lw8ub', form) 
        .then(() => {
            alert('Message sent successfully!');
            form.reset();
            sendButton.textContent = 'Send Message';
            sendButton.disabled = false;
        }, (error) => {
            alert('Failed to send message: ' + JSON.stringify(error));
            sendButton.textContent = 'Send Message';
            sendButton.disabled = false;
        });
});

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        document.body.classList.remove('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}


const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme || 'light'); 

themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});


const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let userInput = [];
document.addEventListener('keydown', e => {
    userInput.push(e.key);
   
    if (userInput.length > konamiCode.length) {
        userInput.shift();
    }

    if (userInput.join('') === konamiCode.join('')) { 
        gsap.to(document.documentElement, {
            '--konami-bg': 'linear-gradient(45deg, #ff0000, #0000ff)', // Animate CSS variable
            duration: 2,
            onComplete: () => {
                alert('Konami Code Activated! Feast your eyes on this gradient!');
            }
        });
        userInput = []; 
    }
});


document.getElementById('current-year').textContent = new Date().getFullYear();

