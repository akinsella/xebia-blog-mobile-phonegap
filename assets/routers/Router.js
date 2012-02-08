define( ['jquery', 'backbone'],
    function( $, Backbone ) {

    console.log("Loaded router.js");

    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    return Backbone.Router.extend( {
        bookmarkMode:false,
        routes: {
            "tagPage":       "tag",        // #tagPage
            "tag/:id":       "tag",        // #tag/129
            "author/list":   "author",     // #author/list
            "author/:id":    "author",     // #author/41
            "category/list": "category",   // #category/list
            "category/:id":  "category",   // #category/342
            "option/view" :  "option",     // #option/view
            "option/edit" :  "option",     // #option/edit
            "":              "root"
        },
        tag: function() {
            this.bookmarkMode = true;
            appMobile.utils.changePage( "#tagPage", "fade", false, false );
        },
        category: function() {
            this.bookmarkMode = true;
            appMobile.utils.changePage( "#categoryPage", "fade", false, false );
        },
        author: function () {
            this.bookmarkMode = true;
            appMobile.utils.changePage( "#authorPage", "fade", false, false );
        },
        options: function() {
            this.bookmarkMode = true;
            appMobile.utils.changePage( "#optionPage", "fade", false, false );
        },
        root: function() {
            this.bookmarkMode = true;
            appMobile.utils.changePage( "#homePage", "fade", false, false );
        }
    } );

} );
