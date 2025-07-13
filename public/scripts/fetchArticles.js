fetch('/api/latestArticles')
  .then(response => response.json())  // parse JSON from the response
  .then(data => {
    const recentArticleList = document.getElementById('blogposts-box')
    data.forEach(element => {
      const recentArticle = document.createElement('div');
      recentArticle.classList.add('blogpost');
      recentArticle.innerHTML = `<a style="color: var(--text);"href="/en/blog/${element.slug}"><h5>${element.title}</h5><p class="blogpost-date">${element.date}</p>${element.lead}<a href="/en/blog/${element.slug}">Read more <img src="/images/icons/arrow-small-right.svg" class="icon"></a></a>`;
      recentArticleList.append(recentArticle);
    });
  });

fetch('/api/getArticles')
  .then(response => response.json())  // parse JSON from the response
  .then(data => {
    const recentArticleList = document.getElementById('allblogposts-box')
    data.forEach(element => {
      const recentArticle = document.createElement('a');
      recentArticle.href = "/en/blog/" + element.slug;
      recentArticle.classList.add('blogpost-small');
      recentArticle.innerHTML = `<div>
            <h5>${element.title}</h5>
            <p class="blogpost-date">${element.date}</p>
            <p>${element.lead}</p>
          </div>
          <img class="icon" src="/images/icons/arrow-small-right.svg">`;
      recentArticleList.append(recentArticle);
    });
  });