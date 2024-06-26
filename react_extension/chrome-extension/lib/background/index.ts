import 'webextension-polyfill';

console.log('background loaded');
console.log("Edit 'apps/chrome-extension/lib/background/index.ts' and save to reload.");

// functions executed onInstall and onUninstall

// on install
chrome.runtime.onInstalled.addListener(function (object) {
	// open manual link
	if (chrome.runtime.OnInstalledReason.INSTALL === object.reason ) {
		// open Welcome page
		chrome.tabs.create({url: "https://idealland.app/ataraxia/install.html?utm_medium=chrome&utm_source=" + navigator.language}, function (tab) {
	        console.log("New tab launched with https://idealland.app/ataraxia/install.html");
		});

	}
});

// on uninstall
chrome.runtime.setUninstallURL("https://idealland.app/ataraxia/uninstall.html?utm_medium=chrome&utm_source=" + navigator.language);
