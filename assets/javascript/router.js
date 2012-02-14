define( [ 'utils', 'models/collection' ],
    function(utils, collectionModel ) {

    console.log("Loaded router.js");

    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    var DEFAULT_ITEM_BY_PAGE = 25;

    var router = {};

    try
      {
          router = new $.mobile.Router({
              "#tags" : { handler : "onBeforeTagPageShow", events: "bs" },
              "#categories" : { handler : "onBeforeCategoryPageShow", events: "bs" },
              "#authors" : { handler : "onBeforeAuthorPageShow", events: "bs" },
              "#posts(?:[?](.*))?" : { handler : "onBeforePostPageShow", events: "bs" }
          },
          {
              onBeforeTagPageShow: function(type, match, ui) {
                  router.refreshTags();
              },
              onBeforeCategoryPageShow: function(type, match, ui) {
                  router.refreshCategories();
              },
              onBeforeAuthorPageShow: function(type, match, ui) {
                  router.refreshAuthors();
              },
              onBeforePostPageShow: function(type, match, ui) {
                  router.refreshPosts(type, match, ui);
              },
              options: function() {
                  appMobile.utils.changePage( "#optionPage", "fade", false, false );
              },
              root: function() {
                  appMobile.utils.changePage( "#homePage", "fade", false, false );
              }
          });
      }
    catch(err) {
        console.log("[router][error]: " + err);
    }

    router.targetIsNotPrevPage = function(match, ui) {
        return ui && ui.prevPage && ui.prevPage[0] && "#" + ui.prevPage[0].id !== match[0]
    };

    router.onFetchSuccess = function(model, resp, options) {
        setInterval(function() {
            $.mobile.hidePageLoadingMsg();
            router.hideFlashMessage(options);
        }, 0);
    };

    router.onFetchError = function(originalModel, resp, errOptions, options) {
        setInterval(function() {
            console.log("Error response tmp: '" + resp + "' for url: '" + options.fetchUrl + "'");
            $.mobile.hidePageLoadingMsg();
            router.hideFlashMessage(options);
        }, 0);
    };

    router.showFlashMessage = function(options) {
        var flashMessage = _.template($('#flash-message-tpl').html(), { flashMessage: "Please, wait while loading ..." } );
        var currentPageHeader = $(options.page).children(":jqmData(role='header')");
        currentPageHeader.append(flashMessage);
    };

    router.hideFlashMessage = function(options) {
        var header = $(options.page).children(":jqmData(role='header')");
        var flashMessage = header.children("div#flashMessage");
        var flashMessageContent = flashMessage.children("h1");
        flashMessageContent.fadeOut();
        setInterval(function () {
            flashMessage.remove();
        }, 500);
    };

    router.getParams = function(hashparams){
        if (!hashparams) return null;
        var params={}, tmp;
        var tokens=hashparams.slice( hashparams.indexOf('?')+1 ).split("&");
        $.each(tokens,function(k,v){
            tmp=v.split("=");
            if (params[tmp[0]]){
                if (!(params[tmp[0]] instanceof Array)){
                    params[tmp[0]]=[ params[tmp[0]] ];
                }
                params[tmp[0]].push(tmp[1]);
            } else {
                params[tmp[0]]=tmp[1];
            }
        });
        if ($.isEmptyObject(params)) return null;
        return params;
    };

    router.preparePageNavbar = function(page, data, prefix, settings) {

        if (data.pages <= 1) {
            return ;
        }

        var options = $.extend({
            prefix: prefix,
            pages: data.pages,
            total: data.count,
            navbarTitle: 'Page ' + settings.page + ' of ' + data.pages,
            previousPageUrl: "",
            nextPageUrl: "",
            id: settings.getId ? settings.getId(data) : undefined
        }, settings);

        if (options.page > 1) {
            options.previousPageUrl = '#posts?type=' + options.method + (options.id ? '&id=' + options.id : '') +
                '&count=' + options.pageSize + '&page=' + (options.page - 1);
        }

        if (options.page < options.pages) {
            options.nextPageUrl = '#posts?type=' + options.method + (options.id ? '&id=' + options.id : '') +
                '&count=' + options.pageSize + '&page=' + (options.page + 1);
        }


        var pageNavbar = _.template( $('#page-navbar-tpl').html(), options);
        var currentPageHeader = $(page).children(":jqmData(role='header')");

        var existingPageNavbar = $('#' + prefix + '-page-navbar');
        if (existingPageNavbar) {
            existingPageNavbar.remove();
        }
        currentPageHeader.append(pageNavbar);

        if (options.page > 1) {
            $("#" + options.prefix + "-page-navbar-left").show();
        }
        if (options.page < options.pages) {
            $("#" + options.prefix + "-page-navbar-right").show();
         }

    };

    router.refreshPosts = function(type, match, ui) {

        var params = router.getParams(match[1]);

        var options = {
            page: Number(params.page) || 1,
            pageSize: Number(params.size) || DEFAULT_ITEM_BY_PAGE,
            method: params.type
        };

        $('#post-page-nav').hide();

        if (options.method === "tag") {
            options.url = 'json=get_tag_posts&exclude=slug,description,parent,content,comments,attachments' +
                '&tag_id=' + params.id + '&page=' + options.page + '&count=' + options.pageSize + '&callback=?';
            options.title = function(data) { return data.tag.title; };
            options.getId = function(data) { return data.tag.id };
        }
        else if (options.method === "category") {
            options.url = 'json=get_category_posts&exclude=slug,description,parent,content,comments,attachments' +
                '&category_id=' + params.id + '&page=' + options.page + '&count=' + options.pageSize + '&callback=?';
            options.title = function(data) { return data.category.title; };
            options.getId = function(data) { return data.category.id };
        }
        else if (options.method === "author") {
            options.url = 'json=get_author_posts&exclude=slug,description,parent,content,comments,attachments' +
                '&author_id=' + params.id + '&page=' + options.page + '&count=' + options.pageSize + '&callback=?';
            options.title = function(data) { return data.author.name; };
            options.getId = function(data) { return data.author.id };
        }
        else if (options.method === "recent") {
            options.url = 'json=get_recent_posts&exclude=slug,description,parent,content,comments,attachments' +
                '&page=' + options.page + '&count=' + options.pageSize + '&callback=?';
            options.title = function() { return "Recent posts" };
        }

        router.refreshDataList({
            page: "#posts", title: "Posts", el: "#post-list", view: "posts", template: $("#post-list-tpl").html(),
            url: utils.getFullUrl(options.url),
            parse: function(data) {
                console.log("[router][posts]Loading data!");
                return data.posts;
            },
            beforeParse: function(data) {
                $('#posts-title').text(options.title(data));
                router.preparePageNavbar("#posts", data, "post", options);
            },
            success: function(model, resp) {
                console.log("[router][post] resp: " + resp);
            }
        });
    };


    //    var options = {
    //        name: "Authors",
    //        view: "author",
    //        url: '/get_author_index/?exclude=slug,description,parent,nickname,first_name,last_name,url&callback=?',
    //        el: "#authors",
    //        template: authorCollectionTpl,
    //        parse: function(data) { return data.authors; }
    //    };
    router.refreshDataList = function(options) {
        $.mobile.showPageLoadingMsg();
        console.log("Show " + options.title + " page message!");
        router.showFlashMessage(options);

//        if (!collectionModel.views[options.view]) {
            console.log("Loading " + options.title + " View");
            collectionModel.views[options.view] = new collectionModel.EntryListView({
                fetchUrl: options.url,
                el: options.el,
                collectionTemplate: options.template,
                parse: options.parse,
                sync: router.sync,
                beforeParse: options.beforeParse
            });
//        }
        if (collectionModel.views[options.view].collection.length !== 0) {
            collectionModel.views[options.view].collection.reset([]);
        }

//        if (collectionModel.views[options.view].collection.length === 0) {
            console.log("Fetch " + options.title + " Data from url: '" + collectionModel.views[options.view].collection.url + "'");
            collectionModel.views[options.view].collection.fetch({
                success: function(model, resp) {
                    if (options.success) {
                        options.success(model, resp);
                    }
                    router.onFetchSuccess(model, resp, options);
                } ,
                error: function (originalModel, resp, errOptions) { router.onFetchError(originalModel, resp, errOptions, options) },
                fetchUrl: options.url
            });
//        }
//        else {
//            collectionModel.views[options.view].render();
//        }
    };

    router.refreshTags = function() {
        router.refreshDataList({
            page: "#tags", title: "Tags", el: "#tag-list", view: "tags", template: $("#tag-list-tpl").html(),
            url: utils.getFullUrl('json=get_tag_index&exclude=slug,description,parent&callback=?'),
            parse: function(data) { return data.tags; }
        });
    };

    router.refreshCategories = function() {
        router.refreshDataList({
            page: "#categories", title: "Categories", el: "#category-list", view: "categories", template: $("#category-list-tpl").html(),
            url: utils.getFullUrl('json=get_category_index&exclude=slug,description,parent,nickname,first_name,last_name,url&callback=?'),
            parse: function(data) { return data.categories; }
        });
    };

    router.refreshAuthors = function() {
        router.refreshDataList({
            page: "#authors", title: "Authors", el: "#author-list", view: "authors", template: $("#author-list-tpl").html(),
            url: utils.getFullUrl('json=get_author_index&exclude=slug,description,parent,nickname,first_name,last_name,url&callback=?'),
            parse: function(data) { return data.authors; }
        });
    };

    return router;

} );
