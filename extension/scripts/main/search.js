
// get search engine conf
var searchEngines = readConf('search_engine_list');

// get current search engine
function getCurrentEngineName() {
	return readConf('current_search_engine');
}

// save search engine into cookie
function setCurrentEngineName(newEngine) {
	writeConf('current_search_engine', newEngine);
}

// render engine html
function renderEngine(conf) {
	// set logo
	var search_logo = document.getElementById('search-logo');
	search_logo.src = conf['icon'];
	search_logo.style.cssText = conf['css_style'];

	// set form
	if (conf['action'] === 'chrome_search_api') {
		document.getElementById('search-form').removeAttribute('action');
	} else {
		document.getElementById('search-form').action = conf['action'];
	}
	// set input
	var search_input = document.getElementById('search-input');
	search_input.name = conf['param_name'];
	if (conf['action'] === 'chrome_search_api') {
		search_input.placeholder = i18n('search_placeholder') || 'Search';
	} else {
		search_input.placeholder = i18n('search_with_placeholder').replace('ENGINE', conf['name']);
	}
}

// switch to next search engine
function switchEngine(){
	var old_name = getCurrentEngineName();
	var conf = {};
	for (var i=0; i<searchEngines.length; i++) {
		if (searchEngines[i]['name'] == old_name) {
			if (i == searchEngines.length-1) {
				conf = searchEngines[0];
			}
			else {
				conf = searchEngines[i+1];
			}
			break;
		}
	}
	renderEngine(conf);
	setCurrentEngineName(conf['name']);
}

// initialize search engine when page load
function initEngine(){
	var old_name = getCurrentEngineName();
	var conf = null;
	for (var i=0; i<searchEngines.length; i++) {
		if (searchEngines[i]['name'] == old_name) {
			conf = searchEngines[i];
			break;
		}
	}
	if (conf == null) {
		// if current engine not exist in engine list, use the first one as current engine
		conf = searchEngines[0];
		setCurrentEngineName(conf['name']);
	}
	renderEngine(conf);
}

// set focus to search input text box
function focusOnSearchInput() {
	document.getElementById('search-input').focus();
}

// read conf and decide show/hide search box
function initSearchBoxDisplay() {
	var is_show = readConf('display_search_box');
	if (is_show == 'no') {
		document.getElementById('search-box-whole-block').style.display = 'none';
	} else {
		document.getElementById('search-box-whole-block').style.display = 'block';
	}
}

// handle form submit - use Chrome Search API for Default engine
function handleSearchSubmit(e) {
	if (getCurrentEngineName() === 'Default') {
		e.preventDefault();
		var query = document.getElementById('search-input').value.trim();
		if (query) {
			chrome.search.query({text: query, disposition: 'CURRENT_TAB'});
		}
	}
}

// --------------------------------------------------

// show/hide search box
initSearchBoxDisplay();

// bind switch logo function to logo
document.getElementById('search-logo').onclick = switchEngine;

// init engine
initEngine();

// bind form submit handler
document.getElementById('search-form').addEventListener('submit', handleSearchSubmit);

// bind body click focus event
document.getElementById('main-body').onclick = focusOnSearchInput;

