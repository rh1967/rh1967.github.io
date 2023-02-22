
    $( document ).ready(function() {
        console.log( "ready!" );                                                
        $("ul.navbar-nav li.nav-item a").removeClass("active");
        $( "[href='diaries.html']" ).addClass("active");
        
        $("#indexLetters div.item").hide();
        
        let anchor = $(location).attr('hash');  //get link anchor (#...)                        
        if(anchor.length!=0){  //check if link anchor exists
        //$(anchor).click(); //click on the menu item to open element
            var itemId = "#indexLetters " + anchor;
            $( itemId ).show();
        }                        
        
        browserStorage() ;                                                
    }) ;

    $( "div.langmenu a" ).click(function() {
        var click_lang = $( this );
        console.log( click_lang.attr( "lang" ));
        langDeEn(click_lang.attr( "lang" )) ;                        
    }) ;
    
    $( "table.metadata a" ).click(function() {
        console.log( this );
        var click = $( this );
        var itemId = "#indexLetters " + click.attr("href");
        console.log( itemId );
        
        $("#indexLetters div.item").hide();
        $( itemId ).toggle();                        
    })                    
    
    $( "div.letter a" ).click(function() {
        console.log( this );
        var click = $( this );
        var itemId = "#indexLetters " + click.attr("href");
        console.log( itemId );
        
        $("#indexLetters div.item").hide();
        $( itemId ).toggle();                        
    })
    
    $( "div.commentary a" ).click(function() {
        console.log( this );
        var click = $( this );
        var itemId = "#indexLetters " + click.attr("href");
        console.log( itemId );
        
        $("#indexLetters div.item").hide();
        $( itemId ).toggle();
    })
                    
                        