
// javascript code for option operations in OPTIONS page

// Some default settings.
// this is duplicated code. should be fixed later.
var defaultSearchEngines = [
		{
			name: "Google", 
			icon: "icons/google.png",
			action: "https://google.com/search",
			param_name: "q",
			css_style: "height: 40px; margin: 15px 10px;"
		},
		{
			name: "Bing", 
			icon: "icons/bing.png",
			action: "https://bing.com/search",
			param_name: "q",
			css_style: "height: 50px;  margin: 10px;"
		},
		{
			name: "Baidu", 
			icon: "icons/baidu.png",
			action: "https://www.baidu.com/s",
			param_name: "wd",
			css_style: "height: 70px; margin-top: -10px;"
		},
		{
			name: "Sogou", 
			icon: "icons/sogou.png",
			action: "https://www.sogou.com/web",
			param_name: "query",
			css_style: "height: 50px; margin: 10px;"
		},
		{
			name: "Yahoo", 
			icon: "icons/yahoo.png",
			action: "https://search.yahoo.com/search",
			param_name: "p",
			css_style: "height: 35px; padding: 18px 10px;"
		},
		{
			name: "Yandex", 
			icon: "icons/yandex.png",
			action: "https://yandex.com/search",
			param_name: "text",
			css_style: "height: 40px; padding: 15px 10px;"
		},
		{
			name: "DuckDuckGo", 
			icon: "icons/duckduckgo.png",
			action: "https://duckduckgo.com/",
			param_name: "q",
			css_style: "height: 45px; padding: 10px;"
		},
		{
			name: "360", 
			icon: "icons/360.png",
			action: "https://www.so.com/s",
			param_name: "q",
			css_style: "height: 40px; padding: 15px 10px;"
		}
	];
	
var defaultCustomBookmarks = [
		{
			name: "Ataraxia User Guide",
			url: "https://idealland.app/ataraxia/install.html"
		}
	];

// search engine settings — visual editor

var seList = []; // in-memory list, synced to DOM
var seEditIndex = -1; // -1 = adding new

function renderSearchEngineList() {
	var container = document.getElementById('search-engine-list');
	container.innerHTML = '';
	seList.forEach(function(engine, idx) {
		var item = document.createElement('div');
		item.className = 'se-item';
		item.draggable = true;
		item.dataset.idx = idx;

		var handle = document.createElement('span');
		handle.className = 'se-drag-handle';
		handle.title = 'Drag to reorder';
		handle.textContent = '⠿';

		var iconWrap = document.createElement('div');
		iconWrap.className = 'se-icon-wrap';

		var icon = document.createElement('img');
		icon.className = 'se-icon-preview';
		icon.src = engine.icon || '';
		icon.alt = engine.name;
		icon.onerror = function() { this.style.visibility = 'hidden'; };
		iconWrap.appendChild(icon);

		var name = document.createElement('span');
		name.className = 'se-name';
		name.textContent = engine.name;

		var url = document.createElement('span');
		url.className = 'se-url';
		url.textContent = engine.action;

		var editBtn = document.createElement('button');
		editBtn.className = 'se-btn-edit';
		editBtn.textContent = i18n('op_se_btn_edit');
		editBtn.onclick = (function(i) { return function() { openSeModal(i); }; })(idx);

		var delBtn = document.createElement('button');
		delBtn.className = 'se-btn-delete';
		delBtn.textContent = i18n('op_se_btn_delete');
		delBtn.onclick = (function(i) { return function() { deleteSeItem(i); }; })(idx);

		item.appendChild(handle);
		item.appendChild(iconWrap);
		item.appendChild(name);
		item.appendChild(url);
		item.appendChild(editBtn);
		item.appendChild(delBtn);

		// drag-and-drop reorder
		item.addEventListener('dragstart', onSeDragStart);
		item.addEventListener('dragover', onSeDragOver);
		item.addEventListener('dragleave', onSeDragLeave);
		item.addEventListener('drop', onSeDrop);
		item.addEventListener('dragend', onSeDragEnd);

		container.appendChild(item);
	});
}

// --- drag and drop ---
var seDragSrcIdx = -1;

function onSeDragStart(e) {
	seDragSrcIdx = parseInt(this.dataset.idx);
	this.classList.add('dragging');
	e.dataTransfer.effectAllowed = 'move';
}

function onSeDragOver(e) {
	e.preventDefault();
	e.dataTransfer.dropEffect = 'move';
	this.classList.add('drag-over');
}

function onSeDragLeave() {
	this.classList.remove('drag-over');
}

function onSeDrop(e) {
	e.preventDefault();
	this.classList.remove('drag-over');
	var destIdx = parseInt(this.dataset.idx);
	if (seDragSrcIdx === destIdx) return;
	var moved = seList.splice(seDragSrcIdx, 1)[0];
	seList.splice(destIdx, 0, moved);
	renderSearchEngineList();
}

function onSeDragEnd() {
	document.querySelectorAll('.se-item').forEach(function(el) {
		el.classList.remove('dragging', 'drag-over');
	});
}

