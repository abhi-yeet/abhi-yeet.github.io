// Particle Animation
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numParticles = 50;

class Particle {
    constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = Math.random() < 0.3 ? "#08fdd8" : "rgba(255, 255, 255, 0.5)";
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off the edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particles
for (let i = 0; i < numParticles; i++) {
    let size = Math.random() * 3 + 1;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let speedX = (Math.random() - 0.5) * 1.5;
    let speedY = (Math.random() - 0.5) * 1.5;
    particlesArray.push(new Particle(x, y, size, speedX, speedY));
}

// Animation loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let particle of particlesArray) {
        particle.update();
        particle.draw();
    }

    requestAnimationFrame(animateParticles);
}

animateParticles();

// Resize canvas on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Typing effect
consoleText(["Hey, I'm Abhijit Suhas."], 'text', ['#08fdd8']);

function consoleText(words, id, colors) {
    if (colors === undefined) colors = ['#fff'];
    let visible = true;
    const con = document.getElementById('console');
    let letterCount = 1;
    let x = 1;
    let waiting = false;
    const target = document.getElementById(id);
    target.setAttribute('style', 'color:' + colors[0]);
    window.setInterval(function () {
        if (letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = words[0].substring(0, letterCount);
            window.setTimeout(function () {
                const usedColor = colors.shift();
                colors.push(usedColor);
                const usedWord = words.shift();
                words.push(usedWord);
                x = 1;
                target.setAttribute('style', 'color:' + colors[0]);
                letterCount += x;
                waiting = false;
            }, 1000);
        } else if (letterCount === words[0].length + 1 && waiting === false) {
            waiting = true;
            window.setTimeout(function () {
                x = -1;
                letterCount += x;
                waiting = false;
            }, 1000);
        } else if (waiting === false) {
            target.innerHTML = words[0].substring(0, letterCount);
            letterCount += x;
        }
    }, 120);
    window.setInterval(function () {
        if (visible === true) {
            con.className = 'console-underscore hidden';
            visible = false;
        } else {
            con.className = 'console-underscore';
            visible = true;
        }
    }, 400);
}

// 3D hover effect for profile image
jQuery(document).ready(function () {
    $('.profile-img').mousemove(function (e) {
        const rXP = (e.pageX - this.offsetLeft - $(this).width() / 2) / 20;
        const rYP = (e.pageY - this.offsetTop - $(this).height() / 2) / 20;
        $(this).css('transform', `rotateX(${rYP}deg) rotateY(${rXP}deg)`);
    });

    $('.profile-img').mouseleave(function () {
        $(this).css('transform', 'rotateX(0) rotateY(0)');
    });
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.fade-in').forEach((el) => {
    observer.observe(el);
});

// Hover effect for about profile image
const profileImage = document.querySelector('.about-profile-image');
if (profileImage) {
    profileImage.addEventListener('mousemove', (e) => {
        const rect = profileImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        profileImage.style.transform = `perspective(1000px) rotateX(${(y - rect.height/2)/20}deg) rotateY(${-(x - rect.width/2)/20}deg) scale(1.05)`;
    });

    profileImage.addEventListener('mouseleave', () => {
        profileImage.style.transform = 'perspective(1000px) rotateY(-5deg)';
    });
}

// Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gallery-dot');
    const prevBtn = document.querySelector('.gallery-btn.prev');
    const nextBtn = document.querySelector('.gallery-btn.next');
    const captions = [
        { title: "Project 1", description: "Description of project 1. Replace with your own text." },
        { title: "Project 2", description: "Description of project 2. Replace with your own text." },
        { title: "Project 3", description: "Description of project 3. Replace with your own text." },
        { title: "Project 4", description: "Description of project 4. Replace with your own text." },
        { title: "Project 5", description: "Description of project 5. Replace with your own text." }
    ];
    let slideInterval;

    // Function to update caption
    function updateCaption(index) {
        const captionTitle = document.querySelector('.gallery-caption h3');
        const captionDesc = document.querySelector('.gallery-caption p');
        
        if (captionTitle && captionDesc && captions[index]) {
            captionTitle.textContent = captions[index].title;
            captionDesc.textContent = captions[index].description;
        }
    }

    // Function to show a specific slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        updateCaption(currentSlide);
    }

    // Initialize first slide and caption
    showSlide(0);
    
    // Start slideshow
    function startSlideshow() {
        // Clear any existing interval
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        
        // Set new interval
        slideInterval = setInterval(() => {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }, 3500);
    }

    // Add click event to previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
            
            // Reset timer
            startSlideshow();
        });
    }

    // Add click event to next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
            
            // Reset timer
            startSlideshow();
        });
    }

    // Add click events to dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const dotIndex = parseInt(this.getAttribute('data-index'));
            showSlide(dotIndex);
            
            // Reset timer
            startSlideshow();
        });
    });

    // Start the slideshow
    startSlideshow();
});

// Skills section animation
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for skill bars
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate skill levels when they come into view
          entry.target.parentElement.querySelector('.skill-level').style.width = 
            entry.target.parentElement.querySelector('.skill-level').getAttribute('style').split(':')[1];
        }
      });
    }, { threshold: 0.5 });
  
    // Observe all skill bars
    document.querySelectorAll('.skill-bar').forEach((el) => {
      // Initially set width to 0
      el.querySelector('.skill-level').style.width = '0%';
      skillObserver.observe(el);
    });
    
    // Add hover effect for skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(8, 253, 216, 0.15)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 20px rgba(8, 253, 216, 0.1)';
      });
    });
  });

  // Skills section animation
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for skill bars
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate skill levels when they come into view
          const skillLevel = entry.target.querySelector('.skill-level');
          if (skillLevel) {
            const targetWidth = skillLevel.style.width;
            // First set to 0
            skillLevel.style.width = '0%';
            // Then animate to target width
            setTimeout(() => {
              skillLevel.style.width = targetWidth;
            }, 100);
          }
        }
      });
    }, { threshold: 0.5 });
  
    // Observe all skill bars
    document.querySelectorAll('.skill-bar').forEach((el) => {
      skillObserver.observe(el);
    });
  });
  