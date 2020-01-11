
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
	footer_text.innerHTML = text;
}

// display loading animation
function showLoadingAnim() {
	var circle = document.getElementById('loading-circle');
	circle.style.display = 'inline-block';
	// set footer text
	setFooterText('Updating wallpaper ...');
}

// hide loading animation
function hideLoadingAnim() {
	var circle = document.getElementById('loading-circle');
	circle.style.display = 'none';
}

// pre-load image from url
// then change background image and footer text after loading is finished
function loadAndChangeOnlineWallpaper(url, text) {
	showDefaultWallpaper();
	showLoadingAnim();
	setFooterText('Updating wallpaper ...');
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
		setDownloadLink();
	};
}

// get latest wallpaper url from bing.com 
// then load and change wallpaper
function updateWallpaper(idx){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4){
			var obj = JSON.parse(xhr.responseText);
			var url = 'https://bing.com' + obj.images[0].url;
			loadAndChangeOnlineWallpaper(url, obj.images[0].copyright);
		}
		else{
			showDefaultWallpaper();
		}
	}
	xhr.open('get','https://www.bing.com/HPImageArchive.aspx?format=js&n=1&mkt=zh-CN&idx=' + idx);
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

// if user want to show old wallpapers.
function switchOldWallpaper(){
	var MAX_OLD_DAYS = 7;
	// calculate idx
	var cache_idx = readConf("offset_idx");
	if (cache_idx === "") {
		cache_idx = 0;
	}
	cache_idx = parseInt(cache_idx);
	cache_idx = (cache_idx + 1) % MAX_OLD_DAYS;
	writeConf("offset_idx", cache_idx.toString());
	// reload wallpaper
	updateWallpaper(cache_idx);
}

// set wallpaper download link
function setDownloadLink() {
	var downloadLink = document.getElementById('wallpaper-download-link');
	downloadLink.href = document.getElementById('main-body').style.backgroundImage.replace('url("', '').replace('")','');
	downloadLink.download = 'bing-wallpaper-' + getDateString();
}


// --------------------------------------------------

// init wallpaper
initWallpaper();

// bind switch old wallpaper click event
var change_wp_btn = document.getElementById('change-wallpaper');
change_wp_btn.onclick = switchOldWallpaper;

