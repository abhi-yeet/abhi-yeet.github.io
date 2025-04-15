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
    
    // CV download button animation
    const cvButton = document.querySelector('.cv-download-btn');
    if (cvButton) {
        // Add pulse animation on page load
        const cvObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a subtle pulse animation when the button comes into view
                    cvButton.style.animation = 'pulse 2s infinite';
                    
                    // Add keyframes for pulse animation if not already in the document
                    if (!document.querySelector('style#cv-animations')) {
                        const style = document.createElement('style');
                        style.id = 'cv-animations';
                        style.textContent = `
                            @keyframes pulse {
                                0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(8, 253, 216, 0.4); }
                                70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(8, 253, 216, 0); }
                                100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(8, 253, 216, 0); }
                            }
                            
                            @keyframes downloadStart {
                                0% { transform: translateY(0); }
                                50% { transform: translateY(5px); }
                                100% { transform: translateY(0); }
                            }
                        `;
                        document.head.appendChild(style);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        cvObserver.observe(cvButton);
        
        // Add click animation
        cvButton.addEventListener('click', function() {
            // Change the icon to indicate download started
            const downloadIcon = this.querySelector('.download-icon');
            if (downloadIcon) {
                downloadIcon.textContent = '✓';
                downloadIcon.style.color = '#08fdd8';
                
                // Add a download animation
                this.style.animation = 'downloadStart 0.5s ease';
                
                // Reset after animation completes
                setTimeout(() => {
                    downloadIcon.textContent = '↓';
                    this.style.animation = 'pulse 2s infinite';
                }, 2000);
            }
        });
        
        // Stop the pulse animation on hover and replace with the hover effect
        cvButton.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
        });
        
        // Resume the pulse animation when not hovering
        cvButton.addEventListener('mouseleave', function() {
            this.style.animation = 'pulse 2s infinite';
        });
    }
});

// Add this to your existing script.js file
document.addEventListener('DOMContentLoaded', function() {
    const cvButton = document.querySelector('.cv-download-btn');
    
    if (cvButton) {
        cvButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default download behavior
            
            // Open PDF in new tab
            window.open(this.getAttribute('href'), '_blank');
        });
    }
});

