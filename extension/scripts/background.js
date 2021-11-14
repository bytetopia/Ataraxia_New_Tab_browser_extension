// functions executed onInstall and onUninstall

// on install
chrome.runtime.onInstalled.addListener(function (object) {
	// open manual link
	if (chrome.runtime.OnInstalledReason.INSTALL === object.reason ) {
		// open Welcome page
		chrome.tabs.create({url: "https://ataraxia.dongxing.xin/install.html?utm_medium=chrome&utm_source=" + navigator.language}, function (tab) {
	        console.log("New tab launched with https://ataraxia.dongxing.xin/install.html");
		});

	}
});

// on uninstall
chrome.runtime.setUninstallURL("https://ataraxia.dongxing.xin/uninstall.html?utm_medium=chrome&utm_source=" + navigator.language);
