fetch('/api/syncDB')
  .then(response => response.json())  // parse JSON from the response
  .then(data => {
    console.log(data);
    const recentArticleList = document.getElementById('blogposts-box')
    data.forEach(element => {
      const recentArticle = document.createElement('div');
      recentArticle.classList.add('blogpost');
      const DateTime = luxon.DateTime;
      const date = DateTime.fromISO(element.date).setLocale(locale).toLocaleString(DateTime.DATE_MED);
      recentArticle.innerHTML = `<h5>${element.title}</h5>${date}${element.lead}<a href="">Read more <img src="/images/icons/arrow-small-right.svg" class="icon"></a>`;
      recentArticleList.append(recentArticle);
    });
  });