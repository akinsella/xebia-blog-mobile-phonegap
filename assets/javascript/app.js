define( ['backbone', 'views/appview', 'routers/workspace', 'utils'],
    function( Backbone, AppView, Workspace, utils ) {

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
            utils: utils,
            defaults: {
                resultsPerPage: 50
            }
        };

        Backbone.history.start();
    });

});
