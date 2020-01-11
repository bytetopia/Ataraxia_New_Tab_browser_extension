
// page title
function i18n_page_title(){
	document.title = i18n('new_tab_title');
}

// search logo hover tip
function i18n_search_logo_hover_tip() {
	document.getElementById("search-logo").title = i18n('search_logo_hover_tip');
}

// top-right check update btn
function i18n_tpr_check_update_btn() {
	document.getElementById('check-update-btn-text').innerHTML = i18n('tpr_check_update_btn');
}

// top-right open settings btn
function i18n_tpr_settings_btn() {
	document.getElementById('open-options-btn-text').innerHTML = i18n('tpr_settings_btn');
}

// bottom-right change wallpaper btn 
function i18n_btr_change_wallpaper_btn() {
	var x = document.getElementById('change-wallpaper');
	x.title = i18n('btr_change_wallpaper_btn');
}

// bottom-right download wallpaper btn 
function i18n_btr_download_wallpaper_btn() {
	var x = document.getElementById('wallpaper-download-link');
	x.title = i18n('btr_download_wallpaper_btn');
}


function exec_i18n() {
	i18n_page_title();
	i18n_search_logo_hover_tip();
	i18n_btr_change_wallpaper_btn();
	i18n_tpr_check_update_btn();
	i18n_tpr_settings_btn();
	i18n_btr_download_wallpaper_btn();
}

exec_i18n();