// User Interaction Tracking System
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tracking system
    initializeTrackingSystem();
    
    // Log initial page view
    logPageView();
  });
  
  function initializeTrackingSystem() {
    // Track all click events
    document.addEventListener('click', function(event) {
      logClickEvent(event);
    }, true); // Use capture phase to catch all events
    
    // Track element visibility for page views
    setupVisibilityTracking();
  }
  
  function logClickEvent(event) {
    const timestamp = new Date().getTime();
    const eventType = 'click';
    const targetElement = event.target;
    
    // Determine the type of element clicked
    let elementType = getElementType(targetElement);
    
    // Log to console in the required format
    console.log(`${timestamp}, ${eventType}, ${elementType}`);
  }
  
  function logPageView() {
    const timestamp = new Date().getTime();
    const eventType = 'view';
    const elementType = 'page';
    
    // Log to console in the required format
    console.log(`${timestamp}, ${eventType}, ${elementType}`);
  }
  
  function setupVisibilityTracking() {
    // Use Intersection Observer to track when elements come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const timestamp = new Date().getTime();
          const eventType = 'view';
          const elementType = getElementType(entry.target);
          
          // Log to console in the required format
          console.log(`${timestamp}, ${eventType}, ${elementType}`);
          
          // Once logged, stop observing this element
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 }); // Element is considered visible when 50% is in viewport
    
    // Track visibility of important elements
    const elementsToTrack = [
      // Profile section
      document.querySelector('.profile-img'),
      document.querySelector('.about-profile-image'),
      document.querySelector('.about-text'),
      
      // Gallery section
      document.querySelector('.gallery-container'),
      ...Array.from(document.querySelectorAll('.gallery-slide')),
      
      // Education section
      ...Array.from(document.querySelectorAll('.education-subsection')),
      
      // Skills section
      document.querySelector('.skills-container'),
      ...Array.from(document.querySelectorAll('.skill-card')),
      
      // CV section
      document.querySelector('.cv-container')
    ].filter(element => element !== null); // Filter out any null elements
    
    // Start observing each element
    elementsToTrack.forEach(element => {
      observer.observe(element);
    });
  }
  
  function getElementType(element) {
    // Check for specific elements based on classes, IDs, or tag names
    
    // Check for profile image
    if (element.classList.contains('profile-img') || element.classList.contains('about-profile-image')) {
      return 'profile-image';
    }
    
    // Check for gallery images
    if (element.classList.contains('gallery-slide')) {
      return 'gallery-image';
    }
    
    // Check for gallery navigation
    if (element.classList.contains('gallery-btn')) {
      return element.classList.contains('prev') ? 'gallery-prev-button' : 'gallery-next-button';
    }
    
    if (element.classList.contains('gallery-dot')) {
      return 'gallery-navigation-dot';
    }
    
    // Check for skill cards
    if (element.classList.contains('skill-card')) {
      const skillName = element.querySelector('.skill-name');
      return skillName ? `skill-card-${skillName.textContent}` : 'skill-card';
    }
    
    // Check for CV download button
    if (element.classList.contains('cv-download-btn')) {
      return 'cv-download-button';
    }
    
    // Check for navigation links
    if (element.tagName === 'A' && element.parentElement.tagName === 'NAV') {
      return `navigation-link-${element.textContent.trim()}`;
    }
    
    // Check for text paragraphs
    if (element.tagName === 'P') {
      const parentSection = getParentSection(element);
      return `text-paragraph-in-${parentSection}`;
    }
    
    // Default: use tag name and any available identifier
    let elementType = element.tagName.toLowerCase();
    
    if (element.id) {
      elementType += `#${element.id}`;
    } else if (element.className) {
      elementType += `.${element.className.split(' ')[0]}`;
    }
    
    return elementType;
  }
  
  function getParentSection(element) {
    // Find the parent section of an element
    let current = element;
    while (current && current !== document.body) {
      if (current.tagName === 'SECTION' && current.id) {
        return current.id;
      }
      current = current.parentElement;
    }
    return 'unknown-section';
  }

  // Text Analyzer Functionality
