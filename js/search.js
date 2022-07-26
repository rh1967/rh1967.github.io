                
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
