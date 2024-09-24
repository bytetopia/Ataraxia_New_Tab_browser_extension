import { readConf, writeConf } from '../baseFuncs';

const searchEngineLSKey = 'current_search_engine';
const searchEngineListLSKey = 'search_engine_list';

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
];