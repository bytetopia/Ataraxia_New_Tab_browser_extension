import fs from 'node:fs';
const packageJson = JSON.parse(fs.readFileSync('../package.json', 'utf8'));

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  default_locale: 'en',
  /**
   * if you want to support multiple languages, you can use the following reference
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
   */
  name: '__MSG_extension_name__',
  version: packageJson.version,
  description: '__MSG_extension_desc__',
  author: 'Anthony',
  permissions: [
    'storage'
  ],
  optional_permissions: [
    "topSites"
  ],
  host_permissions: [
    "https://*.bing.com/"
  ],
  options_page: 'options/index.html',
  background: {
    service_worker: 'background.iife.js',
    type: 'module',
  },
  action: {
    default_icon: 'ata_32.png',
  },
  chrome_url_overrides: {
    newtab: 'newtab/index.html',
  },
  icons: {
    16: "ata_16.png",
    32: "ata_32.png",
    48: "ata_48.png",
    128: "ata_128.png"
  },
  web_accessible_resources: [
    {
      resources: ['*.js', '*.css', '*.svg', 'ata_16.png', 'ata_32.png', 'ata_48.png', 'ata_128.png'],
      matches: ['*://*/*'],
    },
  ],
};

export default manifest;
