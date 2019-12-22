
// show new version prompt
function showFirstOpenPrompt() {
	spop('<h4 class="spop-title">' + i18n('you_have_updated_to_the_latest_version') + '</h4>' + i18n('update_content'), 'success');
}

function checkNewVersionPrompt() {
	var ver_mem = readConf('last_open_version');
	var ver = 0;
	if (ver_mem != null) {
		ver = parseFloat(ver_mem);
	}
	if (ver < parseFloat(manifestData.version)) {
		showFirstOpenPrompt();
		writeConf('last_open_version', manifestData.version);
	}
}

// generate check update link
function generateCheckUpdateLink() {
	document.getElementById('check-update-btn').href = 'https://codingcat.cn/ataraxia/update.html?current=' + CURRENT_VERSION + '&locale=' + CURRENT_LOCALE;
}


// -------------- EXEC ---------------

checkNewVersionPrompt();

generateCheckUpdateLink();
