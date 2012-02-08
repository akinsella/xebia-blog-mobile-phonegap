define( [ 'utils', 'lawnchair', 'models/TagModel' ],
    function( utils, lawnchair, tagModel ) {

        console.log("Loaded core.js");

    // ******************************************************************************
    // * Constants
    // ******************************************************************************

    var DEFAULT_ITEM_BY_PAGE = 25;

    var DEFAULT_POST_PARAMS = '&exclude=content,comments,attachments';

    var MAX_VIEW_ITEMS = 100;


    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    //"use strict";
    var core = {};

    // ******************************************************************************
    // * Global variables
    // ******************************************************************************

    var db;
    var dbName = "xebia";

    var options;

    var DEFAULT_OPTIONS = {
        cacheData: false
    };


    // ******************************************************************************
    // * Events
    // ******************************************************************************

    core.onMobileInit = function() {
        console.log("Loading on mobile init");

        db = Lawnchair({name: dbName}, function(e) {
            utils.info('Storage open');
        });

        options = db.get("options", function(options) {
            if (!options) {
                options = DEFAULT_OPTIONS;
                db.save({ key: "options", value: options });
            }
        });
    };

    core.onHomePageShow = function() {
        // Write some code
    };

    core.onRecentPostPageShow = function() {
        core.loadPostsContent('#recentPosts', utils.getFullUrl('/get_recent_posts/?callback=?'), function(data) { });
    };

    core.onPostByAuthorPageShow = function() {
        $('#postByAuthorPageNav').hide();

        var authorId = parseInt(utils.getParameterByName("author"));
        var page = parseInt(utils.getParameterByName("page"));
        var pageSize = parseInt(utils.getParameterByName("count"));

        if (isNaN(page)) { page = 1; }
        if (isNaN(pageSize)) { pageSize = DEFAULT_ITEM_BY_PAGE; }

        core.loadPostsContent('#postByAuthor', utils.getFullUrl('/get_author_posts/?exclude=slug,description,parent,nickname,first_name,last_name,url&author_id=' + authorId + '&page=' + page + '&count=' + pageSize + DEFAULT_POST_PARAMS + '&callback=?'),
            function(data) {
                /* Set title */
                $('#postByAuthorTitleAuthor').text(data.author.name);

                /* page = data.page; */
                var pages = data.pages;
                var results = data.count;

                if (page > 1) {
                    $('#postByAuthorPageNavPrev').show();
                    $('#postByAuthorPageNavPrev a').attr('href', 'index.html?author=' + data.author.id + '&count=' + pageSize + '&page=' + (page - 1) + '#postByAuthorPage');
                    $('#postByAuthorPageNavPrev a').attr('rel', 'external');
                }
                else {
                    $('#postByAuthorPageNavPrev').hide();
                    $('#postByAuthorPageNavPrev a').attr('href', '');
                    $('#postByAuthorPageNavPrev a').attr('rel', '');
                }

                $('#postByAuthorPageNavTitle').text('Page ' + page + ' of ' + pages);


                if (page < pages) {
                    $('#postByAuthorPageNavNext').show();
                    $('#postByAuthorPageNavNext a').attr('href', 'index.html?author=' + data.author.id + '&count=' + pageSize + '&page=' + (page + 1) + '#postByAuthorPage');
                    $('#postByAuthorPageNavNext a').attr('rel', 'external');
                }
                else {
                    $('#postByAuthorPageNavNext').hide();
                    $('#postByAuthorPageNavNext a').attr('href', '');
                    $('#postByAuthorPageNavNext a').attr('rel', '');
                }

                $('#postByAuthorPageNav').show();
            });
    };

    core.onPostByCategoryPageShow = function() {
        $('#postByCategoryPageNav').hide();

        var categoryId = parseInt(utils.getParameterByName("category"));
        var page = parseInt(utils.getParameterByName("page"));
        var pageSize = parseInt(utils.getParameterByName("count"));

        if (isNaN(page)) { page = 1; }
        if (isNaN(pageSize)) { pageSize = DEFAULT_ITEM_BY_PAGE; }

        core.loadPostsContent('#postByCategory', utils.getFullUrl('/get_category_posts/?exclude=slug,description,parent&category_id=' + categoryId + '&page=' + page + '&count=' + pageSize + DEFAULT_POST_PARAMS + '&callback=?'),
            function(data) {
                /* Set title */
                $('#postByCategoryTitleCategory').text(data.category.title);

                /* page = data.page; */
                var pages = data.pages;
                var results = data.count;

                if (page > 1) {
                    $('#postByCategoryPageNavPrev').show();
                    $('#postByCategoryPageNavPrev a').attr('href', 'index.html?category=' + data.category.id + '&count=' + pageSize + '&page=' + (page - 1) + '#postByCategoryPage');
                    $('#postByCategoryPageNavPrev a').attr('rel', 'external');
                }
                else {
                    $('#postByCategoryPageNavPrev').hide();
                    $('#postByCategoryPageNavPrev a').attr('href', '');
                    $('#postByCategoryPageNavPrev a').attr('rel', '');
                }

                $('#postByCategoryPageNavTitle').text('Page ' + page + ' of ' + pages);


                if (page < pages) {
                    $('#postByCategoryPageNavNext').show();
                    $('#postByCategoryPageNavNext a').attr('href', 'index.html?category=' + data.category.id + '&count=' + pageSize + '&page=' + (page + 1) + '#postByCategoryPage');
                    $('#postByCategoryPageNavNext a').attr('rel', 'external');
                }
                else {
                    $('#postByCategoryPageNavNext').hide();
                    $('#postByCategoryPageNavNext a').attr('href', '');
                    $('#postByCategoryPageNavNext a').attr('rel', '');
                }

                $('#postByCategoryPageNav').show();
            });
    };

    core.onPostByTagPageShow = function() {
        $('#postByTagPageNav').hide();

        var authorId = parseInt(utils.getParameterByName("tag"));
        var page = parseInt(utils.getParameterByName("page"));
        var pageSize = parseInt(utils.getParameterByName("count"));

        if (isNaN(page)) { page = 1; }
        if (isNaN(pageSize)) { pageSize = DEFAULT_ITEM_BY_PAGE; }

        core.loadPostsContent('#postByTag', utils.getFullUrl('/get_tag_posts/?exclude=slug,description,parent&tag_id=' + authorId + '&page=' + page + '&count=' + pageSize + DEFAULT_POST_PARAMS + '&callback=?'),
            function(data) {
                /* Set title */
                $('#postByTagTitleTag').text(data.tag.title);

                /* page = data.page; */
                var pages = data.pages;
                var results = data.count;

                if (page > 1) {
                    $('#postByTagPageNavPrev').show();
                    $('#postByTagPageNavPrev a').attr('href', 'index.html?tag=' + data.tag.id + '&count=' + pageSize + '&page=' + (page - 1) + '#postByTagPage');
                    $('#postByTagPageNavPrev a').attr('rel', 'external');
                }
                else {
                    $('#postByTagPageNavPrev').hide();
                    $('#postByTagPageNavPrev a').attr('href', '');
                    $('#postByTagPageNavPrev a').attr('rel', '');
                }

                $('#postByTagPageNavTitle').text('Page ' + page + ' of ' + pages);


                if (page < pages) {
                    $('#postByTagPageNavNext').show();
                    $('#postByTagPageNavNext a').attr('href', 'index.html?tag=' + data.tag.id + '&count=' + pageSize + '&page=' + (page + 1) + '#postByTagPage');
                    $('#postByTagPageNavNext a').attr('rel', 'external');
                }
                else {
                    $('#postByTagPageNavNext').hide();
                    $('#postByTagPageNavNext a').attr('href', '');
                    $('#postByTagPageNavNext a').attr('rel', '');
                }

                $('#postByTagPageNav').show();
            });
    };

    core.onCategoryPageBeforeShow = function() {
        $("#categories").empty();
    };

    core.onCategoryPageShow = function() {
        core.loadCategoriesContent('#categories', utils.getFullUrl('/get_category_index/?exclude=slug,description,parent&callback=?'));
    };

    core.onTagPageBeforeShow = function() {
        $("#tags").empty();
    };

    core.onTagOptionPageShow = function() {
        utils.info("Loading tag option page");
    };

    core.onTagPageInit = function() {
        console.log("Init Tag Page");
        tagModel.initTagData();
    };

    core.onTagPageShow = function() {
        console.log("Show tag Page");
//        utils.loadContent( '#tags',
//            'tags',
//            utils.getFullUrl('/get_tag_index/?exclude=slug,description,parent&callback=?'),
//            function(entries) {
//                var tagCollection = new TagCollection();
//                _.each(entries, function(entry) { tagCollection.add(new TagEntry(entry)); });
//
//                return core.buildHtmlTagsContent(core.selectMoreReadTags(tagCollection, MAX_VIEW_ITEMS), false)
//            },
//            function(data) { return data.tags },
//            options);
    };

    core.onAuthorPageBeforeShow = function() {
//        $("#authors").empty();
    };

    core.onAuthorPageShow = function() {
        core.loadAuthorsContent('#authors', utils.getFullUrl('/get_author_index/?exclude=slug,description,parent,nickname,first_name,last_name,url&callback=?'));
    };

    core.onPostDetailPageShow = function() {
        var postId = utils.getParameterByName("post");
        core.loadPostDetailContent(utils.getFullUrl('/get_post/?post_id=' + postId + '&callback=?'));
    };

    core.onInsightPageShow = function() {
        core.loadInsightContent();
    };

    core.onLogPageShow = function() {
        core.loadLogContent('#logs');
    };


    // ******************************************************************************
    // * Functions
    // ******************************************************************************

    // ******************************************************************************
    // * Tags
    // ******************************************************************************

    //function refreshTagListByLetters(start, _tags, letters, element) {
    //    var itemsContent = buildHtmlTagsContent(start, selectByLetters(_tags, letters), false);
    //    refreshTagList(start, itemsContent, element);
    //}
    //
    //function selectByLetters(tags, letters) {
    //    return _.sortBy(_.filter(tags,
    //                    function(tag) { return tag.name.length > 0 && _.include(tag.name[0], letters); }),
    //                    function(tag) { return tag.name; });
    //}

    core.selectMoreReadTags = function(tags, max) {
        return _.sortBy(tags, function(tag) { return tag.post_count; }).reverse().slice(0, max);
    }

    core.buildHtmlTagsContent = function(tags, dividers) {
        var start = new Date();
        utils.info("Building HTML content: " + utils.showInterval(start));
        var itemsContent = '';
        var currentFirstLetter = '';
        $.each(tags, function (i, tag) {
            var firstLetter = tag.title.substr(0, 1).toUpperCase();
            var currentFirstLetterChanged = firstLetter != currentFirstLetter;
            currentFirstLetter = firstLetter;
            if (currentFirstLetterChanged && dividers) {
                itemsContent += '<li data-role="list-divider">' + currentFirstLetter + '</li>';
            }
            var title = '<h3>' + tag.title + '</h3>';
            var bubble = '<span class="ui-li-count">' + tag.post_count + '</span>';
            var link = 'index.html?tag=' + tag.id + '#postByTagPage';

            itemsContent += '<li><a href="' + link + '" rel="external">' + title + bubble + '</a></li>';
        });
        utils.info("HTML content built: " + utils.showInterval(start));
        return itemsContent;
    };

    // ******************************************************************************
    // * Categories
    // ******************************************************************************

     core.loadCategoriesContent = function(element, url) {
        $.mobile.showPageLoadingMsg();
        $.getJSON( url, function( data ) {
            $(element).empty();
            var itemsContent = '';
            var categories = _.sortBy(data.categories, function(category){ return category.name; });
            $.each(categories, function(i, category) {
                var title = '<h3>' + category.title + '</h3>';
                var subtitle = '<p><em>' + category.description + '</em></p>';
                var bubble = '<span class="ui-li-count">' + category.post_count + '</span>';
                var link = 'index.html?category=' + category.id + '#postByCategoryPage';
                itemsContent += '<li><a href="' + link + '" rel="external">' + title + subtitle + bubble + '</a></li>';
            });

            $(element).append(itemsContent);
            $(element).listview("refresh");
            $.mobile.hidePageLoadingMsg();
        });
    };

    core.loadAuthorsContent = function(element, url) {
        $.mobile.showPageLoadingMsg();
        $.getJSON( url, function( data ) {
            $(element).empty();
            var itemsContent = '';
            var authors = _.sortBy(data.authors, function(author){ return author.name; });
            $.each(authors, function(i, author) {
                var title = '<h3>' + author.name + '</h3>';
                var link = 'index.html?author=' + author.id + '#postByAuthorPage';
                itemsContent += '<li><a href="' + link + '" rel="external">' + title + '</a></li>';
            });

            $(element).append(itemsContent);
            $(element).listview("refresh");
            $.mobile.hidePageLoadingMsg();
        });
    };

    core.loadPostsContent = function(element, url, callback) {
        $.mobile.showPageLoadingMsg();
        $.getJSON( url, function( data ) {
            $(element).empty();

            callback(data);

            var itemsContent = '';
            $.each(data.posts, function(i, post) {
                var title = '<h3>' + post.title_plain + '</h3>';
                var subtitle = '<p><em>' + post.date.substr(0, 10) + ' - ' + post.author.name + '</em></p>';
                var link = 'index.html?post=' + post.id + '#postDetailPage';
                var aside = '<p class="ui-li-aside"><em>' + post.date + '</em></p>';
                var bubble = '<span class="ui-li-count">' + post.comment_count + '</span>';
                itemsContent += '<li><a href="' + link + '" rel="external">' + title + subtitle + bubble + '</a></li>';
                /* itemsContent += '<li>' + title + subtitle + aside + bubble + '</li>'; */
            });
            $(element).append(itemsContent);
            $(element).listview("refresh");
            $.mobile.hidePageLoadingMsg();
        });
    };

    core.loadPostDetailContent = function(url, postId) {

        $.mobile.showPageLoadingMsg();
        $.getJSON( url, function( data ) {

            var post = data.post;

            store('insightTitle', post.title);
            store('insightContent', stripTags(post.content));
            store('insightUrl', post.url);

             /* Set post title */
            $('#postDetailTitle').empty();
            $('#postDetailTitle').append(post.title_plain);


            /* Set author */
            $('#postDetailAuthor').empty();
            $('#postDetailAuthor').append('<a href="index.html?author=' + post.author.id + '#postByAuthorPage" rel="external">' + post.author.name + '</a>');

            /* Show post date */
            $('#postDetailDate').empty();
            $('#postDetailDate').append(post.date.substr(0, 16));


            /* Set categories */
            var categories = '';
            $.each(post.categories, function(i, category) {
                categories += '<a href="index.html?category=' + category.id + '#postByCategoryPage" rel="external">' + category.title + '</a>';
                if (i + 1 < post.categories.length) {
                    categories += ', ';
                }
            });
            $('#postCategoriesItems').empty();
            $('#postCategoriesItems').append(categories);


            /* Set tags */
            var tags = '';
            $.each(post.tags, function(i, tag) {
                tags += '<a href="index.html?tag=' + tag.id + '#postByTagPage" rel="external">' + tag.title + '</a>';
                if (i + 1 < post.tags.length) {
                    tags += ', ';
                }
            });
            $('#postTagsItems').empty();
            $('#postTagsItems').append(tags);

            /* Set excerpt */
            $('#postExcerptContent').empty();
            $('#postExcerptContent').append(post.excerpt);


            /* Set post comments */
            var itemsContent = '';

            $('#postCommentsCount').empty();
            $('#postCommentsCount').append(post.comments.length);

            $.each(post.comments, function(i, comment) {
                var title = '<p></p><a href="' + comment.url + '" rel="external">' + comment.name + '</a></p>';
                var subtitle = '<p class="postCommentsItemContent"><em>' + utils.decodeHtmlEntities(comment.content) + '</em></p>';
                var aside = '<div class="postCommentsItemAside"><p><em>' + comment.date.substr(0, 10) + '</em></p></div>';
                itemsContent += '<div class="postCommentsItem">' + aside + title + subtitle + '</div>';
            });

            $('#postCommentsList').empty();
            $('#postCommentsList').append(itemsContent);

            $.mobile.hidePageLoadingMsg();
        });
    };

    core.loadInsightContent = function() {

        var insightTitle = fetch('insightTitle');
        var insightContent = utils.decodeHtmlEntities(fetch('insightContent'));
        var insightUrl = fetch('insightUrl');


        /* Set insight title */
        $('#insightTitle').empty();
        $('#insightTitle').append(insightTitle);

        /* Set insight content */
        $('#insightContent').empty();
        $('#insightContent').append(insightContent);

        /* Set insight url */
        $('#insightUrl').attr("href", insightUrl);
    };


    core.loadLogContent = function(element) {
        $(element).empty();

        var itemsContent = '';
        $.each(utils.getLogContent(), function(i, log) {
            itemsContent += '<li>' + log + '</li>';
        });
        $(element).append(itemsContent);
        $(element).listview("refresh");
    };

    return core;
});