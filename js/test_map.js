// Importing the jsdom module
const jsdom = require("jsdom") ;

// Creating a window with a document
const dom = new jsdom.JSDOM(`
<!DOCTYPE html>
<body>
<h1 class="heading">
    GeeksforGeeks
</h1>
</body>
`);

// Importing the jquery and providing it
// with the window
const jquery = require("jquery")(dom.window);
// Appending a paragraph tag to the body
jquery("body").append("<p>Is a cool Website</p>");
  
// Getting the content of the body
const content = dom.window.document.querySelector("body");
  
// Printing the content of the heading and paragraph
//console.log(content.textContent);

const json = require("../../data/json/map.json") ;
const xml = require("fs").readFileSync("../../data/register/register_place.xml", "utf8") ;

for (let item of json) {
  if (item.key == "Wien") {
      console.log(item.mappedTo.id);    
  }  
}

//console.log(json) ;

xmlDoc = jquery.parseXML( xml ) ;
$xml = jquery( xmlDoc ) ;
$item = $xml.find( "item" );

//console.log($item) ;


  
/*xmlDoc = jquery.parseXML( xml ),
  $xml = jquery( xmlDoc ),
  $title = $xml.find( "title" );

  $title.text( "XML Title" );

  console.log($title.text());
/*
const jsonFile = require('../../data/json/map.json');
*/