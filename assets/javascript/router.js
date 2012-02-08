define( [ 'models/TagModel' ],
    function( tagModel ) {

    console.log("Loaded router.js");

    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    return new $.mobile.Router({
        "#tagPage" : { handler : "tag", events: "bs" }
    },
    {
        tag: function(type, match, ui) {
            if (!match) {
                return;
            }
            if (!tagModel.view) {
                console.log("Loading Tag View");
                tagModel.view = new tagModel.views.TagListView({ collection : new tagModel.collections.TagCollection() });
            }
            if (tagModel.view.collection.length === 0) {
                console.log("Fetch Tag Data");
                tagModel.view.collection.fetch();
            }
            else {
                tagModel.view.render();
            }
        },
        category: function() {
            appMobile.utils.changePage( "#categoryPage", "fade", false, false );
        },
        author: function () {
            appMobile.utils.changePage( "#authorPage", "fade", false, false );
        },
        options: function() {
            appMobile.utils.changePage( "#optionPage", "fade", false, false );
        },
        root: function() {
            appMobile.utils.changePage( "#homePage", "fade", false, false );
        }
    });

} );
