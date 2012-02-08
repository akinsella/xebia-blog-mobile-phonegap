require.config({
    paths: {
        'text':              'javascript/lib/require/require.text-1.0.2',
        'order':              'javascript/lib/require/require.order-1.0.5',
        'jquery':            'javascript/lib/jquery/jquery-1.7.1',
        'backbone':          'javascript/lib/backbone/backbone-0.9.1',
        'underscore':        'javascript/lib/underscore/underscore-1.3.1',
        'jquerymobile':      'javascript/lib/jquery.mobile-1.0.1/jquery.mobile-1.0.1',
        'lawnchair':         'javascript/lib/lawnchair/lawnchair-0.6.1',
        'date':              'javascript/lib/date',
        'core':              'javascript/core',
        'app':               'javascript/app',
        'utils':             'javascript/utils'
    },
    baseUrl: 'assets'
});

require(['require', 'backbone', 'jquery', 'underscore' ], function( require, Backbone, $, _ ) {

    console.log("Loaded main.js");

    $(document).bind("mobileinit", function() {

        console.log("jqm is loaded");
//        document.getElementsByTagName('html')[0].style.display="block";
    });

    require(['jquerymobile', 'app'], function(jqm, app) {
        console.log("Loading jqm & app");

    });

});
