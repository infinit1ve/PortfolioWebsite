const dateText = document.getElementById('date-text');
const copyrightYearText = document.getElementById('copyright-year');

document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/lastUpdate')
  .then(response => response.json())  // parse JSON from the response
  .then(lastPush => {
    const DateTime = luxon.DateTime;
    const lastUpdate = DateTime.fromISO(lastPush).setLocale(locale).toLocaleString(DateTime.DATE_FULL);
    dateText.innerText = lastUpdate;
    const currentYear = DateTime.fromISO(lastPush).toFormat('yyyy');
    copyrightYearText.innerText = currentYear;
  })
  .catch(error => {
    console.error('Error fetching last update:', error);
  });
});