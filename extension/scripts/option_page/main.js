
// javascript code for option operations in OPTIONS page

var defaultCustomBookmarks = [
		{
			name: "Ataraxia User Guide",
			url: "https://idealland.app/ataraxia/install.html"
		}
	];


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
	if(readConf('enable_uhd_wallpaper') == 'no') {
		document.getElementById('use-uhd-wallpaper-checkbox').checked = false;
	}
	else {
		document.getElementById('use-uhd-wallpaper-checkbox').checked = true;
	}
}

function changeWallpaperConf() {
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


