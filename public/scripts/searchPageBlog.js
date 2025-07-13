const searchField = document.getElementById('search-input');
const params = new URLSearchParams(window.location.search);
const query = params.get('query');

fetch(`/api/searchBlog/?query=${encodeURIComponent(query)}`)
  .then(response => response.json())  // parse JSON from the response
  .then(data => {
    const resultList = document.getElementById('results')
    data.forEach(element => {
      const result = document.createElement('div');
      result.classList.add('blogpost');
      result.innerHTML = `<a style="color: var(--text);"href="/en/blog/${element.slug}"><h5>${element.title}</h5><p class="blogpost-date">${element.date}</p>${element.lead}<br><a href="/en/blog/${element.slug}">Read more <img src="/images/icons/arrow-small-right.svg" class="icon"></a></a>`;
      resultList.append(result);
    });
  });

document.addEventListener('DOMContentLoaded', function() {
  searchField.value = query;
});

function searchBlog() {
  const query = searchField.value;
  if (query) {
    window.location.href = `/en/blog/search?query=${query}`;
  }
};

searchField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchBlog();
  }
});