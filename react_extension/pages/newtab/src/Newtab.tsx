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

  const updateWallpaper = async () => {
    let res = await getWallpaper(1, true);
    console.log(res);
    setWallpaperImage(res.url);
  }

  useEffect(() => {
    updateWallpaper();
  }, []);

  return (
    <div className="App" style={{ backgroundImage: wallpaperImage }}>
      <div className="flex flex-col h-screen">
        <div className="flex justify-end p-4">
          <div className="relative">
            <button onClick={() => setShowMenu(!showMenu)}>
              <svg className="icon h-4 w-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6899" width="16" height="16"><path d="M40.083 452.523h413.703V38.821H40.083v413.702z m0 531.898h413.703V570.718H40.083v413.703z m531.903-945.6v413.702h413.702V38.821H571.986z m0 945.6h413.702V570.718H571.986v413.703z" fill="#ffffff" p-id="6900"></path></svg>
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-grow items-center justify-start pl-20" style={{marginTop: 'calc(-30%)'}}>
          <div className="flex flex-row justify-center items-start">
            <img src="icons/google.png" alt="logo" className="h-10 mr-5" />
            <input type="text" className="pl-3 h-10 w-300 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Search..." />
          </div>
        </div>
        <div className="flex justify-end p-4">
          <div className="text-right text-white">
            <p>Some information</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
