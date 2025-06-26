const dateText = document.getElementById('date-text')

document.addEventListener('DOMContentLoaded', function() {
  fetch('../api/lastUpdate')
  .then(response => response.json())  // parse JSON from the response
  .then(lastPush => {
    const DateTime = luxon.DateTime;
    lastUpdate = DateTime.fromISO(lastPush).setLocale(locale).toLocaleString(DateTime.DATE_FULL);
    dateText.innerText = lastUpdate;
  })
  .catch(error => {
    console.error('Error fetching last update:', error);
  });
});