// --- modal ---

function openSeModal(editIdx) {
	seEditIndex = (editIdx !== undefined) ? editIdx : -1;
	var isEdit = seEditIndex >= 0;
	document.getElementById('se-modal-title').textContent = i18n(isEdit ? 'op_se_modal_edit_title' : 'op_se_modal_add_title');
	var engine = isEdit ? seList[seEditIndex] : { name:'', icon:'', action:'', param_name:'', css_style:'' };
	document.getElementById('se-field-name').value = engine.name || '';
	document.getElementById('se-field-icon').value = engine.icon || '';
	document.getElementById('se-field-action').value = engine.action || '';
	document.getElementById('se-field-param').value = engine.param_name || '';
	document.getElementById('se-field-css').value = engine.css_style || '';
	document.getElementById('se-modal-overlay').classList.add('active');
	document.getElementById('se-field-name').focus();
}

function closeSeModal() {
	document.getElementById('se-modal-overlay').classList.remove('active');
}

function confirmSeModal() {
	var name = document.getElementById('se-field-name').value.trim();
	if (!name) {
		alert(i18n('op_se_name_required'));
		return;
	}
	var engine = {
		name: name,
		icon: document.getElementById('se-field-icon').value.trim(),
		action: document.getElementById('se-field-action').value.trim(),
		param_name: document.getElementById('se-field-param').value.trim(),
		css_style: document.getElementById('se-field-css').value.trim()
	};
	if (seEditIndex >= 0) {
		seList[seEditIndex] = engine;
	} else {
		seList.push(engine);
	}
	renderSearchEngineList();
	closeSeModal();
}

function deleteSeItem(idx) {
	seList.splice(idx, 1);
	renderSearchEngineList();
}

function initSearchEngineConf() {
	// show search box
	document.getElementById('show-search-engine-checkbox').checked = (readConf('display_search_box') !== 'no');
	// populate in-memory list and render
	seList = JSON.parse(JSON.stringify(readConf('search_engine_list') || defaultSearchEngines));
	renderSearchEngineList();
}

function changeSearchEngineConf() {
	writeConf('display_search_box', document.getElementById('show-search-engine-checkbox').checked ? 'yes' : 'no');
	writeConf('search_engine_list', seList);
	alert(i18n('op_saved_alert'));
}

