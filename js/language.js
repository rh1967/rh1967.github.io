
    function langDeEn(input) {
        if (input == "de") {  
            localStorage.setItem("language", "de") ;
            $( "div.langmenu a:lang(en)" ).removeClass("active");
            $( "div.langmenu a:lang(de)" ).addClass("active");
            
            $(".en").hide();   //hide all elements with en class
            $(".de").show();   //show all elements with de class
        } else {    
            localStorage.setItem("language", "en") ;
            $( "div.langmenu a:lang(de)" ).removeClass("active");
            $( "div.langmenu a:lang(en)" ).addClass("active");
            $(".de").hide(); //hide all elements with de class
            $(".en").show(); //show all elements with en class
        }
    }
    
    function langDeEnSearch(input) {                        
        if (input == "de") {
            localStorage.setItem("language", "de");
            $("div.langmenu a:lang(en)").removeClass("active");
            $("div.langmenu a:lang(de)").addClass("active");
            $("input#ssQuery").attr("placeholder", "Begriff hier eingeben");
            $("button#ssDoSearch").text("Absenden");
            $("button#rhShowMore").text("Zeige mehr");
            $("button#rhShowAll").text("Zeige alle");
            $("button#rhShowLess").text("Zeige weniger");
        } else {
            localStorage.setItem("language", "en");
            $("div.langmenu a:lang(de)").removeClass("active");
            $("div.langmenu a:lang(en)").addClass("active");                                                
            $("input#ssQuery").attr("placeholder", "Enter term here");
            $("button#ssDoSearch").text("Submit");
            $("button#rhShowMore").text("Show more");
            $("button#rhShowAll").text("Show all");
            $("button#rhShowLess").text("Show less");
        }
    }
    
    function browserStorage() {
        console.log(localStorage.getItem("language"));
        
        if (localStorage.getItem("language") === null || localStorage.getItem("language") == "undefined") {
        localStorage.setItem("language", "de");
        }
        
        langDeEn(localStorage.getItem("language")) ;
    }