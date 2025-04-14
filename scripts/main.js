// Typing Effect
consoleText(["hey I'm Abhijit Suhas"], 'text', ['#08fdd8']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  let visible = true;
  const con = document.getElementById('console');
  let letterCount = 1;
  let x = 1;
  let waiting = false;
  const target = document.getElementById(id);
  target.setAttribute('style', 'color:' + colors[0]);
  
  setInterval(() => {
    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount);
      setTimeout(() => {
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
      setTimeout(() => {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000);
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount);
      letterCount += x;
    }
  }, 120);

  setInterval(() => {
    if (visible === true) {
      con.className = 'console-underscore hidden';
      visible = false;
    } else {
      con.className = 'console-underscore';
      visible = true;
    }
  }, 400);
}

// Profile Image Hover Effect
$(document).ready(() => {
  $('.profile-img').mousemove(function(e) {
    const rXP = (e.pageX - this.offsetLeft - $(this).width() / 2) / 20;
    const rYP = (e.pageY - this.offsetTop - $(this).height() / 2) / 20;
    $(this).css('transform', `rotateX(${rYP}deg) rotateY(${rXP}deg)`);
  });

  $('.profile-img').mouseleave(function() {
    $(this).css('transform', 'rotateX(0) rotateY(0)');
  });
});