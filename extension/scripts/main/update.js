
// generate check update link
function generateCheckUpdateLink() {
	document.getElementById('check-update-btn').href = 'https://ataraxia.dongxing.xin/update.html?platform=' + CURRENT_BROWSER + '&current=' + CURRENT_VERSION + '&locale=' + CURRENT_LOCALE;
}

// -------------- EXEC ---------------

generateCheckUpdateLink();
