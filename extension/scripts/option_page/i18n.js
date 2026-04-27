
// page title
function i18n_page_title(){
	document.title = i18n('op_title');
}

// display title
function i18n_display_title(){
	document.getElementById("display-title").innerHTML = i18n('op_title');
}

// nav bar
function i18n_nav() {
	document.getElementById("nav-quick-links").innerHTML = i18n('op_nav_quick_links');
	document.getElementById("nav-wallpaper").innerHTML = i18n('op_nav_wallpaper');
	document.getElementById("nav-about").innerHTML = i18n('op_nav_about');
}

// common btns
function i18n_op_common_btns() {
	// save
	var save_btns = document.getElementsByClassName('op-btn-save-this');
	for (var i=0; i<save_btns.length; i++) {
		save_btns[i].innerHTML = i18n('op_btn_save_this');
	}
	// reset default
	var reset_btns = document.getElementsByClassName('op-btn-reset-default');
	for (var i=0; i<reset_btns.length; i++) {
		reset_btns[i].innerHTML = i18n('op_btn_reset_default');
	}
}

// quick link tab
function i18n_quick_link_tab() {
	document.getElementById("quick-link-prompt").innerHTML = i18n('op_quick_link_prompt');
	document.getElementById("top-sites-prompt").innerHTML = i18n('op_top_sites_prompt');
	document.getElementById("custom-bkmk-prompt").innerHTML = i18n('op_custom_bkmk_prompt');
	document.getElementById("close-top-sites-btn").innerHTML = i18n('op_close_top_sites_btn');
	document.getElementById("open-top-sites-btn").innerHTML = i18n('op_open_top_sites_btn');
	document.getElementById("add-bookmark-btn").innerHTML = i18n('op_bkmk_add_btn');
	// bookmark modal static labels
	document.getElementById("bkmk-label-name").innerHTML = i18n('op_bkmk_field_name');
	document.getElementById("bkmk-label-url").innerHTML = i18n('op_bkmk_field_url');
	document.getElementById("bkmk-modal-cancel").innerHTML = i18n('op_se_modal_cancel');
	document.getElementById("bkmk-modal-confirm").innerHTML = i18n('op_se_modal_save');
}

function i18n_wallpaper_tab() {
	document.getElementById("uhd-wallpaper-prompt1").innerHTML = i18n('op_wallpaper_uhd_hint1');
	document.getElementById("uhd-wallpaper-prompt2").innerHTML = i18n('op_wallpaper_uhd_hint2');
	document.getElementById("use-uhd-wallpaper-checkbox-text").innerHTML = i18n('op_wallpaper_uhd_checkbox');
}

// about tab
function i18n_about_tab() {
	document.getElementById("about-prompt").innerHTML = i18n('op_about_prompt');
	document.getElementById("about-current-ver").innerHTML = i18n('op_about_current_ver');
	document.getElementById("check-update-btn").innerHTML = i18n('op_about_check_update');
	document.getElementById("send-feedback-btn").innerHTML = i18n('op_about_send_feedback');
}

// exec

function exec_i18n() {
	i18n_page_title();
	i18n_display_title();
	i18n_nav();
	i18n_op_common_btns();
	i18n_quick_link_tab();
	i18n_wallpaper_tab();
	i18n_about_tab();
}

exec_i18n();
