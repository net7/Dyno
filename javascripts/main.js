$(function() {
    var settings = {
        values: null,
        uris: [],
        source: 'http://localhost:8182/sindice',
        lang: 'en',
        altQuerystring: true,
        jsonp: true,
        callback: function() {
            $(".dyno-predicate").tooltip({
                delay: 0,
                showURL: false,
                bodyHandler: function() { 
                    return '<h3>Predicate URI: ' + this + '</h3>';
                }
            });
            $(".dyno-source").tooltip({
                delay: 0,
                showURL: false,
                bodyHandler: function() { 
                    return '<h3>Source: ' + this + '<h3>';
                }
            });
        },
        callback_error: function(id, message) {
            var errorBox = $("#error");
            if(!errorBox || !$("p", errorBox)) {alert(message); return}
            if(window.opener) {
                $(".error-close").show();
                $("a.error-close").live('click', function() {window.close();return false})
            }
            else $(".error-close").hide();
            $(".error-hide").show();
            $("a.error-hide").live('click', function() {errorBox.hide();return false})
            $("p", errorBox).first().html(message.replace(/\n/g, "<br/>"));
            errorBox.show();
        }
    };

    /// An example of how to get the required uri from the opener page if 
    /// Dyno is shown in a popup or similar fashion.
    if(window.opener && $("#dyno-uris a[href]", window.opener.document)) {
        $("#dyno-uris a[href]", window.opener.document).each(function(i, a) {
            if(!$(a).attr("id")) settings.uris.push($(a).attr("href"));
        });
    }

    if($("#dyno-attributes")) {
        $("#dyno-attributes").dyno(settings);
        $(".dyno-predicate").live("click", function(e) {return false});
        $(".dyno-source").live("click", function(e) {return false});
    }

	  singleResultSlide()
	  sourcesSlide();
});

function sourcesSlide() {	
	  $("#dyno-sources-list").hide();
	  $("#dyno-sources-toggle-bar").click(function () { 
        $(this).prev("#dyno-sources-list").slideToggle();
        $(this).children("p").toggleClass("closed");
    });
}

function singleResultSlide() {
	  $(".dyno-name").live('click', function () { 
        $(this).next(".dyno-value").slideToggle();
        $(this).children("p").toggleClass("closed");
    });
}









