define( ['backbone', 'views/appview', 'routers/router', 'core', 'utils'],
    function( Backbone, AppView, Router, core, utils ) {

    console.log("Loaded app.js");

    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    $(function() {

        console.log("jQuery is loaded");

        window.appMobile = window.appMobile || {
            models: {
                appview: new AppView()

            },
            collections: {

            },
            views: {

            },
            routers: {
                router: new Router()
            },
            core: core,
            utils: utils,
            defaults: {

            }
        };



        Backbone.history.start();

    });

    core.onMobileInit();

});
