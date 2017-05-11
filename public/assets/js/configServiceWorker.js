//cache in service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
    // navigator.serviceWorker
    //     .register('/sw.js', { scope: './' })
    //     .then(function(registration) {
    //         console.log("Service worker registred", registration);
    //     })
    //     .catch(function(err) {
    //         console.log("Service worker failed to register", err);
    //     })
}