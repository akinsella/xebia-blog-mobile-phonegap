define( [ 'models/CollectionModel', 'text!templates/tag/collection.html' ],
    function( collectionModel, tagCollectionTpl ) {

    console.log("Loaded router.js");

    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    return new $.mobile.Router({
        "#tagPage" : { handler : "onBeforeTagPageShow", events: "bs" }
    },
    {
        onBeforeTagPageShow: function(type, match, ui) {
            var modelType = "Tag";
            if (!match) {
                return;
            }
            if (!collectionModel.views.tagView) {
                console.log("Loading " + modelType + " View");
                collectionModel.views.tagView = new collectionModel.EntryListView({
                    fetchUrl: '/get_tag_index/?exclude=slug,description,parent&callback=?',
                    el: "#tags",
                    collectionTemplate: tagCollectionTpl,
                    parse: function(data) {
                        return data.tags;
                    }
                });
            }
            if (collectionModel.views.tagView.collection.length === 0) {
                console.log("Fetch " + modelType + " Data");
                collectionModel.views.tagView.collection.fetch();
            }
            else {
                collectionModel.views.tagView.render();
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
