
chrome.runtime.onInstalled.addListener(function (object) {
	if (chrome.runtime.OnInstalledReason.INSTALL === object.reason ) {
		chrome.tabs.create({url: "https://codingcat.cn/ataraxia/install.html?utm_medium=store&utm_source=" + chrome.i18n.getMessage("@@ui_locale")}, function (tab) {
	        console.log("New tab launched with https://codingcat.cn/ataraxia/install.html");
	    });
	}
});

chrome.runtime.setUninstallURL("https://codingcat.cn/ataraxia/uninstall.html");