
// javascript code for option operations in OPTIONS page


// search engine settings

function initSearchEngineConf() {
	// show search box
	if(readConf('display_search_box') == 'no') {
		document.getElementById('show-search-engine-checkbox').checked = false;
	}
	else {
		document.getElementById('show-search-engine-checkbox').checked = true;
	}
	// search engine list
	document.getElementById('search-engine-textarea').value = JSON.stringify(readConf('search_engine_list'), null, 4);
}

function changeSearchEngineConf() {
	// update search box conf
	if (document.getElementById('show-search-engine-checkbox').checked == true) {
		writeConf('display_search_box', 'yes');
	}
	else {
		writeConf('display_search_box', 'no');
	}

	// update engine list conf
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
		// default show search box conf
		writeConf('display_search_box', 'yes');
		document.getElementById('show-search-engine-checkbox').checked = true;
		// default search engine list conf
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


// wallpaper settings


function initWallpaperConf() {
	// show search box
	if(readConf('enable_uhd_wallpaper') == 'no') {
		document.getElementById('use-uhd-wallpaper-checkbox').checked = false;
	}
	else {
		document.getElementById('use-uhd-wallpaper-checkbox').checked = true;
	}
}

function changeWallpaperConf() {
	// update search box conf
	if (document.getElementById('use-uhd-wallpaper-checkbox').checked == true) {
		writeConf('enable_uhd_wallpaper', 'yes');
	}
	else {
		writeConf('enable_uhd_wallpaper', 'no');
	}
	// change wallpaper_data conf to trigger wallpaper reload when open a new tab
	writeConf('wallpaper_date', '2001-01-01');
	alert(i18n('op_saved_alert'));
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

// init wallpaper
initWallpaperConf();

// bind save wallpaper conf btn
document.getElementById('save-wallpaper-conf-btn').onclick = changeWallpaperConf;

// generate url of check update
document.getElementById('check-update-btn').href = 'https://ataraxia.dongxing.xin/update.html?platform=' + CURRENT_BROWSER + '&current=' + CURRENT_VERSION + '&locale=' + CURRENT_LOCALE;
document.getElementById('version-code-span').innerHTML = CURRENT_VERSION;


