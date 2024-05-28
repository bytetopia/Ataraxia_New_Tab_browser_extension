import '@src/Newtab.css';
import '@src/Newtab.scss';
import {
  exampleThemeStorage,
  useStorageSuspense,
  withErrorBoundary,
  withSuspense,
  loadLocalStorageWallpaper,
  updateWallpaper,
  getPrevOrNextWallpaper,
} from '@chrome-extension-boilerplate/shared';
import LoadingAnimated from './LoadingAnimated';
import { useEffect, useState } from 'react';


const Newtab = () => {
  const theme = useStorageSuspense(exampleThemeStorage);
  const [showMenu, setShowMenu] = useState(false);
  const [wallpaperImage, setWallpaperImage] = useState('luke-chesser-pJadQetzTkI-unsplash.jpg');
  const [wallpaperInfoText, setWallpaperInfoText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPrevNextButton, setShowPrevNextButton] = useState(false);
  const [isUHD, setIsUHD] = useState(false);

  const refreshWallpaper = async () => {
    setIsLoading(true);
    let info = loadLocalStorageWallpaper();
    if (info !== undefined) {
      setWallpaperImage(info.url);
      setWallpaperInfoText(info.copyright);
    }
    setIsLoading(false);

    // check and update wallpaper
    let shouldUpdate = await updateWallpaper();
    if (shouldUpdate) {
      info = loadLocalStorageWallpaper(); // now it's new wallpaper in local storage
    }
    console.log(info);
    if (info?.url !== undefined && info?.copyright !== undefined) {
      setWallpaperImage(info?.url);
      setWallpaperInfoText(info?.copyright);
    }
  }

  const goToPrevOrNextWallpaper = async (isPrev: boolean) => {
    let prevInfo = wallpaperInfoText;
    setWallpaperInfoText("Loading...");
    let res = await getPrevOrNextWallpaper(isPrev);
    if (res) {
      let info = loadLocalStorageWallpaper();
      if (info !== undefined) {
        setWallpaperImage(info.url);
        setWallpaperInfoText(info.copyright);
        return;
      }
    }
    setWallpaperInfoText(prevInfo); 
  }

  useEffect(() => {
    refreshWallpaper();
  }, []);

  return (
  <>
    {isLoading ? 
      <LoadingAnimated />
      :
      <div className="App relative min-h-screen bg-gray-100" style={{ 
        backgroundImage: 'url(\'' + wallpaperImage + '\')', 	
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
          <div className="absolute ml-[5%] mt-[20%] md:mt-[15%] lg:mt-[15%]">
            <div className="flex flex-row justify-center items-start">
              <img src="icons/google.png" alt="logo" className="h-10 mr-5" />
              <input type="text" className="text-base pl-3 pr-3 h-10 min-w-64 w-80 mr-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Search..." />
            </div>
          </div>
          <div onMouseEnter={() => setShowPrevNextButton(true)} onMouseLeave={() => setShowPrevNextButton(false)} 
              className="absolute bottom-[20px] right-[20px] rounded-lg hover:bg-black hover:bg-opacity-75 px-3 py-2">
            <div className={ (showPrevNextButton ? "inline-block" : "hidden") + " text-right text-white flex flex-row-reverse mb-1"}>
              <a download="" href={wallpaperImage} target="_blank" title="Download wallpaper" className="ml-1 inline-block flex flex-row">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3050" width="18" height="18"><path d="M512.01483154 141.3103025c8.52813721 0 15.79064917 2.99102759 21.85675026 9.06701684 6.02655053 6.08093262 9.05712867 13.2890625 9.05712937 21.83697533v388.8138423l70.74151588-70.96893311c5.93261719-5.97216773 13.24951195-8.85443115 21.9506836-8.85443115 8.84454369 0 16.20098901 2.88226342 22.08911156 8.75061035 5.88317847 5.87329102 8.80004906 13.2890625 8.80004835 22.14843774 0 8.65173364-2.95642114 15.96368432-8.91375732 21.93585206l-123.58135939 123.59619164c-5.95239281 5.87329102-13.2643435 8.85937523-21.98034667 8.85937452-8.71105981 0-16.02795386-2.98608422-21.98034669-8.85937452l-123.56158447-123.59619165c-5.97216773-6.27868676-8.92858886-13.59558082-8.92858887-21.93585205 0-8.55285621 3.00585914-15.86480689 9.07196022-21.94079613 6.01666236-5.97216773 13.30883813-9.06207276 21.83697533-9.06207276 8.71600318 0 16.02795386 2.98608422 21.97045851 8.96319604l70.72174096 70.96398902V172.11047387c0-8.44409203 3.01080323-15.76098609 9.07690429-21.83697533C496.268677 144.3013308 503.5460205 141.21142578 512.0791018 141.21142578l-0.06427026 0.09887672z m92.69219948 123.59619164h123.59619164c25.57946753 0 47.42633033 8.96319604 65.52575684 27.09228492 18.10931396 18.1290896 27.16149926 39.96112085 27.16149925 65.60485864v432.48779297c0 25.64868188-9.0521853 47.48071313-27.16149925 65.60485863-18.09448242 18.03021217-39.9462893 27.09228492-65.53070093 27.09228492h-432.58666969c-25.57452416 0-47.43127442-9.06207276-65.54058838-27.09228492C212.06170654 837.57708717 203.00952125 815.74011254 203.00952125 790.09143067V357.60363769c0-25.64373779 9.0521853-47.47576904 27.16149926-65.60485863s39.96606422-27.09228492 65.54058837-27.09228492h123.5813601v61.79809547H295.71160888c-8.52813721 0-15.80053734 2.99102759-21.86663841 8.96319604-6.01666236 6.17980933-9.05712867 13.3928833-9.05712867 21.94079613v432.58666968c0 8.44409203 3.04046631 15.75604272 9.05712867 21.73315454 6.06610107 6.17980933 13.33850122 9.16589356 21.86663841 9.16589355h432.58666969c8.52813721 0 15.81042481-2.98608422 21.83697534-9.16589355 6.06610107-5.97711182 9.0769043-13.2890625 9.07690429-21.73315454v-432.58666968c0-8.55285621-3.01080323-15.76098609-9.07690429-21.94079613-6.02655053-5.97216773-13.30883813-8.95825195-21.83697534-8.95825196H604.70703102v-61.79809546z" p-id="3051" fill="#ffffff"></path></svg>
                Download
              </a>
              <div title="Next wallpaper" onClick={() => goToPrevOrNextWallpaper(false)} className="ml-1 inline-block flex flex-row">
                <svg viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2454" width="16" height="16"><path d="M740.07331363 141.33502221c13.09501624 0 24.03945947 4.38766503 32.96928381 13.39164711l324.44000245 324.316406C1106.41860453 488.05323768 1110.84952799 498.9976809 1110.84952799 512c0 13.1320951-4.43092346 24.07653833-13.3669281 32.95692468l-324.44000245 324.44000244c-8.93600464 9.01634193-19.87426758 13.3916471-32.96928381 13.3916471-13.2618711 0-24.34844947-4.37530518-33.11759996-13.1320951-8.80622864-8.88656592-13.22479224-19.96078515-13.22479225-33.21647668 0-13.0023191 4.48036218-23.94676232 13.37928796-32.95692467L952.66494265 558.34857177H230.24520364c-12.79220581 0-23.69338989-4.51126075-32.77153038-13.5214231C188.40789262 535.69338989 183.87809244 524.87872338 183.87809244 512c0-12.74894738 4.52980018-23.68721032 13.59558082-32.70355224C206.55799333 470.16268897 217.45917741 465.65142823 230.23902408 465.65142823h722.42591857L707.11020938 220.51692223c-8.89892578-8.88038635-13.37928796-19.95460487-13.37928796-32.95692467 0-13.2618711 4.4185636-24.33609033 13.22479225-33.08670068C715.72486344 145.58673096 726.81144182 141.21142578 740.07331363 141.21142578v0.12359643z" p-id="2455" fill="#ffffff"></path></svg>
                Next
              </div>
              <div title="Previous wallpaper" onClick={() => goToPrevOrNextWallpaper(true)} className="ml-1 inline-block flex flex-row">
                <svg viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2156" width="16" height="16"><path d="M554.64194766 141.21142578c12.79220581 0 23.71810889 4.50508117 32.77152968 13.64501953 9.05960107 9.01016235 13.59558082 19.95460487 13.59558153 32.6911924 0 13.1320951-4.57305932 24.07653833-13.76861596 32.95692466l-245.12832642 245.09124757h722.35794044c12.79838538 0 23.69338989 4.50508117 32.81478882 13.64501953 9.02252221 9.01016235 13.56468224 19.94842529 13.56468224 32.69119239 0 12.87872338-4.54216003 23.81698632-13.57086182 32.82714867-9.11521935 9.01016235-20.01022315 13.51524353-32.80242896 13.51524353H342.11829606l245.12214685 245.09124756c9.19555664 9.01016235 13.76861596 19.95460487 13.76861596 32.9507444 0 12.8725431-4.53598046 23.81698632-13.59558153 32.82714867-9.05342078 9.13993836-19.98550415 13.64501953-32.77152968 13.64501953-13.05175781 0-24.03945947-4.50508117-32.95692467-13.38546753L197.2573804 545.01872253C188.34609476 535.62541175 183.87809244 524.54501367 183.87809244 512.06179786c0-12.60681153 4.46800232-23.55125404 13.37928796-32.95074439l324.42764259-324.37820459C530.8620402 145.84628296 541.84356156 141.33502221 554.64194766 141.33502221V141.21142578z" p-id="2157" fill="#ffffff"></path></svg>
                Prev
              </div>
            </div>
            <div className="text-right text-white">
              <p>{wallpaperInfoText}</p>
            </div>
          </div>
        </div>
      </div>
    }
  </>);
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
