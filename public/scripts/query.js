document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const msgid = params.get('msg');
  const msgBox = document.getElementById('message');
  const msgMap = {
    en: {
      '4460': `<p>You scanned my card! Feel free to explore or reach out at <a href="mailto:contact@infinitive.cc">contact@infinitive.cc</a></p>`,
      '5658': `<p>You probably came here for my CV &#8212; everything you need is <a href="/en/CV.pdf">here</a>!</p>`,
      '7426': `<p>Found something I made? This is where it all ties together</p>`,
      '3267': `<p>Es tut mir Leid, aber der Blog ist derzeit nur auf Englisch verfügbar</p>`
    },
    de: {
      '4460': `<p>Du hast meine Visitenkarte gescannt! Schau dich um oder kontaktiere mich unter <a href="mailto:contact@infinitive.cc">contact@infinitive.cc</a></p>`,
      '5658': `<p>Sie sind wahrscheinlich wegen meines Lebenslaufs hierher gekommen &#8212; alles, was Sie brauchen, ist <a href="/de/Lebenslauf.pdf">hier</a>!</p>`,
      '7426': `<p>Hast du etwas gefunden, das ich gemacht habe? Hier kommt alles zusammen</p>`,
      '3267': `<p>Es tut mir Leid, aber der Blog ist derzeit nur auf Englisch verfügbar</p>`
    }
  }

  if (msgid) {
    msgBox.innerHTML = msgMap[`${locale}`][`${msgid}`];
    msgBox.style.display = "";
  } else {
    msgBox.innerHTML = ``;
    msgBox.style.display = "";
  }
});