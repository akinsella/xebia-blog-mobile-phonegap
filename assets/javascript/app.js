define( ['router', 'core', 'utils'],
    function( router, core, utils ) {

    console.log("Loaded app.js");

    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    var app = {};

    app.init = function () {
        window.appMobile = window.appMobile || {
            models: {},
            collections: {},
            views: {},
            router: router,
            core: core,
            utils: utils
        };

        core.onMobileInit();

    };

    return app;


});
