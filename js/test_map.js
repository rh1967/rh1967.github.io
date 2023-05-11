function convertHTML(str) {
  return str.replace(/&/g, "&amp;")
    .replace(/>/g, "&gt;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g,"&apos;");
}

var marker_editor = { 
  "key": "", "type": "PLACE", "mappedTo": { 
      "authority": "GEO_NAMES", "id": "", "url": "", "title": "", "description": "", "coordinates": { 
          "latitude": 0.0, "longitude": 0.0 
      } 
  } 
} ;

marker_editor.mappedTo.title = "Castel Sant'Angelo" ;
var string_html = convertHTML(marker_editor.mappedTo.title) ;
console.log(string_html) ;
console.log(marker_editor.mappedTo.title) ;