document.addEventListener('DOMContentLoaded', function() {
  const takesList = document.querySelector('.takes-box');
  const takesSection = document.querySelector('.takes-section');
  const takes = [];

  fetch('../api/takes')
  .then(response => response.json())  // parse JSON from the response
  .then(data => {
    // Here, data is your actual JavaScript object or array
    for (let i = 0; i < data.results.length; i++) {
      let articleUrl = data.results[i].properties.Article?.url || ""
      let articleTitle = data.results[i].properties.Take.title?.[0]?.text?.content || ""
      let articleDE = data.results[i].properties.German.rich_text?.[0]?.text?.content || ""
      takes.push({ titleEN: `${articleTitle}`, titleDE: `${articleDE}`, url: `${articleUrl}`});
    }
    if (takesList && typeof takes !== 'undefined') {
      takesList.innerHTML = '';

      function splitArray(array, size) {
        let newArray = [];
        for(let i = 0; i < array.length; i += size) {
          if (array.slice(i + size, i + size * 2).length < size) {
            newArray.push(array.slice(i, i + size * 2));
            break
          } else {
            newArray.push(array.slice(i, i + size));
          };
        }
        return newArray;
      }

      function renderTakes() {
        splitArray(takes, 2).forEach((group, index) => {
          const strip = document.createElement('div');

          if (index % 2 === 0) {
            strip.classList.add('takes-left');
          } else {
            strip.classList.add('takes-right');
          }

          for (let i = 0; i < 6; i++) {
            group.forEach(take => {
              if (locale === 'de' && take.titleDE === '') {
                return;
              }
              const takeA = document.createElement('a');
              takeA.className = 'take';
              if (take.url) {
                takeA.href = take.url;
                if (locale === 'de') {
                  takeA.innerHTML = `${take.titleDE} <img src="../images/icons/arrow-small-right.svg" class="icon">`;
                } else {
                  takeA.innerHTML = `${take.titleEN} <img src="../images/icons/arrow-small-right.svg" class="icon">`;
                }
              } else {
                if (locale === 'de') {
                  takeA.innerHTML = `${take.titleDE}`;
                } else {
                  takeA.innerHTML = `${take.titleEN}`;
                }
              }
              strip.appendChild(takeA);
            });
          }

          takesList.appendChild(strip);
        });
      }

      shuffle(takes);
      renderTakes();

      const stripLeft = document.querySelectorAll('.takes-left');
      const stripRight = document.querySelectorAll('.takes-right');
      const speed = 0.7;
      
      stripLeft.forEach((strip) => {
        let position = 0;
        function animateLeft() {
          position -= speed;
          if (Math.abs(position) >= strip.scrollWidth / 2) {
            position = 0; // Reset when halfway through
          }
          strip.style.transform = `translateX(${position}px)`;
          requestAnimationFrame(animateLeft);
        }

        animateLeft();
      })
      
      stripRight.forEach((strip) => {
        let position = 0;
        function animateRight() {
          position += speed;
          if (Math.abs(position) >= strip.scrollWidth / 2) {
            position = 0; // Reset when halfway through
          }
          strip.style.transform = `translateX(${position}px)`;
          requestAnimationFrame(animateRight);
        }

        animateRight();
      })

    }
  })
  .catch(error => {
    console.error('Error fetching takes:', error);
    takesSection.innerHTML = '';
  });
});