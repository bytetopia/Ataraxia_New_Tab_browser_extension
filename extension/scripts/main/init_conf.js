
// ---- Initializer ----

// initialize conf storage
function initializeConf() {
    
    /* 
    Storage conf items: 
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
    */

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
    }

    // localStorage last_open_version
    // this variable is used to mark installation status on this device, so it shouldn't be synced across devices.

    // check localStorage.last_open_version
    var local_last_version = localStorage["last_open_version"];

    // if local version <= 1.3, which means there are conf items stored in localStorage, need to read them out
    if (local_last_version != undefined && parseFloat(local_last_version) <= 1.3) {
        var localVal = undefined;
        for (k in defaultSettings) {
            localVal = localStorage[k];
            console.log("get local val: ", k, " = ", localVal);
            if(localVal != undefined) {
                defaultSettings[k] = Json.parse(localVal);
                console.log("use localStorage to overwrite default val: ", k, " = ", localVal);
            }
        }
    }

    console.log("current default conf = ", defaultSettings);
    
    // use cloud val to overwrite default
    for (k in defaultSettings) {
        chrome.storage.sync.get([k], function(result) {
            console.log("get from cloud: ", k, " = ", result[k]);
            if (result[k] != undefined) {
                defaultSettings[k] = result[k];
            }
        });
    }
    
    // update cloud conf
    chrome.storage.sync.set(defaultSettings, function(){
        console.log("update cloud storage: ", defaultSettings);
    });
}


// use local storage to save the flag of first intall (on this machine)
var last_open_version = localStorage['last_open_version'];

console.log('last_open_version = ', last_open_version);

// when first install, or update
if (last_open_version == undefined || parseFloat(last_open_version) < parseFloat(CURRENT_VERSION)) {
    // initialize the conf
    console.log("run init conf ");
    initializeConf();

    // limited by the execution order of js files
    // init conf should be run ahead of all other js files (except for base.js)
    // but show up the prompt requires spop, which requires the dom to be loaded
    // so it will be left to update.js to update the value of last_open_version
}