function recoverDefaultSearchEngineConf() {
	var cfm = confirm(i18n('op_reset_default_confirm_alert'));
	if (cfm == true) {
		writeConf('display_search_box', 'yes');
		document.getElementById('show-search-engine-checkbox').checked = true;
		writeConf('search_engine_list', defaultSearchEngines);
		seList = JSON.parse(JSON.stringify(defaultSearchEngines));
		renderSearchEngineList();
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
		var close_btn = document.getElementById('close-top-sites-btn');
		var open_btn = document.getElementById('open-top-sites-btn');
		if (result) {
	      // The extension has the permissions.
	      if (readConf('show_top_sites') == 'yes') {
	      	open_btn.style.display = 'none';
	      }
	      else {
	      	close_btn.style.display = 'none';
	      }
		} else {
	      // The extension doesn't have the permissions.
	      if (readConf('show_top_sites') == 'no') {
	      	close_btn.style.display = 'none';
	      }
	      else {
	      	// no permission, but config is open. this is not a normal status
	      	// change conf
	      	writeConf('show_top_sites', 'no');
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

// custom bookmarks — visual editor

var bkmkList = [];
var bkmkEditIndex = -1;

function renderBookmarkList() {
	var container = document.getElementById('bookmark-list');
	container.innerHTML = '';
	bkmkList.forEach(function(bkmk, idx) {
		var item = document.createElement('div');
		item.className = 'bkmk-item';
		item.draggable = true;
		item.dataset.idx = idx;

		var handle = document.createElement('span');
		handle.className = 'bkmk-drag-handle';
		handle.title = 'Drag to reorder';
		handle.textContent = '⠿';

		var name = document.createElement('span');
		name.className = 'bkmk-name';
		name.textContent = bkmk.name;

		var url = document.createElement('span');
		url.className = 'bkmk-url';
		url.textContent = bkmk.url;

		var editBtn = document.createElement('button');
		editBtn.className = 'bkmk-btn-edit';
		editBtn.textContent = i18n('op_se_btn_edit');
		editBtn.onclick = (function(i) { return function() { openBkmkModal(i); }; })(idx);

		var delBtn = document.createElement('button');
		delBtn.className = 'bkmk-btn-delete';
		delBtn.textContent = i18n('op_se_btn_delete');
		delBtn.onclick = (function(i) { return function() { deleteBkmkItem(i); }; })(idx);

		item.appendChild(handle);
		item.appendChild(name);
		item.appendChild(url);
		item.appendChild(editBtn);
		item.appendChild(delBtn);

		item.addEventListener('dragstart', onBkmkDragStart);
		item.addEventListener('dragover', onBkmkDragOver);
		item.addEventListener('dragleave', onBkmkDragLeave);
		item.addEventListener('drop', onBkmkDrop);
		item.addEventListener('dragend', onBkmkDragEnd);

		container.appendChild(item);
	});
}

var bkmkDragSrcIdx = -1;

function onBkmkDragStart(e) {
	bkmkDragSrcIdx = parseInt(this.dataset.idx);
	this.classList.add('dragging');
	e.dataTransfer.effectAllowed = 'move';
}
function onBkmkDragOver(e) {
	e.preventDefault();
	e.dataTransfer.dropEffect = 'move';
	this.classList.add('drag-over');
}
function onBkmkDragLeave() { this.classList.remove('drag-over'); }
function onBkmkDrop(e) {
	e.preventDefault();
	this.classList.remove('drag-over');
	var destIdx = parseInt(this.dataset.idx);
	if (bkmkDragSrcIdx === destIdx) return;
	var moved = bkmkList.splice(bkmkDragSrcIdx, 1)[0];
	bkmkList.splice(destIdx, 0, moved);
	renderBookmarkList();
}
function onBkmkDragEnd() {
	document.querySelectorAll('.bkmk-item').forEach(function(el) {
		el.classList.remove('dragging', 'drag-over');
	});
}

function openBkmkModal(editIdx) {
	bkmkEditIndex = (editIdx !== undefined) ? editIdx : -1;
	var isEdit = bkmkEditIndex >= 0;
	document.getElementById('bkmk-modal-title').textContent = i18n(isEdit ? 'op_bkmk_modal_edit_title' : 'op_bkmk_modal_add_title');
	var bkmk = isEdit ? bkmkList[bkmkEditIndex] : { name: '', url: '' };
	document.getElementById('bkmk-field-name').value = bkmk.name || '';
	document.getElementById('bkmk-field-url').value = bkmk.url || '';
	document.getElementById('bkmk-modal-overlay').classList.add('active');
	document.getElementById('bkmk-field-name').focus();
}

function closeBkmkModal() {
	document.getElementById('bkmk-modal-overlay').classList.remove('active');
}

function confirmBkmkModal() {
	var name = document.getElementById('bkmk-field-name').value.trim();
	var url = document.getElementById('bkmk-field-url').value.trim();
	if (!name || !url) {
		alert(i18n('op_bkmk_required'));
		return;
	}
	var bkmk = { name: name, url: url };
	if (bkmkEditIndex >= 0) {
		bkmkList[bkmkEditIndex] = bkmk;
	} else {
		bkmkList.push(bkmk);
	}
	renderBookmarkList();
	closeBkmkModal();
}

function deleteBkmkItem(idx) {
	bkmkList.splice(idx, 1);
	renderBookmarkList();
}

function initCustomBookmarks() {
	var conf = readConf('custom_bkmk_list');
	if (conf == null) {
		conf = defaultCustomBookmarks;
	}
	bkmkList = JSON.parse(JSON.stringify(conf));
	renderBookmarkList();
}

function saveCustomBookmarks() {
	writeConf('custom_bkmk_list', bkmkList);
	alert(i18n('op_saved_alert'));
}

function recoverCustomBookmarks() {
	var cfm = confirm(i18n('op_reset_default_confirm_alert'));
	if (cfm == true) {
		writeConf('custom_bkmk_list', defaultCustomBookmarks);
		bkmkList = JSON.parse(JSON.stringify(defaultCustomBookmarks));
		renderBookmarkList();
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

// bind add / modal buttons
document.getElementById('add-search-engine-btn').onclick = function() { openSeModal(); };
document.getElementById('se-modal-cancel').onclick = closeSeModal;
document.getElementById('se-modal-confirm').onclick = confirmSeModal;
document.getElementById('se-modal-overlay').addEventListener('click', function(e) {
	if (e.target === this) closeSeModal();
});

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

// bind add / modal buttons for bookmarks
document.getElementById('add-bookmark-btn').onclick = function() { openBkmkModal(); };
document.getElementById('bkmk-modal-cancel').onclick = closeBkmkModal;
document.getElementById('bkmk-modal-confirm').onclick = confirmBkmkModal;
document.getElementById('bkmk-modal-overlay').addEventListener('click', function(e) {
	if (e.target === this) closeBkmkModal();
});

// bind save custom bookmark conf
document.getElementById('save-custom-bkmk-conf').onclick = saveCustomBookmarks;
document.getElementById('recover-custom-bkmk-conf').onclick = recoverCustomBookmarks;

// init wallpaper
initWallpaperConf();

// bind save wallpaper conf btn
document.getElementById('save-wallpaper-conf-btn').onclick = changeWallpaperConf;

// generate url of check update
document.getElementById('check-update-btn').href = 'https://idealland.app/ataraxia/update.html?platform=' + CURRENT_BROWSER + '&current=' + CURRENT_VERSION + '&locale=' + CURRENT_LOCALE;
document.getElementById('version-code-span').innerHTML = CURRENT_VERSION;


