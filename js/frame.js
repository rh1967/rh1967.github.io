
    function iframeLoad( click_para ) {
        var frameId = "#" + $( click_para ).parents("div.text").attr("id") + " " + click_para.attr("href") ;                    
        var frameDiv = $( frameId ).parent("div.frame-texts");
        var frameTitle = $( frameId ).attr("title") ;
        var gitRepo = "https://rh1967.github.io" ; 
        var iframe = "https://view.officeapps.live.com/op/embed.aspx?src=" + gitRepo + "/data/docx/start/" + frameTitle + ".docx" ;                    
        var frameTag = frameId + " iframe" ;
        
        $( frameTag ).remove();
        $( frameId ).append("<iframe></iframe>");                    
        $( frameTag ).attr("class", "frameStyle").attr( "src", iframe ) ;        
        
        $( "div.icon-texts" ).show() ;
        $( "div.frame-texts" ).hide();

        $( click_para ).parents("div.icon-texts").hide() ;
        frameDiv.show();
    }
    
    function embedLoad( click_para ) {
        var embedId = "#" + $( click_para ).parents("div.text").attr("id") + " " + click_para.attr("href") ;                    
        var embedDiv = $( embedId ).parent("div.frame-texts");
        var embedTitle = $( embedId ).attr("title") ;
        var gitRepo = "https://rh1967.github.io" ; 
        var embed = gitRepo + "/data/pdf/start/" + embedTitle + ".pdf" ;
        var embedTag = embedId + " embed" ;        
        
        $( embedTag ).remove();
        $( embedId ).append("<embed></embed>");                    
        $( embedTag ).attr("class", "frameStyle").attr( "src", embed ) ;

        $( "div.icon-texts" ).show() ;
        $( "div.frame-texts" ).hide();
        
        $( click_para ).parents("div.icon-texts").hide() ;
        embedDiv.show();
    }
    