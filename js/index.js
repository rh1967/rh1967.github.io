
    $( document ).ready(function() {
        console.log( "ready!" );                                                
        $("ul.navbar-nav li.nav-item a").removeClass("active");
        $( "[href='index.html']" ).addClass("active");
                
        ///link anchor //to make an link anchor work set the href tag to #[uniqueName] and its id to [uniqueName] (uniquenames should match) 
        let anchor = $(location).attr('hash');  //get link anchor (#...)  
        if(anchor.length!=0){  //check if link anchor exists
            $(anchor).click(); //click on the menu item to open element
        }
        
        browserStorage() ;                        
    }) ;
    
    $("div.langmenu a").click(function() {
        var click_lang = $(this);
        console.log(click_lang.attr("lang"));
        langDeEn(click_lang.attr("lang"));
    }) ;
    
    $( "ul.submenu-start li.list-item a" ).click(function() {
        var click = $( this );
        var textId = "#text #" + click.attr("id") + "_text";
        var itemId = "ul.submenu-start li.list-item #" + click.attr("id");
        
        $( "div.text" ).hide();
        $( textId ).toggle();
        
        $("ul.submenu-start li.list-item a").removeClass("active");
        $( itemId ).addClass("active");
    });

    $( "#korrFerd_text .icon-texts a" ).click(function() {
        var click = $( this );
        embedLoad( click ) ;
    });

    $( "#digEd_text .icon-texts a" ).click(function() {
        var click = $( this );
        embedLoad( click ) ;
    });

    $( "#erschBaende_text .icon-texts a" ).click(function() {
        var click = $( this );
        embedLoad( click ) ;
    });
    
    $( "#verzBuech_text .icon-texts a" ).click(function() {
        var click = $( this );
        embedLoad( click ) ;
    });
    
    $( "ul.list-letters li.list-item .icon-texts a" ).click(function() {
        var click = $( this );
        embedLoad( click ) ;                    
    }) ;

    $( "ul.list-texts li.list-item .icon-texts a" ).click(function() {
        var click = $( this );
        embedLoad( click ) ;
    });
    