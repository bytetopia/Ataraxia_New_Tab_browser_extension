
// javascript code for option operations in main page

function openOptions() {
	window.open(chrome.runtime.getURL('options.html'));
}

var op_btn = document.getElementById('open-options-btn');
op_btn.onclick = openOptions;
