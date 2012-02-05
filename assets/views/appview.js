define( ['jquery', 'backbone', 'utils', 'models/TagCollection', 'models/CategoryCollection', 'models/AuthorCollection'],
function( $, Backbone, utils, TagCollection, CategoryCollection, AuthorCollection ) {

    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    return Backbone.View.extend( {
        el: $( "#appview" ),
        initialize: function() {
        },
        events: {
            "submit #queryForm" : "keyLoadResults",
            "change #sortBy": "keyLoadResults",
            "keydown #searchbox" : "handleKey"
        },

        setCollection: function( option ) {
            if ( option == 'tag' ) {
                this.tag_collection = new TagCollection;
            }
            else if ( option == 'category' ) {
                this.category_collection = new CategoryCollection;
            }
            else if ( option == 'author' ) {
                this.author_collection = new AuthorCollection;
            }
            else {
                console.log("No Collection Setted");
            }
        },

        handleKey : function( event ) {
        },


        keyLoadResults: function( event ) {
            return false;
        }
    } );

} );





