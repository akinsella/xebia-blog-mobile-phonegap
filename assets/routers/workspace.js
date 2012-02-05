define( ['jquery', 'backbone'], function( $, Backbone ) {

    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    var Workspace = Backbone.Router.extend( {
        bookmarkMode:false,
        routes: {
            "tag/list":      "tag",        // #tag/list
            "tag/:id":       "tag",        // #tag/129
            "author/list":   "author",     // #author/list
            "author/:id":    "authorById", // #author/41
            "category/list": "category",   // #category/list
            "category/:id":  "category",   // #category/342
            "option/view" :  "option",     // #option/view
            "option/edit" :  "option",     // #option/edit
            "":              "root"
        },
        tag: function() {
            this.bookmarkMode = true;
            xebiaMobile.utils.changePage( "#tagPage", "fade", false, false );
        },
        category: function() {
            this.bookmarkMode = true;
            xebiaMobile.utils.changePage( "#categoryPage", "fade", false, false );
        },
        author: function ( id ) {
            this.bookmarkMode = true;
            xebiaMobile.utils.changePage( "#authorPage", "fade", false, false );
        },
        options: function() {
            this.bookmarkMode = true;
            xebiaMobile.utils.changePage( "#optionPage", "fade", false, false );
        },
        root: function() {
            this.bookmarkMode = true;
            xebiaMobile.utils.changePage( "#homePage", "fade", false, false );
        }
    } );

    return Workspace;
} );
