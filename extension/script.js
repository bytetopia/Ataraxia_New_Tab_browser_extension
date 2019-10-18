
var totalEngines = document.getElementsByClassName('search').length;

function setCookie(cname, cvalue) {
	var exp_days = 365
    var d = new Date();
    d.setTime(d.getTime() + (exp_days*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
} 

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

function setEngineInt(newEngine) {
	setCookie("engine", newEngine.toString());
}

function switchEngine(){
	var engine = getEngineInt();
	// hide old
	var box = document.getElementById("search-box-" + engine);
	box.style.display = "none";
	// show new
	engine = (engine + 1) % totalEngines;
	box = document.getElementById("search-box-" + engine);
	box.style.display = "inline-block";
	setEngineInt(engine);
}

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

function getDateString() {
	var date = new Date();
	var result = "" + date.getFullYear() + "-" + date.getMonth() + "-" + (date.getDate() - 15);
	return result;
}

function showDefaultWallpaper() {
	// set wallpaper
	var body = document.getElementById('main-body');
	body.style.backgroundImage = "url('./images/john-reign-abarintos-369080-unsplash.jpg')";
	// set text
	var background_text = document.getElementById('background-text');
	background_text.innerHTML = obj.images[0].copyright;
}

function updateWallpaper(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4){
			var obj = JSON.parse(xhr.responseText);
			var url = 'https://bing.com' + obj.images[0].url;
			// set wallpaper
			var body = document.getElementById('main-body');
			body.style.backgroundImage = "url('" + url + "')";
			// set text
			var background_text = document.getElementById('background-text');
			background_text.innerHTML = obj.images[0].copyright;
			// update cookie
			setCookie("wallpaper_date", getDateString());
			setCookie("wallpaper_url", url);
			setCookie("wallpaper_text", obj.images[0].copyright);
		}
		else{
			showDefaultWallpaper();
		}
	}
	xhr.open('get','https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN');
	xhr.send(null);
}

function initWallpaper(){
	// use cache data first
	var cache_date = getCookie("wallpaper_date");
	if(cache_date == getDateString()){
		var cache_url = getCookie("wallpaper_url");
		var cache_text = getCookie("wallpaper_text");
		if(cache_url != "" && cache_text != ""){
			// set wallpaper
			var body = document.getElementById('main-body');
			body.style.backgroundImage = "url('" + cache_url + "')";
			// set text
			var background_text = document.getElementById('background-text');
			background_text.innerHTML = cache_text;
		}
		else{
			updateWallpaper();
		}
	}
	else{
		updateWallpaper();
	}
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

