
var totalEngines = document.getElementsByClassName('search').length;


// set cookie: cname = cvalue
function setCookie(cname, cvalue) {
	var exp_days = 365
    var d = new Date();
    d.setTime(d.getTime() + (exp_days*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
} 

// get cookie string by name
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
         }
         if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
         }
     }
    return "";
} 

// get current search engine index
function getEngineInt() {
	var engine = getCookie('engine');
	if(engine == ""){
		engine = 0;
	}
	else{
		engine = parseInt(engine);
	}
	return engine;
}

// save search engine index into cookie
function setEngineInt(newEngine) {
	setCookie("engine", newEngine.toString());
}

// switch to next search engine
function switchEngine(){
	var engine = getEngineInt();
	// hide old
	var box = document.getElementById("search-box-" + engine);
	box.style.display = "none";
	var query = document.getElementById("input-" + engine).value;
	// show new
	engine = (engine + 1) % totalEngines;
	box = document.getElementById("search-box-" + engine);
	box.style.display = "inline-block";
	document.getElementById("input-" + engine).value = query;
	// save cookie
	setEngineInt(engine);
}

// initialize search engine when page load
function initEngine(){
	var engine = getEngineInt();
	// hide others
	for(var i=0; i < totalEngines; i++) {
		if(i != engine){
			var box = document.getElementById("search-box-" + i);
			box.style.display = "none";
		}
	}
	// show new
	box = document.getElementById("search-box-" + engine);
	box.style.display = "inline-block";
}

// get current date string 
function getDateString() {
	var date = new Date();
	var result = "" + date.getFullYear() + "-" + date.getMonth() + "-" + (date.getDate() - 15);
	return result;
}

// set wallpaper to default
function showDefaultWallpaper() {
	// set wallpaper
	var body = document.getElementById('main-body');
	body.style.backgroundImage = "url('./images/john-reign-abarintos-369080-unsplash.jpg')";
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
		// update cookie
		setCookie("wallpaper_date", getDateString());
		setCookie("wallpaper_url", url);
		setCookie("wallpaper_text", text);
	};
}

// get latest wallpaper url from bing.com 
// then load and change wallpaper
function updateWallpaper(){
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
	xhr.open('get','https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN');
	xhr.send(null);
}

// initialize wallpaper on page load
function initWallpaper(){
	// get cache date
	var cache_date = getCookie("wallpaper_date");
	if(cache_date == getDateString()){
		// if today matches cache date, get cache url and text
		var cache_url = getCookie("wallpaper_url");
		var cache_text = getCookie("wallpaper_text");
		if(cache_url != "" && cache_text != ""){
			loadAndChangeOnlineWallpaper(cache_url, cache_text);
		}
		else{
			// cache is broken, update wallpaper
			updateWallpaper();
		}
	}
	else{
		// if today does not match cache date, update wallpaper
		updateWallpaper();
	}
}

// set focus to search input text box
function focusOnSearchInput() {
	var input = document.getElementById('input-' + getEngineInt());
	input.focus();
}

// init wallpaper
initWallpaper();

// bind switch logo function to logo
var searchLogos = document.getElementsByClassName('search-logo');
for(var i=0; i<searchLogos.length; i++){
	searchLogos[i].onclick = switchEngine;
}

// init engine
initEngine();

// bind body click focus event
var main_body = document.getElementById('main-body');
main_body.onclick = focusOnSearchInput;


// build top sites drop down list
function buildTopSitesList(mostVisitedURLs) {
	var popupDiv = document.getElementById('most-visited-child');
	var ul = popupDiv.appendChild(document.createElement('ul'));

	for (var i = 0; i < mostVisitedURLs.length; i++) {
		var li = ul.appendChild(document.createElement('li'));
		var a = li.appendChild(document.createElement('a'));
		a.href = mostVisitedURLs[i].url;
		// a.title = mostVisitedURLs[i].title;
		a.appendChild(document.createTextNode(mostVisitedURLs[i].title));
	}
}

// init top sites list
chrome.topSites.get(buildTopSitesList);


