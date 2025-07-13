const searchField = document.getElementById('search-input');

function searchBlog() {
  const query = searchField.value;
  if (query) {
    window.location.href = `/en/blog/search?query=${encodeURIComponent(query)}`;
  }
};

searchField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchBlog();
  }
});