document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const textInput = document.getElementById('text-input');
    const resultsContainer = document.querySelector('.analyzer-results');
    
    // Lists of pronouns, prepositions, and indefinite articles
    const pronouns = [
      'i', 'me', 'my', 'mine', 'myself',
      'you', 'your', 'yours', 'yourself', 'yourselves',
      'he', 'him', 'his', 'himself',
      'she', 'her', 'hers', 'herself',
      'it', 'its', 'itself',
      'we', 'us', 'our', 'ours', 'ourselves',
      'they', 'them', 'their', 'theirs', 'themselves',
      'who', 'whom', 'whose', 'which', 'what',
      'this', 'that', 'these', 'those'
    ];
    
    const prepositions = [
      'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among',
      'around', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between',
      'beyond', 'by', 'concerning', 'considering', 'despite', 'down', 'during',
      'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'near', 'of', 'off',
      'on', 'onto', 'out', 'outside', 'over', 'past', 'regarding', 'round', 'since',
      'through', 'throughout', 'to', 'toward', 'under', 'underneath', 'until', 'unto',
      'up', 'upon', 'with', 'within', 'without'
    ];
    
    const indefiniteArticles = ['a', 'an'];
    
    if (analyzeBtn && textInput) {
      analyzeBtn.addEventListener('click', function() {
        const text = textInput.value;
        
        if (text.trim().length === 0) {
          alert('Please enter some text to analyze.');
          return;
        }
        
        // Calculate basic statistics
        const basicStats = calculateBasicStats(text);
        displayBasicStats(basicStats);
        
        // Tokenize and analyze text
        const words = tokenizeText(text);
        
        // Count pronouns
        const pronounCounts = countWordsByCategory(words, pronouns);
        displayWordCounts(pronounCounts, 'pronoun-stats', 'Pronoun');
        
        // Count prepositions
        const prepositionCounts = countWordsByCategory(words, prepositions);
        displayWordCounts(prepositionCounts, 'preposition-stats', 'Preposition');
        
        // Count indefinite articles
        const articleCounts = countWordsByCategory(words, indefiniteArticles);
        displayWordCounts(articleCounts, 'article-stats', 'Article');
        
        // Show results with animation
        resultsContainer.classList.add('show');
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
    
    function calculateBasicStats(text) {
      const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
      const wordCount = (text.match(/\b\w+\b/g) || []).length;
      const spaceCount = (text.match(/\s/g) || []).length;
      const newlineCount = (text.match(/\n/g) || []).length;
      const specialSymbolCount = (text.match(/[^\w\s]/g) || []).length;
      
      return {
        letters: letterCount,
        words: wordCount,
        spaces: spaceCount,
        newlines: newlineCount,
        specialSymbols: specialSymbolCount
      };
    }
    
    function tokenizeText(text) {
      // Convert to lowercase and split by non-word characters
      return text.toLowerCase()
        .match(/\b\w+\b/g) || [];
    }
    
    function countWordsByCategory(words, categoryWords) {
      const counts = {};
      
      // Initialize counts for all category words
      categoryWords.forEach(word => {
        counts[word] = 0;
      });
      
      // Count occurrences
      words.forEach(word => {
        if (categoryWords.includes(word.toLowerCase())) {
          counts[word.toLowerCase()]++;
        }
      });
      
      // Filter out words with zero count
      const filteredCounts = {};
      Object.keys(counts).forEach(word => {
        if (counts[word] > 0) {
          filteredCounts[word] = counts[word];
        }
      });
      
      return filteredCounts;
    }
    
    function displayBasicStats(stats) {
      const container = document.getElementById('basic-stats');
      if (!container) return;
      
      container.innerHTML = '';
      
      const statItems = [
        { label: 'Letters', value: stats.letters },
        { label: 'Words', value: stats.words },
        { label: 'Spaces', value: stats.spaces },
        { label: 'Newlines', value: stats.newlines },
        { label: 'Special Symbols', value: stats.specialSymbols }
      ];
      
      statItems.forEach(item => {
        const statElement = document.createElement('div');
        statElement.className = 'stat-item';
        statElement.innerHTML = `
          <span class="stat-label">${item.label}:</span>
          <span class="stat-value">${item.value}</span>
        `;
        container.appendChild(statElement);
      });
    }
    
    function displayWordCounts(counts, containerId, categoryName) {
      const container = document.getElementById(containerId);
      if (!container) return;
      
      container.innerHTML = '';
      
      // Check if there are any counts to display
      if (Object.keys(counts).length === 0) {
        container.innerHTML = `<p>No ${categoryName.toLowerCase()}s found in the text.</p>`;
        return;
      }
      
      // Create table
      const table = document.createElement('table');
      table.className = `${categoryName.toLowerCase()}-table`;
      
      // Add table header
      const thead = document.createElement('thead');
      thead.innerHTML = `
        <tr>
          <th>${categoryName}</th>
          <th>Count</th>
        </tr>
      `;
      table.appendChild(thead);
      
      // Add table body
      const tbody = document.createElement('tbody');
      
      // Sort by count (descending)
      const sortedWords = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
      
      sortedWords.forEach(word => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${word}</td>
          <td>${counts[word]}</td>
        `;
        tbody.appendChild(row);
      });
      
      table.appendChild(tbody);
      container.appendChild(table);
    }
    
    // Add animation for the analyze button
    const analyzeButton = document.querySelector('.analyze-btn');
    if (analyzeButton) {
      analyzeButton.addEventListener('mouseenter', function() {
        this.querySelector('.analyze-icon').textContent = '🔍';
      });
      
      analyzeButton.addEventListener('mouseleave', function() {
        this.querySelector('.analyze-icon').textContent = '⚡';
      });
    }
  });
  