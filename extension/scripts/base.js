
var manifestData = chrome.runtime.getManifest();
var CURRENT_VERSION = manifestData.version;
var CURRENT_LOCALE = chrome.i18n.getMessage('@@ui_locale');


// append onload event
function appendOnLoadEvent(func) {
    var old_onload = window.onload;
    if (typeof window.onload != 'function') { // this is the first onload func
        window.onload = func;
    } else {  
        window.onload = function() {
            oldonload();  // call old onload func
            func();  // call current func
        }
    }
}

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

// get current date string 
function getDateString() {
	var date = new Date();
	var result = "" + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
	return result;
}

// i18n
function i18n(key) {
    return chrome.i18n.getMessage(key);
}

/*
 NOTE: conf keys

 // search
 - search_engine_list: list of available search engines
 - current_search_engine: name of current search engine

 // topSites
 - show_top_sites: yes no string

 // custom bookmarks
 - custom_bkmk_list: list of user defined bookmarks

 // mark if this is the first open of a new version
 - last_open_version: string of version code of last open

*/

// write chrome storage
function writeConf(key, value) {
    localStorage[key] = JSON.stringify(value);
    /*
    chrome.storage.sync.set({key: value}, function() {
        console.log('Save value of ' + key);
    });
    */
}

// read chrome storage
function readConf(key) {
    var val = localStorage[key];
    if (val == null) {
        return null;
    }
    else {
        return JSON.parse(val);
    }
    
    /*
    chrome.storage.sync.get([key], function(result) {
        console.log('Read value of ' + key);
        func(result.key);
    });
    */
}
        
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
]



