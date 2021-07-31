const cacheName = "offlineV1";

const urlsToCache = [
  "/index.html", 
  "/pages/friendsView.html", 
  "/pages/gift_idea.html",
  "/pages/home.html",
  "/pages/resetpassword.html",
  "/pages/underConstruction.html",
  "/js/addgifts.js",
  "/js/auth.js",
  "/js/firebase.js",
  "/js/friends.js",
  "/js/friendsView.js",
  "/js/geolocation.js",
  "/js/home.js",
  "/js/imageCapture.js",
  "/js/main.js",
  "/js/pageDisplay.js",
  "/js/pageDisplayIntro.js",
  "/js/resetpassword.js",
  "/icons/cameraIcons/CameraIcon.svg",
  "/icons/cameraIcons/GalleryIcon.svg",
  "/icons/demoimages/demoimage1.png",
  "/icons/demoimages/demoimage2.png",
  "/icons/demoimages/demoimage3.png",
  "/icons/demoimages/Ellipsis1.png",
  "/icons/demoimages/Ellipsis2.png",
  "/icons/demoimages/Ellipsis3.png",
  "/icons/footerIcons/friendsIcon.svg",
  "/icons/footerIcons/HomeIcon.svg",
  "/icons/footerIcons/listIcon.svg",
  "/icons/footerIcons/storesIcon.svg",
  "/icons/misc images/underconstruction1.png",
  "/icons/android-icon-96x96.png",
  "/icons/android-icon-144x144.png",
  "/icons/android-icon-192x192.png",
  "/icons/apple-icon-57x57.png",
  "/icons/apple-icon-60x60.png",
  "/icons/apple-icon-72x72.png",
  "/icons/apple-icon-76x76.png",
  "/icons/apple-icon-114x114.png",
  "/icons/apple-icon-120x120.png",
  "/icons/apple-icon-144x144.png",
  "/icons/apple-icon-152x152.png",
  "/icons/apple-icon-180x180.png",
  "/icons/apple-icon-precomposed.png",
  "/icons/apple-icon.png",
  "/icons/camera-shutter-click-03.mp3",
  "/icons/favicon-16x16.png",
  "/icons/favicon-32x32.png",
  "/icons/favicon-96x96.png",
  "/icons/image.png",
  "/icons/Logo_white_100.png",
  "/icons/Logo_white_150.png",
  "/icons/Logo_white_200.png",
  "/icons/logo1.png",
  "/icons/ms-icon-70x70.png",
  "/icons/ms-icon-144x144.png",
  "/icons/ms-icon-150x150.png",
  "/icons/ms-icon-310x310.png",
  "/media/My Movie.mp4",
  "/manifest.json",
  "/favicon.ico",
  "/style.css",
  "/style.css.map"];

self.addEventListener("install", (event) => {

  console.log(`Event fired: ${event.type}`);
  console.dir(event);

  event.waitUntil(
    caches.open( cacheName )
    .then( ( cache ) => {
    return cache.addAll( urlsToCache );
    }));
});

self.addEventListener("activate", (event) => {

  console.log(`Event fired: ${event.type}`);
  console.dir(event);

  event.waitUntil(
    caches.keys().then( (keyList ) => {
    return Promise.all( keyList.map( (key) => {
    if ( key !== cacheName ) {
    return caches.delete ( key );
    }
    }) );
    })
  );
});

// Cache First then Network Strategy

self.addEventListener('fetch', (event) => {

  console.log(`Fetching ${event.request.url}`);

  event.respondWith(
    caches.match( event.request )
    .then((response) => {
      return response || fetch( event.request );
    })
  );
});


