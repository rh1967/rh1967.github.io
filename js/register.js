
    $( document ).ready(function() {
                  
        var url = window.location.pathname ;
        var fullName = url.substring(url.lastIndexOf('/')+1) ;//test.html
        var fileName = fullName.substring(0, fullName.indexOf('.')) ; //test

        $("ul.navbar-nav li.nav-item a").removeClass("active");
        $( "[href='register.html']" ).addClass("active");
        
        if(fileName == 'register_person') {
            console.log(fileName) ;
            $("div.register-menue a").removeClass("active");
            $( "#regPerson" ).addClass("active");
            $( "#registerFormat" ).show();
        } else {
            if(fileName == 'register_place') {
                console.log(fileName) ;
                $("div.register-menue a").removeClass("active");
                $( "#regPlace" ).addClass("active");
                $( "#registerFormat" ).show();
                $( ".footer-editor" ).show();
                //change style of footer
                $( "footer.footer .container" ).css("justify-content", "space-around") ;
            } else {
                if(fileName == 'register_index') {
                    console.log(fileName) ;
                    $("div.register-menue a").removeClass("active");
                    $( "#regIndex" ).addClass("active");
                    $( "#registerFormat" ).show();
                } else {
                    $( "#registerFormat" ).hide();
                }
           } 
        }				  
                                                      
        ///link anchor //to make an link anchor work set the href tag to #[uniqueName] and its id to [uniqueName] (uniquenames should match) 
        let anchor = $(location).attr('hash');  //get link anchor (#...)  
        if(anchor.length!=0){  //check if link anchor exists
            $(anchor).click(); //click on the menu item to open element
        }
                  
        browserStorage() ;


                
        //hide editor + upload dialog boxes        
        $(function() {
            $( ".geo_dialog" ).dialog({
                autoOpen: false
            });
        });

        $(function() {
            $( ".login_dialog" ).dialog({
                autoOpen: false            
            });
        });
    }) ;
               
   $("div.langmenu a").click(function() {
      var click_lang = $(this);
      console.log(click_lang.attr("lang"));
      langDeEn(click_lang.attr("lang"));               
   }) ;