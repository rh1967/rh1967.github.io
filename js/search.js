 
function langDeEn(input) {
                        var navbar = "nav.navbar ";
                        var pagetitle = "#pageTitle ";
                        var searchcontent = "#searchContent ";
                        var resultsearch = "#resultSearch ";
                        var footer = "footer ";
                        if (input == "de") {
                        localStorage.setItem("language", "de");
                        $("div.langmenu a:lang(en)").removeClass("active");
                        $("div.langmenu a:lang(de)").addClass("active");
                        $(navbar + "div.en").hide();
                        $(navbar + "div.de").show();
                        $(pagetitle + "div.en").hide();
                        $(pagetitle + "div.de").show();
                        $(searchcontent + "div.de").show();
                        $(searchcontent + "div.en").hide();
                        $(resultsearch + "div.en").hide();
                        $(resultsearch + "div.de").show();
                        $(footer + "div.en").hide();
                        $(footer + "div.de").show();
                        
                        $("input#ssQuery").attr("placeholder", "Begriff hier eingeben");
                        $("button#ssDoSearch").text("Absenden");
                        $("button#rhShowMore").text("Zeige mehr");
                        $("button#rhShowAll").text("Zeige alle");
                        $("button#rhShowLess").text("Zeige weniger");
                        } else {
                        localStorage.setItem("language", "en");
                        $("div.langmenu a:lang(de)").removeClass("active");
                        $("div.langmenu a:lang(en)").addClass("active");
                        $(navbar + "div.de").hide();
                        $(navbar + "div.en").show();
                        $(pagetitle + "div.de").hide();
                        $(pagetitle + "div.en").show();
                        $(searchcontent + "div.de").hide();
                        $(searchcontent + "div.en").show();
                        $(resultsearch + "div.de").hide();
                        $(resultsearch + "div.en").show();
                        $(footer + "div.de").hide();
                        $(footer + "div.en").show();
                        
                        $("input#ssQuery").attr("placeholder", "Enter term here");
                        $("button#ssDoSearch").text("Submit");
                        $("button#rhShowMore").text("Show more");
                        $("button#rhShowAll").text("Show all");
                        $("button#rhShowLess").text("Show less");
                        }
                    }
                
                
                        $(document).ready(function() {
                        console.log("ready!");
                        $("ul.navbar-nav li.nav-item a").removeClass("active");
                        $("[href='search.html']").addClass("active");
                        
                        $("div#questionSearch").show();
                        $("div#showInputSearch").hide();
                        
                        let anchor = $(location).attr("hash"); //get link anchor (#...)
                        if (anchor.length != 0) {
                        //check if link anchor exists
                        $(anchor).click(); //click on the menu item to open element
                        }
                        
                        console.log(localStorage.getItem("language"));
                        
                        if (localStorage.getItem("language") === null || localStorage.getItem("language") == "undefined") {
                            localStorage.setItem("language", "de");
                        }
                        
                        langDeEn(localStorage.getItem("language"));
                    }) ;
                    
                    $("div.langmenu a").click(function() {
                    var click_lang = $(this);
                    console.log(click_lang.attr("lang"));
                    langDeEn(click_lang.attr("lang"));
                    }) ;
                
                
//  SHOW MORE   //
                    $("div#rhPagination #rhShowMore ").click(function() {
                    console.log("Button 'Show More' pressed");
                    
                    var nrToShow = Sch.resultsPerPage;
                    var nrTotal = Sch.resultSet.getSize();
                    var nr = $("tbody").find("tr.ssPaginationEnd").index() + nrToShow + 1;
                    
                    console.log(nr);
                    
                    $("tbody tr").removeClass("ssPaginationEnd");

                    if (nr > nrTotal) {
                    nr = nrToShow;
                    }
                    
                    console.log(nr);
                    
                    $("tr:nth-child(" + nr.toString() + ")").addClass("ssPaginationEnd");
                    });
                    
                    //  SHOW ALL //
                    $("div#rhPagination #rhShowAll ").click(function() {
                    console.log("Button 'Show All' pressed");
                    
                    var nrTotal = Sch.resultSet.getSize();
                    var nr = $("tbody").find("tr.ssPaginationEnd").index();
                    
                    console.log(nr);
                    
                    $("tbody tr").removeClass("ssPaginationEnd");
                    
                    nr = nrTotal;
                    
                    console.log(nr);
                    
                    $("tr:nth-child(" + nr.toString() + ")").addClass("ssPaginationEnd");
                    });
                    
                    //   SHOW LESS   //
                    $("div#rhPagination #rhShowLess ").click(function() {
                    console.log("Button 'Show Less' pressed");
                    
                    var nrToShow = Sch.resultsPerPage;
                    var nrTotal = Sch.resultSet.getSize();
                    var nr = $("tbody").find("tr.ssPaginationEnd").index() - nrToShow + 1;
                    
                    console.log(nr);
                    
                    $("tbody tr").removeClass("ssPaginationEnd");
                    
                    if (nrToShow > nr) {
                    nr = nrTotal;
                    }
                    
                    console.log(nr);
                    
                    $("tr:nth-child(" + nr.toString() + ")").addClass("ssPaginationEnd");
                    });
                
                
                    $("input[type='text']").change(function() {
                    var input_search = $("input#ssQuery").val();
                    
                    $("div#questionSearch").hide();
                    console.log(input_search);
                    
                    $("div#showInputSearch").show();
                    $("div#showInputSearch div.de p").text("Suche nach: " + input_search);
                    $("div#showInputSearch div.en p").text("Searching for: " + input_search);
                    });
                
                
                    function transformSearchResultLinks() { //transform all links in the search results into ssHighlitable links
                    const containerId = "letterContent"; //id of the container where the content is
                    const searchKeyName = "ssMark"; //name of the get parameter
                    $('tbody').find('a').each(function() { //find all links that are children of tbody and loop over them
                    let link = ($(this).attr('href')); //get the orignal link
                    var input_search = $("input#ssQuery").val(); //get the search query
                    $(this).attr('href', link + "?" + searchKeyName + "=" + input_search + "#" + containerId); //modifie the link and apply it to the orignal element
                    });
                    }
                
                
                    function showMaxHits() {
                        var nrShowMaxHits = Sch.maxKwicsToShow ;
                        $( "div#showMaxHits span" ).each(function() {
                            $( this ).text( nrShowMaxHits ) ;
                            //console.log( test ) ;
                        }) ;
                        $("div#showMaxHits").show() ;
                    } ; 
                
                
                    function showMinWordLength() {
                       var nrShowMinWordLength = Sch.minWordLength ;
                       
                       $( "div#showMinWordLength span" ).each(function() {
                          $( this ).text( nrShowMinWordLength ) ;
                          //console.log( test ) ;
                       }) ;
                       $("div#showMinWordLength").show() ;                     
                       
                    } ; 
                