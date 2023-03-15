if (sessionStorage.getItem("git_token") == "null" || sessionStorage.getItem("git_token") == "undefined") {
    console.log("git token not found in session storage") ;
}    
else {
    window.git_token = sessionStorage.getItem("git_token") ;
    console.log("git token found in session storage: ") ;    
}

$(".footer .footer-editor a").click(function(){
        
    //init variables and get data from register table
    var click = $( this ) ;
    console.log("click = ", click) ;

    var pos = { my: "center center", at: "center top+150", of: window } ;
    $(function() {
        $( ".login_dialog" ).dialog({
            autoOpen: true,
            position:pos,
            buttons: {
                "Login ": function() {                    
                    window.git_token = $("input#login_entry").val();
                    //console.log("git token =", window.git_token) ;
                    
                    if (sessionStorage.getItem("git_token") == null) {
                        sessionStorage.setItem("git_token", window.git_token) ;
                        console.log("git token stored in session storage") ;    
                    } else {
                        sessionStorage.removeItem("git_token") ;
                        sessionStorage.setItem("git_token", window.git_token) ;
                        console.log("git token updated in session storage") ;                        
                    }
                    
                    window.open('register_place.html', '_self') ;                    

                    $( this ).dialog( "close" ) ;
                }
            }            
        });          
    });
}) ;
    




