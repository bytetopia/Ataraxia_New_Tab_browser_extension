import '@src/Newtab.css';
import '@src/Newtab.scss';
import {
  exampleThemeStorage,
  useStorageSuspense,
  withErrorBoundary,
  withSuspense,
  getWallpaper,
} from '@chrome-extension-boilerplate/shared';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';

const Newtab = () => {
  const theme = useStorageSuspense(exampleThemeStorage);
  const [showMenu, setShowMenu] = useState(false);
  const [wallpaperImage, setWallpaperImage] = useState('');
  const [wallpaperInfoText, setWallpaperInfoText] = useState('');

  const updateWallpaper = async () => {
    let res = await getWallpaper(1, true);
    const img = new Image();
    img.src = res.url;
    img.onload = () => {
      setWallpaperImage(res.url);
      setWallpaperInfoText(res.copyright);
    }
    img.onerror = () => {
      setWallpaperInfoText('error during loading latest wallpaper, please refresh the page.');
    }
  }

  useEffect(() => {
    updateWallpaper();
  }, []);

  return (
    <div className="App relative min-h-screen bg-gray-100" style={{ 
      backgroundImage: 'url(\'' + (wallpaperImage !== '' ? wallpaperImage : 'luke-chesser-pJadQetzTkI-unsplash.jpg') + '\')', 	
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
      }}>
      <div className="">
        <div className="absolute top-[30px] right-[30px]">
          <div className="">
            <button onMouseEnter={() => !showMenu ? setShowMenu(true) : {}}>
              <svg className="icon h-4 w-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6899" width="16" height="16"><path d="M40.083 452.523h413.703V38.821H40.083v413.702z m0 531.898h413.703V570.718H40.083v413.703z m531.903-945.6v413.702h413.702V38.821H571.986z m0 945.6h413.702V570.718H571.986v413.703z" fill="#ffffff" p-id="6900"></path></svg>
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" onMouseLeave={() => showMenu ? setShowMenu(false) : {}}>
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="absolute ml-[5%] mt-[15%]">
          <div className="flex flex-row justify-center items-start">
            <img src="icons/google.png" alt="logo" className="h-10 mr-5" />
            <input type="text" className="pl-3 h-10 min-w-64 w-96 mr-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Search..." />
          </div>
        </div>
        <div className="absolute bottom-[30px] right-[30px]">
          <div className="text-right text-white">
            <p>{wallpaperInfoText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
