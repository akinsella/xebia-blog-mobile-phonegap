define( ['jquery', 'backbone', 'models/AuthorEntry', 'views/tagList'], function( $, Backbone, AuthorEntry, AuthorList ) {

    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    var AuthorCollection = Backbone.Collection.extend( {
        model: AuthorEntry,
        parse: function( response ) {
            return response;
        },
        initialize: function() {
            this.authorList = new AuthorList;
            this.bind( "reset", this.authorList.renderList );
        }
    } );

    return AuthorCollection;
});
            
