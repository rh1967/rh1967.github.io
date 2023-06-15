const OWNER = 'rh1967' ;

var markerFlag = false ;
var inputErrFlag = false ;
var keyFlag = false ;
var descFlag = false ;
var pidFlag = false ;
//init global marker object for editor dialog
var markers_editor = [] ;
var marker_editor = {} ;

//convert special characters to html encoding
function convertChar2Html(str) {
return str.replace(/&/g, "&amp;")
    .replace(/'/g,"&apos;")
    .replace(/>/g, "&gt;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;")
    ;
}
//convert html encoding to special characters
function convertHtml2Char(str) {
return str.replace(/&amp;/g, "&")
    .replace(/&apos;/g,"'")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&quot;/g, '"')
    ;
}

$("#table-register .geoname-logo a").click(function(){
    //reset input form    
    reset() ;    
    //init marker editor
    marker_editor = { 
        "key": "", "type": "PLACE", "mappedTo": { 
            "authority": "GEO_NAMES", "id": "", "url": "", "title": "", "description": "", "coordinates": { 
                "latitude": 0.0, "longitude": 0.0 
            } 
        } 
    } ;    
    //reset variables
    markerFlag = false ;
    keyFlag = false ;
    descFlag = false ;
    pidFlag = false ;
    
    //init variables and get data from register table
    var click = $( this ) ;
    var this_row = $( click ).parents("tr") ;    
    var localID = $( this_row ).children("td:first-child").html() ;
    var key_char = $( this_row ).children("td:nth-child(2)").text() ;
    //convert special characters to html encoding
    let key_html = convertChar2Html(key_char) ;    
    marker_editor.key = key_html ;
    marker_editor.mappedTo.id = $( this_row ).children("td:nth-child(3)").find("span.geoname-url a").text() ;
    
    //fill editor dialog with existing editor data    
    if (markers_editor.length != 0) {
        //check if data exists in markers editor array
        let i_index = 0 ;
        for (let marker of markers_editor) {
            if (marker.key == marker_editor.key) {
                $( click ).parents("body").find("input#geo_entry").val(marker.key) ;  
                $( click ).parents("body").find("input#geo_desc").val(marker.mappedTo.description) ;  
                $( click ).parents("body").find("input#geo_pid").val(marker.mappedTo.id) ;                
                
                markerFlag = true ;
                break ;
            }
            i_index++ ;
        }            
    } else {
        markerFlag = false ;
    }
    
    //fill editor dialog with register data    
    if (markerFlag == false) {        
        $( click ).parents("body").find("input#geo_entry").val(marker_editor.key) ;  
        if (marker_editor.mappedTo.id) {
            console.log("geoname ID existing") ;
            //check marker data in map
            for (let marker of markers) {
                if (marker.mappedTo.id == marker_editor.mappedTo.id) {
                    //init marker editor properties from existing marker            
                    marker_editor.mappedTo.description = marker.mappedTo.description ;                

                    //fill editor dialog with marker data                
                    $( click ).parents("body").find("input#geo_desc").val(marker_editor.mappedTo.description) ;  
                    $( click ).parents("body").find("input#geo_pid").val(marker_editor.mappedTo.id) ;  
                    console.log("geoname ID in map") ;
                    
                    markerFlag = true ;        
                    break ;
                } 
            }            
        } else {                    
            console.log("No geoname ID") ;
        }    
    } else {
        markerFlag = false ;
    }

    console.log("marker_editor = ", marker_editor) ;
    
    //init editor dialog boxes
    var pos = { my: "center center", at: "center top+150", of: window } ; 
    $(function() {
        $( ".geo_dialog" ).dialog({
            autoOpen: true,
            position:pos,
            buttons: {
                "Zurücksetzen ": function() {
                    reset() ;
                },                    
                "Speichern ": function(){
                    save() ;
                },
                "Änderungen Hochladen ": function(){
                    $( this ).dialog( "close" );
                    upload() ;                    
                }
            }
        });
    });    
}) ;

function reset() {
    $("input#geo_entry").val("");
    $("input#geo_desc").val("");
    $("input#geo_pid").val("");
}

