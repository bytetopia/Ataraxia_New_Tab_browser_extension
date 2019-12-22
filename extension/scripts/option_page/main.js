
// javascript code for option operations in OPTIONS page


// search engine settings

function initSearchEngineConf() {
	document.getElementById('search-engine-textarea').value = JSON.stringify(readConf('search_engine_list'), null, 4);
}

function changeSearchEngineConf() {
	var newConf = document.getElementById('search-engine-textarea').value;
	// check validaty 
	var obj = null;
	try {
		obj = JSON.parse(newConf);
		writeConf('search_engine_list', obj);
		alert(i18n('op_saved_alert'));
	} 
	catch (e) {
		alert(i18n('op_bad_json_alert') +'\n' + e);
	}
}

function recoverDefaultSearchEngineConf() {
	var cfm = confirm(i18n('op_reset_default_confirm_alert'));
	if (cfm == true) {
		writeConf('search_engine_list', defaultSearchEngines);
		document.getElementById('search-engine-textarea').value = JSON.stringify(defaultSearchEngines, null, 4);
		alert(i18n('op_reset_default_done_alert'));
	}
}


// quick link settings

// top sites

function initTopSitesBtn() {
	// check permission
	chrome.permissions.contains({
		permissions: ['topSites']
	}, function(result) {
		var show_top_sites = readConf('show_top_sites');
		var close_btn = document.getElementById('close-top-sites-btn');
		var open_btn = document.getElementById('open-top-sites-btn');
		if (result) {
	      // The extension has the permissions.
	      if (show_top_sites == 'yes') {
	      	open_btn.style.display = 'none';
	      }
	      else {
	      	close_btn.style.display = 'none';
	      }
		} else {
	      // The extension doesn't have the permissions.
	      if (show_top_sites == 'no') {
	      	close_btn.style.display = 'none';
	      }
	      else {
	      	// no permission, but config is open. this is not a normal status
	      	// change conf
	      	writeConf('show_to_sites', 'no');
	      	// show open btn, hide close btn
	      	close_btn.style.display = 'none';
	      }
	    }
	});
}

function openTopSites() {
	// check permission
	chrome.permissions.contains({
		permissions: ['topSites']
	}, function(result) {
		var show_top_sites = readConf('show_top_sites');
		var close_btn = document.getElementById('close-top-sites-btn');
		var open_btn = document.getElementById('open-top-sites-btn');
		if (result) {
	      // The extension has the permissions.
	        writeConf('show_top_sites', 'yes');
	      	open_btn.style.display = 'none';
	      	close_btn.style.display = 'inline-block';

		} else {
	      // The extension doesn't have the permissions.
	      // ask for permission
	      var cfm = confirm(i18n('op_top_site_require_perm'));
	      if (cfm == true) {
	      	chrome.permissions.request({
	          permissions: ['topSites']
	        }, function(granted) {
	          // The callback argument will be true if the user granted the permissions.
	          if (granted) {
	            writeConf('show_top_sites', 'yes');
		      	open_btn.style.display = 'none';
		      	close_btn.style.display = 'inline-block';
	          } else {
	            // do nothing
	            alert(i18n('op_top_site_perm_fail'));
	          }
	        });
	      }
	    }
	});
}

function closeTopSites() {
	// remove premission 
	chrome.permissions.remove({
		permissions: ['topSites']
	}, function(removed) {
		if (removed) {
			writeConf('show_top_sites', 'no');
			document.getElementById('close-top-sites-btn').style.display = 'none';
			document.getElementById('open-top-sites-btn').style.display = 'inline-block';
		} else {
          // The permissions have not been removed (e.g., you tried to remove
          // required permissions).
      }
  });
}

// custom bookmarks 

var defaultCustomBookmarks = [
	{
		name: "Ataraxia Settings",
		url: "./options.html"
	},
	{
		name: "Ataraxia Website",
		url: "https://codingcat.cn/ataraxia/"
	}
]

function initCustomBookmarks() {
	var conf = readConf('custom_bkmk_list');
	if (conf == null) {
		conf = defaultCustomBookmarks;
	}
	document.getElementById('custom-bkmk-textarea').value = JSON.stringify(conf, null, 4);
}

function saveCustomBookmarks() {
	var newConf = document.getElementById('custom-bkmk-textarea').value;
	// check validaty 
	var obj = null;
	try {
		obj = JSON.parse(newConf);
		writeConf('custom_bkmk_list', obj);
		alert(i18n('op_saved_alert'));
	} 
	catch (e) {
		alert(i18n('op_bad_json_alert') +'\n' + e);
	}
}

function recoverCustomBookmarks() {
	var cfm = confirm(i18n('op_reset_default_confirm_alert'));
	if (cfm == true) {
		writeConf('custom_bkmk_list', defaultCustomBookmarks);
		document.getElementById('custom-bkmk-textarea').value = JSON.stringify(defaultCustomBookmarks, null, 4);
		alert(i18n('op_reset_default_done_alert'));
	}
}

// ------------- exec --------------


// read search engine conf
initSearchEngineConf();

// bind save search engine conf
document.getElementById('save-search-engine-conf').onclick = changeSearchEngineConf;
document.getElementById('recover-search-engine-conf').onclick = recoverDefaultSearchEngineConf;

// init top sites
initTopSitesBtn();

// bind open / close top sites btn
document.getElementById('open-top-sites-btn').onclick = openTopSites;
document.getElementById('close-top-sites-btn').onclick = closeTopSites;

// init custom bookmarks
initCustomBookmarks();

// bind save custom bookmark conf
document.getElementById('save-custom-bkmk-conf').onclick = saveCustomBookmarks;
document.getElementById('recover-custom-bkmk-conf').onclick = recoverCustomBookmarks;

// generate url of check update
document.getElementById('check-update-btn').href = 'https://codingcat.cn/ataraxia/update.html?current=' + CURRENT_VERSION + '&locale=' + CURRENT_LOCALE;
document.getElementById('version-code-span').innerHTML = CURRENT_VERSION;


