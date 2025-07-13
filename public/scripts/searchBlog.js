const searchField = document.getElementById('search-input');

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

// SELECT * FROM articles
// WHERE title ILIKE '%coffee%'
// OR content ILIKE '%coffee%'
// LIMIT 10;