function save() {
    //read new input data
    let key_input_new = $("input#geo_entry").val() ;
    let desc_input_new = $("input#geo_desc").val() ;
    let pid_input_new = $("input#geo_pid").val() ;
    
    //compare with actual values
    if (key_input_new != marker_editor.key) {        
        keyFlag = true ;
        console.log("key changed") ;        
        //check if valid input    
        let match = key_input_new.match(/["_.;,:!()&%$§=?*~#<>°^//]|(http)|(www)/g) || [] ;
        if (match.length) {
            alert("Entry with invalid characters!") ;
            inputErrFlag = true ;
        } else {
            //reset input error flag
            inputErrFlag = false ;
            //convert special characters to html encoding
            let key_html = convertChar2Html(key_input_new) ;
            marker_editor.mappedTo.title = key_html ;
        }
    }
    if (desc_input_new != marker_editor.mappedTo.description) {
        descFlag = true ;
        console.log("description changed") ;
        //convert special characters to html encoding
        let desc_html = convertChar2Html(desc_input_new) ;
        marker_editor.mappedTo.description = desc_html ;        
    }
    if (pid_input_new != marker_editor.mappedTo.id) {
        pidFlag = true ;
        console.log("pid changed") ;
        //check if valid input    
        let match = pid_input_new.match(/[^0-9]/g) || [] ;
        if (match.length) {
            alert("PID with invalid characters!") ;
            inputErrFlag = true ;
        } else {
            //reset input error flag
            inputErrFlag = false ;            
            marker_editor.mappedTo.id = pid_input_new ;
        }
    }
    if ( (inputErrFlag == false) && (keyFlag == true || descFlag == true || pidFlag == true) ) {
        console.log("Editor data changed") ;
        console.log("marker_editor = ", marker_editor) ;        
        
        if (markers_editor.length != 0) {
            //check if marker exists in markers editor array
            let i_index = 0 ;
            for (let marker of markers_editor) {
                if (marker.key == marker_editor.key) {                    
                    //remove dublette from markers_editor array
                    markers_editor.splice(i_index, 1) ;
                    markerFlag = true ;
                    console.log("Version of editor data already in markers editor array") ;
                    console.log("Old version removed") ;
                    
                    break ;
                }
                i_index++ ;
            }            
        }
        
        //check if marker exists in markers array
        i_index = 0 ;
        for (let marker of markers) {
            if (marker.key == marker_editor.key) {
                //check if no id of old marker and id of new marker exists
                if ((!marker.mappedTo.id) && (marker_editor.mappedTo.id)) {
                    markerFlag = false ;
                } else {
                    markerFlag = true ;
                }
                //remove dublette from markers array
                markers.splice(i_index, 1) ;                
                console.log("Version of editor data already in map saved") ;
                console.log("Old version removed") ;
                
                break ;
            }
            i_index++ ;
        }
        
        //get editor data when marker is new
        if ( markerFlag == false) {
            console.log("get geoname coordinates") ;
            //get coordinates from geoname api
            geoname_api() ;
            
            console.log("build geoname url") ;
            //build geoname url
            marker_editor.mappedTo.url = "https://www.geonames.org/" + marker_editor.mappedTo.id ;
        }        
        //save new editor data in markers_editor array            
        markers_editor.unshift(marker_editor) ;
        console.log("markers_editor array = ", markers_editor) ;
        console.log("Editor Data saved") ;
        alert("Editor Data saved") ;        
        
    } else {
        if (inputErrFlag == false) {
            console.log("No changes in Editor data") ;
            console.log("marker_editor = ", marker_editor) ;
            console.log("Editor Data not saved") ;
            alert("Editor Data not changed - not saved") ;    
        }        
    }    
    //reset marker flag
    markerFlag = false ;        
} 

function upload() {
    //check if something to upload
    if ( inputErrFlag == false && markers_editor.length != 0) {

        //add new markers to markers array
        for (let marker of markers_editor) {
            markers.unshift(marker) ;
        }
        console.log("markers array = ", markers) ;                        
        
        //convert markers array to base64
        let markers_base64 = jsonToBase64(markers) ;
        console.log("markers_base64 = ", markers_base64) ;                    

        //upload new markers array to github
        github_api( markers_base64 ) ;
        console.log("Editor Data uploaded") ;        

        //reset markers editor
        markers_editor.length = 0 ;
        console.log("Reset markers editor") ;                                
    } else {
        if (inputErrFlag == true) {            
            alert("Still invalid input - nothing to upload") ;        
        } else {            
            alert("Nothing to upload") ;
        }
    }    
}

function jsonToBase64(jsonObj) {
    const jsonStr = JSON.stringify(jsonObj);
    const base64Str = btoa(unescape(encodeURIComponent(jsonStr)));    
    return base64Str;
}

function base64ToJson(base64Str) {
    const jsonStr = decodeURIComponent(escape(atob(base64Str)));    
    const jsonObj = JSON.parse(jsonStr);    
    return jsonObj;
}





