fetch('/api/latestArticles')
  .then(response => response.json())  // parse JSON from the response
  .then(data => {
    const recentArticleList = document.getElementById('blogposts-box')
    data.forEach(element => {
      const recentArticle = document.createElement('div');
      recentArticle.classList.add('blogpost');
      recentArticle.innerHTML = `<h5>${element.title}</h5><p class="blogpost-date">${element.date}</p>${element.lead}<a href="/en/blog/${element.slug}">Read more <img src="/images/icons/arrow-small-right.svg" class="icon"></a>`;
      recentArticleList.append(recentArticle);
    });
  });

fetch('/api/getArticles')
  .then(response => response.json())  // parse JSON from the response
  .then(data => {
    
  });