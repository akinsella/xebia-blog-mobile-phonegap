define( [ ], function( ) {

    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    //"use strict";
    var utils = {};

    var JSON_API_BASE_URL = 'http://localhost';
//    var JSON_API_BASE_URL = 'http://blog.xebia.fr';

    var logContent = new Array();


    utils.getLogContent = function() {
        return logContent;
    };


    // summary:
    //            A convenience method for accessing $mobile.changePage(), included
    //            in case any other actions are required in the same step.
    // changeTo: String
    //            Absolute or relative URL. In this app references to '#index', '#search' etc.
    // effect: String
    //            One of the supported jQuery mobile transition effects
    // direction: Boolean
    //            Decides the direction the transition will run when showing the page
    // updateHash: Boolean
    //            Decides if the hash in the location bar should be updated

    utils.changePage = function( viewID, effect, direction, updateHash ) {
        $.mobile.changePage( viewID, { transition: effect, reverse:direction, changeHash: updateHash} );
    };


    // summary:
    //            Display a custom notification using the loader extracted from jQuery mobile.
    //            The only reason this is here is for further customization.
    //
    // message: String
    //            The message to display in the notification dialog
    utils.loadPrompt = function( message ) {
        message = (message == undefined) ? "" : message;

        $( "<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>" + message + "</h1></div>" )
        .css( { "display": "block", "opacity": 0.96, "top": $( window ).scrollTop() + 100 } )
        .appendTo( $.mobile.pageContainer )
        .delay( 800 )
        .fadeOut( 400, function() {
            $( this ).remove();
        } );
    };

    // summary:
    //            Adjust the title of the current view
    //
    // title: String
    //            The title to update the view with
    utils.switchTitle = function( title ) {
        $( '.ui-title' ).text( title || "" );
    };

    utils.info = function(log) {
        console.log(log);
        if (logContent.length > 1000) {
            logContent.shift();
        }
        logContent.push(log);
    };

    utils.saveDataToDb = function(dbKey, data) {
        var start = new Date();
        utils.info("Saving Json " + dbKey + " content: " + utils.showInterval(start));
        utils.db.save({ key: dbKey, value: data });
        utils.info("Saved Json " + dbKey + " content: " + utils.showInterval(start));
    };

    utils.loadFromUrl = function(dbKey, url, onSuccess) {
        var start = new Date();
        utils.info("Start loading " + dbKey + " content: " + utils.showInterval(start) );
        $.when($.ajax(url, { dataType: "json" })).then(function(data) {
            utils.info("Loaded Json " + dbKey + " content: " + utils.showInterval(start));
            onSuccess(data);
        });
    };

    utils.updateListUI = function(data, element, onSuccess, itemsContentBuilder) {
        var start = new Date();

        utils.info("Append content to HTML: " + utils.showInterval(start));

        $(element).empty();
        $(element).append(itemsContentBuilder(data));
        utils.info("Content appended to HTML: " + utils.showInterval(start));
        utils.info("Refreshing HTML List: " + utils.showInterval(start));

        $(element).listview("refresh");

        utils.info("HTML List Refreshing: " + utils.showInterval(start));
        onSuccess();
    };


    utils.loadContent = function(element, cacheKey, url, itemsContentBuilder, dataAccessor, options) {
        $.mobile.showPageLoadingMsg();

        var start = new Date();

        var onContentLoaded = function() {
            utils.info("Content loaded: " + utils.showInterval(start));
            $.mobile.hidePageLoadingMsg();
        };

        var onDataLoadedFromUrl = function(data) {
            if (options.cacheData) {
                utils.saveDataToDb(cacheKey, data);
            }
            onDataLoadedFromDb(data);
        };

        var onDataLoadedFromDb = function(data) {
            utils.updateListUI(dataAccessor(data), element, onContentLoaded, itemsContentBuilder);
        };

        var onLoadDataFromUrl = function() {
            utils.loadFromUrl(cacheKey, url, onDataLoadedFromUrl);
        };

        if (options.cacheData) {
            utils.db.get(cacheKey, function(data) {
                if (data) {
                    onDataLoadedFromDb(data);
                }
                else {
                    onLoadDataFromUrl();
                }
            });
        }
        else {
            onLoadDataFromUrl();
        }
    };


    utils.linkify = function(inputText) {
        //URLs starting with http://, https://, or ftp://
        var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        var replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

        //URLs starting with www. (without // before it, or it'd re-link the ones done above)
        var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

        //Change email addresses to mailto:: links
        var replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
        replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

        return replacedText;
    };

    utils.decodeHtmlEntities = function(encodedContent) {
        return $("<div/>").html(encodedContent).text();
    };

    utils.stripTags = function(content) {

        var result = content.replace(/(<([^>]+)>)/ig,"").replace(/\r\n/g, '<br>').replace(/\r/g, '<br>').replace(/\n/g, '<br>');

        return utils.linkify(result);
    };

/*    function fixLinkIssue() {
        $('[data-role=content] a').addClass("ui-link");
    } */

    utils.getParameterByName = function( name ) {
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regex = new RegExp( "[\\?&]" + name + "=([^&#]*)" );
        var results = regex.exec( window.location.href );
        if( results == null ) {
            return "";
        }
        else {
            return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    };

    utils.getFullUrl = function(relativeUrl) {
        return JSON_API_BASE_URL + "/?" + relativeUrl;
    };

    utils.getMilliSeconds = function() {
        var d = new Date();
        return d.getMilliseconds();
    };

    utils.showInterval = function(start) {
        var duration = new Date(new Date() - start + start.getTimezoneOffset() * 60000);
        var formattedDuration = duration.toString("HH:mm:ss");
        return formattedDuration + "." + duration.getMilliseconds();
    };

//    function showInterval(start) {
//        return showIntervalWithFormat(start, "{MM}:{ss}");
//    }
//
//    function showIntervalWithFormat(start, format) {
//        return jintervals(new Date() - start, format);
//    }

    utils.getJson = function(url, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            //                  beforeSend: function(jqXHR) {
            //                	jqXHR.setRequestHeader('Authorization', 'Basic ' + base64.encode(username + ':' + password));
            //                  },
            success: successCallback,
            error: errorCallback
        });
    };

    utils.defaultAjaxErrorCallback = function(jqXHR, textStatus, errorThrown) {
        alert("Error thrown: " + errorThrown + ", status: " + textStatus + ", text: " + jqXHR.responseText);
        var err = eval("(" + jqXHR.responseText + ")");
        alert("Error thrown: " + errorThrown + ", status: " + textStatus + ", text: " + err.message);
    };

    utils.fetch = function(key) {
        return localStorage.getItem(key);
    };

    utils.store = function(key, content) {
        return localStorage.setItem(key, content);
    };


    return utils;
});




