fetch('/api/syncDB')
  .then(response => response.json())  // parse JSON from the response
  .then(data => {
    const recentArticleList = document.getElementById('blogposts-box')
    data.forEach(element => {
      const recentArticle = document.createElement('div');
      recentArticle.classList.add('blogpost');
      recentArticle.innerHTML = `<h5>${element.title}</h5>${element.date}${element.lead}<a href="/en/blog/${element.slug}">Read more <img src="/images/icons/arrow-small-right.svg" class="icon"></a>`;
      recentArticleList.append(recentArticle);
    });
  });