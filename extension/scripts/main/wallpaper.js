
// current wallpaper url (for download link)
var currentWallpaperUrl = '';

// set wallpaper to default
function showDefaultWallpaper() {
	// set wallpaper
	var body = document.getElementById('main-body');
	body.style.backgroundImage = "url('./images/john-reign-abarintos-369080-unsplash.jpg')";
	// set download link
	setDownloadLink();
}

// set footer text
function setFooterText(text) {
	var footer_text = document.getElementById('footer-text');
	footer_text.textContent = text;
	// display / hide the uhd badge
	var uhd_badge = document.getElementById('uhd-badge');
	if (readConf('enable_uhd_wallpaper') == 'yes') {
		uhd_badge.textContent = i18n('btr_download_wallpaper_uhd_badge');
	}
	else {
		uhd_badge.textContent = '';
	}
}

// display loading animation
function showLoadingAnim() {
	var circle = document.getElementById('loading-circle');
	circle.style.display = 'inline-block';
	setFooterText('Updating wallpaper ...');
	document.getElementById('change-wallpaper').style.display = 'none';
	document.getElementById('change-wallpaper-next').style.display = 'none';
	document.getElementById('wallpaper-download-link').style.display = 'none';
}

// hide loading animation
function hideLoadingAnim() {
	var circle = document.getElementById('loading-circle');
	circle.style.display = 'none';
	document.getElementById('change-wallpaper').style.removeProperty('display');
	document.getElementById('change-wallpaper-next').style.removeProperty('display');
	document.getElementById('wallpaper-download-link').style.removeProperty('display');
}

// pre-load image from url
// then change background image and footer text after loading is finished
function loadAndChangeOnlineWallpaper(url, text) {
	// preload wallpaper
	var tmp_img = new Image();
	tmp_img.src = url;
	tmp_img.onload = function(){
  	// set wallpaper
		var body = document.getElementById('main-body');
		body.style.backgroundImage = "url('" + url + "')";
		// set footer text
		hideLoadingAnim();
		setFooterText(text);
		// update conf
		writeConf("wallpaper_date", getDateString());
		writeConf("wallpaper_url", url);
		writeConf("wallpaper_text", text);
		// set download link
		currentWallpaperUrl = url;
		setDownloadLink();
	};
}

// get latest wallpaper url from bing.com
// then load and change wallpaper
function updateWallpaper(idx){
	showLoadingAnim();
	var xhr = new XMLHttpRequest();
	xhr.onload = function(){
		if (xhr.status === 200) {
			var obj = JSON.parse(xhr.responseText);
			var url = 'https://bing.com' + obj.images[0].url;
			// if UHD enabled
			if (readConf('enable_uhd_wallpaper') == 'yes') {
				url = url.replaceAll('1920x1080', 'UHD');
			}
			loadAndChangeOnlineWallpaper(url, obj.images[0].copyright);
		} else {
			showDefaultWallpaper();
		}
	};
	xhr.onerror = function(){
		showDefaultWallpaper();
	};
	var current_lang = window.navigator.language;
	xhr.open('get','https://www.bing.com/HPImageArchive.aspx?format=js&n=1&mkt=' + current_lang + '&idx=' + idx);
	xhr.send(null);
}

// initialize wallpaper on page load
function initWallpaper(){
	// get cache date
	var cache_date = readConf("wallpaper_date");
	if(cache_date == getDateString()){
		// if today matches cache date, get cache url and text
		var cache_url = readConf("wallpaper_url");
		var cache_text = readConf("wallpaper_text");
		if(cache_url != "" && cache_text != ""){
			loadAndChangeOnlineWallpaper(cache_url, cache_text);
		}
		else{
			// cache is broken, update wallpaper
			updateWallpaper(0);
		}
	}
	else{
		// if today does not match cache date, update wallpaper
		updateWallpaper(0);
		// reset old wallpaper days offset conf
		writeConf("offset_idx", "0");
	}
}

// set wallpaper download link
function setDownloadLink() {
	var downloadLink = document.getElementById('wallpaper-download-link');
	downloadLink.href = currentWallpaperUrl;
	downloadLink.download = 'bing-wallpaper-' + getDateString();
}

// show a toast message that auto-dismisses
function showToast(message) {
	spop({
		template: message,
		style: 'default',
		autoclose: 3000,
		overlap: false
	});
}

// switch wallpaper by offset delta (+1 = older, -1 = newer)
function switchWallpaperByDelta(delta) {
	var MAX_IDX = 6; // bing supports up to 7 days back (idx 0..6)
	var cache_idx = parseInt(readConf("offset_idx") || "0");
	var new_idx = cache_idx + delta;
	if (new_idx > MAX_IDX) {
		showToast(i18n('btr_wallpaper_oldest_toast'));
		return;
	}
	if (new_idx < 0) {
		showToast(i18n('btr_wallpaper_today_toast'));
		return;
	}
	writeConf("offset_idx", new_idx.toString());
	updateWallpaper(new_idx);
}

// --------------------------------------------------

// init wallpaper
initWallpaper();

// bind prev/next wallpaper click events
document.getElementById('change-wallpaper').onclick = function() { switchWallpaperByDelta(1); };
document.getElementById('change-wallpaper-next').onclick = function() { switchWallpaperByDelta(-1); };
