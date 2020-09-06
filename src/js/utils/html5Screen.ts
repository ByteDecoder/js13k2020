const docElmWithBrowsersFullScreenFunctions = document.getElementById(
  'game-canvas'
) as HTMLElement & {
  mozRequestFullScreen(): Promise<void>;
  webkitRequestFullscreen(): Promise<void>;
  msRequestFullscreen(): Promise<void>;
};

const docWithBrowsersExitFunctions = document as Document & {
  mozCancelFullScreen(): Promise<void>;
  webkitExitFullscreen(): Promise<void>;
  msExitFullscreen(): Promise<void>;
};

export const openFullscreen = (): void => {
  if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
    docElmWithBrowsersFullScreenFunctions.requestFullscreen();
  } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) {
    /* Firefox */
    docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
  } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
  } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) {
    /* IE/Edge */
    docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
  }
};

/* Close fullscreen */
export const closeFullscreen = (): void => {
  if (docWithBrowsersExitFunctions.exitFullscreen) {
    docWithBrowsersExitFunctions.exitFullscreen();
  } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) {
    /* Firefox */
    docWithBrowsersExitFunctions.mozCancelFullScreen();
  } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    docWithBrowsersExitFunctions.webkitExitFullscreen();
  } else if (docWithBrowsersExitFunctions.msExitFullscreen) {
    /* IE/Edge */
    docWithBrowsersExitFunctions.msExitFullscreen();
  }
};
