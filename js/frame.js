
    //get pdf de + en
    function embedId(embedId_lang, gitRepo_lang, click_lang) {        
        var embedDiv = $( embedId_lang ).parent("div.frame-texts");
        var embedTitle = $( embedId_lang ).attr("title") ;
        var embed = gitRepo_lang + "/data/pdf/start/" + embedTitle + ".pdf" ;
        var embedTag = embedId_lang + " embed" ;        
        
        $( embedTag ).remove();
        $( embedId_lang ).append("<embed></embed>");                    
        $( embedTag ).attr("class", "frameStyle").attr( "src", embed ) ;

        $( "div.icon-texts" ).show() ;
        $( "div.frame-texts" ).hide();
        
        $( click_lang ).parents("div.icon-texts").hide() ;
        embedDiv.show();                
    }
    
    function embedLoad( click_para ) {        
        //get page url
        var hostName = $(location).attr("hostname") ;
        var pathName = $(location).attr("pathname") ;
        var tmpUrl = hostName + pathName ;
        var tmpUrlArr = tmpUrl.split('/') ;

        if (tmpUrlArr.length == 1 || (tmpUrlArr.length == 2 && tmpUrlArr[1] == "index.html")) {
            var gitRepo = "https://" + tmpUrlArr[0] ;
        } else {
            var gitRepo = "https://" + tmpUrlArr[0] + "/" + tmpUrlArr[1] ;
        }
        
        //set pdf Id de + en
        var textId = $( click_para ).parents("div.text").attr("id") ;
        if ( $( click_para ).parent("div").hasClass("de") ) {
            var embedId_de = "#" + textId + " " + click_para.attr("href") ;
            embedId(embedId_de, gitRepo, click_para) ;
            var embedId_en = "#" + textId + " " + $( click_para ).parent("div").next("div").children("a").attr("href") ;
            embedId(embedId_en, gitRepo, click_para) ;
        } else {
            if ( $( click_para ).parent("div").hasClass("en") ) {                
                var embedId_en = "#" + textId + " " + click_para.attr("href") ;
                embedId(embedId_en, gitRepo, click_para) ;
                var embedId_de = "#" + textId + " " + $( click_para ).parent("div").prev("div").children("a").attr("href") ;
                embedId(embedId_de, gitRepo, click_para) ;
            } else {
                var embedIdList = "#" + textId + " " + click_para.attr("href") ;
                embedId(embedIdList, gitRepo, click_para) ;
            }            
        }        
    }
    