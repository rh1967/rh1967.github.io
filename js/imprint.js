
    $( document ).ready(function() {
        console.log( "ready!" );                                                
        $("ul.navbar-nav li.nav-item a").removeClass("active");
                        
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
    