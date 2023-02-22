/*template: 
<iframe src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf">
</iframe>
*/

    //get pdf de + en
    function embedId(gitRepo_fn, click_fn) {
        var title =  click_fn.attr("title");        
        var iframeDirStr = $( click_fn ).parents("div.collapse").attr("id") ;
        var iframeDir = iframeDirStr.substring(1);        
        //var iframe = gitRepo_fn + "/data/pdf/" + iframeDir + "/" + title ;
        var iframe = "/data/pdf/" + iframeDir + "/" + title ;
                
        var href = click_fn.attr("href");
        var iframeId = href + " div:nth-child(2).frame-texts" ;
        var iframeTag = iframeId + " iframe" ;
        
        $( iframeTag ).remove();
        $( iframeId ).append("<iframe></iframe>");
        $( iframeTag ).attr("class", "frameStyle").attr( "src", iframe ) ;
        
        $( "div.text" ).hide();
        $( href ).show();
        $( iframeId ).show();
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
        embedId(gitRepo, click_para) ;
    }
    