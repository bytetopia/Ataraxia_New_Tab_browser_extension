import '@src/Newtab.css';
import '@src/Newtab.scss';
import {
  exampleThemeStorage,
  useStorageSuspense,
  withErrorBoundary,
  withSuspense,
} from '@chrome-extension-boilerplate/shared';
import { ComponentPropsWithoutRef } from 'react';

const Newtab = () => {
  const theme = useStorageSuspense(exampleThemeStorage);

  return (
    <div className="App" style={{ backgroundColor: '#222' }}>
      <div id="functions-div">
        <div id="functions-nav">
          <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6899" width="16" height="16"><path d="M40.083 452.523h413.703V38.821H40.083v413.702z m0 531.898h413.703V570.718H40.083v413.703z m531.903-945.6v413.702h413.702V38.821H571.986z m0 945.6h413.702V570.718H571.986v413.703z" fill="#ffffff" p-id="6900"></path></svg>
        </div>
        <div id="functions-child">
          <div id="top-sites-div"></div>
          <p className="bottom-links">
            <a id="check-update-btn" href="https://idealland.app/ataraxia/update.html?current=0.8" target="_blank">
              <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4548" width="16" height="16"><path d="M512.860729 1023.999431a511.992605 511.992605 0 1 1 511.139284-511.992604A511.594388 511.594388 0 0 1 512.860729 1023.999431z m201.156206-609.100535L553.080592 253.962554a56.888067 56.888067 0 0 0-80.439726 0L311.704523 414.898896a56.888067 56.888067 0 0 0 80.496616 80.439727L455.972662 431.5671V739.559095a56.888067 56.888067 0 0 0 113.776134 0V431.5671l63.771523 63.771523a56.888067 56.888067 0 1 0 80.496616-80.439727z" fill="#ffffff" p-id="4549"></path></svg>
              <span id="check-update-btn-text">Update</span>
            </a>
            &nbsp;&nbsp;
            <a id="open-options-btn">
              <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2296" width="16" height="16"><path d="M829.013333 553.6c1.706667-13.653333 2.986667-27.52 2.986667-41.6s-1.28-27.946667-2.986667-41.6l90.24-70.613333c8.106667-6.4 10.453333-17.92 5.12-27.306667l-85.333333-147.84c-5.333333-9.173333-16.426667-13.013333-26.026667-9.173333l-106.24 42.88c-21.973333-16.853333-46.08-31.146667-72.106666-42.026667L618.666667 103.253333c-1.92-10.026667-10.666667-17.92-21.333334-17.92h-170.666666c-10.666667 0-19.413333 7.893333-21.12 17.92l-16 113.066667a315.733333 315.733333 0 0 0-72.106667 42.026667L211.2 215.466667a21.333333 21.333333 0 0 0-26.026667 9.173333l-85.333333 147.84c-5.333333 9.173333-2.986667 20.693333 5.12 27.306667l90.026667 70.613333C193.28 484.053333 192 497.92 192 512s1.28 27.946667 2.986667 41.6l-90.026667 70.613333c-8.106667 6.4-10.453333 17.92-5.12 27.306667l85.333333 147.84c5.333333 9.173333 16.426667 13.013333 26.026667 9.173333l106.24-42.88c21.973333 16.853333 46.08 31.146667 72.106667 42.026667l16 113.066667c1.706667 10.026667 10.453333 17.92 21.12 17.92h170.666666c10.666667 0 19.413333-7.893333 21.12-17.92l16-113.066667a315.733333 315.733333 0 0 0 72.106667-42.026667l106.24 42.88a21.333333 21.333333 0 0 0 26.026667-9.173333l85.333333-147.84c5.333333-9.173333 2.986667-20.693333-5.12-27.306667l-90.026667-70.613333zM512 661.333333c-82.56 0-149.333333-66.773333-149.333333-149.333333s66.773333-149.333333 149.333333-149.333333 149.333333 66.773333 149.333333 149.333333-66.773333 149.333333-149.333333 149.333333z" p-id="2297" fill="#ffffff"></path></svg>
              <span id="open-options-btn-text">Settings</span>
            </a>

          </p>
        </div>
      </div>

      <div className="block" id="search-box-whole-block" style={{display:'block'}}>

        <div className="search" id="search-box">
          <form method="get" id="search-form" action="https://google.com/search" acceptCharset="UTF-8">
            <img id="search-logo" src="icons/google.png" title="click to switch search engine" />
            <input type="text" name="q" id="search-input" autoComplete="off" autoFocus={false} placeholder="Search with Google" />
          </form>
        </div>

      </div>

      <div className="bottom">

        <div className="loading-circle" id="loading-circle"></div>

        <div id="footer-op">
          <a id="change-wallpaper" title="change another wallpaper">
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6851" width="16" height="16"><path d="M512 23C241.38 23 22 242.38 22 513s219.38 490 490 490 490-219.38 490-490S782.62 23 512 23z m152.33 689.71c19.44 19.44 19.44 50.97 0 70.41-19.44 19.44-50.97 19.44-70.41 0l-234.7-234.7c-19.44-19.44-19.44-50.97 0-70.41 0.07-0.07 0.15-0.14 0.23-0.22 0.07-0.07 0.14-0.15 0.22-0.23l234.7-234.7c19.44-19.44 50.97-19.44 70.41 0 19.44 19.44 19.44 50.97 0 70.41L464.84 513.22l199.49 199.49z" p-id="6852" fill="#ffffff"></path></svg>
          </a>
          <span id="footer-text">Welcome to Ataraxia.</span>
          <a id="wallpaper-download-link" download="" href="" target="_blank" title="download wallpaper from Bing.com">
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1962" width="16" height="16"><path d="M919.724 715.073c-1.14-27.354-19.024-42.46-42.619-41.9-23.378 0.555-38.8 15.93-40.994 43.89-1.61 20.54-0.232 41.299-0.677 61.951-1.115 51.829-12.339 63.805-64.15 64.827-49.91 0.985-99.854 0.323-149.782 0.327-115.351 0.01-230.704 0.094-346.056-0.065-79.44-0.11-86.325-6.973-86.704-84.204-0.069-13.77 0.625-27.626-0.64-41.293-2.692-29.088-16.328-44.222-39.415-45.527-24.92-1.412-43.084 15.533-44.99 45.495-1.742 27.442-0.763 55.071-0.582 82.615 0.59 89.17 40.096 129.183 129.294 129.692 92.967 0.532 185.939 0.119 278.91 0.14 27.546 0.023 55.094 0.032 82.64 0.022 70.59-0.025 141.195 0.957 211.759-0.393 62.212-1.19 107.706-37.177 112.958-91.757 3.941-40.953 2.765-82.6 1.048-123.82z" fill="#ffffff" p-id="1963"></path><path d="M197.858 440.866c88.757 88.806 177.526 177.602 266.293 266.398 3.647 3.65 7.362 7.23 10.984 10.903 14.285 14.481 30.948 22.644 51.135 14.996 6.585-2.495 11.48-6.255 15.665-10.523 2.763-1.912 5.47-4.017 7.93-6.408 45.635-44.375 240.102-239.468 285.027-284.574 4.826-4.845 9.464-10.053 13.27-15.71 12.213-18.165 10.54-35.96-3.947-51.855-14.818-16.257-33.48-16.94-51.874-7.894-8.93 4.39-16.286 12.46-23.557 19.673-30.24 29.99-139.611 139.264-212.845 212.61 0.038-114.56 0.05-229.12 0.027-343.68-0.006-34.399 1.091-68.86-0.615-103.176-1.587-31.878-17.058-48.14-41.969-48.957-25.551-0.839-41.055 14.728-44.538 46.158-1.32 11.908-0.623 24.054-0.63 36.092-0.04 75.676-0.02 151.355-0.02 227.034-0.002 56.59 0 113.181 0 169.773l-11.785 5.215c-22.75-22.663-45.526-45.304-68.245-67.997-47.453-47.405-94.29-95.445-142.576-141.985-21.8-21.014-47.07-21.359-64.429-4.84-18.71 17.803-18.05 39 2.326 63.95 4.334 5.306 9.512 9.931 14.373 14.797z" fill="#ffffff" p-id="1964"></path></svg>
            <span id="uhd-badge"></span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);