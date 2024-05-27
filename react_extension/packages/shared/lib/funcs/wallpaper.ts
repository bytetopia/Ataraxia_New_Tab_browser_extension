
type WallpaperInfo = {url: string, copyright: string }

export default async function getWallpaper (idx: number, isUHD: boolean) : Promise<WallpaperInfo> {

	var currentLang = window.navigator.language;
	var url = 'https://www.bing.com/HPImageArchive.aspx?format=js&n=1&mkt=' + currentLang + '&idx=' + idx;
	const response = await fetch(url);
	if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
	var url = 'https://bing.com' + data.images[0].url;
	if (isUHD) {
		url = url.replaceAll('1920x1080', 'UHD');
	}
	return data;
	return { url: url, copyright: data.images[0].copyright};
}
