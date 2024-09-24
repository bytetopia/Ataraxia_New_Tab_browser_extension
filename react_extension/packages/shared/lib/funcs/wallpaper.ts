import { readConf, writeConf } from '../baseFuncs';

type WallpaperInfo = { url: string, copyright: string, imageUpdateDate: string, offsetIdx: number, isUHD: boolean }

const backgroundImageLSKey = 'backgroundImage';
const copyrightLSKey = 'copyright';
const imageUpdateDateLSKey = 'imageUpdateDate';
const imageOffsetIdxLSKey = 'imageOffsetIdx';
const isUHDLSKey = 'enable_uhd_wallpaper';
const isUHDDefaultValue = 'no';

const getDateString = (): string => {
	let date = new Date();
	let result = "" + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
	return result;
}

/* 
// Local storage has the limit of content size, so this method doesn't work well.
const saveImageToLocalStorage = (img: HTMLImageElement, copyright: string, offsetIdx: number) => {
	const canvas = document.createElement('canvas');
	canvas.width = img.width;
	canvas.height = img.height;

	const ctx = canvas.getContext('2d');
	if (ctx) {
		ctx.drawImage(img, 0, 0, img.width, img.height);
		const dataURL = canvas.toDataURL('image/jpg');
		writeConf(backgroundImageLSKey, dataURL);
		writeConf(copyrightLSKey, copyright);
		writeConf(imageUpdateDateLSKey, getDateString());
		writeConf(imageOffsetIdxLSKey, offsetIdx);
	}
};
*/

const saveWallpaperInfoToLocalStorage = (info: WallpaperInfo) => {
	writeConf(backgroundImageLSKey, info.url);
	writeConf(copyrightLSKey, info.copyright);
	writeConf(imageUpdateDateLSKey, getDateString());
	writeConf(imageOffsetIdxLSKey, info.offsetIdx);
	writeConf(isUHDLSKey, info.isUHD ? 'yes' : 'no');
};

const getWallpaperInfoFromBing = async (idx: number): Promise<WallpaperInfo> => {
	let isUHD = readConf(isUHDLSKey) === 'yes';
	let currentLang = window.navigator.language;
	let reqUrl = 'https://www.bing.com/HPImageArchive.aspx?format=js&n=1&mkt=' + currentLang + '&idx=' + idx;
	const response = await fetch(reqUrl);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
	let url = 'https://bing.com' + data.images[0].url;
	if (isUHD) {
		url = url.replaceAll('1920x1080', 'UHD');
	}
	return { url: url, copyright: data.images[0].copyright, imageUpdateDate: getDateString(), offsetIdx: idx, isUHD: isUHD };
}

const preloadImageFromUrl = async (url: string): Promise<HTMLImageElement> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject(new Error(`Failed to load image from ${url}`));
		img.src = url;
	});
}

const shouldUpdateWallpaper = (): boolean => {
	return getDateString() !== readConf(imageUpdateDateLSKey);
}

/**
 * Load latest wallpaper info if necessary and put the image and copyright info in localStorage.
 * If return value is true, you can fetch latest wallpaper info from localStorage via loadWallpaper.
 * @returns whether wallpaper info in localStorage is updated
 */
const updateWallpaper = async (): Promise<boolean> => {
	// skip update
	if (!shouldUpdateWallpaper()) {
		return false;
	}

	try {
		// fetch latest info from Bing
		let info = await getWallpaperInfoFromBing(0);
		// preload and save wallpaper info
		await preloadImageFromUrl(info.url);
		saveWallpaperInfoToLocalStorage(info);
		return true;
	}
	catch (error) {
		console.error(error);
		return false;
	}
}

/**
 * Load wallpaper info from local storage.
 * @returns wallpaper info.
 */
const loadLocalStorageWallpaper = (): WallpaperInfo | undefined => {
	let url = readConf(backgroundImageLSKey);
	let copyright = readConf(copyrightLSKey);
	let imageUpdateDate = readConf(imageUpdateDateLSKey);
	let offsetIdx = readConf(imageOffsetIdxLSKey);
	let isUHD = readConf(isUHDLSKey) === 'yes';
	if (url !== undefined && copyright !== undefined && imageUpdateDate !== undefined && offsetIdx !== undefined && isUHD !== undefined) {
		return { url, copyright, imageUpdateDate, offsetIdx, isUHD };
	}
	return undefined;
};

/**
 * Get prev or next wallpaper
 * @returns True means wallpaper info in local storage is updated, false means no change. 
 */
const getPrevOrNextWallpaper = async (isPrev: boolean): Promise<boolean> => {
	let offsetIdx = readConf(imageOffsetIdxLSKey);
	if (isPrev) {
		if (offsetIdx >= 7) { // Bing API supports offset index maximum number 7
			return false;
		}
		offsetIdx += 1;
	}
	else {
		if (offsetIdx <= 0) { // can't go to next wallpaper
			return false;
		}
		offsetIdx -= 1;
	}

	let info = await getWallpaperInfoFromBing(offsetIdx);
	await preloadImageFromUrl(info.url);
	saveWallpaperInfoToLocalStorage(info);
	return true;
} 

export { updateWallpaper, loadLocalStorageWallpaper, getPrevOrNextWallpaper };

