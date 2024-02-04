//	window.addEventListener("resize", function() {
//		"use strict"; window.location.reload(); 
//	});


document.addEventListener("DOMContentLoaded", function(){
        

	/////// Prevent closing from click inside dropdown
	document.querySelectorAll('.dropdown-menu').forEach(function(element){
		element.addEventListener('click', function (e) {
		  e.stopPropagation();
		});
	})



	// make it as accordion for smaller screens
	if (window.innerWidth < 992) {

		// close all inner dropdowns when parent is closed
		document.querySelectorAll('.navbar .dropdown').forEach(function(everydropdown){
			everydropdown.addEventListener('hidden.bs.dropdown', function () {
				// after dropdown is hidden, then find all submenus
				  this.querySelectorAll('.submenu').forEach(function(everysubmenu){
					  // hide every submenu as well
					  everysubmenu.style.display = 'none';
				  });
			})
		});
		
		document.querySelectorAll('.dropdown-menu a').forEach(function(element){
			element.addEventListener('click', function (e) {
	
				  let nextEl = this.nextElementSibling;
				  if(nextEl && nextEl.classList.contains('submenu')) {	
					  // prevent opening link if link needs to open dropdown
					  e.preventDefault();
					  console.log(nextEl);
					  if(nextEl.style.display == 'block'){
						  nextEl.style.display = 'none';
					  } else {
						  nextEl.style.display = 'block';
					  }

				  }
			});
		})
	}
	//end if innerWidth
	//show compare buttons and load html compare data
	$( 'div.synoptik-box:nth-child(2) div.nav-werke #navbar-baern li.nav-item:nth-child(5) a.dropdown-item' ).click(function() {	
		console.log( this );
		let click = $( this );
		if (click.text() == "Bae_MF_6-2") {
			$( 'div.compare-buttons' ).show();
			//remove old + load new html data
			$( 'div.synoptik-box:nth-child(3) div.auswahl-content div.col-12' ).children().remove() ;
			$( 'div.synoptik-box:nth-child(3) div.auswahl-content div.col-12' ).load("test.html div#Bae_MF_6-2") ;
		}
	}) ;
	//check if compare button is clicked
	$( 'div.compare-buttons .comp-equal' ).click(function() {
		console.log( this );
		let click = $( this );
		click.addClass('comp-selected');
		$( 'div.compare-buttons .comp-inequal' ).removeClass('comp-selected');
		$( 'div.compare-buttons .comp-not' ).removeClass('comp-selected');
		//show equal elements
		$( 'a.comp-img-equal' ).show();
		$( 'a.comp-img-inequal' ).hide();
		$( 'a.comp-img-not' ).hide();
		//highlight equal elements
		$( 'span.comp-passage-equal' ).css( "background-color", "#f7e0c7" );
		$( 'span.comp-passage-inequal' ).css( "background-color", "transparent" );
		$( 'span.comp-passage-not' ).css( "background-color", "transparent" );
	}) ;		
	$( 'div.compare-buttons .comp-inequal' ).click(function() {
		console.log( this );
		let click = $( this );
		click.addClass('comp-selected');
		$( 'div.compare-buttons .comp-equal' ).removeClass('comp-selected');
		$( 'div.compare-buttons .comp-not' ).removeClass('comp-selected');
		//show not equal elements		
		$( 'a.comp-img-inequal' ).show();
		$( 'a.comp-img-equal' ).hide();
		$( 'a.comp-img-not' ).hide();
		//highlight not equal elements
		$( 'span.comp-passage-inequal' ).css( "background-color", "#f7e0c7" );
		$( 'span.comp-passage-equal' ).css( "background-color", "transparent" );
		$( 'span.comp-passage-not' ).css( "background-color", "transparent" );
	}) ;
	$( 'div.compare-buttons .comp-not' ).click(function() {
		console.log( this );
		let click = $( this );
		click.addClass('comp-selected');			
		$( 'div.compare-buttons .comp-equal' ).removeClass('comp-selected');
		$( 'div.compare-buttons .comp-inequal' ).removeClass('comp-selected');
		//show missing elements
		$( 'a.comp-img-not' ).show();
		$( 'a.comp-img-equal' ).hide();
		$( 'a.comp-img-inequal' ).hide();
		//highlight missing elements
		$( 'span.comp-passage-not' ).css( "background-color", "#f7e0c7" );
		$( 'span.comp-passage-equal' ).css( "background-color", "transparent" );
		$( 'span.comp-passage-inequal' ).css( "background-color", "transparent" );

	}) ;		
}) ;


// DOMContentLoaded  end