
var manifestData = chrome.runtime.getManifest();
let CURRENT_VERSION = manifestData.version;
let CURRENT_LOCALE = chrome.i18n.getMessage('@@ui_locale');
let CURRENT_BROWSER = "chrome";

// ---- helper funcs ----

// append onload event
function appendOnLoadEvent(func) {
    var old_onload = window.onload;
    if (typeof window.onload != 'function') { // this is the first onload func
        window.onload = func;
    } else {
        window.onload = function() {
            old_onload();  // call old onload func
            func();  // call current func
        }
    }
}

// get current date string
function getDateString() {
	var date = new Date();
	var result = "" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
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
        show_top_sites: "no",
        custom_bkmk_list: [
            {
                name: "Ataraxia User Guide",
                url: "https://idealland.app/ataraxia/install.html"
            }
        ],
        enable_uhd_wallpaper: "no",
        wallpaper_date: "2000-01-01",
        wallpaper_url: "./images/john-reign-abarintos-369080-unsplash.jpg",
        wallpaper_text: "Welcome to Ataraxia.",
        offset_idx: "0",
        last_open_version: "0"
    }

    for (var k in defaultSettings) {
        if (Object.prototype.hasOwnProperty.call(defaultSettings, k)) {
            if (readConf(k) == undefined) {
                writeConf(k, defaultSettings[k]);
                console.log(" set default conf: ", k, " = ", defaultSettings[k]);
            }
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

