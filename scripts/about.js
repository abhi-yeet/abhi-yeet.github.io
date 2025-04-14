// About Section Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Timeline Node Hover Effects
    document.querySelectorAll('.timeline-node').forEach(node => {
      node.addEventListener('mouseenter', () => {
        node.querySelector('.node-glow').style.opacity = '1';
      });
      
      node.addEventListener('mouseleave', () => {
        node.querySelector('.node-glow').style.opacity = '0';
      });
    });
  
    // Random Hologram Text Animation
    const hologramLines = document.querySelectorAll('.hologram-line');
    setInterval(() => {
      hologramLines.forEach(line => {
        line.style.textShadow = `
          0 0 ${Math.random() * 10 + 5}px rgba(8, 253, 216, ${Math.random() * 0.5 + 0.3})
        `;
      });
    }, 300);
  });