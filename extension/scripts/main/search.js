
// get search engine conf
var searchEngines = readConf('search_engine_list');
if (searchEngines == null) {
	searchEngines = defaultSearchEngines;
	writeConf('search_engine_list', defaultSearchEngines);
}


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
	search_logo.style = conf['css_style'];
	
	// set form
	document.getElementById('search-form').action = conf['action'];
	// set input
	var search_input = document.getElementById('search-input');
	search_input.name = conf['param_name'];
	search_input.placeholder = i18n('search_with_placeholder').replace('ENGINE', conf['name']);
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

// --------------------------------------------------

// bind switch logo function to logo
document.getElementById('search-logo').onclick = switchEngine;

// init engine
initEngine();

// bind body click focus event
document.getElementById('main-body').onclick = focusOnSearchInput;


