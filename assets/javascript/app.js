define( ['backbone', 'views/appview', 'routers/workspace', 'core', 'utils'],
    function( Backbone, AppView, Workspace, core, utils ) {

    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    $(function() {

        window.xebiaMobile = window.xebiaMobile || {
            views: {
                appview: new AppView()
            },
            routers: {
                workspace: new Workspace()
            },
            core: core,
            utils: utils,
            defaults: {

            }
        };

        Backbone.history.start();
    });

});
