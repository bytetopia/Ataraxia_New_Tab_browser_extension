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
import { Input, Tooltip } from '@mui/joy';
import CircularProgress from '@mui/joy/CircularProgress';
import IconButton from '@mui/joy/IconButton';
import Menu, { menuClasses } from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import { Apps, Update, Edit, Settings } from '@mui/icons-material';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import { useEffect, useState } from 'react';


const Newtab = () => {
  const theme = useStorageSuspense(exampleThemeStorage);
  const [showTopSitesMenu, setShowTopSitesMenu] = useState(false);
  const [showSearchEngineMenu, setShowSearchEngineMenu] = useState(false);
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
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="neutral" size="sm" variant="solid"/>
      </div>
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
            <Dropdown>
              <MenuButton
                onMouseEnter={() => setShowTopSitesMenu(true)}
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
              >
                <Apps className="text-white"/>
              </MenuButton>
              <Menu placement="bottom-end" open={showTopSitesMenu} onMouseLeave={() => setShowTopSitesMenu(false)}>
                <MenuItem>
                  <ListItemDecorator>
                    <Edit />
                  </ListItemDecorator>{' '}
                  Edit post 233
                </MenuItem>
                <MenuItem disabled>
                  <ListItemDecorator />
                  Draft post
                </MenuItem>
                <ListDivider />
                <MenuItem color="primary">
                  <ListItemDecorator sx={{ color: 'inherit' }}>
                    <Update />
                  </ListItemDecorator>{' '}
                  Check for update
                </MenuItem>
                <MenuItem color="primary">
                  <ListItemDecorator sx={{ color: 'inherit' }}>
                    <Settings />
                  </ListItemDecorator>{' '}
                  Settings
                </MenuItem>
              </Menu>
            </Dropdown>
            </div>
          </div>
          <div className="absolute ml-[5%] mt-[20%] md:mt-[15%] lg:mt-[15%]">
            <div className="flex flex-row justify-center items-start">
              <Dropdown>
                <MenuButton
                  onMouseEnter={() => setShowSearchEngineMenu(true)}
                  slots={{ root: IconButton }}
                  slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                >
                  <img src="icons/google.png" alt="logo" className="h-10 mr-5" onMouseEnter={() => setShowSearchEngineMenu(true)}/>
                </MenuButton>
                <Menu placement="bottom-start" open={showSearchEngineMenu} onMouseLeave={() => setShowSearchEngineMenu(false)}>
                  <MenuItem>
                    <ListItemDecorator>
                      <Edit />
                    </ListItemDecorator>{' '}
                    Edit post 233
                  </MenuItem>
                  <MenuItem disabled>
                    <ListItemDecorator />
                    Draft post
                  </MenuItem>
                  <ListDivider />
                  <MenuItem color="primary">
                    <ListItemDecorator sx={{ color: 'inherit' }}>
                      <Update />
                    </ListItemDecorator>{' '}
                    Check for update
                  </MenuItem>
                  <MenuItem color="primary">
                    <ListItemDecorator sx={{ color: 'inherit' }}>
                      <Settings />
                    </ListItemDecorator>{' '}
                    Settings
                  </MenuItem>
                </Menu>
              </Dropdown>
              <Input size="lg" className="min-w-64 w-80" placeholder="Search..."/>
            </div>
          </div>
          <div onMouseEnter={() => setShowPrevNextButton(true)} onMouseLeave={() => setShowPrevNextButton(false)} 
              className="absolute bottom-[20px] right-[20px] rounded-lg hover:bg-black hover:bg-opacity-75 px-3 py-2">
            <div className={ (showPrevNextButton ? "inline-block" : "hidden") + " text-right text-white flex flex-row-reverse mb-1"}>
              <Tooltip title="Download" variant="solid">
                <a download="" href={wallpaperImage} target="_blank" className="ml-1 inline-block flex flex-row cursor-pointer">
                  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4621" width="16" height="16"><path d="M779.95324 65.291029 243.954663 65.291029c-98.579179 0-178.665169 79.997985-178.665169 178.709171l0 535.9996c0 98.713232 80.08599 178.711218 178.665169 178.711218l535.998577 0c98.755188 0 178.75522-79.997985 178.75522-178.711218L958.70846 244.0002C958.70846 145.289014 878.708428 65.291029 779.95324 65.291029zM869.374852 735.37751c0 73.977875-60.021002 133.912919-133.998877 133.912919L288.623002 869.290429c-73.979922 0-133.912919-59.935044-133.912919-133.912919L154.710083 288.667515c0-73.979922 59.932997-133.956921 133.912919-133.956921l446.752973 0c73.977875 0 133.998877 59.977 133.998877 133.956921L869.374852 735.37751zM288.623002 690.710194l446.752973 0 0 89.289606L288.623002 779.9998 288.623002 690.710194zM511.955486 646.043902 378.042567 467.376687l89.333608 0L467.376175 244.0002l89.245603 0 0 223.376487 89.421612 0L511.955486 646.043902z" p-id="4622" fill="#ffffff"></path></svg>
                </a>
              </Tooltip>
              <Tooltip title="Next" variant="solid">
                <div onClick={() => goToPrevOrNextWallpaper(false)} className="ml-1 inline-block flex flex-row cursor-pointer">
                  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4323" width="16" height="16"><path d="M628.050598 444.964234l-62.622246 67.039859L377.580033 310.980707l62.605873-67.01223L628.050598 444.964234zM958.70846 243.968477l0 536.105001c0 98.730629-79.971379 178.700985-178.700985 178.700985L243.903497 958.774463c-98.642624 0-178.61298-79.969333-178.61298-178.700985L65.290517 243.968477c0-98.642624 79.969333-178.744987 178.61298-178.744987l536.105001 0C878.73708 65.22349 958.70846 145.32483 958.70846 243.968477zM869.401458 288.599977c0-73.994248-60.075237-133.939525-134.069485-133.939525L288.578999 154.660452c-74.03825 0-134.027529 59.945277-134.027529 133.939525l0 446.797999c0 73.994248 59.989279 134.069485 134.027529 134.069485l446.752973 0c73.994248 0 134.069485-60.075237 134.069485-134.069485L869.401458 288.599977zM565.442678 512.020466l-0.01535-0.016373L377.580033 713.103204l62.605873 67.056232 250.470565-268.13897-62.605873-67.056232L565.442678 512.020466z" p-id="4324" fill="#ffffff"></path></svg>
                </div>
              </Tooltip>
              <Tooltip title="Previous" variant="solid">
                <div onClick={() => goToPrevOrNextWallpaper(true)} className="ml-1 inline-block flex flex-row cursor-pointer">
                  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4025" width="16" height="16"><path d="M780.007475 65.22349 243.903497 65.22349c-98.642624 0-178.61298 80.101339-178.61298 178.744987l0 536.105001c0 98.730629 79.969333 178.700985 178.61298 178.700985l536.105001 0c98.728582 0 178.700985-79.969333 178.700985-178.700985L958.709483 243.968477C958.70846 145.32483 878.73708 65.22349 780.007475 65.22349zM869.44546 735.397976c0 73.994248-60.119239 134.069485-134.113487 134.069485L288.667004 869.467461c-74.082252 0-134.071532-60.075237-134.071532-134.069485L154.595472 288.599977c0-73.994248 59.989279-133.939525 134.071532-133.939525l446.664969 0c73.994248 0 134.113487 59.945277 134.113487 133.939525L869.44546 735.397976zM333.254501 512.020466l62.561871-67.056232 250.602571 268.13897-62.60792 67.056232L333.254501 512.020466zM458.553229 512.020466l-62.73788-67.056232 187.994652-200.995757 62.60792 67.01223L458.553229 512.020466z" p-id="4026" fill="#ffffff"></path></svg>
                </div>
              </Tooltip>
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
