    function levelOne(this_L1) {
            var tr = "" ;
            var template = "<ul>" + 
                              "<li>" + 
                                "<div class='de'>" + "Treffer " + "<span>" + "</span>" + "</div>" + 
                                "<div class='en' style='display: none;'>" + "Hits " + "<span>" + "</span>" + "</div>" + 
                              "</li>" + 
                              "<li>" + "Text" + "</li>" + 
                              "<li>" + 
                                "<ul>" + "</ul>" + 
                              "</li>" + 
                            "</ul>" ;
            
            var letterNr = this_L1.find( 'div > a' ).attr( 'href' ) ;
            var n_index = letterNr.indexOf(".") ;
            var letterNr_short = letterNr.substring(0, n_index) ;
        
            var scoreNr = this_L1.find( 'div > span' ).text().substr(7) ;      
                  
            var a = ( $('<a>') ).text( letterNr_short ).attr( 'href', letterNr ) ;
            
            tr = $('<tr>') ;
            var td1 = $('<td>') ;
            var td2 = $('<td>') ;
        
            if (this_L1.hasClass( 'ssPaginationEnd' )) {        
              tr.addClass( 'ssPaginationEnd' ) ;
              $( 'div#rhPagination' ).show() ;
            } ;
        
            tr.append(td1) ;
            tr.append(td2) ;
            tr.children( 'td:first-child' ).append(a) ;
            tr.children( 'td:last-child' ).append(template) ;
        
            $( tr ).find( 'div span' ).each(function() {
              $( this ).text( scoreNr ) ;        
           }) ;
        
            //console.log("trfo_L1 =", tbody[0]) ;      
            
            return tr ;
          } ;
    
    function levelTwo(trfo_L2, this_L2) {
            var tr = trfo_L2 ;
            var kwic = this_L2.children( 'span' ).html() ;
            var li2 = "<li>" + kwic + "</li>" ;
        
            //tr.find( 'ul > ul' ).append( li2 ) ;
            tr.find( 'ul li ul' ).append( li2 ) ;
            
            //console.log("trfo_L2 =", trfo_L2) ;
        
            return tr ;
         } ;
     
    function list2Table() {
      //Function body//    
      var tbody = $('<tbody>') ;
      var trfo = "" ;
      
      //console.log( this.maxKwicsToShow ) ;
      //console.log( this.resultSet.getSize() ) ;
        
    
      $( "#ssResults ul" ).find('li').each(function() {
        var _Li = $(this)[0] ;
        //console.log( _Li ) ;
    
        if ($(this).children('div').length) {
          tbody.append(trfo) ;
          trfo = levelOne($(this)) ;
    
        } else {
          if ($(this).parent('ul.kwic').length) {
            trfo = levelTwo(trfo, $(this)) ;
          } else {
            console.log( 'error: no first or second level li-element' ) ;
         }        
        }
      
      })
      tbody.append(trfo) ;                                    
      console.log( "tbody = ", tbody ) ;
      $( '.table tbody' ).remove() ;
      $( 'table.table' ).append( tbody ) ;    
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
