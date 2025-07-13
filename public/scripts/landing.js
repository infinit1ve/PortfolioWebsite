function shuffle(array) {
  // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

if(locale === "de") {
  var words = ["tue Dinge.", "lerne.", "chille.", "bastle.", "koche.", "code."];
  var welcomeText = ["Jetzt bist du schon mal hier &#8212; dann schau dich ruhig um.", "Schön, dass du hergefunden hast. Bleib doch ein bisschen und schau dich um.", "Na gut, jetzt wo du schon mal da bist &#8212; schau dich einfach um.", "Wenn du aus einem bestimmten Grund hier bist &#8212; ich hoffe, du findest, was du suchst."];
} else {
  var words = ["do stuff.", "learn.", "vibe.", "tinker.", "cook.", "code."];
  var welcomeText = ["You&#39;re here now &#8212; might as well see what&#39;s going on.", "Glad you wandered in. Stay a while, explore a bit.", "Well, now that you&#39;re here, take a look around.", "If you&#39;re here for a reason, I hope you find it."];
}

let currentWordList = shuffle(words);
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const textElement = document.getElementById("dynamic-verb-text");

function type() {
  const currentWord = currentWordList[wordIndex];
  const visibleText = currentWord.slice(0, charIndex);
  textElement.textContent = visibleText;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex++;
      if (wordIndex >= currentWordList.length) {
        currentWordList = shuffle(words); // reshuffle to keep things fresh
        wordIndex = 0;
      }
    }
    setTimeout(type, 1000);
  }
}

document.addEventListener("DOMContentLoaded", type())

const textWelcomeElement = document.getElementById("dynamic-welcome-text");

const textWelcomeElementShuffled = shuffle(welcomeText);
textWelcomeElement.innerHTML = textWelcomeElementShuffled[0];

iconBomb();

function iconBomb() {
  const icons = document.querySelectorAll('.about-section-decoration img');
  const positions = [];
  const spacing = window.innerWidth < 1023 ? window.innerHeight * 0.16 : window.innerWidth * 0.26; // Minimum distance in px between icons

  function isTooClose(x, y) {
    return positions.some(pos => {
      const dx = pos.x - x;
      const dy = pos.y - y;
      return Math.sqrt(dx * dx + dy * dy) < spacing;
    });
  }

  icons.forEach(icon => {
    const boundingBox = document.getElementById('about-section-decoration');
    const iconWidth = window.innerWidth < 1023 ? window.innerHeight * 0.06 + 5 : window.innerWidth * 0.04 + 5;
    const iconHeight = window.innerWidth < 1023 ? window.innerHeight * 0.06 + 5 : window.innerWidth * 0.04 + 5;
    let x, y;
    let attempts = 0;

    do {
      x = Math.random() * (boundingBox.clientWidth - iconWidth);
      y = Math.random() * (boundingBox.clientHeight - iconHeight);
      attempts++;
      if (attempts > 1000) break;
    } while (isTooClose(x, y));

    positions.push({ x, y });
    icon.style.position = 'absolute';
    icon.style.left = `${x}px`;
    icon.style.top = `${y}px`;
    const rotation = (Math.random() * 60) - 30; // gives -30 to +30
    icon.style.transform = `rotate(${rotation}deg)`;
    icon.style.zIndex = 1;
  });
}

if (locale === 'en') {
  fetch('/api/latestArticles')
  .then(response => response.json())  // parse JSON from the response
  .then(data => {
    const recentArticleList = document.getElementById('blogposts')
    data.forEach(element => {
      const recentArticle = document.createElement('div');
      recentArticle.classList.add('recent-blogpost');
      recentArticle.innerHTML = `<a style="color: var(--text);"href="/en/blog/${element.slug}"><h5>${element.title}</h5><p class="blogpost-details">${element.date}</p>${element.lead}<a href="/en/blog/${element.slug}">Read more <img src="/images/icons/arrow-small-right.svg" class="icon"></a></a>`;
      recentArticleList.append(recentArticle);
    });
  });
}