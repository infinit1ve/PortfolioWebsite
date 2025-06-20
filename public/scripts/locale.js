const localeSelector = document.getElementById("localeSelector");
const locale = localeSelector.value;
const currentURI = window.location.pathname + window.location.search;

localeSelector.addEventListener('change', function() {
    window.location.href = `/${this.value}/${currentURI.slice(4)}`;
});