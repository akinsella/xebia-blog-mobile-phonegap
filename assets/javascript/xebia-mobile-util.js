
// ******************************************************************************
// * Utils functions
// ******************************************************************************

    var logContent = new Array();

    function info(log) {
        console.log(log);
        if (logContent.length > 1000) {
            logContent.shift();
        }
        logContent.push(log);
    }

    function saveDataToDb(dbKey, data) {
        var start = new Date();
        info("Saving Json " + dbKey + " content: " + showInterval(start));
        db.save({ key: dbKey, value: data });
        info("Saved Json " + dbKey + " content: " + showInterval(start));
    }

    function loadFromUrl(dbKey, url, onSuccess) {
        var start = new Date();
        info("Start loading " + dbKey + " content: " + showInterval(start) );
        $.getJSON( url, function( data ) {
            info("Loaded Json " + dbKey + " content: " + showInterval(start));
            onSuccess(data);
        });
    }


    function updateTagListUI(data, element, onSuccess, itemsContentBuilder) {
        var start = new Date();

        info("Append content to HTML: " + showInterval(start));

        $(element).empty();
        $(element).append(itemsContentBuilder(data));
        info("Content appended to HTML: " + showInterval(start));
        info("Refreshing HTML List: " + showInterval(start));

        $(element).listview("refresh");

        info("HTML List Refreshing: " + showInterval(start));
        onSuccess();
    }


    function loadContent(element, cacheKey, url, itemsContentBuilder, dataAccessor, options) {
        $.mobile.showPageLoadingMsg();

        var start = new Date();

        var onContentLoaded = function() {
            info("Content loaded: " + showInterval(start));
            $.mobile.hidePageLoadingMsg();
        };

        var onDataLoadedFromUrl = function(data) {
            if (options.cacheData) {
                saveDataToDb(cacheKey, data);
            }
            onDataLoadedFromDb(data);
        };

        var onDataLoadedFromDb = function(data) {
            updateTagListUI(dataAccessor(data), element, onContentLoaded, itemsContentBuilder);
        };

        var onLoadDataFromUrl = function() {
            loadFromUrl(cacheKey, url, onDataLoadedFromUrl);
        };

        if (options.cacheData) {
            db.get(cacheKey, function(data) {
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
    }


    function linkify(inputText) {
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
    }

    function decodeHtmlEntities(encodedContent) {
        return $("<div/>").html(encodedContent).text();
    }

    function stripTags(content) {

        var result = content.replace(/(<([^>]+)>)/ig,"").replace(/\r\n/g, '<br>').replace(/\r/g, '<br>').replace(/\n/g, '<br>');

        return linkify(result);
    }

/*    function fixLinkIssue() {
        $('[data-role=content] a').addClass("ui-link");
    } */

    function getParameterByName( name ) {
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regex = new RegExp( "[\\?&]" + name + "=([^&#]*)" );
        var results = regex.exec( window.location.href );
        if( results == null ) {
            return "";
        }
        else {
            return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    }

    function getFullUrl(relativeUrl) {
        var fullUrl =  JSON_API_BASE_URL + relativeUrl;
        info(fullUrl);
        return fullUrl;
    }

    function getMilliSeconds() {
        var d = new Date();
        return d.getMilliseconds();
    }

    function showInterval(start) {
        var duration = new Date(new Date() - start + start.getTimezoneOffset() * 60000);
        var formattedDuration = duration.toString("HH:mm:ss");
        return formattedDuration + "." + duration.getMilliseconds();
    }

//    function showInterval(start) {
//        return showIntervalWithFormat(start, "{MM}:{ss}");
//    }
//
//    function showIntervalWithFormat(start, format) {
//        return jintervals(new Date() - start, format);
//    }

    function getJson(url, successCallback, errorCallback) {
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
    }

    function defaultAjaxErrorCallback(jqXHR, textStatus, errorThrown) {
        alert("Error thrown: " + errorThrown + ", status: " + textStatus + ", text: " + jqXHR.responseText);
        var err = eval("(" + jqXHR.responseText + ")");
        alert("Error thrown: " + errorThrown + ", status: " + textStatus + ", text: " + err.message);
    }

    function fetch(key) {
        return localStorage.getItem(key);
    }

    function store(key, content) {
        return localStorage.setItem(key, content);
    }
