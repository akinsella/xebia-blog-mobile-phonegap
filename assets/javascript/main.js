require.config({
    paths: {
        'text':              'javascript/lib/require/require.text-1.0.2',
        'order':             'javascript/lib/require/require.order-1.0.5',
        'jquery':            'javascript/lib/jquery/jquery-1.7.1',
        'backbone':          'javascript/lib/backbone/backbone-0.9.1',
        'underscore':        'javascript/lib/underscore/underscore-1.3.1',
        'jqm':               'javascript/lib/jquerymobile/jquery.mobile-1.0.1',
        'jqmr':              'javascript/lib/jquerymobile/jquery.mobile.router-0.6',
        'lawnchair':         'javascript/lib/lawnchair/lawnchair-0.6.1',
        'date':              'javascript/lib/date',
        'router':            'javascript/router',
        'core':              'javascript/core',
        'app':               'javascript/app',
        'utils':             'javascript/utils'
    },
    baseUrl: 'assets'
});

//require(['require', 'backbone', 'jquery', 'underscore' ], function( require, Backbone, $, _ ) {
require(['require', 'jquery', 'order!underscore', 'order!backbone' ],
    function( require, $, _, Backbone ) {

    //    // Exposing globals just in case that we are switching to AMD version of the lib later
        var global = this;

        global.$ = global.$ || $;
        global._ = global._ || _;
        global.Backbone = global.Backbone || Backbone;
        console.log('core libs loaded');

    //    console.log("Loaded main.js");
        console.log("Loading main.js");

        $(document).bind("mobileinit", function() {

            $.mobile.defaultPageTransition = 'fade';
    //        $.mobile.hashListeningEnabled = false;
            $.mobile.pushStateEnabled = false;
    //        $.mobile.autoInitializePage = false;

            $.mobile.jqmRouter = {};
            $.mobile.jqmRouter.fixFirstPageDataUrl = true;
            $.mobile.jqmRouter.firstPageDataUrl = "index.html";


            console.log("jqm is loaded");
            $('body').show();
        });


        require(['require', 'jqmr', 'order!jqm', 'order!app'],
            function (require) {
                console.log("Loading jqm, jqmr, app");
                require('app').init();
            });

});
