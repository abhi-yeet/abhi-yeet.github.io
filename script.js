const text = "Hi, I'm Abhijit.";
const typedTextElement = document.getElementById('typed-text');

let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 60;
const pauseBeforeDelete = 2000;
const pauseBeforeType = 500;

function type() {
    if (!isDeleting) {
        // Typing
        typedTextElement.textContent = text.substring(0, charIndex);
        charIndex++;

        if (charIndex > text.length) {
            // Finished typing, pause then start deleting
            isDeleting = true;
            setTimeout(type, pauseBeforeDelete);
            return;
        }
        setTimeout(type, typingSpeed);
    } else {
        // Deleting
        typedTextElement.textContent = text.substring(0, charIndex);
        charIndex--;

        if (charIndex < 0) {
            // Finished deleting, pause then start typing
            isDeleting = false;
            charIndex = 0;
            setTimeout(type, pauseBeforeType);
            return;
        }
        setTimeout(type, deletingSpeed);
    }
}

// Start the animation
type();
