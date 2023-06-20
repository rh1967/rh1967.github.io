function geoname_api() {    
    let searchItem = marker_editor.key ;
    
    //if input of entry name is not key name get coordinates from title name
    if (keyFlag == true) {
        console.log("Get coordinates from title name") ;
        searchItem = marker_editor.mappedTo.title ;                
    } else {
        console.log("Get coordinates from key name") ;
    }
    //convert html encoding to special characters
    let searchItem_char = convertHtml2Char(searchItem) ;
    let maxRows = 1000 ;
    let url = "https://secure.geonames.org/searchJSON?q=" + searchItem_char + "&maxRows=" + maxRows + "&username=" + OWNER ;
    var settings = {
        "url": url,
        //"url": "http://api.geonames.org/searchJSON?q=Adriatic Sea&maxRows=10&username=rh1967",
        "method": "GET",
        "timeout": 0,
    };

    try {
        $.ajax(settings).done(function (response) {
            console.log("geoname api data =", response.geonames) ;
            let i_index = 0 ;
            let i_hit = 0 ;
            for (let geoname of response.geonames) {
                if (geoname.geonameId == marker_editor.mappedTo.id) {
                    console.log("geonameId =", geoname.geonameId) ;
                    marker_editor.mappedTo.coordinates.latitude = geoname.lat ;
                    marker_editor.mappedTo.coordinates.longitude = geoname.lng ;
                    console.log("marker_editor array =", marker_editor) ;

                    i_hit++ ;
                    break ;
                }
                i_index++ ;
            }
            if (i_hit == 0) {
                alert("No hit in geoname api data") ;
            } else {
                console.log("geoname api data ok") ;
            }
        });        
    }
    catch (error) { 
        if (error.response) {
            console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`) ;            
        }
        alert('Geoname API error!!') ;    
    }            
}
      
      