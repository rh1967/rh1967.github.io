
    $( document ).ready(function() {
        console.log( "ready!" );                                                
        $("ul.navbar-nav li.nav-item a").removeClass("active");
        $( "[href='diaries.html']" ).addClass("active");
        
        browserStorage() ;
    });
    
    $( "ul.submenu-start li.list-item a" ).click(function() {
        var click = $( this );
        var href =  click.attr("href");        
        var itemId = "ul.submenu-start li.list-item a[href='" + href + "']";

        if (!click.hasClass("active") && !href.includes("_text")) {
            $("ul.submenu-start li.list-item a").removeClass("active");
            $("ul.submenu-start li.list-item div").removeClass("show");
            $( itemId ).addClass("active");    
        } else {
            $( itemId ).removeClass("active");
        }        
    });

    $( "ul.submenu-start li li.list-item a" ).click(function() {
        var click = $( this );        
        embedLoad( click ) ;
    }); 