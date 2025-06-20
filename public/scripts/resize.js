let lastWidth = window.innerWidth;

document.addEventListener("DOMContentLoaded", placeLogo());

window.addEventListener('resize', function() {
  const currentWidth = window.innerWidth;
  const path = window.location.pathname;
  if (currentWidth !== lastWidth) {
    placeLogo();
    if (path === `/${locale}/`) {
      iconBomb();
    }
    lastWidth = currentWidth;
  }
});

function placeLogo() {
  const logo = document.getElementById('logo');
  const viewport = document.documentElement.clientWidth;
  if (viewport >= 768) {
    logo.src = '/images/icons/infinitive/FullTextBlack.svg';
  } else {
      logo.src = '/images/icons/infinitive/GlyphBlack.svg';
  }
}