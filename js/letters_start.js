
    $( document ).ready(function() {
        console.log( "ready!" );                                                
        $("ul.navbar-nav li.nav-item a").removeClass("active");
        $( "[href='letters.html']" ).addClass("active");
        
        $("#indexLetters div.item").hide();      
        
        browserStorage() ;
    });
                    
    $( "div.langmenu a" ).click(function() {
        var click_lang = $( this );
        console.log(click_lang.attr("lang"));
        langDeEn(click_lang.attr( "lang" )) ;
    });
    
    
                    
                        