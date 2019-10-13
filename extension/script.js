
var totalEngines = document.getElementsByClassName('search').length;

function setCookieEngine(name){
	document.cookie = "engine=" + name + ";expires=2147483647";
}

function getCookieEngine(){
	var cookie = document.cookie;
	if(cookie.indexOf("engine=") == -1){
		return 0;
	}
    return parseInt(cookie.substring(cookie.indexOf("engine=")+7, cookie.indexOf("engine=")+8));
}

function updateWallpaper(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4){
			var obj = JSON.parse(xhr.responseText);
			var url = 'https://bing.com' + obj.images[0].url;
			var body = document.getElementById('main-body');
			body.style.backgroundImage = "url('" + url + "')";
			var background_text = document.getElementById('background-text');
			background_text.innerHTML = obj.images[0].copyright;
		}
	}
	xhr.open('get','https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN');
	xhr.send(null);
}

function switchEngine(){
	var engine = getCookieEngine();
	// hide old
	var box = document.getElementById("search-box-" + engine);
	box.style.display = "none";
	// show new
	engine = (engine + 1) % totalEngines;
	box = document.getElementById("search-box-" + engine);
	box.style.display = "inline-block";
	setCookieEngine(engine);
}

function initEngine(){
	var engine = getCookieEngine();
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


// init wallpaper
updateWallpaper();

// bind switch logo function to logo
var searchLogos = document.getElementsByClassName('search-logo');
for(var i=0; i<searchLogos.length; i++){
	searchLogos[i].onclick = switchEngine;
}

// init engine
initEngine();

