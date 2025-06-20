const localeSelector = document.getElementById("localeSelector");
const locale = localeSelector.value;

localeSelector.addEventListener('change', function() {
    window.location.href = `/${this.value}/`;
});