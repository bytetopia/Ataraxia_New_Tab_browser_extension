
// generate check update link
function generateCheckUpdateLink() {
	document.getElementById('check-update-btn').href = 'https://idealland.app/ataraxia/update.html?platform=' + CURRENT_BROWSER + '&current=' + CURRENT_VERSION + '&locale=' + CURRENT_LOCALE;
}

// -------------- EXEC ---------------

generateCheckUpdateLink();
