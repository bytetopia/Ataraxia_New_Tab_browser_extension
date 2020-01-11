

function buildTopSitesList(mostVisitedURLs) {
	var popupDiv = document.getElementById('top-sites-div');	
	var ul = popupDiv.appendChild(document.createElement('ul'));	

	for (var i = 0; i < mostVisitedURLs.length; i++) {	
		var li = ul.appendChild(document.createElement('li'));	
		var a = li.appendChild(document.createElement('a'));	
		a.href = mostVisitedURLs[i].url;	
		a.title = mostVisitedURLs[i].url;	
		a.appendChild(document.createTextNode(mostVisitedURLs[i].title));	
	}
	popupDiv.appendChild(document.createElement('hr'));	
}	

// read top sites and show it in page
function showTopSites() {
	chrome.topSites.get(buildTopSitesList);
}

// init topSites 
function initTopSites() {
	// check switch
	if (readConf('show_top_sites') == 'yes') {
		// check permission
		chrome.permissions.contains({permissions:['topSites']}, function(result) {
			if (result) {
				// if have permission
				showTopSites();
			} else {
				// if no permission
				writeConf('show_top_sites', 'no');
			}
		});
	}	
	
}

// load custom bookmarks
function initCustomBookmarks() {
	var bookmarks = readConf('custom_bkmk_list');
	if (bookmarks != null && bookmarks.length > 0) {
		var popupDiv = document.getElementById('top-sites-div');	
		var ul = popupDiv.appendChild(document.createElement('ul'));	
		for (var i = 0; i < bookmarks.length; i++) {	
			var li = ul.appendChild(document.createElement('li'));	
			var a = li.appendChild(document.createElement('a'));	
			a.href = bookmarks[i].url;	
			a.title = bookmarks[i].url;	
			a.appendChild(document.createTextNode(bookmarks[i].name));	
		}	
		popupDiv.appendChild(document.createElement('hr'));	
	}
}


// --------------------------------------------------

initTopSites();

initCustomBookmarks();



