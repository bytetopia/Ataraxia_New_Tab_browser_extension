
var manifestData = chrome.runtime.getManifest();
let CURRENT_VERSION = manifestData.version;
let CURRENT_LOCALE = chrome.i18n.getMessage('@@ui_locale');
let CURRENT_BROWSER = "edge";

// ---- helper funcs ----

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
    if (val == undefined) {
        return undefined;
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

// ---- conf initializer ---- 

/* 
    Conf items: 
        // search
            - search_engine_list: Json list, available search engines
            - current_search_engine: String, name of current search engine
            - display_search_box: String(yes no), show search box or not
        // topSites
            - show_top_sites: String(yes no)
        // custom bookmarks
            - custom_bkmk_list: Json list, user defined bookmarks
        // wallpaper
            - enable_uhd_wallpaper: String(yes no)
            - wallpaper_date: String
            - wallpaper_url: String
            - wallpaper_text: String
            - offset_idx: String, can be parsed to int
        // version flag
            - last_open_version: String
    */
        
// initialize conf storage
function initializeConf() {
    console.log("initialize conf ...");

    // define default settings  
    var defaultSettings = {
        search_engine_list: [
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
        ],
        current_search_engine: "Google",
        display_search_box: "yes",
        show_top_sites: "no",
        custom_bkmk_list: [
            {
                name: "Ataraxia User Guide",
                url: "https://ataraxia.dongxing.xin/install.html"
            }
        ],
        enable_uhd_wallpaper: "no",
        wallpaper_date: "2000-01-01",
        wallpaper_url: "./images/john-reign-abarintos-369080-unsplash.jpg",
        wallpaper_text: "Welcome to Ataraxia.",
        offset_idx: "0",
        last_open_version: "0"
    }

    for (k in defaultSettings) {
        if (readConf(k) == undefined) {
            writeConf(k, defaultSettings[k]);
            console.log(" set default conf: ", k, " = ", defaultSettings[k]);
        }
    }

    console.log("done. conf updated with default value.");
}


// check if last_open_version is undefined(first install) or less than current version(updated), update the conf items with default value.
var last_open_version = readConf('last_open_version');

if (last_open_version == undefined || parseFloat(last_open_version) < parseFloat(CURRENT_VERSION)) {
    console.log("update from ", last_open_version, " to ", CURRENT_VERSION);
    // init conf
    initializeConf();

    // pop up update prompt
    spop('<h4 class="spop-title">' + i18n('you_have_updated_to_the_latest_version') + '</h4>' + i18n('update_content'), 'success');

    writeConf('last_open_version', CURRENT_VERSION);
}

