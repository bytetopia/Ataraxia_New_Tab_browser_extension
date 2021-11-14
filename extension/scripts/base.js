
var manifestData = chrome.runtime.getManifest();
var CURRENT_VERSION = manifestData.version;
var CURRENT_LOCALE = chrome.i18n.getMessage('@@ui_locale');

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
    // localStorage[key] = JSON.stringify(value);
    chrome.storage.sync.set({key: value}, function() {
        console.log('Set value of ' + key);
    });
}

// read chrome storage
function readConf(key) {
    // var val = localStorage[key];
    // if (val == null) {
    //     return null;
    // }
    // else {
    //     return JSON.parse(val);
    // }
    var result = undefined;
    chrome.storage.sync.get([key], function(result) {
        return result[key];
    });
}

